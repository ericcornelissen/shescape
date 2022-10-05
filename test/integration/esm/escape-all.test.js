/**
 * @overview Contains integration tests for `shescape.escapeAll`.
 * @license Unlicense
 */

import test from "ava";

import { macros } from "./_.js";

import { escapeAll as escapeAllEsm } from "../../../index.js";
import { escapeAll as escapeAllCjs } from "../../../index.cjs";

const cases = [
  { escapeAll: escapeAllCjs, type: "cjs" },
  { escapeAll: escapeAllEsm, type: "esm" },
];

for (const { escapeAll, type } of cases) {
  test(type, macros.escapeAllSuccess, { escapeAll });
  test(type, macros.escapeAllNonArray, { escapeAll });
  test(type, macros.escapeAllFailure, { escapeAll });

  test(type, macros.prototypePollution, (_, payload) => {
    escapeAll(["a"], payload);
  });
}
