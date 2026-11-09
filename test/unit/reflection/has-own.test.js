/**
 * @overview Contains unit tests for the `hasOwn` function.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { suite, test } from "node:test";

import * as fc from "fast-check";

import { hasOwn } from "../../../src/internal/reflection.js";

suite("hasOwn", () => {
  test("not present", () => {
    fc.assert(
      fc.property(fc.object(), fc.string(), (object, property) => {
        delete object[property];

        const actual = hasOwn(object, property);
        const expected = Object.hasOwn(object, property);
        assert.equal(actual, expected);
      }),
    );
  });

  test("present", () => {
    fc.assert(
      fc.property(
        fc.object(),
        fc.string(),
        fc.string(),
        (object, property, value) => {
          object[property] = value;

          const actual = hasOwn(object, property);
          const expected = Object.hasOwn(object, property);
          assert.equal(actual, expected);
        },
      ),
    );
  });

  test("polluted", () => {
    fc.assert(
      fc.property(
        fc.object(),
        fc.string(),
        fc.string(),
        (object, property, value) => {
          object = Object.assign(Object.create({ [property]: value }), object);

          const actual = hasOwn(object, property);
          const expected = Object.hasOwn(object, property);
          assert.equal(actual, expected);
        },
      ),
    );
  });
});
