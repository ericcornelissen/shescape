/**
 * @overview Contains integration tests for `shescape.escapeAll` (ESM).
 * @license Unlicense
 */

import test from "ava";

import { macros } from "./_.js";

import { escapeAll } from "../../../index.js";

test(macros.escapeAll, { escapeAll });
test(macros.escapeAll, { escapeAll, interpolation: true });
test(macros.escapeAll, { escapeAll, interpolation: false });

test(macros.prototypePollution, (_, payload) => {
  escapeAll(["a"], payload);
});
