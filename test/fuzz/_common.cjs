/**
 * @overview Provides utilities for fuzzing.
 * @license MIT
 */

const process = require("node:process");

require("dotenv").config();

const constants = require("../_constants.cjs");

const ECHO_SCRIPT = constants.echoScript;

/**
 * Checks if the fuzz shell is CMD.
 *
 * @param {string} shell The configured shell.
 * @returns {boolean} `true` if `shell` is CMD, `false` otherwise.
 */
function isShellCmd(shell) {
  return (
    (constants.isWindows && [undefined, true, false].includes(shell)) ||
    /cmd\.exe$/u.test(shell)
  );
}

/**
 * Checks if the fuzz shell is the C shell.
 *
 * @param {string} shell The configured shell.
 * @returns {boolean} `true` if `shell` is csh, `false` otherwise.
 */
function isShellCsh(shell) {
  return /csh$/u.test(shell);
}

/**
 * Checks if the fuzz shell is PowerShell.
 *
 * @param {string} shell The configured shell.
 * @returns {boolean} `true` if `shell` is PowerShell, `false` otherwise.
 */
function isShellPowerShell(shell) {
  return /powershell\.exe$/u.test(shell);
}

/**
 * Produces the expected echoed output.
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

  // Replace newline characters, like Shescape
  if (isShellCmd(shell) || isShellCsh(shell)) {
    arg = arg.replace(/\r?\n|\r/gu, " ");
  } else {
    arg = arg.replace(/\r(?!\n)/gu, "");
  }

  if (normalizeWhitespace) {
    // Replace newline characters, like Shescape
    if (!isShellCmd(shell)) {
      arg = arg.replace(/\r?\n/gu, " ");
    }

    // Convert whitespace between arguments, like the shell
    if (isShellCmd(shell)) {
      arg = arg.replace(/[\t ]+/gu, " ");
    }

    // Trim the string, like the shell
    if (isShellPowerShell(shell)) {
      arg = arg.replace(/^[\s\u0085]+/gu, "");
    } else if (isShellCmd(shell)) {
      arg = arg.replace(/^[\t\n\r ]+|(?<![\t\n\r ])[\t\n\r ]+$/gu, "");
    }
  }

  arg = `${arg}\n`; // Append a newline, like the echo script
  return arg;
}

/**
 * Returns the shell configured to be used for fuzzing.
 *
 * @returns {string | undefined} The configured shell, or `undefined`.
 */
function getFuzzShell() {
  return process.env.FUZZ_SHELL || undefined;
}

module.exports = {
  ECHO_SCRIPT,
  isShellPowerShell,
  getExpectedOutput,
  getFuzzShell,
};
