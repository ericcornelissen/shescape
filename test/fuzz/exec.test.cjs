/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `exec` / `execSync`.
 * @license Unlicense
 */

const assert = require("node:assert");
const { execSync } = require("node:child_process");

const common = require("./_common.cjs");

const shescape = require("../../index.cjs");

function checkEscapesCorrectly(arg, options) {
  arg = arg.replace(common.WHITESPACE_REGEX, "");

  const preparedArg = common.prepareArg(arg, false);
  const escapedArg = shescape.escape(preparedArg, {
    ...options,
    interpolation: true,
  });

  const stdout = execSync(`node test/fuzz/echo.js ${escapedArg}`, options);

  const result = stdout.toString();
  const expected = common.getExpectedOutput(arg);
  assert.strictEqual(result, expected);
}

function checkQuotesAndEscapesCorrectly(arg, options) {
  const preparedArg = common.prepareArg(arg, true);
  const quotedArg = shescape.quote(preparedArg, {
    ...options,
    interpolation: false,
  });

  const stdout = execSync(`node test/fuzz/echo.js ${quotedArg}`, options);

  const result = stdout.toString();
  const expected = common.getExpectedOutput(arg);
  assert.strictEqual(result, expected);
}

function fuzz(buf) {
  const arg = buf.toString();
  const options = {
    shell: common.getFuzzShell(),
  };

  checkEscapesCorrectly(arg, options);
  checkQuotesAndEscapesCorrectly(arg, options);
}

module.exports = {
  fuzz,
};
