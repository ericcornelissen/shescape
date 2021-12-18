/**
 * @overview Contains property tests for `./src/win.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";
import * as fc from "fast-check";

import * as win from "../src/win.js";

describe("win.js", function () {
  const winShells = ["cmd.exe", "powershell.exe"];

  before(function () {
    fc.configureGlobal({
      numRuns: 10 ** 5,
      interruptAfterTimeLimit: 1900,
      markInterruptAsFailure: false,
    });
  });

  describe("::escapeShellArg", function () {
    it("always returns a string", function () {
      fc.assert(
        fc.property(
          fc.string(),
          fc.constantFrom(...winShells),
          function (arg, shell) {
            const result = win.escapeShellArg(arg, shell);
            assert.ok(typeof result === "string");
          }
        )
      );
    });

    it("never returns a string with a null character", function () {
      fc.assert(
        fc.property(
          fc.string(),
          fc.constantFrom(...winShells),
          function (arg, shell) {
            const result = win.escapeShellArg(arg, shell);
            assert.doesNotMatch(result, /\u{0}/gu);
          }
        )
      );
    });

    it("throws if the shell is undefined", function () {
      fc.assert(
        fc.property(fc.string(), function (arg) {
          assert.throws(() => unix.escapeShellArg(arg));
        })
      );
    });
  });

  describe("::getDefaultShell", function () {
    it("returns the value of `ComSpec`", function () {
      fc.assert(
        fc.property(fc.object(), fc.string(), function (env, ComSpec) {
          env.ComSpec = ComSpec;

          const result = win.getDefaultShell(env);
          assert.equal(result, ComSpec);
        })
      );
    });
  });
});
