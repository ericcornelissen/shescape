/**
 * @overview Contains integration tests for `Shescape#quoteAll`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";

import { arbitrary, constants, generate } from "./_.js";

import { Shescape } from "shescape";
import { Shescape as ShescapeCjs } from "../../index.cjs";

for (const shell of generate.platformShells()) {
  if (shell === false) {
    continue;
  }

  test(`inputs are quoted for ${shell}`, (t) => {
    for (const { expected, input, options } of generate.quoteExamples(shell)) {
      const shescape = new Shescape(options);
      const result = shescape.quoteAll([input]);
      t.deepEqual(result, [expected]);
    }
  });
}

testProp(
  "return values without shell",
  [
    fc.oneof(
      arbitrary.shescapeArg(),
      fc.array(arbitrary.shescapeArg(), { minLength: 1 }),
    ),
    arbitrary.shescapeOptions().filter((options) => options?.shell === false),
  ],
  (t, args, options) => {
    const shescape = new Shescape(options);
    t.throws(() => shescape.quoteAll(args));
  },
);

testProp(
  "return values with shell",
  [
    fc.array(arbitrary.shescapeArg()),
    arbitrary.shescapeOptions().filter((options) => options?.shell !== false),
  ],
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
  "return size with shell",
  [
    fc.array(arbitrary.shescapeArg()),
    arbitrary.shescapeOptions().filter((options) => options?.shell !== false),
  ],
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
  "non-array input with shell",
  [
    arbitrary.shescapeArg(),
    arbitrary.shescapeOptions().filter((options) => options?.shell !== false),
  ],
  (t, arg, options) => {
    let shescape;
    try {
      shescape = new Shescape(options);
    } catch (_) {
      return t.pass();
    }

    t.throws(() => shescape.quoteAll(arg));
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
    t.throws(() => shescape.quoteAll([value]));
    t.throws(() => shescape.quoteAll(value));
  }
});

testProp(
  "esm === cjs",
  [fc.array(arbitrary.shescapeArg()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    let shescapeEsm, resultEsm, errorEsm;
    let shescapeCjs, resultCjs, errorCjs;

    try {
      shescapeEsm = new Shescape(options);
      resultEsm = shescapeEsm.quoteAll(args);
    } catch (error) {
      errorEsm = error;
    }

    try {
      shescapeCjs = new ShescapeCjs(options);
      resultCjs = shescapeCjs.quoteAll(args);
    } catch (error) {
      errorCjs = error;
    }

    t.deepEqual(resultEsm, resultCjs);
    t.deepEqual(errorEsm, errorCjs);
  },
);
