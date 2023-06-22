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
 * @param {boolean} args.quoted Was `arg` quoted prior to echoing.
 * @param {string} args.shell The shell used for echoing.
 * @param {boolean} normalizeWhitespace Whether whitespace should be normalized.
 * @returns {string} The expected echoed value.
 */
function getExpectedOutput({ arg, quoted, shell }, normalizeWhitespace) {
  // Remove control characters, like Shescape
  arg = arg.replace(/[\0\u0008\u001B\u009B]/gu, "");

  // Replace newline characters, like Shescape
  if (isShellCmd(shell) || isShellCsh(shell)) {
    arg = arg.replace(/\r?\n|\r/gu, " ");
  } else {
    arg = arg.replace(/\r(?!\n)/gu, "");
  }

  // Normalize whitespace
  if (isShellCmd(shell) && (normalizeWhitespace || quoted)) {
    arg = arg
      .replace(/^[\t ]+|(?<![\t ])[\t ]+$/gu, "")
      .replace(/[\t ]+/gu, " ");
  } else if (isShellPowerShell(shell) && normalizeWhitespace) {
    arg = arg.replace(/\r?\n/gu, " ").replace(/^[\s\u0085]+/gu, "");
  } else if (normalizeWhitespace) {
    arg = arg.replace(/\r?\n/gu, " ");
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

/**
 * Prepares an argument for echoing to accommodate shell-specific behaviour.
 *
 * @param {object} args The function arguments.
 * @param {string} args.arg The input argument that will be echoed.
 * @param {boolean} args.quoted Will `arg` be quoted prior to echoing.
 * @param {string} args.shell The shell to be used for echoing.
 * @param {boolean} disableExtraWindowsPreparations Disable Windows prep.
 * @returns {string} The prepared `arg`.
 */
function prepareArg({ arg, quoted, shell }, disableExtraWindowsPreparations) {
  if (constants.isWindows && !disableExtraWindowsPreparations) {
    // Node on Windows ...
    if (isShellCmd(shell)) {
      // ... in CMD interprets arguments with `\"` as `"` so we escape the `\`
      arg = arg.replace(
        /(?<!\\)((?:\\[\0\u0008\u001B\u009B]*)+)(?=")/gu,
        "$1$1"
      );

      // ... and interprets arguments with `"` as `` so we escape it with `\`.
      arg = arg.replace(/"/gu, `\\"`);
    } else if (isShellPowerShell(shell)) {
      // ... in PowerShell, depending on if there's whitespace in the
      // argument ...
      if (
        (quoted &&
          /[\t\n\v\f \u0085\u00A0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]/u.test(
            arg
          )) ||
        (!quoted &&
          /(?<!^)[\t\n\v\f \u0085\u00A0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]/u.test(
            arg.replace(/^[\s\0\u0008\u001B\u0085\u009B]+/gu, "")
          ))
      ) {
        // ... interprets arguments with `"` as nothing so we escape it with
        // extra double quotes as `""` ...
        arg = arg.replace(/"/gu, `""`);

        // ... and interprets arguments with `\"` as `"` so we escape the `\`.
        arg = arg.replace(
          /(?<!\\)((?:\\[\0\u0008\r\u001B\u009B]*)+)(?="|$)/gu,
          "$1$1"
        );
      } else {
        // ... interprets arguments with `\"` as `"` so we escape the `\` ...
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
