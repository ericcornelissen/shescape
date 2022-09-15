/**
 * @overview Contains integration tests for `shescape.quote` (CJS).
 * @license Unlicense
 */

const test = require("ava");

const { macros } = require("./_.cjs");

const { quote } = require("../../../index.cjs");

test(macros.quoteSuccess, { quote });
test(macros.quoteFailure, { quote });

test(macros.poisoning, () => {
  quote(["a"]);
});

test(macros.prototypePollution, (_, payload) => {
  quote("a", payload);
});
