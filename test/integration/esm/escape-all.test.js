/**
 * @overview Contains integration tests for `shescape.escapeAll` (ESM).
 * @license Unlicense
 */

import test from "ava";

import { macros } from "./_.js";

import { escapeAll } from "../../../index.js";

test(macros.escapeAllSuccess, { escapeAll });
test(macros.escapeAllNonArray, { escapeAll });
test(macros.escapeAllFailure, { escapeAll });

test(macros.poisoning, () => {
  escapeAll(["a"]);
});

test(macros.prototypePollution, (_, payload) => {
  escapeAll(["a"], payload);
});
