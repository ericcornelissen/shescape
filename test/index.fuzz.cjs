/**
 * @overview Contains fuzz tests for Shescape.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

const cp = require("child_process");
const os = require("os");

const shescape = require("../index.cjs");

require("dotenv").config();

function prepareArg(arg) {
  const shell = process.env.FUZZ_SHELL;
  const isWindows = () => os.platform() === "win32";
  const isShellCmd = () => shell === undefined || /cmd\.exe$/.test(shell);
  const isShellPowerShell = () => /powershell\.exe$/.test(shell);

  let result = arg.replace(/[\n\r]+/g, ""); // Avoid dealing with newlines
  if (isWindows()) {
    // Node on Windows ...
    if (isShellCmd()) {
      // ... in CMD interprets arguments with `\"` as `"` (even if there's a
      // null character between `\` and `"`) so we escape the `\`.
      result = result.replace(/((\\\u{0}*)+)(?=\u{0}*("|$))/gu, "$1$1");
    } else if (isShellPowerShell()) {
      // ... in PowerShell interprets arguments with `""` as nothing so ...
      if (/\s/.test(result)) {
        // ... in case there's whitespace in the argument, we escape it with
        // extra double quotes as `""""`.
        result = result.replace(/"/g, `""`);
      } else {
        // ... in case there's no whitespace in the argument, we escape it with
        // a backslash as `\"`.
        result = result.replace(/"/g, `\\"`);
      }
    }
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

  const args = arg.split(/\s/g);
  shescape.escapeAll(args);
  shescape.quoteAll(args);
}

function checkQuotesAndEscapesCorrectly(arg) {
  const preparedArg = prepareArg(arg);
  const quotedArg = shescape.quote(preparedArg);

  const cmd = `node test/fuzz/echo.js ${quotedArg}`;
  const options = {
    shell: process.env.FUZZ_SHELL,
  };

  const result = cp.execSync(cmd, options).toString();
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
