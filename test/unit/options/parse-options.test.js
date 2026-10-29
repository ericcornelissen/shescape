/**
 * @overview Contains unit tests for the functionality to parse options.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { beforeEach, suite, test } from "node:test";

import * as fc from "fast-check";
import * as sinon from "sinon";

import { resolveExecutable } from "../../../src/internal/executables.js";
import { noShell, parseOptions } from "../../../src/internal/options.js";

import { arbitrary } from "./_.js";

const arbitraryInput = () =>
  fc
    .tuple(arbitrary.env(), arbitrary.shescapeOptions())
    .map(([env, options]) => {
      options ||= {};
      return { env, options };
    });

suite("parseOptions", () => {
  const deps = {};

  beforeEach(() => {
    deps.getDefaultShell = sinon.stub();
    deps.getShellName = sinon.stub();
    deps.isShellSupported = sinon.stub();

    deps.isShellSupported.returns(true);
  });

  test("flag protection not specified", () => {
    fc.assert(
      fc.property(arbitraryInput(), (args) => {
        delete args.options.flagProtection;

        const result = parseOptions(args, deps);
        assert.equal(result.flagProtection, true);
      }),
    );
  });

  test("flag protection set to true", () => {
    fc.assert(
      fc.property(arbitraryInput(), (args) => {
        args.options.flagProtection = true;

        const result = parseOptions(args, deps);
        assert.equal(result.flagProtection, true);
      }),
    );
  });

  test("flag protection set to false", () => {
    fc.assert(
      fc.property(arbitraryInput(), (args) => {
        args.options.flagProtection = false;

        const result = parseOptions(args, deps);
        assert.equal(result.flagProtection, false);
      }),
    );
  });

  test("shell is false", () => {
    fc.assert(
      fc.property(
        arbitraryInput(),
        fc.constantFrom(false),
        (args, providedShell) => {
          args.options.shell = providedShell;

          const result = parseOptions(args, deps);
          assert.equal(deps.getDefaultShell.callCount, 0);
          assert.equal(deps.getShellName.callCount, 0);
          assert.equal(result.shellName, noShell);
        },
      ),
    );
  });

  test("shell is omitted", () => {
    fc.assert(
      fc.property(
        arbitraryInput(),
        fc.string(),
        fc.string(),
        (args, defaultShell, shellName) => {
          deps.getDefaultShell.resetHistory();
          deps.getDefaultShell.returns(defaultShell);
          deps.getShellName.resetHistory();
          deps.getShellName.returns(shellName);

          const env = args.env;
          delete args.options.shell;

          const result = parseOptions(args, deps);
          assert.equal(deps.getDefaultShell.callCount, 1);
          assert.ok(deps.getDefaultShell.calledWithExactly({ env }));
          assert.equal(deps.getShellName.callCount, 1);
          assert.ok(
            deps.getShellName.calledWithExactly(
              { env, shell: defaultShell },
              { resolveExecutable },
            ),
          );
          assert.equal(result.shellName, shellName);
        },
      ),
    );
  });

  test("shell is nil", () => {
    fc.assert(
      fc.property(
        arbitraryInput(),
        fc.constantFrom(null, undefined),
        fc.string(),
        fc.string(),
        (args, providedShell, defaultShell, shellName) => {
          deps.getDefaultShell.resetHistory();
          deps.getDefaultShell.returns(defaultShell);
          deps.getShellName.resetHistory();
          deps.getShellName.returns(shellName);

          const env = args.env;
          args.options.shell = providedShell;

          const result = parseOptions(args, deps);
          assert.equal(deps.getDefaultShell.callCount, 1);
          assert.ok(deps.getDefaultShell.calledWithExactly({ env }));
          assert.equal(deps.getShellName.callCount, 1);
          assert.ok(
            deps.getShellName.calledWithExactly(
              { env, shell: defaultShell },
              { resolveExecutable },
            ),
          );
          assert.equal(result.shellName, shellName);
        },
      ),
    );
  });

  test("shell is truthy", () => {
    fc.assert(
      fc.property(
        arbitraryInput(),
        fc.constantFrom(true),
        fc.string(),
        fc.string(),
        (args, providedShell, defaultShell, shellName) => {
          deps.getDefaultShell.resetHistory();
          deps.getDefaultShell.returns(defaultShell);
          deps.getShellName.resetHistory();
          deps.getShellName.returns(shellName);

          const env = args.env;
          args.options.shell = providedShell;

          const result = parseOptions(args, deps);
          assert.equal(deps.getDefaultShell.callCount, 1);
          assert.ok(deps.getDefaultShell.calledWithExactly({ env }));
          assert.equal(deps.getShellName.callCount, 1);
          assert.ok(
            deps.getShellName.calledWithExactly(
              { env, shell: defaultShell },
              { resolveExecutable },
            ),
          );
          assert.equal(result.shellName, shellName);
        },
      ),
    );
  });

  test("shell is specified", () => {
    fc.assert(
      fc.property(
        arbitraryInput(),
        fc.string(),
        fc.string(),
        (args, providedShell, shellName) => {
          deps.getShellName.resetHistory();
          deps.getShellName.returns(shellName);

          const env = args.env;
          args.options.shell = providedShell;

          const result = parseOptions(args, deps);
          assert.equal(deps.getDefaultShell.callCount, 0);
          assert.equal(deps.getShellName.callCount, 1);
          assert.ok(
            deps.getShellName.calledWithExactly(
              { env, shell: providedShell },
              { resolveExecutable },
            ),
          );
          assert.equal(result.shellName, shellName);
        },
      ),
    );
  });

  test("shell is not inherited", () => {
    fc.assert(
      fc.property(arbitraryInput(), fc.string(), (args, inheritedShell) => {
        deps.getShellName.resetHistory();

        delete args.options.shell;

        args.options = Object.assign(
          Object.create({ shell: inheritedShell }),
          args.options,
        );

        parseOptions(args, deps);
        assert.equal(deps.getShellName.callCount, 1);
        assert.ok(
          deps.getShellName.calledWith(sinon.match({ shell: undefined })),
        );
      }),
    );
  });

  test("shell is supported", () => {
    fc.assert(
      fc.property(arbitraryInput(), (args) => {
        deps.isShellSupported.resetHistory();
        deps.isShellSupported.returns(true);

        assert.doesNotThrow(() => {
          parseOptions(args, deps);
        });
        assert.equal(deps.isShellSupported.callCount, 1);
      }),
    );
  });

  test("shell is unsupported", () => {
    fc.assert(
      fc.property(
        arbitraryInput(),
        fc.oneof(fc.string(), fc.constantFrom(true, null, undefined)),
        fc.string(),
        (args, providedShell, shellName) => {
          deps.isShellSupported.resetHistory();
          deps.isShellSupported.returns(false);
          deps.getShellName.returns(shellName);

          args.options.shell = providedShell;

          assert.throws(
            () => {
              parseOptions(args, deps);
            },
            {
              name: "Error",
              message: `Shescape does not support the shell ${shellName}`,
            },
          );
          assert.equal(deps.isShellSupported.callCount, 1);
        },
      ),
    );
  });
});
