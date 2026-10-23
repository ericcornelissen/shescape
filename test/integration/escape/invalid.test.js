/**
 * @overview Contains integration tests for invalid use of `Shescape#escape`.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { suite, test } from "node:test";

import * as fc from "fast-check";

import { Shescape } from "shescape";

import { arbitrary, constants } from "../_.js";

suite("invalid inputs", () => {
  test("argument", () => {
    fc.assert(
      fc.property(arbitrary.shescapeOptions(), (options) => {
        let shescape;
        try {
          shescape = new Shescape(options);
        } catch {
          return;
        }

        for (const { value } of constants.illegalArguments) {
          assert.throws(
            () => {
              shescape.escape(value);
            },
            { name: "TypeError" },
          );
        }
      }),
    );
  });
});
