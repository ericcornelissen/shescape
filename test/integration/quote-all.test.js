/**
 * @overview Contains integration tests for `shescape.quoteAll`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import { arbitrary, constants, generate, macros } from "./_.js";

import { quote, quoteAll as quoteAll } from "../../index.js";
import { quoteAll as quoteAllCjs } from "../../index.cjs";

test("inputs are quoted", (t) => {
  for (const { expected, input, options } of generate.quoteExamples()) {
    const result = quoteAll([input], options);
    t.deepEqual(result, [expected]);
  }
});

testProp(
  "return values",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    const result = quoteAll(args, options);
    t.deepEqual(
      result,
      args.map((arg) => quote(arg, options))
    );
  }
);

testProp(
  "return size",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    const result = quoteAll(args, options);
    t.is(result.length, args.length);
  }
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
  }
);

testProp(
  "non-array input",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const result = quoteAll(arg, options);
    t.is(result.length, 1);

    const entry = result[0];
    t.is(entry, quote(arg, options));
  }
);

test("invalid arguments", (t) => {
  for (const { value } of constants.illegalArguments) {
    t.throws(() => quoteAll([value]));
    t.throws(() => quoteAll(value));
  }
});

test(macros.prototypePollution, (_, payload) => {
  quoteAll(["a"], payload);
});

testProp(
  "esm === cjs",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    const resultEsm = quoteAll(args, options);
    const resultCjs = quoteAllCjs(args, options);
    t.deepEqual(resultEsm, resultCjs);
  }
);
