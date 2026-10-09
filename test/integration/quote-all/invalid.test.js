/**
 * @overview Contains integration tests for invalid use of `Shescape#quoteAll`.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { suite, test } from "node:test";

import * as fc from "fast-check";

import { Shescape } from "shescape";

import { arbitrary, constants } from "../_.js";

suite("invalid inputs", () => {
  test("shell", () => {
    fc.assert(
      fc.property(
        fc.array(arbitrary.shescapeArg(), { minLength: 1 }),
        arbitrary
          .shescapeOptions()
          .filter((options) => options?.shell === false),
        (args, options) => {
          const shescape = new Shescape(options);
          assert.throws(
            () => {
              shescape.quoteAll(args);
            },
            { name: "Error" },
          );
        },
      ),
    );
  });

  test("argument list", () => {
    fc.assert(
      fc.property(arbitrary.shescapeOptions(), (options) => {
        let shescape;
        try {
          shescape = new Shescape(options);
        } catch {
          return;
        }

        for (const { value } of constants.illegalArgumentLists) {
          assert.throws(
            () => {
              shescape.quoteAll(value);
            },
            { name: "TypeError" },
          );
        }
      }),
    );
  });

  test("individual argument", () => {
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
              shescape.quoteAll([value]);
            },
            { name: "TypeError" },
          );
        }
      }),
    );
  });
});
