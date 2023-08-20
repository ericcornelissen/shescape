/**
 * @overview Contains integration tests for valid use of `shescape.escape`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";

import { arbitrary } from "../_.js";

import { escape as escape } from "shescape";

testProp(
  "return values",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const result = escape(arg, options);
    t.is(typeof result, "string");
  },
);
