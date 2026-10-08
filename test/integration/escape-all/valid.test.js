/**
 * @overview Contains integration tests for valid use of `Shescape#escapeAll`.
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
        arbitrary.shescapeOptions(),
        (args, options) => {
          let shescape;
          try {
            shescape = new Shescape(options);
          } catch {
            return;
          }

          const result = shescape.escapeAll(args);
          assert.deepEqual(
            result,
            args.map((arg) => shescape.escape(arg)),
          );
        },
      ),
    );
  });

  test("return length", () => {
    fc.assert(
      fc.property(
        fc.array(arbitrary.shescapeArg()),
        arbitrary.shescapeOptions(),
        (args, options) => {
          let shescape;
          try {
            shescape = new Shescape(options);
          } catch {
            return;
          }

          const result = shescape.escapeAll(args);
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
        arbitrary.shescapeOptions(),
        (args, extraArg, options) => {
          let shescape;
          try {
            shescape = new Shescape(options);
          } catch {
            return;
          }

          const r1 = shescape.escapeAll(args);

          const r2 = shescape.escapeAll([...args, extraArg]);
          assert.deepEqual(r2, [...r1, shescape.escape(extraArg)]);

          const r3 = shescape.escapeAll([extraArg, ...args]);
          assert.deepEqual(r3, [shescape.escape(extraArg), ...r1]);
        },
      ),
    );
  });

  test("non-array input", () => {
    fc.assert(
      fc.property(
        arbitrary.shescapeArg(),
        arbitrary.shescapeOptions(),
        (arg, options) => {
          let shescape;
          try {
            shescape = new Shescape(options);
          } catch {
            return;
          }

          assert.throws(
            () => {
              shescape.escapeAll(arg);
            },
            { name: "TypeError" },
          );
        },
      ),
    );
  });
});
