/**
 * @overview Contains integration tests for `shescape.escape` (CJS).
 * @license Unlicense
 */

const test = require("ava");

const { macros } = require("./_.cjs");

const { escape } = require("../../../index.cjs");

test(macros.escape, { escape });
test(macros.escape, { escape, interpolation: true });
test(macros.escape, { escape, interpolation: false });

test(macros.prototypePollution, (_, payload) => escape("a", payload));
