/**
 * @overview Contains integration tests for the stateless version of Shescape.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { suite, test } from "node:test";

import * as fc from "fast-check";

import { Shescape } from "shescape";
import * as shescape from "shescape/stateless";

import { arbitrary } from "../_.js";

suite("stateless", () => {
  test("shescape.escape", () => {
    fc.assert(
      fc.property(
        arbitrary.shescapeArg(),
        arbitrary.shescapeOptions(),
        (arg, options) => {
          let actual, actualError;
          let expected, expectedError;

          try {
            actual = shescape.escape(arg, options);
          } catch (error) {
            actualError = error;
          }

          try {
            const shescape = new Shescape(options);
            expected = shescape.escape(arg);
          } catch (error) {
            expectedError = error;
          }

          assert.equal(actual, expected);
          assert.deepEqual(actualError, expectedError);
        },
      ),
    );
  });

  test("shescape.escapeAll", () => {
    fc.assert(
      fc.property(
        fc.array(arbitrary.shescapeArg()),
        arbitrary.shescapeOptions(),
        (args, options) => {
          let actual, actualError;
          let expected, expectedError;

          try {
            actual = shescape.escapeAll(args, options);
          } catch (error) {
            actualError = error;
          }

          try {
            const shescape = new Shescape(options);
            expected = shescape.escapeAll(args);
          } catch (error) {
            expectedError = error;
          }

          assert.deepEqual(actual, expected);
          assert.deepEqual(actualError, expectedError);
        },
      ),
    );
  });

  test("shescape.quote", () => {
    fc.assert(
      fc.property(
        arbitrary.shescapeArg(),
        arbitrary.shescapeOptions(),
        (arg, options) => {
          let actual, actualError;
          let expected, expectedError;

          try {
            actual = shescape.quote(arg, options);
          } catch (error) {
            actualError = error;
          }

          try {
            const shescape = new Shescape(options);
            expected = shescape.quote(arg);
          } catch (error) {
            expectedError = error;
          }

          assert.equal(actual, expected);
          assert.deepEqual(actualError, expectedError);
        },
      ),
    );
  });

  test("shescape.quoteAll", () => {
    fc.assert(
      fc.property(
        fc.array(arbitrary.shescapeArg()),
        arbitrary.shescapeOptions(),
        (args, options) => {
          let actual, actualError;
          let expected, expectedError;

          try {
            actual = shescape.quoteAll(args, options);
          } catch (error) {
            actualError = error;
          }

          try {
            const shescape = new Shescape(options);
            expected = shescape.quoteAll(args);
          } catch (error) {
            expectedError = error;
          }

          assert.deepEqual(actual, expected);
          assert.deepEqual(actualError, expectedError);
        },
      ),
    );
  });
});
