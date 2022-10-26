/**
 * @overview Provides functionality specifically for Unix systems.
 * @license MPL-2.0
 */

import * as fs from "fs";
import * as path from "path";

import which from "which";

/**
 * The name of the Bourne-again shell (Bash) binary.
 *
 * @constant
 * @type {string}
 */
const binBash = "bash";

/**
 * The name of the Debian Almquist shell (Dash) binary.
 *
 * @constant
 * @type {string}
 */
const binDash = "dash";

/**
 * The name of the Z shell (Zsh) binary.
 *
 * @constant
 * @type {string}
 */
const binZsh = "zsh";

/**
 * Escapes a shell argument for use in Bash(-like shells).
 *
 * @param {string} arg The argument to escape.
 * @param {boolean} interpolation Is interpolation enabled.
 * @param {boolean} quoted Is `arg` being quoted.
 * @returns {string} The escaped argument.
 */
function escapeArgBash(arg, interpolation, quoted) {
  let result = arg.replace(/[\0\u0008\u001B\u009B]/gu, "");

  if (interpolation) {
    result = result
      .replace(/\\/gu, "\\\\")
      .replace(/\n/gu, " ")
      .replace(/(^|\s)([#~])/gu, "$1\\$2")
      .replace(/(["$&'()*;<>?`{|])/gu, "\\$1")
      .replace(/(?<=[:=])(~)(?=[\s+\-/0:=]|$)/gu, "\\$1");
  } else if (quoted) {
    result = result.replace(/'/gu, `'\\''`);
  }

  result = result.replace(/\r(?!\n)/gu, "");

  return result;
}

/**
 * Escapes a shell argument for use in Dash.
 *
 * @param {string} arg The argument to escape.
 * @param {boolean} interpolation Is interpolation enabled.
 * @param {boolean} quoted Is `arg` being quoted.
 * @returns {string} The escaped argument.
 */
function escapeArgDash(arg, interpolation, quoted) {
  let result = arg.replace(/[\0\u0008\u001B\u009B]/gu, "");

  if (interpolation) {
    result = result
      .replace(/\\/gu, "\\\\")
      .replace(/\n/gu, " ")
      .replace(/(^|\s)([#~])/gu, "$1\\$2")
      .replace(/(["$&'()*;<>?`|])/gu, "\\$1");
  } else if (quoted) {
    result = result.replace(/'/gu, `'\\''`);
  }

  result = result.replace(/\r(?!\n)/gu, "");

  return result;
}

/**
 * Escapes a shell argument for use in Zsh.
 *
 * @param {string} arg The argument to escape.
 * @param {boolean} interpolation Is interpolation enabled.
 * @param {boolean} quoted Is `arg` being quoted.
 * @returns {string} The escaped argument.
 */
function escapeArgZsh(arg, interpolation, quoted) {
  let result = arg.replace(/[\0\u0008\u001B\u009B]/gu, "");

  if (interpolation) {
    result = result
      .replace(/\\/gu, "\\\\")
      .replace(/\n/gu, " ")
      .replace(/(^|\s)([#=~])/gu, "$1\\$2")
      .replace(/(["$&'()*;<>?[\]`{|}])/gu, "\\$1");
  } else if (quoted) {
    result = result.replace(/'/gu, `'\\''`);
  }

  result = result.replace(/\r(?!\n)/gu, "");

  return result;
}

/**
 * Quotes an argument for use in a Unix shell.
 *
 * @param {string} arg The argument to quote.
 * @returns {string} The quoted argument.
 */
function quoteArg(arg) {
  return `'${arg}'`;
}

/**
 * Returns the basename of a directory or file path on a Unix system.
 *
 * @param {string} fullPath A Unix-style directory or file path.
 * @returns {string} The basename of `fullPath`.
 */
function getBasename(fullPath) {
  return path.basename(fullPath);
}

/**
 * Returns the default shell for Unix systems.
 *
 * For more information, see `options.shell` in:
 * https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback.
 *
 * @returns {string} The default shell.
 */
export function getDefaultShell() {
  return "/bin/sh";
}

/**
 * Returns a function to escape arguments for use in a particular shell.
 *
 * @param {string} shellName The name of a Unix shell.
 * @returns {Function?} A function to escape arguments for use in the shell.
 */
export function getEscapeFunction(shellName) {
  switch (shellName) {
    case binBash:
      return escapeArgBash;
    case binDash:
      return escapeArgDash;
    case binZsh:
      return escapeArgZsh;
    default:
      return null;
  }
}

/**
 * Returns a function to quote arguments for use in a particular shell.
 *
 * @param {string} shellName The name of a Unix shell.
 * @returns {Function?} A function to quote arguments for use in the shell.
 */
export function getQuoteFunction(shellName) {
  switch (shellName) {
    case binBash:
    case binDash:
    case binZsh:
      return quoteArg;
    default:
      return null;
  }
}

/**
 * Determines the name of the shell identified by a file path or file name.
 *
 * @param {object} args The arguments for this function.
 * @param {string} args.shell The name or path of the shell.
 * @param {object} deps The dependencies for this function.
 * @param {Function} deps.resolveExecutable Resolve the path to an executable.
 * @returns {string} The shell name.
 */
export function getShellName({ shell }, { resolveExecutable }) {
  shell = resolveExecutable(
    { executable: shell },
    { exists: fs.existsSync, readlink: fs.readlinkSync, which: which.sync }
  );

  const shellName = getBasename(shell);
  if (getEscapeFunction(shellName) === null) {
    return binBash;
  }

  return shellName;
}
