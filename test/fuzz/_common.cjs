/**
 * @overview Provides utilities for fuzzing.
 * @license Unlicense
 */

const os = require("node:os");
const process = require("node:process");

require("dotenv").config();

const constants = require("../_constants.cjs");

const ECHO_SCRIPT = constants.echoScript;

/**
 * Check if the current platform is Windows.
 *
 * @returns {boolean} `true` if the platform is Windows, `false` otherwise.
 */
function isWindows() {
  return os.platform() === "win32";
}

/**
 * Check if the fuzz shell is CMD.
 *
 * @param {string} shell The configured shell.
 * @returns {boolean} `true` if the fuzz shell is CMD, `false` otherwise.
 */
function isShellCmd(shell) {
  return (isWindows() && shell === undefined) || /cmd\.exe$/u.test(shell);
}

/**
 * Check if the fuzz shell is PowerShell.
 *
 * @param {string} shell The configured shell.
 * @returns {boolean} `true` if the fuzz shell is PowerShell, `false` otherwise.
 */
function isShellPowerShell(shell) {
  return /powershell\.exe$/u.test(shell);
}

/**
 * Get the expected echoed output.
 *
 * @param {object} args The function arguments.
 * @param {string} args.arg The input argument that was echoed.
 * @param {string} args.shell The shell used for echoing.
 * @param {boolean} normalizeWhitespace Whether whitespace should be normalized.
 * @returns {string} The expected echoed value.
 */
function getExpectedOutput({ arg, shell }, normalizeWhitespace) {
  // Remove control characters, like Shescape
  arg = arg.replace(/[\0\u0008\u001B\u009B]/gu, "");

  if (normalizeWhitespace) {
    // Convert spacing between arguments to a single space, like the shell
    if (isShellPowerShell(shell)) {
      arg = arg.replace(/\r(?!\n)/gu, "").replace(/[\s\u0085]+/gu, " ");
    } else if (isShellCmd(shell)) {
      arg = arg
        .replace(/[\n\r]+/gu, "\0")
        .replace(/^\0+|(?<!\0)\0+$/gu, "")
        .replace(/ \0+|(?<!\0)\0+ /gu, " ")
        .replace(/\0+/gu, " ");
    } else {
      arg = arg
        .replace(/[\t\n ]+/gu, " ")
        .replace(/\r(?!\n)/gu, "")
        .replace(/[\t\n ]+/gu, " ");
    }

    // Trim the string, like the shell
    if (isShellPowerShell(shell)) {
      arg = arg.replace(/^[\s\u0085]+|(?<![\s\u0085])[\s\u0085]+$/gu, "");
    } else if (isShellCmd(shell)) {
      arg = arg.replace(/^[\n\r]+|(?<![\n\r])[\n\r]+$/gu, "");
    } else {
      arg = arg.replace(/^[\t\n ]+|(?<![\t\n ])[\t\n ]+$/gu, "");
    }
  } else {
    // Change newlines to spaces, like Shescape
    if (isShellCmd(shell)) {
      arg = arg.replace(/\r?\n|\r/gu, " ");
    } else {
      arg = arg.replace(/\r(?!\n)/gu, "");
    }
  }

  arg = `${arg}\n`; // Append a newline, like the echo script
  return arg;
}

/**
 * Get the shell configured to be used for fuzzing.
 *
 * @returns {string | undefined} The configured shell name, or `undefined`.
 */
function getFuzzShell() {
  return process.env.FUZZ_SHELL || undefined;
}

/**
 * Prepare an argument for echoing to accommodate shell-specific behaviour.
 *
 * @param {object} args The function arguments.
 * @param {string} args.arg The input argument that will be echoed.
 * @param {boolean} args.quoted Will `arg` be quoted prior to echoing.
 * @param {string} args.shell The shell to be used for echoing.
 * @param {boolean} disableExtraWindowsPreparations Disable Windows prep.
 * @returns {string} The prepared `arg`.
 */
function prepareArg({ arg, quoted, shell }, disableExtraWindowsPreparations) {
  if (isWindows() && !disableExtraWindowsPreparations) {
    // Node on Windows ...
    if (isShellCmd(shell)) {
      // ... in CMD, depending on if the argument is quotes ...
      if (quoted) {
        // ... interprets arguments with `\"` as `"` so we escape the `\`.
        arg = arg.replace(
          /(?<!\\)((?:\\[\0\u0008\u001B\u009B]*)+)(?="|$)/gu,
          "$1$1"
        );
      } else {
        // ... interprets arguments with `\"` as `"` so we escape the `\` ...
        arg = arg.replace(
          /(?<!\\)((?:\\[\0\u0008\u001B\u009B]*)+)(?=")/gu,
          "$1$1"
        );

        // ... interprets arguments with `"` as `` so we escape it with `\`.
        arg = arg.replace(/"/gu, `\\"`);
      }
    } else if (isShellPowerShell(shell)) {
      // ... in PowerShell, depending on if there's whitespace in the
      // argument ...
      if (
        /[\t\n\v\f \u0085\u00A0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]/u.test(
          arg
        ) &&
        quoted
      ) {
        // ... interprets arguments with `""` as nothing so we escape it with
        // extra double quotes as `""""` ...
        arg = arg.replace(/"/gu, `""`);

        // ... and interprets arguments with `\"` as `"` so we escape the `\`.
        arg = arg.replace(
          /(?<!\\)((?:\\[\0\u0008\r\u001B\u009B]*)+)(?="|$)/gu,
          "$1$1"
        );
      } else {
        // ... interprets arguments with `\"` as `"` so we escape the `\`,
        // except that the quote closing the argument cannot be escaped ...
        arg = arg.replace(
          /(?<!\\)((?:\\[\0\u0008\r\u001B\u009B]*)+)(?=")/gu,
          "$1$1"
        );

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
