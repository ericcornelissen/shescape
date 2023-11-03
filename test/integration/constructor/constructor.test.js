/**
 * @overview Contains integration tests for the `Shescape` constructor.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";

import * as pollution from "./_pollution.js";
import { arbitrary } from "../_.js";

import { Shescape } from "shescape";

test("shell is unsupported", (t) => {
  const shell = "not-actually-a-shell-that-exists";

  t.throws(() => new Shescape({ shell }), { instanceOf: Error });
});

testProp(
  "affected by prototype pollution",
  [arbitrary.shescapeOptions().map(pollution.wrap)],
  (t, options) => {
    try {
      new Shescape(options);
    } catch (_) {}

    pollution.check(options);
    t.pass();
  },
);
