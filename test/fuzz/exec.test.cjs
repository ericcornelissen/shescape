/**
 * @overview Contains fuzz tests for using Shescape with child_process' `exec` /
 * `execSync`.
 * @license Unlicense
 */

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
  const cmd = `node test/fuzz/echo.js ${escapedArg}`;

  const result = execSync(cmd, options).toString();
  const expected = common.getExpectedOutput(arg);
  if (expected !== result) {
    throw new Error(
      "Unexpected output after escaping (- got, + expected):\n" +
        `- ${result}\n` +
        `+ ${expected}`
    );
  }
}

function checkQuotesAndEscapesCorrectly(arg, options) {
  const preparedArg = common.prepareArg(arg, true);
  const quotedArg = shescape.quote(preparedArg, options);
  const cmd = `node test/fuzz/echo.js ${quotedArg}`;

  const result = execSync(cmd, options).toString();
  const expected = common.getExpectedOutput(arg);
  if (expected !== result) {
    throw new Error(
      "Unexpected output after quoting and escaping (- got, + expected):\n" +
        `- ${result}\n` +
        `+ ${expected}`
    );
  }
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
