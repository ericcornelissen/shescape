/**
 * @overview Provides utilities for fuzzing.
 * @license Unlicense
 */

const os = require("node:os");
const process = require("node:process");

require("dotenv").config();

const constants = require("../_constants.cjs");

const ECHO_SCRIPT = constants.echoScript;

function isWindows() {
  return os.platform() === "win32";
}

function isShellCmd(shell) {
  return (isWindows() && shell === undefined) || /cmd\.exe$/.test(shell);
}

function isShellPowerShell(shell) {
  return /powershell\.exe$/.test(shell);
}

function getExpectedOutput({ arg, shell }, normalizeWhitespace) {
  if (isShellCmd(shell)) {
    arg = arg.replace(/[\n\r]+/g, ""); // Remove newline characters, like prep
  }

  arg = arg.replace(/\u{0}/gu, ""); // Remove null characters, like Shescape

  if (normalizeWhitespace) {
    // Convert spacing between arguments to a single space, like the echo
    // script. The characters to normalize depend on the shell.
    if (isShellPowerShell(shell)) {
      arg = arg.replace(/(\s|\u0085)+/g, " ");
    } else {
      arg = arg.replace(/[ \t]+/g, " ");
    }
  }

  arg = `${arg}\n`; // Append a newline, like the echo script
  return arg;
}

function getFuzzShell() {
  return process.env.FUZZ_SHELL;
}

function prepareArg({ arg, quoted, shell }, disableExtraWindowsPreparations) {
  let result = arg;
  if (isShellCmd(shell)) {
    // In CMD ignores everything after a newline (\n) character. This alteration
    // is required even when `disableExtraWindowsPreparations` is true.
    result = result.replace(/[\n\r]+/g, "");
  }
  if (isWindows() && !disableExtraWindowsPreparations) {
    // Node on Windows ...
    if (isShellCmd(shell)) {
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
    } else if (isShellPowerShell(shell)) {
      // ... in PowerShell, depending on if there's whitespace in the
      // argument ...
      if (/\s|\u0085/g.test(result) && quoted) {
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

function trim(s) {
  return s.replace(/^[\s\u0000\u0085]+|[\s\u0000\u0085]+$/g, "");
}

module.exports = {
  ECHO_SCRIPT,
  getExpectedOutput,
  getFuzzShell,
  prepareArg,
  trim,
};
