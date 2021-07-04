/**
 * @overview Contains property tests for Shescape.
 * Property tests are written using property testing framework "fast-check".
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";
import * as fc from "fast-check";
import os from "os";

import * as shescape from "../index.js";
import { win32 } from "../src/constants.js";

describe("index.js", function () {
  let q; // Variable for system-dependent quote

  before(function () {
    const platform = os.platform();
    switch (platform) {
      case win32:
        q = '"';
      default:
        q = "'";
    }
  });

  before(function () {
    fc.configureGlobal({
      numRuns: 10 ** 6,
      interruptAfterTimeLimit: 9000,
      markInterruptAsFailure: true,
    });
  });

  it("escape", function () {
    fc.assert(
      fc.property(fc.string(), function (arg) {
        const result = shescape.escape(arg);

        assert(result.length >= arg.length);
        if (result.length === arg.length) {
          assert.strictEqual(result, arg);
        }
      })
    );
  });

  it("escapeAll", function () {
    fc.assert(
      fc.property(fc.array(fc.string()), function (args) {
        const results = shescape.escapeAll(args);
        assert.strictEqual(results.length, args.length);

        for (const i in results) {
          const arg = args[i];
          const result = results[i];

          assert(result.length >= arg.length);
          if (result.length === arg.length) {
            assert.strictEqual(result, arg);
          }
        }
      })
    );
  });

  it("quote", function () {
    fc.assert(
      fc.property(fc.string(), function (arg) {
        const result = shescape.quote(arg);

        const argLengthPlusQuotes = arg.length + 2;
        assert(result.length >= argLengthPlusQuotes);

        if (result.length === argLengthPlusQuotes) {
          assert.strictEqual(result, `${q}${arg}${q}`);
        }
      })
    );
  });

  it("quoteAll", function () {
    fc.assert(
      fc.property(fc.array(fc.string()), function (args) {
        const results = shescape.quoteAll(args);
        assert.strictEqual(results.length, args.length);

        for (const i in results) {
          const arg = args[i];
          const result = results[i];

          const argLengthPlusQuotes = arg.length + 2;
          assert(result.length >= argLengthPlusQuotes);

          if (result.length === argLengthPlusQuotes) {
            assert.strictEqual(result, `${q}${arg}${q}`);
          }
        }
      })
    );
  });
});
