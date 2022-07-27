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
  const argInfo = { arg, shell: undefined, quoted: false };
  const spawnOptions = { encoding: "utf8" };

  const preparedArg = common.prepareArg(argInfo, true);

  const child = spawnSync(
    "node",
    shescape.escapeAll([common.ECHO_SCRIPT, preparedArg]),
    spawnOptions
  );

  const result = child.stdout;
  const expected = common.getExpectedOutput(argInfo);
  assert.strictEqual(result, expected);
}

function checkWithShell(arg) {
  const shell = common.getFuzzShell() || true;
  const argInfo = { arg, shell, quoted: true };
  const spawnOptions = { encoding: "utf8", shell };

  const preparedArg = common.prepareArg(argInfo);

  const child = spawnSync(
    "node",
    shescape.quoteAll([common.ECHO_SCRIPT, preparedArg], spawnOptions),
    spawnOptions
  );

  const result = child.stdout;
  const expected = common.getExpectedOutput(argInfo);
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
