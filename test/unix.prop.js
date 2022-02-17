/**
 * @overview Contains property tests for `./src/unix.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";
import * as fc from "fast-check";

import { bash, dash, zsh } from "./common.js";

import * as unix from "../src/unix.js";

describe("unix.js", function () {
  const shells = [bash, dash, zsh];

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
          fc.constantFrom(...shells),
          fc.string(),
          function (shellName, arg) {
            const escapeFn = unix.getEscapeFunction(shellName);
            const result = escapeFn(arg);
            assert.ok(typeof result === "string");
          }
        )
      );
    });

    it("never returns a string with a null character", function () {
      fc.assert(
        fc.property(
          fc.constantFrom(...shells),
          fc.string(),
          function (shellName, arg) {
            const escapeFn = unix.getEscapeFunction(shellName);
            const result = escapeFn(arg);
            assert.doesNotMatch(result, /\u{0}/gu);
          }
        )
      );
    });
  });

  describe("::quoteArg", function () {
    it("puts single quotes around the provided value", function () {
      fc.assert(
        fc.property(fc.string(), function (input) {
          const result = unix.quoteArg(input);
          assert.strictEqual(result, `'${input}'`);
        })
      );
    });
  });
});
