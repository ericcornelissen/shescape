/**
 * @overview Contains integration tests for valid use of `shescape.quoteAll`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { arbitrary } from "../_.js";

import { quote, quoteAll as quoteAll } from "shescape";

testProp(
  "return values",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    const result = quoteAll(args, options);
    t.deepEqual(
      result,
      args.map((arg) => quote(arg, options)),
    );
  },
);

testProp(
  "return size",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    const result = quoteAll(args, options);
    t.is(result.length, args.length);
  },
);

testProp(
  "extra arguments",
  [
    fc.array(arbitrary.shescapeArg()),
    arbitrary.shescapeArg(),
    arbitrary.shescapeOptions(),
  ],
  (t, args, extraArg, options) => {
    const r1 = quoteAll(args, options);

    const r2 = quoteAll([...args, extraArg], options);
    t.deepEqual(r2, [...r1, quote(extraArg, options)]);

    const r3 = quoteAll([extraArg, ...args], options);
    t.deepEqual(r3, [quote(extraArg, options), ...r1]);
  },
);

testProp(
  "non-array input",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const result = quoteAll(arg, options);
    t.is(result.length, 1);

    const entry = result[0];
    t.is(entry, quote(arg, options));
  },
);
