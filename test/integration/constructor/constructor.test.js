/**
 * @overview Contains integration tests for the `Shescape` constructor.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as ppTestKit from "pp-test-kit/manual";

import { arbitrary } from "./_.js";

import { Shescape } from "shescape";

test("shell does not exist", (t) => {
  const shell = "not-actually-a-shell-that-exists";

  t.throws(() => new Shescape({ shell }), { instanceOf: Error });
});

test("shell is unsupported", (t) => {
  const shell = "node";

  t.throws(() => new Shescape({ shell }), { instanceOf: Error });
});

testProp(
  "affected by prototype pollution",
  [
    arbitrary
      .shescapeOptions()
      .filter((options) => options !== undefined)
      .map(ppTestKit.wrap),
  ],
  (t, options) => {
    try {
      new Shescape(options);
    } catch (_) {}

    ppTestKit.check(options);
    t.pass();
  },
);
