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
  return (isWindows() && shell === undefined) || /cmd\.exe$/u.test(shell);
}

function isShellPowerShell(shell) {
  return /powershell\.exe$/u.test(shell);
}

function getExpectedOutput({ arg, shell }, normalizeWhitespace) {
  arg = arg.replace(/\0/gu, ""); // Remove null characters, like Shescape

  if (normalizeWhitespace) {
    // Trim the string, like the shell
    if (isShellPowerShell(shell)) {
      arg = arg.replace(
        /^[\t\n\v\f\r \u0085\u00A0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]+|[\t\n\v\f\r \u0085\u00A0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]+$/gu,
        ""
      );
    } else if (isShellCmd(shell)) {
      arg = arg.replace(/^[\t\n\r ]+|[\t\n\r ]+$/gu, "");
    } else {
      arg = arg.replace(/^[\t\n ]+|[\t\n ]+$/gu, "");
    }

    // Convert spacing between arguments to a single space, like the shell
    if (isShellPowerShell(shell)) {
      arg = arg.replace(
        /[\t\n\v\f\r \u0085\u00A0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]+/gu,
        " "
      );
    } else if (isShellCmd(shell)) {
      arg = arg.replace(/[\t\n\r ]+/gu, " ");
    } else {
      arg = arg.replace(/[\t\n ]+/gu, " ");
    }
  } else {
    if (isShellCmd(shell)) {
      arg = arg.replace(/[\n\r]/gu, " "); // Change newlines to spaces, like Shescape
    }
  }

  arg = `${arg}\n`; // Append a newline, like the echo script
  return arg;
}

function getFuzzShell() {
  return process.env.FUZZ_SHELL;
}

function prepareArg({ arg, quoted, shell }, disableExtraWindowsPreparations) {
  if (isWindows() && !disableExtraWindowsPreparations) {
    // Node on Windows ...
    if (isShellCmd(shell)) {
      // ... in CMD, depending on if the argument is quotes ...
      if (quoted) {
        // ... interprets arguments with `\"` as `"` (even if there's a
        // null character between `\` and `"`) so we escape the `\`.
        arg = arg.replace(/((\\\0*)+)(?=("|$))/gu, "$1$1");
      } else {
        // ... interprets arguments with `\"` as `"` so we escape the `\` ...
        arg = arg.replace(/((\\\0*)+)(?=")/gu, "$1$1");

        // ... interprets arguments with `"` as `` so we escape it with `\`.
        arg = arg.replace(/"/gu, `\\"`);
      }
    } else if (isShellPowerShell(shell)) {
      // ... in PowerShell, depending on if there's whitespace in the
      // argument ...
      if (/[\s\u0085]/u.test(arg) && quoted) {
        // ... interprets arguments with `""` as nothing so we escape it with
        // extra double quotes as `""""` ...
        arg = arg.replace(/"/gu, `""`);

        // ... and interprets arguments with `\"` as `"` (even if there's a null
        // character between `\` and `"`) so we escape the `\`.
        arg = arg.replace(/((\\\0*)+)(?=("|$))/gu, "$1$1");
      } else {
        // ... interprets arguments with `\"` as `"` (even if there's a null
        // character between `\` and `"`) so we escape the `\`, except that the
        // quote closing the argument cannot be escaped ...
        arg = arg.replace(/((\\\0*)+)(?=")/gu, "$1$1");

        // ... and interprets arguments with `"` as nothing so we escape it
        // with `\"`.
        arg = arg.replace(/"/gu, `\\"`);
      }
    }
  }

  return arg;
}

module.exports = {
  ECHO_SCRIPT,
  isShellPowerShell,
  getExpectedOutput,
  getFuzzShell,
  prepareArg,
};
