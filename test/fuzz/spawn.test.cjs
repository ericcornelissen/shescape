/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `spawn` / `spawnSync`.
 * @license Unlicense
 */

const assert = require("node:assert");
const { spawnSync } = require("node:child_process");

const common = require("./_common.cjs");

const shescape = require("../../index.cjs");

function checkWithoutShell(arg) {
  const preparedArg = common.prepareArg(arg, false, true);

  const child = spawnSync(
    "node",
    shescape.escapeAll([common.ECHO_SCRIPT, preparedArg])
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
    shescape.quoteAll([common.ECHO_SCRIPT, preparedArg], spawnOptions),
    spawnOptions
  );

  const result = child.stdout.toString();
  const expected = common.getExpectedOutput(arg);
  assert.strictEqual(result, expected);
}

function fuzz(buf) {
  const arg = buf.toString();

  checkWithoutShell(arg);
  checkWithShell(arg);
}

module.exports = {
  fuzz,
};
