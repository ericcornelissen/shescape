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
  const preparedArg = common.prepareArg({ arg, quoted: true });
  const quotedArg = shescape.quote(preparedArg);

  const stdout = execSync(`node ${common.ECHO_SCRIPT} ${quotedArg}`);

  const result = stdout.toString();
  const expected = common.getExpectedOutput({ arg });
  assert.strictEqual(result, expected);
}

function checkWithShell(arg) {
  const shell = common.getFuzzShell() || true;
  const execOptions = { shell };

  const preparedArg = common.prepareArg({ arg, shell, quoted: true });
  const quotedArg = shescape.quote(preparedArg, execOptions);

  const stdout = execSync(
    `node ${common.ECHO_SCRIPT} ${quotedArg}`,
    execOptions
  );

  const result = stdout.toString();
  const expected = common.getExpectedOutput({ arg, shell });
  assert.strictEqual(result, expected);
}

function checkWithoutShellUsingInterpolation(arg) {
  arg = arg.replace(common.WHITESPACE_REGEX, "");

  const preparedArg = common.prepareArg({ arg, quoted: false });
  const escapedArg = shescape.escape(preparedArg, {
    interpolation: true,
  });

  const stdout = execSync(`node ${common.ECHO_SCRIPT} ${escapedArg}`);

  const result = stdout.toString();
  const expected = common.getExpectedOutput({ arg });
  assert.strictEqual(result, expected);
}

function checkWithShellUsingInterpolation(arg) {
  arg = arg.replace(common.WHITESPACE_REGEX, "");

  const shell = common.getFuzzShell() || true;
  const execOptions = { shell };

  const preparedArg = common.prepareArg({ arg, shell, quoted: false });
  const escapedArg = shescape.escape(preparedArg, {
    ...execOptions,
    interpolation: true,
  });

  const stdout = execSync(
    `node ${common.ECHO_SCRIPT} ${escapedArg}`,
    execOptions
  );

  const result = stdout.toString();
  const expected = common.getExpectedOutput({ arg, shell });
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
