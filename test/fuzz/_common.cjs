/**
 * @overview Provides utilities for fuzzing.
 * @license Unlicense
 */

const os = require("node:os");
const process = require("node:process");

require("dotenv").config();

const constants = require("../_constants.cjs");

const ECHO_SCRIPT = constants.echoScript;
const WHITESPACE_REGEX = /\s|\u0085/gu;

function getExpectedOutput(arg) {
  arg = arg.replace(/\u{0}/gu, ""); // Remove null characters, like Shescape
  arg = `${arg}\n`; // Append a newline, like the echo script
  return arg;
}

function getFuzzShell() {
  return process.env.FUZZ_SHELL;
}

function prepareArg(arg, quoted, disableExtraWindowsPreparations) {
  WHITESPACE_REGEX.lastIndex = 0;

  const shell = getFuzzShell();
  const isWindows = () => os.platform() === "win32";
  const isShellCmd = () => shell === undefined || /cmd\.exe$/.test(shell);
  const isShellPowerShell = () => /powershell\.exe$/.test(shell);

  let result = arg;
  if (isWindows() && !disableExtraWindowsPreparations) {
    // Node on Windows ...
    if (isShellCmd()) {
      // ... in CMD, depending on if the argument is quotes ...
      if (quoted) {
        // ... interprets arguments with `\"` as `"` (even if there's a
        // null character between `\` and `"`) so we escape the `\`.
        result = result.replace(/((\\\u{0}*)+)(?=\u{0}*("|$))/gu, "$1$1");
      } else {
        // ... interprets arguments with `\"` as `"` so we escape the `\` ...
        result = result.replace(/((\\\u{0}*)+)(?=\u{0}*")/gu, "$1$1");

        // ... interprets arguments with `"` as `` so we escape it with `\`.
        result = result.replace(/"/g, `\\"`);
      }
    } else if (isShellPowerShell()) {
      // ... in PowerShell, depending on if there's whitespace in the
      // argument ...
      if (WHITESPACE_REGEX.test(result)) {
        // ... interprets arguments with `""` as nothing so we escape it with
        // extra double quotes as `""""` ...
        result = result.replace(/"/g, `""`);

        // ... and interprets arguments with `\"` as `"` (even if there's a null
        // character between `\` and `"`) so we escape the `\`.
        result = result.replace(/((\\\u{0}*)+)(?=\u{0}*("|$))/gu, "$1$1");
      } else {
        // ... interprets arguments with `\"` as `"` (even if there's a null
        // character between `\` and `"`) so we escape the `\`, except that the
        // quote closing the argument cannot be escaped ...
        result = result.replace(/((\\\u{0}*)+)(?=\u{0}*("))/gu, "$1$1");

        // ... and interprets arguments with `""` as nothing so we escape it
        // with `\"`.
        result = result.replace(/"/g, `\\"`);
      }
    }
  }

  return result;
}

module.exports = {
  ECHO_SCRIPT,
  WHITESPACE_REGEX,
  getExpectedOutput,
  getFuzzShell,
  prepareArg,
};
