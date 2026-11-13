/**
 * @overview Contains unit tests for the general Unix-specific functionality.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import path from "node:path/posix";
import { performance } from "node:perf_hooks";
import { suite, test } from "node:test";

import * as fc from "fast-check";
import * as sinon from "sinon";

import * as nosh from "../../../src/internal/no-shell.js";
import { noShell } from "../../../src/internal/options.js";
import * as bash from "../../../src/internal/unix/bash.js";
import * as busybox from "../../../src/internal/unix/busybox.js";
import * as csh from "../../../src/internal/unix/csh.js";
import * as dash from "../../../src/internal/unix/dash.js";
import * as zsh from "../../../src/internal/unix/zsh.js";
import * as unix from "../../../src/internal/unix.js";

import { arbitrary, constants, fixtures, utilities } from "./_.js";

const shells = [
  { module: bash, shellName: constants.binBash },
  { module: busybox, shellName: constants.binBusyBox },
  { module: csh, shellName: constants.binCsh },
  { module: csh, shellName: constants.binCshBsd },
  { module: dash, shellName: constants.binDash },
  { module: zsh, shellName: constants.binZsh },
];

suite("unix", () => {
  test("the default shell", () => {
    const result = unix.getDefaultShell();
    assert.equal(result, "/bin/sh");
  });

  test("shell helper functions for no shell", () => {
    const actual = unix.getShellHelpers(noShell);
    const expected = nosh;
    assert.equal(actual, expected);
  });

  for (const { module, shellName } of shells) {
    test(`shell helper functions for ${shellName}`, () => {
      const actual = unix.getShellHelpers(shellName);
      const expected = module;
      assert.equal(actual, expected);
    });
  }

  test("shell helper functions for unsupported shell", () => {
    fc.assert(
      fc.property(arbitrary.unsupportedUnixShell(), (shellName) => {
        const result = unix.getShellHelpers(shellName);
        assert.equal(result, undefined);
      }),
    );
  });

  test("get shell name for supported shell", () => {
    fc.assert(
      fc.property(
        arbitrary.env(),
        arbitrary.unixPath(),
        arbitrary.unixShell(),
        (env, basePath, shell) => {
          const resolveExecutable = sinon.stub();
          resolveExecutable.returns(path.join(basePath, shell));

          const result = unix.getShellName(
            { env, shell },
            { resolveExecutable },
          );
          assert.equal(result, shell);
        },
      ),
    );
  });

  test("get shell name for unsupported shell", () => {
    fc.assert(
      fc.property(
        arbitrary.env(),
        arbitrary.unixPath(),
        arbitrary.unsupportedUnixShell(),
        (env, basePath, shell) => {
          const resolveExecutable = sinon.stub();
          resolveExecutable.returns(path.join(basePath, shell));

          const result = unix.getShellName(
            { env, shell },
            { resolveExecutable },
          );
          assert.equal(result, shell);
        },
      ),
    );
  });

  test("resolving the shell", () => {
    fc.assert(
      fc.property(
        arbitrary.env(),
        fc.string(),
        fc.string(),
        (env, shell, resolved) => {
          const resolveExecutable = sinon.stub();
          resolveExecutable.returns(resolved);

          unix.getShellName({ env, shell }, { resolveExecutable });
          assert.ok(
            resolveExecutable.calledWithExactly(
              { env, executable: shell },
              sinon.match({
                dirname: path.dirname,
                exists: sinon.match.func,
                readlink: sinon.match.func,
                resolve: path.resolve,
                which: sinon.match.func,
              }),
            ),
          );
        },
      ),
    );
  });

  test("is shell supported, no shell", () => {
    const actual = unix.isShellSupported(noShell);
    assert.ok(actual);
  });

  for (const { shellName } of shells) {
    test(`is shell supported, ${shellName}`, () => {
      const actual = unix.isShellSupported(shellName);
      assert.ok(actual);
    });
  }

  test("is shell supported for unsupported shell", () => {
    fc.assert(
      fc.property(arbitrary.unsupportedUnixShell(), (shellName) => {
        const result = unix.isShellSupported(shellName);
        assert.ok(!result);
      }),
    );
  });

  test("flag protection function return type", () => {
    fc.assert(
      fc.property(fc.string(), (arg) => {
        const flagFn = unix.getFlagFunction();
        const result = flagFn(arg);
        assert.ok(Array.isArray(result));
        assert.ok(result.every((entry) => typeof entry === "string"));
      }),
    );
  });

  test("flag protection function is stateless", () => {
    fc.assert(
      fc.property(fc.string(), (arg) => {
        const flagFn = unix.getFlagFunction();
        const result1 = flagFn(arg);
        const result2 = flagFn(arg);
        assert.deepEqual(result1, result2);
      }),
    );
  });

  test("flag protection performance", () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.string({ size: "xlarge" }),
          fc
            .tuple(fc.string(), fc.string())
            .map(([pre, post]) => `${pre}${"-".repeat(10e5)}${post}`),
        ),
        (arg) => {
          const flagFn = unix.getFlagFunction();

          const startTime = performance.now();
          try {
            flagFn(arg);
          } catch {
            // Not concerned with functional correctness
          }
          const endTime = performance.now();

          assert.ok(endTime - startTime < 50);
        },
      ),
    );
  });

  test("flag protection result", () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^-+$/),
        fc.string().filter((value) => !value.startsWith("-")),
        (prefix, value) => {
          const flagFn = unix.getFlagFunction();
          const actual = flagFn(`${prefix}${value}`);
          const expected = flagFn(value);
          assert.deepEqual(actual, ["", prefix, ...expected]);
        },
      ),
    );
  });

  const flagFixtures = Object.values(fixtures.flag.null).flat();

  for (const { input, expected } of flagFixtures) {
    test(`flag protection of '${utilities.escapeControlCharacters(input)}'`, () => {
      const flagFn = unix.getFlagFunction();
      const actual = flagFn(input);
      assert.deepEqual(actual, expected.fragments);
    });
  }
});
