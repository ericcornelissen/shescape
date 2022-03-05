/**
 * @overview Contains property tests for `./src/win.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";
import * as fc from "fast-check";
import * as path from "path/win32";
import sinon from "sinon";

import { binCmd, binPowerShell } from "./common.js";

import * as win from "../src/win.js";

describe("win.js", function () {
  const supportedShells = [binCmd, binPowerShell];

  before(function () {
    fc.configureGlobal({
      numRuns: 10 ** 5,
      interruptAfterTimeLimit: 1900,
      markInterruptAsFailure: false,
    });
  });

  describe("::getDefaultShell", function () {
    it("returns %COMSPEC% if present", function () {
      fc.assert(
        fc.property(fc.object(), fc.string(), function (env, ComSpec) {
          env.ComSpec = ComSpec;

          const result = win.getDefaultShell({ env });
          assert.equal(result, ComSpec);
        })
      );
    });

    it(`returns '${binCmd}' if %COMSPEC% is missing`, function () {
      fc.assert(
        fc.property(fc.object(), function (env) {
          delete env.ComSpec;

          const result = win.getDefaultShell({ env });
          assert.equal(result, binCmd);
        })
      );
    });
  });

  describe("::getEscapeFunction", function () {
    it("returns a string for supported shells", function () {
      fc.assert(
        fc.property(
          fc.constantFrom(...supportedShells),
          fc.string(),
          function (shellName, arg) {
            const escapeFn = win.getEscapeFunction(shellName);
            const result = escapeFn(arg);
            assert.ok(typeof result === "string");
          }
        )
      );
    });

    it("returns `null` for unsupported shells", function () {
      fc.assert(
        fc.property(fc.string(), function (shellName) {
          if (supportedShells.includes(shellName)) {
            return;
          }

          const escapeFn = win.getEscapeFunction(shellName);
          assert.strictEqual(escapeFn, null);
        })
      );
    });
  });

  describe("::getQuoteFunction", function () {
    it("quotes with double quotes for supported shells", function () {
      fc.assert(
        fc.property(
          fc.constantFrom(...supportedShells),
          fc.string(),
          function (shellName, input) {
            const quoteFn = win.getQuoteFunction(shellName);
            const result = quoteFn(input);
            assert.strictEqual(result, `"${input}"`);
          }
        )
      );
    });

    it("returns `null` for unsupported shells", function () {
      fc.assert(
        fc.property(fc.string(), function (shellName) {
          if (supportedShells.includes(shellName)) {
            return;
          }

          const escapeFn = win.getQuoteFunction(shellName);
          assert.strictEqual(escapeFn, null);
        })
      );
    });
  });

  describe("::getShellName", function () {
    let resolveExecutable;

    before(function () {
      resolveExecutable = sinon.stub();
    });

    beforeEach(function () {
      sinon.reset();

      resolveExecutable.returns("foobar");
    });

    it("resolves the provided shell", function () {
      fc.assert(
        fc.property(fc.object(), fc.string(), function (env, shell) {
          win.getShellName({ env, shell }, { resolveExecutable });
          assert.ok(
            resolveExecutable.calledWithExactly(
              { executable: shell },
              sinon.match.any
            )
          );
        })
      );
    });

    it("returns the name of the resolved shell if it is supported", function () {
      fc.assert(
        fc.property(
          fc.object(),
          fc.constantFrom(...supportedShells),
          function (env, shell) {
            resolveExecutable.returns(`C:\\Windows\\System32\\${shell}`);

            const result = win.getShellName(
              { env, shell },
              { resolveExecutable }
            );
            assert.equal(result, shell);
          }
        )
      );
    });

    it(`returns '${binCmd}' if the resolved shell is not supported`, function () {
      fc.assert(
        fc.property(fc.object(), fc.string(), function (env, shell) {
          if (supportedShells.includes(path.basename(shell))) {
            return;
          }

          resolveExecutable.returns(`C:\\Windows\\System32\\${shell}`);

          const result = win.getShellName(
            { env, shell },
            { resolveExecutable }
          );
          assert.equal(result, binCmd);
        })
      );
    });
  });
});
