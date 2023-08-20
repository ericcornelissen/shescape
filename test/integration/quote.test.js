/**
 * @overview Contains integration tests for `Shescape#quote`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";

import { arbitrary, constants, generate } from "./_.js";

import { Shescape } from "shescape";
import { Shescape as ShescapeCjs } from "../../index.cjs";

for (const shell of generate.platformShells()) {
  if (shell === false) {
    continue;
  }

  test(`input is quoted for ${shell}`, (t) => {
    for (const { expected, input, options } of generate.quoteExamples(shell)) {
      let shescape;
      try {
        shescape = new Shescape(options);
      } catch (_) {
        return t.pass();
      }

      const result = shescape.quote(input);
      t.is(result, expected);
    }
  });
}

testProp(
  "quote without shell",
  [
    arbitrary.shescapeArg(),
    arbitrary.shescapeOptions().filter((options) => options?.shell === false),
  ],
  (t, arg, options) => {
    const shescape = new Shescape(options);
    t.throws(() => shescape.quote(arg), { instanceOf: Error });
  },
);

testProp(
  "quote with shell",
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

    const result = shescape.quote(arg);
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
    t.throws(() => shescape.quote(value), { instanceOf: TypeError });
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
      resultEsm = shescapeEsm.quote(arg);
    } catch (error) {
      errorEsm = error;
    }

    try {
      shescapeCjs = new ShescapeCjs(options);
      resultCjs = shescapeCjs.quote(arg);
    } catch (error) {
      errorCjs = error;
    }

    t.is(resultEsm, resultCjs);
    t.deepEqual(errorEsm, errorCjs);
  },
);
