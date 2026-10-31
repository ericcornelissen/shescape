/**
 * @overview Contains integration tests for valid use of `Shescape#quoteAll`.
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
        fc.array(arbitrary.shescapeArg()),
        arbitrary
          .shescapeOptions()
          .filter((options) => options?.shell !== false),
        (args, options) => {
          let shescape;
          try {
            shescape = new Shescape(options);
          } catch {
            return;
          }

          const result = shescape.quoteAll(args);
          assert.deepEqual(
            result,
            args.map((arg) => shescape.quote(arg)),
          );
        },
      ),
    );
  });

  test("return length", () => {
    fc.assert(
      fc.property(
        fc.array(arbitrary.shescapeArg()),
        arbitrary
          .shescapeOptions()
          .filter((options) => options?.shell !== false),
        (args, options) => {
          let shescape;
          try {
            shescape = new Shescape(options);
          } catch {
            return;
          }

          const result = shescape.quoteAll(args);
          assert.equal(result.length, args.length);
        },
      ),
    );
  });

  test("extra arguments", () => {
    fc.assert(
      fc.property(
        fc.array(arbitrary.shescapeArg()),
        arbitrary.shescapeArg(),
        arbitrary
          .shescapeOptions()
          .filter((options) => options?.shell !== false),
        (args, extraArg, options) => {
          let shescape;
          try {
            shescape = new Shescape(options);
          } catch {
            return;
          }

          const r1 = shescape.quoteAll(args);

          const r2 = shescape.quoteAll([...args, extraArg]);
          assert.deepEqual(r2, [...r1, shescape.quote(extraArg)]);

          const r3 = shescape.quoteAll([extraArg, ...args]);
          assert.deepEqual(r3, [shescape.quote(extraArg), ...r1]);
        },
      ),
    );
  });

  test("non-array input", () => {
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

          assert.throws(
            () => {
              shescape.quoteAll(arg);
            },
            { name: "TypeError" },
          );
        },
      ),
    );
  });
});
