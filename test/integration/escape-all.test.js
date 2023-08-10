/**
 * @overview Contains integration tests for `Shescape#escapeAll`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import { arbitrary, constants, generate, macros } from "./_.js";

import { Shescape } from "shescape";
import { Shescape as ShescapeCjs } from "../../index.cjs";

test("inputs are escaped", (t) => {
  for (const { expected, input, options } of generate.escapeExamples()) {
    const shescape = new Shescape(options);
    const result = shescape.escapeAll([input]);
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
    } catch (_) {
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
    } catch (_) {
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
    } catch (_) {
      return t.pass();
    }

    const result = shescape.escapeAll(arg);
    t.is(result.length, 1);

    const entry = result[0];
    t.is(entry, shescape.escape(arg));
  },
);

testProp("invalid arguments", [arbitrary.shescapeOptions()], (t, options) => {
  let shescape;
  try {
    shescape = new Shescape(options);
  } catch (_) {
    return t.pass();
  }

  for (const { value } of constants.illegalArguments) {
    t.throws(() => shescape.escapeAll([value]));
    t.throws(() => shescape.escapeAll(value));
  }
});

test(macros.prototypePollution, (_, payload) => {
  const shescape = new Shescape({ shell: false });
  shescape.escapeAll(["a"], payload);
});

testProp(
  "esm === cjs",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    let shescapeEsm, resultEsm, errorEsm;
    let shescapeCjs, resultCjs, errorCjs;

    try {
      shescapeEsm = new Shescape(options);
      resultEsm = shescapeEsm.escapeAll(args);
    } catch (error) {
      errorEsm = error;
    }

    try {
      shescapeCjs = new ShescapeCjs(options);
      resultCjs = shescapeCjs.escapeAll(args);
    } catch (error) {
      errorCjs = error;
    }

    t.deepEqual(resultEsm, resultCjs);
    t.deepEqual(errorEsm, errorCjs);
  },
);
