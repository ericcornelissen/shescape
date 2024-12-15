/**
 * @overview Contains integration tests for valid use of `Shescape#escapeAll`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { arbitrary } from "../_.js";

import { Shescape } from "shescape";

testProp(
  "return values",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    let shescape;
    try {
      shescape = new Shescape(options);
    } catch {
      return t.pass();
    }

    const result = shescape.escapeAll(args);
    t.deepEqual(
      result,
      args.map((arg) => shescape.escape(arg)),
    );
  },
);

testProp(
  "return size",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    let shescape;
    try {
      shescape = new Shescape(options);
    } catch {
      return t.pass();
    }

    const result = shescape.escapeAll(args);
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
    let shescape;
    try {
      shescape = new Shescape(options);
    } catch {
      return t.pass();
    }

    const r1 = shescape.escapeAll(args);

    const r2 = shescape.escapeAll([...args, extraArg]);
    t.deepEqual(r2, [...r1, shescape.escape(extraArg)]);

    const r3 = shescape.escapeAll([extraArg, ...args]);
    t.deepEqual(r3, [shescape.escape(extraArg), ...r1]);
  },
);

testProp(
  "non-array input",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let shescape;
    try {
      shescape = new Shescape(options);
    } catch {
      return t.pass();
    }

    t.throws(() => shescape.escapeAll(arg), { instanceOf: TypeError });
  },
);
