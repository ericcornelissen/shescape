/**
 * @overview Contains property tests for `./src/win.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";
import * as fc from "fast-check";

import { binCmd, binPowerShell } from "./common.js";

import * as win from "../src/win.js";

describe("win.js", function () {
  const shells = [binCmd, binPowerShell];

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
            const escapeFn = win.getEscapeFunction(shellName);
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
            const escapeFn = win.getEscapeFunction(shellName);
            const result = escapeFn(arg);
            assert.doesNotMatch(result, /\u{0}/gu);
          }
        )
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

  describe("::getQuoteFunction", function () {
    it("quotes with double quotes for supported shells", function () {
      fc.assert(
        fc.property(
          fc.constantFrom(...shells),
          fc.string(),
          function (shellName, input) {
            const quoteFn = win.getQuoteFunction(shellName);
            const result = quoteFn(input);
            assert.strictEqual(result, `"${input}"`);
          }
        )
      );
    });
  });
});
