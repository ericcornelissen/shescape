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
  arg = arg.replace(/\u0000/g, ""); // Remove null characters, like Shescape

  if (normalizeWhitespace) {
    // Trim the string, like the shell
    if (isShellPowerShell(shell)) {
      arg = arg.replace(
        /^[ \t\n\v\f\r\u0085\u00A0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]+|[ \t\n\v\f\r\u0085\u00A0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]+$/g,
        ""
      );
    } else if (isShellCmd(shell)) {
      arg = arg.replace(/^[ \t\n\r]+|[ \t\n\r]+$/g, "");
    } else {
      arg = arg.replace(/^[ \t\n]+|[ \t\n]+$/g, "");
    }

    // Convert spacing between arguments to a single space, like the shell
    if (isShellPowerShell(shell)) {
      arg = arg.replace(
        /[ \t\n\v\f\r\u0085\u00A0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]+/g,
        " "
      );
    } else if (isShellCmd(shell)) {
      arg = arg.replace(/[ \t\n\r]+/g, " ");
    } else {
      arg = arg.replace(/[ \t\n]+/g, " ");
    }
  } else {
    if (isShellCmd(shell)) {
      arg = arg.replace(/[\n\r]/g, " "); // Change newlines to spaces, like Shescape
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
        arg = arg.replace(/((\\\u0000*)+)(?=\u0000*("|$))/g, "$1$1");
      } else {
        // ... interprets arguments with `\"` as `"` so we escape the `\` ...
        arg = arg.replace(/((\\\u0000*)+)(?=\u0000*")/g, "$1$1");

        // ... interprets arguments with `"` as `` so we escape it with `\`.
        arg = arg.replace(/"/g, `\\"`);
      }
    } else if (isShellPowerShell(shell)) {
      // ... in PowerShell, depending on if there's whitespace in the
      // argument ...
      if (/[\s\u0085]/g.test(arg) && quoted) {
        // ... interprets arguments with `""` as nothing so we escape it with
        // extra double quotes as `""""` ...
        arg = arg.replace(/"/g, `""`);

        // ... and interprets arguments with `\"` as `"` (even if there's a null
        // character between `\` and `"`) so we escape the `\`.
        arg = arg.replace(/((\\\u0000*)+)(?=\u0000*("|$))/g, "$1$1");
      } else {
        // ... interprets arguments with `\"` as `"` (even if there's a null
        // character between `\` and `"`) so we escape the `\`, except that the
        // quote closing the argument cannot be escaped ...
        arg = arg.replace(/((\\\u0000*)+)(?=\u0000*")/g, "$1$1");

        // ... and interprets arguments with `""` as nothing so we escape it
        // with `\"`.
        arg = arg.replace(/"/g, `\\"`);
      }
    }
  }

  return arg;
}

module.exports = {
  ECHO_SCRIPT,
  getExpectedOutput,
  getFuzzShell,
  prepareArg,
};
