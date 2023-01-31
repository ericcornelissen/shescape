/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `exec` / `execSync`.
 * @license Unlicense
 */

const assert = require("node:assert");
const { execSync } = require("node:child_process");

const common = require("./_common.cjs");

const shescape = require("../../index.cjs");

function check({ arg, shell }) {
  const argInfo = { arg, shell, quoted: true };
  const execOptions = { encoding: "utf8", shell };

  const preparedArg = common.prepareArg(argInfo);
  const quotedArg = shescape.quote(preparedArg, {
    ...execOptions,
  });

  let stdout;
  try {
    stdout = execSync(`node ${common.ECHO_SCRIPT} ${quotedArg}`, execOptions);
  } catch (error) {
    assert.fail(`an unexpected error occurred: ${error}`);
  }

  const result = stdout;
  const expected = common.getExpectedOutput(argInfo, true);
  assert.strictEqual(result, expected);
}

function checkUsingInterpolation({ arg, shell }) {
  const argInfo = { arg, shell, quoted: false };
  const execOptions = { encoding: "utf8", shell };

  const preparedArg = common.prepareArg(argInfo);
  const escapedArg = shescape.escape(preparedArg, {
    ...execOptions,
    interpolation: true,
  });

  let stdout;
  try {
    stdout = execSync(`node ${common.ECHO_SCRIPT} ${escapedArg}`, execOptions);
  } catch (error) {
    assert.fail(`an unexpected error occurred: ${error}`);
  }

  const result = stdout;
  const expected = common.getExpectedOutput(argInfo, true);
  assert.strictEqual(result, expected);
}

function fuzz(buf) {
  const arg = buf.toString();

  const shell = common.getFuzzShell();

  check({ arg, shell });
  checkUsingInterpolation({ arg, shell });
}

module.exports = {
  fuzz,
};
