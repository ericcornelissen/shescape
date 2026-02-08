/**
 * @overview Contains integration tests for invalid use of `Shescape#escapeAll`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import { Shescape } from "shescape";

import { arbitrary, constants } from "../_.js";

testProp(
  "invalid argument list",
  [arbitrary.shescapeOptions()],
  (t, options) => {
    let shescape;
    try {
      shescape = new Shescape(options);
    } catch {
      return t.pass();
    }

    for (const { value } of constants.illegalArgumentLists) {
      t.throws(() => shescape.escapeAll(value), { instanceOf: TypeError });
    }
  },
);

testProp(
  "invalid individual argument",
  [arbitrary.shescapeOptions()],
  (t, options) => {
    let shescape;
    try {
      shescape = new Shescape(options);
    } catch {
      return t.pass();
    }

    for (const { value } of constants.illegalArguments) {
      t.throws(() => shescape.escapeAll([value]), { instanceOf: TypeError });
    }
  },
);
