/**
 * @overview Contains integration tests for invalid use of `Shescape#quote`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";
import { Shescape } from "shescape";

import { arbitrary, constants } from "../_.js";

testProp(
  "quote without shell",
  [
    fc.oneof(
      arbitrary.shescapeArg(),
      fc.array(arbitrary.shescapeArg(), { minLength: 1 }),
    ),
    arbitrary.shescapeOptions().filter((options) => options?.shell === false),
  ],
  (t, args, options) => {
    const shescape = new Shescape(options);
    t.throws(() => shescape.quoteAll(args), { instanceOf: Error });
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
    t.throws(() => shescape.quoteAll([value]), { instanceOf: TypeError });
  }
});
