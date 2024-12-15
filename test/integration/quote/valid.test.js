/**
 * @overview Contains integration tests for valid use of `Shescape#quote`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";

import { arbitrary } from "../_.js";

import { Shescape } from "shescape";

testProp(
  "with shell",
  [
    arbitrary.shescapeArg(),
    arbitrary.shescapeOptions().filter((options) => options?.shell !== false),
  ],
  (t, arg, options) => {
    let shescape;
    try {
      shescape = new Shescape(options);
    } catch {
      return t.pass();
    }

    const result = shescape.quote(arg);
    t.is(typeof result, "string");
  },
);
