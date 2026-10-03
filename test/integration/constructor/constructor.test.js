/**
 * @overview Contains integration tests for the `Shescape` constructor.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { suite, test } from "node:test";

import * as fc from "fast-check";
import * as ppTestKit from "pp-test-kit/manual";

import { Shescape } from "shescape";

import { arbitrary } from "./_.js";

suite("Shescape#constructor", () => {
  test("shell does not exist", () => {
    const shell = "not-actually-a-shell-that-exists";

    assert.throws(
      () => {
        new Shescape({ shell }); // eslint-disable-line no-new
      },
      { name: "Error" },
    );
  });

  test("shell is unsupported", () => {
    const shell = "node";

    assert.throws(
      () => {
        new Shescape({ shell }); // eslint-disable-line no-new
      },
      { name: "Error" },
    );
  });

  // eslint-disable-next-line test/require-assertion
  test("affected by prototype pollution", () => {
    fc.assert(
      fc.property(
        arbitrary
          .shescapeOptions()
          .filter((options) => options !== undefined)
          .map((options) => ppTestKit.wrap(options)),
        (options) => {
          try {
            // eslint-disable-next-line no-new
            new Shescape(options);
          } catch {
            // Not concerned about functional correctness
          }

          ppTestKit.check(options);
        },
      ),
    );
  });
});
