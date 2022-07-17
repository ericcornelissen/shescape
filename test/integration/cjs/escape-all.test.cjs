/**
 * @overview Contains integration tests for `shescape.escapeAll` (CJS).
 * @license Unlicense
 */

const test = require("ava");

const { macros } = require("./_.cjs");

const { escapeAll } = require("../../../index.cjs");

test(macros.escapeAll, { escapeAll });
test(macros.escapeAll, { escapeAll, interpolation: true });
test(macros.escapeAll, { escapeAll, interpolation: false });

test(macros.prototypePollution, (_, payload) => escapeAll(["a"], payload));
