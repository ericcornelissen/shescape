/**
 * @overview Contains property tests for `./src/unix.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";
import * as fc from "fast-check";

import * as unix from "../src/unix.js";

describe("unix.js", function () {
  const unixShells = ["/bin/sh", "/bin/bash"];

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
          fc.constantFrom(...unixShells),
          function (arg, shell) {
            const result = unix.escapeShellArg(arg, shell);
            assert.ok(typeof result === "string", "result not a string");
          }
        )
      );
    });

    it("never returns a string with a null character", function () {
      fc.assert(
        fc.property(
          fc.string(),
          fc.constantFrom(...unixShells),
          function (arg, shell) {
            const result = unix.escapeShellArg(arg, shell);
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
});
