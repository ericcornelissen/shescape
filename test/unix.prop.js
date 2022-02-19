/**
 * @overview Contains property tests for `./src/unix.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";
import * as fc from "fast-check";

import { binBash, binDash, binZsh } from "./common.js";

import * as unix from "../src/unix.js";

describe("unix.js", function () {
  const shells = [binBash, binDash, binZsh];

  before(function () {
    fc.configureGlobal({
      numRuns: 10 ** 5,
      interruptAfterTimeLimit: 1900,
      markInterruptAsFailure: false,
    });
  });

  describe("::getEscapeFunction", function () {
    it("returns a string for supported shells", function () {
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

  describe("::getQuoteFunction", function () {
    it("quotes with single quotes for supported shells", function () {
      fc.assert(
        fc.property(
          fc.constantFrom(...shells),
          fc.string(),
          function (shellName, input) {
            const quoteFn = unix.getQuoteFunction(shellName);
            const result = quoteFn(input);
            assert.strictEqual(result, `'${input}'`);
          }
        )
      );
    });
  });
});
