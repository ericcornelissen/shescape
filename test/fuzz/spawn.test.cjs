/**
 * @overview Contains fuzz tests for using Shescape with child_process' `spawn`
 * / `spawnSync`.
 * @license Unlicense
 */

const assert = require("node:assert");
const { spawnSync } = require("node:child_process");

const common = require("./_common.cjs");

const shescape = require("../../index.cjs");

function checkWithoutShell(arg) {
  const preparedArg = common.prepareArg(arg, false);

  const child = spawnSync(
    "node",
    shescape.escapeAll(["test/fuzz/echo.js", preparedArg])
  );

  const result = child.stdout.toString();
  const expected = common.getExpectedOutput(arg);
  assert.strictEqual(result, expected);
}

function checkWithShell(arg) {
  const spawnOptions = {
    shell: common.getFuzzShell() || true,
  };

  const preparedArg = common.prepareArg(arg, true);

  const child = spawnSync(
    "node",
    shescape.quoteAll(["test/fuzz/echo.js", preparedArg], spawnOptions),
    spawnOptions
  );

  const result = child.stdout.toString();
  const expected = common.getExpectedOutput(arg);
  assert.strictEqual(result, expected);
}

function fuzz(buf) {
  const arg = buf.toString();

  // Skipped because of a bug with spawn/spawnSync in shescape, see:
  // - https://github.com/ericcornelissen/shescape/issues/286
  //checkWithoutShell(arg);

  checkWithShell(arg);
}

module.exports = {
  fuzz,
};
