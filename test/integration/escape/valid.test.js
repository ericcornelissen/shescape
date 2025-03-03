/**
 * @overview Contains integration tests for valid use of `Shescape#escape`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import { Shescape } from "shescape";

import { arbitrary } from "../_.js";

testProp(
  "return values",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let shescape;
    try {
      shescape = new Shescape(options);
    } catch {
      return t.pass();
    }

    const result = shescape.escape(arg);
    t.is(typeof result, "string");
  },
);
