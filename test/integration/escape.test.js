/**
 * @overview Contains integration tests for `shescape.escape`.
 * @license Unlicense
 */

import test from "ava";

import { macros } from "./_.js";

import { escape as escapeEsm } from "../../index.js";
import { escape as escapeCjs } from "../../index.cjs";

const cases = [
  { escape: escapeCjs, type: "cjs" },
  { escape: escapeEsm, type: "esm" },
];

for (const { escape, type } of cases) {
  test(type, macros.escapeSuccess, { escape });
  test(type, macros.escapeFailure, { escape });

  test(type, macros.prototypePollution, (_, payload) => {
    escape(["a"], payload);
  });
}
