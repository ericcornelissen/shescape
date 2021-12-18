/**
 * @overview Contains property tests for `./index.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";
import * as fc from "fast-check";

import * as shescape from "../index.js";

describe("index.js", function () {
  before(function () {
    fc.configureGlobal({
      numRuns: 10 ** 5,
      interruptAfterTimeLimit: 1900,
      markInterruptAsFailure: false,
    });
  });

  describe("::escape", function () {
    it("always returns a string", function () {
      fc.assert(
        fc.property(fc.string(), function (arg) {
          const result = shescape.escape(arg);
          assert.ok(typeof result === "string");
        })
      );
    });
  });

  describe("::escapeAll", function () {
    it("always returns an array of strings", function () {
      fc.assert(
        fc.property(fc.array(fc.string()), function (args) {
          const result = shescape.escapeAll(args);
          for (const entry of result) {
            assert.ok(typeof entry === "string");
          }
        })
      );
    });
  });

  describe("::quote", function () {
    it("always returns a string", function () {
      fc.assert(
        fc.property(fc.string(), function (arg) {
          const result = shescape.quote(arg);
          assert.ok(typeof result === "string");
        })
      );
    });

    it("puts quotes around the argument", function () {
      fc.assert(
        fc.property(fc.string(), function (arg) {
          const result = shescape.quote(arg);
          assert.match(result, /^("|').*("|')$/);
        })
      );
    });
  });

  describe("::quoteAll", function () {
    it("always returns an array of strings", function () {
      fc.assert(
        fc.property(fc.array(fc.string()), function (args) {
          const result = shescape.quoteAll(args);
          for (const entry of result) {
            assert.ok(typeof entry === "string");
          }
        })
      );
    });

    it("puts quotes around each entry", function () {
      fc.assert(
        fc.property(fc.array(fc.string()), function (args) {
          const result = shescape.quoteAll(args);
          for (const entry of result) {
            assert.match(entry, /^("|').*("|')$/);
          }
        })
      );
    });
  });
});
