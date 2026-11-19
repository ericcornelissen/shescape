/**
 * @overview Contains unit tests for the general Windows-specific functionality.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import path from "node:path/win32";
import { performance } from "node:perf_hooks";
import { suite, test } from "node:test";

import * as fc from "fast-check";
import * as ppTestKit from "pp-test-kit/simulate";
import * as sinon from "sinon";

import * as nosh from "../../../src/internal/no-shell.js";
import { noShell } from "../../../src/internal/options.js";
import * as cmd from "../../../src/internal/win/cmd.js";
import * as powershell from "../../../src/internal/win/powershell.js";
import * as win from "../../../src/internal/win.js";

import { arbitrary, constants, fixtures, utilities } from "./_.js";

const shells = [
  { module: cmd, shellName: "cmd.exe" },
  { module: powershell, shellName: "powershell.exe" },
  { module: cmd, shellName: "cmd.EXE" },
  { module: powershell, shellName: "powershell.EXE" },
];

suite("windows", () => {
  test("the default shell when %COMSPEC% is defined", () => {
    fc.assert(
      fc.property(arbitrary.env(), arbitrary.windowsPath(), (env, ComSpec) => {
        env.ComSpec = ComSpec;

        const result = win.getDefaultShell({ env });
        assert.equal(result, ComSpec);
      }),
    );
  });

  test("the default shell when %COMSPEC% is an empty string", () => {
    fc.assert(
      fc.property(arbitrary.env(), (env) => {
        env.ComSpec = "";

        const result = win.getDefaultShell({ env });
        assert.equal(result, "");
      }),
    );
  });

  test("the default shell when %COMSPEC% is not defined", () => {
    fc.assert(
      fc.property(arbitrary.env(), (env) => {
        delete env.ComSpec;

        const result = win.getDefaultShell({ env });
        assert.equal(result, constants.binCmd);
      }),
    );
  });

  test("the default shell when %COMSPEC% is polluted", () => {
    fc.assert(
      fc.property(
        arbitrary.env({ keys: ["ComSpec"] }),
        fc.string(),
        (env, prototypeComSpec) => {
          fc.pre(env.ComSpec !== prototypeComSpec);

          env = ppTestKit.simulatePollution(env, {
            property: "ComSpec",
            value: prototypeComSpec,
          });

          const result = win.getDefaultShell({ env });
          assert.notEqual(result, prototypeComSpec);
        },
      ),
    );
  });

  test("shell helper functions for no shell", () => {
    const actual = win.getShellHelpers(noShell);
    const expected = nosh;
    assert.equal(actual, expected);
  });

  for (const { module, shellName } of shells) {
    test(`shell helper functions for ${shellName}`, () => {
      const actual = win.getShellHelpers(shellName);
      const expected = module;
      assert.equal(actual, expected);
    });
  }

  test("shell helper functions for unsupported shell", () => {
    fc.assert(
      fc.property(arbitrary.unsupportedWindowsShell(), (shellName) => {
        const result = win.getShellHelpers(shellName);
        assert.equal(result, undefined);
      }),
    );
  });

  test("get shell name for supported shell", () => {
    fc.assert(
      fc.property(
        arbitrary.env(),
        arbitrary.windowsPath(),
        arbitrary.windowsShell(),
        (env, basePath, shell) => {
          const executable = shell.toLowerCase().endsWith(".exe")
            ? shell
            : `${shell}.exe`;

          const resolveExecutable = sinon.stub();
          resolveExecutable.returns(path.join(basePath, executable));

          const result = win.getShellName(
            { env, shell },
            { resolveExecutable },
          );
          assert.equal(result, executable);
        },
      ),
    );
  });

  test("get shell name for unsupported shell", () => {
    fc.assert(
      fc.property(
        arbitrary.env(),
        arbitrary.windowsPath(),
        arbitrary.unsupportedWindowsShell(),
        (env, basePath, shell) => {
          const resolveExecutable = sinon.stub();
          resolveExecutable.returns(path.join(basePath, shell));

          const result = win.getShellName(
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
      fc.property(arbitrary.env(), fc.string(), (env, shell) => {
        const resolveExecutable = sinon.stub();
        resolveExecutable.returns("foobar");

        win.getShellName({ env, shell }, { resolveExecutable });
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
      }),
    );
  });

  test("is shell supported, no shell", () => {
    const actual = win.isShellSupported(noShell);
    assert.ok(actual);
  });

  for (const { shellName } of shells) {
    test(`is shell supported, ${shellName}`, () => {
      const actual = win.isShellSupported(shellName);
      assert.ok(actual);
    });
  }

  test("is shell supported for unsupported shell", () => {
    fc.assert(
      fc.property(arbitrary.unsupportedWindowsShell(), (shellName) => {
        const result = win.isShellSupported(shellName);
        assert.equal(result, false);
      }),
    );
  });

  test("flag protection function return type", () => {
    fc.assert(
      fc.property(fc.string(), (arg) => {
        const flagProtect = win.getFlagFunction();
        const result = flagProtect(arg);
        assert.ok(Array.isArray(result));
        assert.ok(result.every((entry) => typeof entry === "string"));
      }),
    );
  });

  test("flag protection function is stateless", () => {
    fc.assert(
      fc.property(fc.string(), (arg) => {
        const flagProtect = win.getFlagFunction();
        const result1 = flagProtect(arg);
        const result2 = flagProtect(arg);
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
            .map(([pre, post]) => `${pre}${"/".repeat(10e5)}${post}`),
          fc
            .tuple(fc.string(), fc.string())
            .map(([pre, post]) => `${pre}${"-".repeat(10e5)}${post}`),
        ),
        (arg) => {
          const flagFn = win.getFlagFunction();

          const startTime = performance.now();
          try {
            flagFn(arg);
          } catch {
            // Not concerned with functional correctness
          }
          const endTime = performance.now();

          const durationMs = endTime - startTime;
          const max = 50;
          assert.ok(
            durationMs < max,
            `${durationMs} should be less than ${max}`,
          );
        },
      ),
    );
  });

  test("flag protection result", () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^[-/]+$/),
        fc.string().filter((value) => !/^[-/]/.test(value)),
        (prefix, value) => {
          const flagFn = win.getFlagFunction();
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
      const flagFn = win.getFlagFunction();
      const actual = flagFn(input);
      assert.deepEqual(actual, expected.fragments);
    });
  }
});
