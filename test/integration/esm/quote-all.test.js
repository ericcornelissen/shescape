/**
 * @overview Contains integration tests for `shescape.quoteAll` (ESM).
 * @license Unlicense
 */

import test from "ava";

import { macros } from "./_.js";

import { quoteAll } from "../../../index.js";

test(macros.quoteAllSuccess, { quoteAll });
test(macros.quoteAllNonArray, { quoteAll });
test(macros.quoteAllFailure, { quoteAll });

test(
  macros.poisoning,
  () => {
    quoteAll(["a"]);
  },
  { ignore: ["process.getgid", "process.getuid"] }
);

test(macros.prototypePollution, (_, payload) => {
  quoteAll(["a"], payload);
});
