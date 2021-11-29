/**
 * @overview Contains fuzz tests for Shescape.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

const cp = require("child_process");
const os = require("os");

const shescape = require("../index.cjs");

function prepareArg(arg) {
  let result = arg.replace(/[\n\r]+/g, ""); // Avoid dealing with newlines
  if (os.platform() == "win32") {
    result = result.replace(/((\\\u{0}*)+)(?=\u{0}*("|$))/gu, "$1$1");
  }

  return result;
}

function getExpectedOutput(arg) {
  return arg
    .replace(/[\n\r]+/g, "") // Avoid dealing with newlines
    .replace(/\u{0}/gu, ""); // Remove null characters
}

function checkIfAnyApiFunctionThrows(arg) {
  shescape.escape(arg);
  shescape.quote(arg);

  if (arg.length > 2) {
    const middle = Math.floor(arg.length / 2);
    const args = [arg.slice(0, middle), arg.slice(middle, arg.length)];
    shescape.escapeAll(args);
    shescape.quoteAll(args);
  }
}

function checkQuotesAndEscapesCorrectly(arg) {
  const preparedArg = prepareArg(arg);
  const quotedArg = shescape.quote(preparedArg);
  const result = cp.execSync(`node test/fuzz/echo.js ${quotedArg}`).toString();
  const expected = getExpectedOutput(arg);
  if (expected !== result) {
    throw new Error(
      "Unexpected output (- got, + expected):\n" +
        `- ${result}\n` +
        `+ ${expected}`
    );
  }
}

function fuzz(buf) {
  const arg = buf.toString().trim();
  checkIfAnyApiFunctionThrows(arg);
  checkQuotesAndEscapesCorrectly(arg);
}

module.exports = { fuzz };
