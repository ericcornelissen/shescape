/**
 * @overview Contains integration tests for `Shescape#escape`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";

import { arbitrary, constants, generate } from "./_.js";

import { Shescape } from "shescape";
import { Shescape as ShescapeCjs } from "../../index.cjs";

for (const shell of generate.platformShells()) {
  test(`input is escaped for ${shell}`, (t) => {
    for (const { expected, input, options } of generate.escapeExamples(shell)) {
      let shescape;
      try {
        shescape = new Shescape(options);
      } catch (_) {
        return t.pass();
      }

      const result = shescape.escape(input);
      t.is(result, expected);
    }
  });
}

testProp(
  "return values",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let shescape;
    try {
      shescape = new Shescape(options);
    } catch (_) {
      return t.pass();
    }

    const result = shescape.escape(arg);
    t.is(typeof result, "string");
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
    t.throws(() => shescape.escape(value));
  }
});

testProp(
  "esm === cjs",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    let shescapeEsm, resultEsm, errorEsm;
    let shescapeCjs, resultCjs, errorCjs;

    try {
      shescapeEsm = new Shescape(options);
      resultEsm = shescapeEsm.escape(arg);
    } catch (error) {
      errorEsm = error;
    }

    try {
      shescapeCjs = new ShescapeCjs(options);
      resultCjs = shescapeCjs.escape(arg);
    } catch (error) {
      errorCjs = error;
    }

    t.is(resultEsm, resultCjs);
    t.deepEqual(errorEsm, errorCjs);
  },
);
