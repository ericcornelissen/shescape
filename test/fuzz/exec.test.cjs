/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `exec` / `execSync`.
 * @license Unlicense
 */

const assert = require("node:assert");
const { execSync } = require("node:child_process");

const common = require("./_common.cjs");

const shescape = require("../../index.cjs");

function checkWithoutShell(arg) {
  const argInfo = { arg, shell: undefined, quoted: true };

  const preparedArg = common.prepareArg(argInfo);
  const quotedArg = shescape.quote(preparedArg);

  const stdout = execSync(`node ${common.ECHO_SCRIPT} ${quotedArg}`);

  const result = stdout.toString();
  const expected = common.getExpectedOutput(argInfo);
  assert.strictEqual(result, expected);
}

function checkWithShell(arg) {
  const shell = common.getFuzzShell() || true;
  const argInfo = { arg, shell, quoted: true };
  const execOptions = { shell };

  const preparedArg = common.prepareArg(argInfo);
  const quotedArg = shescape.quote(preparedArg, execOptions);

  const stdout = execSync(
    `node ${common.ECHO_SCRIPT} ${quotedArg}`,
    execOptions
  );

  const result = stdout.toString();
  const expected = common.getExpectedOutput(argInfo);
  assert.strictEqual(result, expected);
}

function checkWithoutShellUsingInterpolation(arg) {
  arg = common.trim(arg);

  const argInfo = { arg, shell: undefined, quoted: false };

  const preparedArg = common.prepareArg(argInfo);
  const escapedArg = shescape.escape(preparedArg, {
    interpolation: true,
  });

  const stdout = execSync(`node ${common.ECHO_SCRIPT} ${escapedArg}`);

  const result = stdout.toString();
  const expected = common.getExpectedOutput(argInfo, true);
  assert.strictEqual(result, expected);
}

function checkWithShellUsingInterpolation(arg) {
  arg = common.trim(arg);

  const shell = common.getFuzzShell() || true;
  const argInfo = { arg, shell, quoted: false };
  const execOptions = { shell };

  const preparedArg = common.prepareArg(argInfo);
  const escapedArg = shescape.escape(preparedArg, {
    ...execOptions,
    interpolation: true,
  });

  const stdout = execSync(
    `node ${common.ECHO_SCRIPT} ${escapedArg}`,
    execOptions
  );

  const result = stdout.toString();
  const expected = common.getExpectedOutput(argInfo, true);
  assert.strictEqual(result, expected);
}

function fuzz(buf) {
  const arg = buf.toString();

  checkWithoutShell(arg);
  checkWithShell(arg);
  checkWithoutShellUsingInterpolation(arg);
  checkWithShellUsingInterpolation(arg);
}

module.exports = {
  fuzz,
};
