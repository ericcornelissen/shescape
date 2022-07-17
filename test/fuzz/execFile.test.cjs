/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `execFile` / `execFileSync`.
 * @license Unlicense
 */

const assert = require("node:assert");
const { execFileSync } = require("node:child_process");

const common = require("./_common.cjs");

const shescape = require("../../index.cjs");

function checkWithoutShell(arg) {
  const argInfo = { arg, shell: undefined, quoted: false };
  const execFileOptions = { encoding: "utf8" };

  const preparedArg = common.prepareArg(argInfo, true);

  const stdout = execFileSync(
    "node",
    shescape.escapeAll([common.ECHO_SCRIPT, preparedArg]),
    execFileOptions
  );

  const result = stdout;
  const expected = common.getExpectedOutput(argInfo);
  assert.strictEqual(result, expected);
}

function checkWithShell(arg) {
  const shell = common.getFuzzShell() || true;
  const argInfo = { arg, shell, quoted: true };
  const execFileOptions = { encoding: "utf8", shell };

  const preparedArg = common.prepareArg(argInfo, true);

  const stdout = execFileSync(
    "node",
    shescape.quoteAll([common.ECHO_SCRIPT, preparedArg], execFileOptions),
    execFileOptions
  );

  const result = stdout;
  const expected = common.getExpectedOutput(argInfo);
  assert.strictEqual(result, expected);
}

function fuzz(buf) {
  const arg = buf.toString();

  checkWithoutShell(arg);

  // Skipped because of a bug with `execFileSync` in child_process, see:
  // - https://github.com/nodejs/node/issues/29466#issuecomment-1146839772
  // - https://github.com/nodejs/node/issues/43333
  // - https://github.com/nodejs/node/pull/43345
  //checkWithShell(arg);
}

module.exports = {
  fuzz,
};
