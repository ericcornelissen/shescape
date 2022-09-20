/**
 * @overview Contains integration tests for `shescape.quoteAll` (CJS).
 * @license Unlicense
 */

const test = require("ava");

const { macros } = require("./_.cjs");

const { quoteAll } = require("../../../index.cjs");

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
