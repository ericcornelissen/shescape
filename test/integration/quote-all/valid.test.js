/**
 * @overview Contains integration tests for valid use of `Shescape#quoteAll`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";
import { Shescape } from "shescape";

import { arbitrary } from "../_.js";

testProp(
  "quote with shell",
  [
    fc.array(arbitrary.shescapeArg()),
    arbitrary.shescapeOptions().filter((options) => options?.shell !== false),
  ],
  (t, args, options) => {
    let shescape;
    try {
      shescape = new Shescape(options);
    } catch {
      return t.pass();
    }

    const result = shescape.quoteAll(args);
    t.deepEqual(
      result,
      args.map((arg) => shescape.quote(arg)),
    );
  },
);

testProp(
  "return size with shell",
  [
    fc.array(arbitrary.shescapeArg()),
    arbitrary.shescapeOptions().filter((options) => options?.shell !== false),
  ],
  (t, args, options) => {
    let shescape;
    try {
      shescape = new Shescape(options);
    } catch {
      return t.pass();
    }

    const result = shescape.quoteAll(args);
    t.is(result.length, args.length);
  },
);

testProp(
  "extra arguments with shell",
  [
    fc.array(arbitrary.shescapeArg()),
    arbitrary.shescapeArg(),
    arbitrary.shescapeOptions().filter((options) => options?.shell !== false),
  ],
  (t, args, extraArg, options) => {
    let shescape;
    try {
      shescape = new Shescape(options);
    } catch {
      return t.pass();
    }

    const r1 = shescape.quoteAll(args);

    const r2 = shescape.quoteAll([...args, extraArg]);
    t.deepEqual(r2, [...r1, shescape.quote(extraArg)]);

    const r3 = shescape.quoteAll([extraArg, ...args]);
    t.deepEqual(r3, [shescape.quote(extraArg), ...r1]);
  },
);

testProp(
  "non-array input with shell",
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

    t.throws(() => shescape.quoteAll(arg), { instanceOf: TypeError });
  },
);
