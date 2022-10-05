/**
 * @overview Contains integration tests for `shescape.quote`.
 * @license Unlicense
 */

import test from "ava";

import { macros } from "./_.js";

import { quote as quoteEsm } from "../../index.js";
import { quote as quoteCjs } from "../../index.cjs";

const cases = [
  { quote: quoteCjs, type: "cjs" },
  { quote: quoteEsm, type: "esm" },
];

for (const { quote, type } of cases) {
  test(type, macros.quoteSuccess, { quote });
  test(type, macros.quoteFailure, { quote });

  test(type, macros.prototypePollution, (_, payload) => {
    quote(["a"], payload);
  });
}
