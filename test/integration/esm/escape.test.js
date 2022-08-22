/**
 * @overview Contains integration tests for `shescape.escape` (ESM).
 * @license Unlicense
 */

import test from "ava";

import { macros } from "./_.js";

import { escape } from "../../../index.js";

test(macros.escape, { escape });
test(macros.escape, { escape, interpolation: true });
test(macros.escape, { escape, interpolation: false });

test(macros.prototypePollution, (_, payload) => {
  escape("a", payload);
});
