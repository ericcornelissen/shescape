/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `exec` / `execSync`.
 * @license Unlicense
 */

const assert = require("node:assert");
const { execSync } = require("node:child_process");

const common = require("./_common.cjs");

const shescape = require("../../index.cjs");

function check(arg) {
  const shell = common.getFuzzShell();
  const argInfo = { arg, shell, quoted: true };
  const execOptions = { encoding: "utf8", shell };

  const preparedArg = common.prepareArg(argInfo);
  const quotedArg = shescape.quote(preparedArg, {
    ...execOptions,
  });

  const stdout = execSync(
    `node ${common.ECHO_SCRIPT} ${quotedArg}`,
    execOptions
  );

  const result = stdout;
  const expected = common.getExpectedOutput(argInfo);
  assert.strictEqual(result, expected);
}

function checkUsingInterpolation(arg) {
  const shell = common.getFuzzShell();
  const argInfo = { arg, shell, quoted: false };
  const execOptions = { encoding: "utf8", shell };

  const preparedArg = common.prepareArg(argInfo);
  const escapedArg = shescape.escape(preparedArg, {
    ...execOptions,
    interpolation: true,
  });

  const stdout = execSync(
    `node ${common.ECHO_SCRIPT} ${escapedArg}`,
    execOptions
  );

  const result = stdout;
  const expected = common.getExpectedOutput(argInfo, true);
  assert.strictEqual(result, expected);
}

function fuzz(buf) {
  const arg = buf.toString();

  check(arg);
  checkUsingInterpolation(arg);
}

module.exports = {
  fuzz,
};
