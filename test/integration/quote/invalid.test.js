/**
 * @overview Contains integration tests for invalid use of `Shescape#quote`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import { Shescape } from "shescape";

import { arbitrary, constants } from "../_.js";

testProp(
  "without shell",
  [
    arbitrary.shescapeArg(),
    arbitrary.shescapeOptions().filter((options) => options?.shell === false),
  ],
  (t, arg, options) => {
    const shescape = new Shescape(options);
    t.throws(() => shescape.quote(arg), { instanceOf: Error });
  },
);

testProp("invalid arguments", [arbitrary.shescapeOptions()], (t, options) => {
  let shescape;
  try {
    shescape = new Shescape(options);
  } catch {
    return t.pass();
  }

  for (const { value } of constants.illegalArguments) {
    t.throws(() => shescape.quote(value), { instanceOf: TypeError });
  }
});
