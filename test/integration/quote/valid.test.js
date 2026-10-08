/**
 * @overview Contains integration tests for valid use of `Shescape#quote`.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { suite, test } from "node:test";

import * as fc from "fast-check";

import { Shescape } from "shescape";

import { arbitrary } from "../_.js";

suite("valid inputs", () => {
  test("return value", () => {
    fc.assert(
      fc.property(
        arbitrary.shescapeArg(),
        arbitrary
          .shescapeOptions()
          .filter((options) => options?.shell !== false),
        (arg, options) => {
          let shescape;
          try {
            shescape = new Shescape(options);
          } catch {
            return;
          }

          const result = shescape.quote(arg);
          assert.equal(typeof result, "string");
        },
      ),
    );
  });
});
