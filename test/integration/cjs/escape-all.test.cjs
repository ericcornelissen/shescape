/**
 * @overview Contains integration tests for `shescape.escapeAll` (CJS).
 * @license Unlicense
 */

const test = require("ava");

const { macros } = require("./_.cjs");

const { escapeAll } = require("../../../index.cjs");

test(macros.escapeAllSuccess, { escapeAll });
test(macros.escapeAllNonArray, { escapeAll });
test(macros.escapeAllFailure, { escapeAll });

test(macros.poisoning, () => {
  escapeAll(["a"]);
});

test(macros.prototypePollution, (_, payload) => {
  escapeAll(["a"], payload);
});
