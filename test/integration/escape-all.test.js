/**
 * @overview Contains integration tests for `shescape.escapeAll`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import { arbitrary, constants, generate, macros } from "./_.js";

import { escape, escapeAll } from "shescape";
import { escapeAll as escapeAllCjs } from "../../index.cjs";

for (const shell of generate.platformShells()) {
  test(`inputs are escaped for ${shell}`, (t) => {
    for (const { expected, input, options } of generate.escapeExamples(shell)) {
      const result = escapeAll([input], options);
      t.deepEqual(result, [expected]);
    }
  });
}

testProp(
  "return values",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    const result = escapeAll(args, options);
    t.deepEqual(
      result,
      args.map((arg) => escape(arg, options)),
    );
  },
);

testProp(
  "return size",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    const result = escapeAll(args, options);
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
    const r1 = escapeAll(args, options);

    const r2 = escapeAll([...args, extraArg], options);
    t.deepEqual(r2, [...r1, escape(extraArg, options)]);

    const r3 = escapeAll([extraArg, ...args], options);
    t.deepEqual(r3, [escape(extraArg, options), ...r1]);
  },
);

testProp(
  "non-array input",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const result = escapeAll(arg, options);
    t.is(result.length, 1);

    const entry = result[0];
    t.is(entry, escape(arg, options));
  },
);

testProp("invalid arguments", [arbitrary.shescapeOptions()], (t, options) => {
  for (const { value } of constants.illegalArguments) {
    t.throws(() => escapeAll([value], options), { instanceOf: TypeError });
    t.throws(() => escapeAll(value, options), { instanceOf: TypeError });
  }
});

test(macros.prototypePollution, (_, payload) => {
  escapeAll(["a"], payload);
});

testProp(
  "esm === cjs",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    const resultEsm = escapeAll(args, options);
    const resultCjs = escapeAllCjs(args, options);
    t.deepEqual(resultEsm, resultCjs);
  },
);
