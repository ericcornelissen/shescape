/**
 * @overview Contains integration tests for `shescape.quoteAll`.
 * @license Unlicense
 */

import test from "ava";

import { macros } from "./_.js";

import { quoteAll as quoteAllEsm } from "../../index.js";
import { quoteAll as quoteAllCjs } from "../../index.cjs";

const cases = [
  { quoteAll: quoteAllCjs, type: "cjs" },
  { quoteAll: quoteAllEsm, type: "esm" },
];

for (const { quoteAll, type } of cases) {
  test(type, macros.quoteAllSuccess, { quoteAll });
  test(type, macros.quoteAllNonArray, { quoteAll });
  test(type, macros.quoteAllFailure, { quoteAll });

  test(type, macros.prototypePollution, (_, payload) => {
    quoteAll(["a"], payload);
  });
}
