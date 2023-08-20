/**
 * @overview Contains integration tests for valid use of `shescape.quote`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";

import { arbitrary } from "../_.js";

import { quote } from "shescape";

testProp(
  "return value",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const result = quote(arg, options);
    t.is(typeof result, "string");
  },
);
