/**
 * @overview Contains integration tests for `shescape.quote` (ESM).
 * @license Unlicense
 */

import test from "ava";

import { macros } from "./_.js";

import { quote } from "../../../index.js";

test(macros.quoteSuccess, { quote });
test(macros.quoteFailure, { quote });

test(macros.poisoning, () => {
  quote(["a"]);
});

test(macros.prototypePollution, (_, payload) => {
  quote("a", payload);
});
