/**
 * @overview Contains integration tests for `shescape.escape` (CJS).
 * @license Unlicense
 */

const test = require("ava");

const { macros } = require("./_.cjs");

const { escape } = require("../../../index.cjs");

test(macros.escapeSuccess, { escape });
test(macros.escapeFailure, { escape });

test(macros.poisoning, () => {
  escape(["a"]);
});

test(macros.prototypePollution, (_, payload) => {
  escape("a", payload);
});
