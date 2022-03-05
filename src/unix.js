/**
 * @overview Contains functionality specifically for Unix systems.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import * as fs from "fs";
import * as path from "path";
import which from "which";

/**
 * @constant {string} binBash The name of the Bourne-again shell (Bash) binary.
 */
const binBash = "bash";

/**
 * @constant {string} binDash The name of the Debian Almquist shell (Dash) binary.
 */
const binDash = "dash";

/**
 * @constant {string} binZsh The name of the Z shell (Zsh) binary.
 */
const binZsh = "zsh";

/**
 * Escape a shell argument for use in Bash (like shells).
 *
 * @param {string} arg The argument to escape.
 * @param {boolean} interpolation Is interpolation enabled.
 * @returns {string} The escaped argument.
 */
function escapeArgBash(arg, interpolation) {
  let result = arg.replace(/\u{0}/gu, "");

  if (interpolation) {
    result = result
      .replace(/\\/g, "\\\\")
      .replace(/^(~|#)/g, "\\$1")
      .replace(/(\*|\?)/gu, "\\$1")
      .replace(/(\$|\;|\&|\|)/g, "\\$1")
      .replace(/(\(|\)|\<|\>)/g, "\\$1")
      .replace(/("|'|`)/g, "\\$1")
      .replace(/\{(?=(.*?(?:\,|\.).*?)\})/g, "\\{")
      .replace(/(?<=\=(?:.*?:)?)(~)(?=\:|\=|\-|\+|\/|0|\s|$)/g, "\\$1");
  } else {
    result = result.replace(/'/g, `'\\''`);
  }

  return result;
}

/**
 * Escape a shell argument for use in Zsh.
 *
 * @param {string} arg The argument to escape.
 * @param {boolean} interpolation Is interpolation enabled.
 * @returns {string} The escaped argument.
 */
function escapeArgZsh(arg, interpolation) {
  let result = arg.replace(/\u{0}/gu, "");

  if (interpolation) {
    result = result
      .replace(/\\/g, "\\\\")
      .replace(/^(~|#)/g, "\\$1")
      .replace(/(\*|\?)/gu, "\\$1")
      .replace(/(\$|\;|\&|\|)/g, "\\$1")
      .replace(/(\(|\)|\<|\>)/g, "\\$1")
      .replace(/("|'|`)/g, "\\$1")
      .replace(/^=/gu, "\\=")
      .replace(/(\[|\]|\{|\})/g, "\\$1");
  } else {
    result = result.replace(/'/g, `'\\''`);
  }

  return result;
}

/**
 * Quote an argument for use in a Unix shell.
 *
 * @param {string} arg The argument to quote.
 * @returns {string} The quoted argument.
 */
function quoteArg(arg) {
  return `'${arg}'`;
}

/**
 * A mapping from shell names to functions that escape arguments for that shell.
 */
const escapeFunctionsByShell = new Map([
  [binBash, escapeArgBash],
  [binDash, escapeArgBash],
  [binZsh, escapeArgZsh],
]);

/**
 * A mapping from shell names to functions that quote arguments for that shell.
 */
const quoteFunctionsByShell = new Map([
  [binBash, quoteArg],
  [binDash, quoteArg],
  [binZsh, quoteArg],
]);

/**
 * Get the basename of a directory or file path on a Unix system.
 *
 * @param {string} fullPath A Unix-style directory or file path.
 * @returns {string} The basename of `fullPath`.
 */
function getBasename(fullPath) {
  return path.basename(fullPath);
}

/**
 * Get the default shell for Unix systems.
 *
 * For more information, see `options.shell` in:
 * https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback
 *
 * @returns {string} The default shell.
 */
export function getDefaultShell() {
  return "/bin/sh";
}

/**
 * Get a function to escape strings for use in a particular shell.
 *
 * @param {string} shellName The name of a Unix shell.
 * @returns {Function?} A function to escape strings for use in the shell.
 */
export function getEscapeFunction(shellName) {
  return escapeFunctionsByShell.get(shellName) || null;
}

/**
 * Get a function to quote strings for use in a particular shell.
 *
 * @param {string} shellName The name of a Unix shell.
 * @returns {Function?} A function to quote strings for use in the shell.
 */
export function getQuoteFunction(shellName) {
  return quoteFunctionsByShell.get(shellName) || null;
}

/**
 * Get the shell name given a shell name or path.
 *
 * @param {Object} args The arguments for this function.
 * @param {string} args.shell The name or path of the shell.
 * @param {Object} deps The dependencies for this function.
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
