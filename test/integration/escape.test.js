/**
 * @overview Contains integration tests for `shescape.escape`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";

import { arbitrary, constants, generate, macros } from "./_.js";

import { escape as escape } from "shescape";
import { escape as escapeCjs } from "../../index.cjs";

for (const shell of generate.platformShells()) {
  test(`input is escaped for ${shell}`, (t) => {
    for (const { expected, input, options } of generate.escapeExamples(shell)) {
      const result = escape(input, options);
      t.is(result, expected);
    }
  });
}

testProp(
  "return values",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const result = escape(arg, options);
    t.is(typeof result, "string");
  },
);

testProp("invalid arguments", [arbitrary.shescapeOptions()], (t, options) => {
  for (const { value } of constants.illegalArguments) {
    t.throws(() => escape(value, options), { instanceOf: TypeError });
  }
});

test(macros.prototypePollution, (_, payload) => {
  escape("a", payload);
});

testProp(
  "esm === cjs",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const resultEsm = escape(arg, options);
    const resultCjs = escapeCjs(arg, options);
    t.is(resultEsm, resultCjs);
  },
);
