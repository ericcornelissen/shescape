/**
 * @overview Contains fuzz tests for using Shescape with child_process' `spawn`
 * / `spawnSync`.
 * @license Unlicense
 */

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
  if (expected !== result) {
    throw new Error(
      "Unexpected output after escaping (- got, + expected):\n" +
        `- ${result}\n` +
        `+ ${expected}\n`
    );
  }
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
  if (expected !== result) {
    throw new Error(
      "Unexpected output after escaping (- got, + expected):\n" +
        `- ${result}\n` +
        `+ ${expected}`
    );
  }
}

function fuzz(buf) {
  const arg = buf.toString();

  checkWithoutShell(arg);
  checkWithShell(arg);
}

module.exports = {
  fuzz,
};
