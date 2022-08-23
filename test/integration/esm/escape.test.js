/**
 * @overview Contains integration tests for `shescape.escape` (ESM).
 * @license Unlicense
 */

import test from "ava";

import { macros } from "./_.js";

import { escape } from "../../../index.js";

test(macros.escapeSuccess, { escape });
test(macros.escapeFailure, { escape });

test(macros.prototypePollution, (_, payload) => {
  escape("a", payload);
});
