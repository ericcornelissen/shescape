/**
 * @overview Contains integration tests for invalid use of `Shescape#quoteAll`.
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

testProp(
  "invalid argument list",
  [arbitrary.shescapeOptions()],
  (t, options) => {
    let shescape;
    try {
      shescape = new Shescape(options);
    } catch {
      return t.pass();
    }

    for (const { value } of constants.illegalArgumentLists) {
      t.throws(() => shescape.quoteAll(value), { instanceOf: TypeError });
    }
  },
);

testProp(
  "invalid individual argument",
  [arbitrary.shescapeOptions()],
  (t, options) => {
    let shescape;
    try {
      shescape = new Shescape(options);
    } catch {
      return t.pass();
    }

    for (const { value } of constants.illegalArguments) {
      t.throws(() => shescape.quoteAll([value]), { instanceOf: TypeError });
    }
  },
);
