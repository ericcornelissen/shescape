/**
 * @overview Contains integration tests for invalid use of `Shescape#escape`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";

import { arbitrary, constants } from "../_.js";

import { Shescape } from "shescape";

testProp("invalid arguments", [arbitrary.shescapeOptions()], (t, options) => {
  let shescape;
  try {
    shescape = new Shescape(options);
  } catch {
    return t.pass();
  }

  for (const { value } of constants.illegalArguments) {
    t.throws(() => shescape.escape(value), { instanceOf: TypeError });
  }
});
