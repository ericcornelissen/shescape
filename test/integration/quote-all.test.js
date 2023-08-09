/**
 * @overview Contains integration tests for `Shescape#quoteAll`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import { arbitrary, constants, generate, macros } from "./_.js";

import { Shescape } from "shescape";
import { Shescape as ShescapeCjs } from "../../index.cjs";

test("inputs are quoted", (t) => {
  for (const { expected, input, options } of generate.quoteExamples()) {
    const shescape = new Shescape(options);
    const result = shescape.quoteAll([input]);
    t.deepEqual(result, [expected]);
  }
});

testProp(
  "return values",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    let shescape;
    try {
      shescape = new Shescape(options);
    } catch (_) {
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
  "return size",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    let shescape;
    try {
      shescape = new Shescape(options);
    } catch (_) {
      return t.pass();
    }

    const result = shescape.quoteAll(args);
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
    } catch (_) {
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
  "non-array input",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let shescape;
    try {
      shescape = new Shescape(options);
    } catch (_) {
      return t.pass();
    }

    const result = shescape.quoteAll(arg);
    t.is(result.length, 1);

    const entry = result[0];
    t.is(entry, shescape.quote(arg));
  },
);

test("invalid arguments", (t) => {
  const shescape = new Shescape({ shell: false });
  for (const { value } of constants.illegalArguments) {
    t.throws(() => shescape.quoteAll([value]));
    t.throws(() => shescape.quoteAll(value));
  }
});

test(macros.prototypePollution, (_, payload) => {
  const shescape = new Shescape({ shell: false });
  shescape.quoteAll(["a"], payload);
});

testProp(
  "esm === cjs",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    let shescapeEsm, errorEsm;
    let shescapeCjs, errorCjs;

    try {
      shescapeEsm = new Shescape(options);
    } catch (error) {
      errorEsm = error;
    }

    try {
      shescapeCjs = new ShescapeCjs(options);
    } catch (error) {
      errorCjs = error;
    }

    if (errorEsm || errorCjs) {
      t.deepEqual(errorEsm, errorCjs);
    } else {
      const resultEsm = shescapeEsm.quoteAll(args);
      const resultCjs = shescapeCjs.quoteAll(args);
      t.deepEqual(resultEsm, resultCjs);
    }
  },
);
