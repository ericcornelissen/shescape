/**
 * @overview Contains fuzz tests for using Shescape with child_process'
 * `execFile` / `execFileSync`.
 * @license Unlicense
 */

const { execFileSync } = require("node:child_process");

const common = require("./_common.cjs");

const shescape = require("../../index.cjs");

function checkWithoutShell(arg) {
  const preparedArg = common.prepareArg(arg, false);

  const stdout = execFileSync(
    "node",
    shescape.escapeAll(["test/fuzz/echo.js", preparedArg])
  );

  const result = stdout.toString();
  const expected = common.getExpectedOutput(arg);
  if (expected !== result) {
    throw new Error(
      "Unexpected output after escaping (- got, + expected):\n" +
        `- ${result}\n` +
        `+ ${expected}\n` +
        `(in ${arg})`
    );
  }
}

function checkWithShell(arg) {
  const spawnOptions = {
    shell: common.getFuzzShell(),
  };

  const preparedArg = common.prepareArg(arg, true);

  const stdout = execFileSync(
    "node",
    shescape.quoteAll(["test/fuzz/echo.js", preparedArg], spawnOptions),
    spawnOptions
  );

  const result = stdout.toString();
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
