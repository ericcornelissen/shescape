/**
 * @overview Contains property tests for `./index.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "node:assert";

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
        fc.property(
          fc.string(),
          fc.option(fc.object(), { nil: undefined }),
          function (arg, options) {
            const result = shescape.escape(arg, options);
            assert.ok(typeof result === "string");
          }
        )
      );
    });
  });

  describe("::escapeAll", function () {
    it("always returns an array of strings", function () {
      fc.assert(
        fc.property(
          fc.array(fc.string()),
          fc.option(fc.object(), { nil: undefined }),
          function (args, options) {
            const result = shescape.escapeAll(args, options);
            for (const entry of result) {
              assert.ok(typeof entry === "string");
            }
          }
        )
      );
    });

    it("maintains the length of the input array", function () {
      fc.assert(
        fc.property(
          fc.array(fc.string()),
          fc.option(fc.object(), { nil: undefined }),
          function (args, options) {
            const result = shescape.escapeAll(args, options);
            assert.equal(result.length, args.length);
          }
        )
      );
    });
  });

  describe("::quote", function () {
    it("always returns a string", function () {
      fc.assert(
        fc.property(
          fc.string(),
          fc.option(fc.object(), { nil: undefined }),
          function (arg, options) {
            const result = shescape.quote(arg, options);
            assert.ok(typeof result === "string");
          }
        )
      );
    });

    it("puts quotes around the argument", function () {
      fc.assert(
        fc.property(
          fc.string(),
          fc.option(fc.object(), { nil: undefined }),
          function (arg, options) {
            const result = shescape.quote(arg, options);
            assert.match(result, /^(?<q>"|').*(\k<q>)$/);
          }
        )
      );
    });
  });

  describe("::quoteAll", function () {
    it("always returns an array of strings", function () {
      fc.assert(
        fc.property(
          fc.array(fc.string()),
          fc.option(fc.object(), { nil: undefined }),
          function (args, options) {
            const result = shescape.quoteAll(args, options);
            for (const entry of result) {
              assert.ok(typeof entry === "string");
            }
          }
        )
      );
    });

    it("maintains the length of the input array", function () {
      fc.assert(
        fc.property(
          fc.array(fc.string()),
          fc.option(fc.object(), { nil: undefined }),
          function (args, options) {
            const result = shescape.quoteAll(args, options);
            assert.equal(result.length, args.length);
          }
        )
      );
    });

    it("puts quotes around each entry", function () {
      fc.assert(
        fc.property(
          fc.array(fc.string()),
          fc.option(fc.object(), { nil: undefined }),
          function (args, options) {
            const result = shescape.quoteAll(args, options);
            for (const entry of result) {
              assert.match(entry, /^(?<q>"|').*(\k<q>)$/);
            }
          }
        )
      );
    });
  });
});
