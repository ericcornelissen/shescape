/**
 * @overview Provides functionality specifically for Windows systems.
 * @license MPL-2.0
 */

import * as fs from "fs";
import * as path from "path";

import which from "which";

/**
 * The name of the Windows Command Prompt binary.
 *
 * @constant
 * @type {string}
 */
const binCmd = "cmd.exe";

/**
 * The name of the Windows PowerShell binary.
 *
 * @constant
 * @type {string}
 */
const binPowerShell = "powershell.exe";

/**
 * Escapes a shell argument for use in Windows Command Prompt.
 *
 * @param {string} arg The argument to escape.
 * @param {boolean} interpolation Is interpolation enabled.
 * @param {boolean} quoted Is `arg` being quoted.
 * @returns {string} The escaped argument.
 */
function escapeArgCmd(arg, interpolation, quoted) {
  let result = arg.replace(/\u0000/g, "");

  if (interpolation) {
    result = result
      .replace(/\^/g, "^^")
      .replace(/(<|>)/g, "^$1")
      .replace(/(")/g, "^$1")
      .replace(/(\&|\|)/g, "^$1");
  } else if (quoted) {
    result = result.replace(/"/g, `""`);
  }

  return result;
}

/**
 * Escapes a shell argument for use in Windows PowerShell.
 *
 * @param {string} arg The argument to escape.
 * @param {boolean} interpolation Is interpolation enabled.
 * @param {boolean} quoted Is `arg` being quoted.
 * @returns {string} The escaped argument.
 */
function escapeArgPowerShell(arg, interpolation, quoted) {
  let result = arg
    .replace(/\u0000/g, "")
    .replace(/`/g, "``")
    .replace(/\$/g, "`$");

  if (interpolation) {
    result = result
      .replace(/(^|\s)((?:\*|[1-6])?)(>)/g, "$1$2`$3")
      .replace(/(^|\s)(<|@|#|-|\:|\])/g, "$1`$2")
      .replace(/(,|\;|\&|\|)/g, "`$1")
      .replace(/(\(|\)|\{|\})/g, "`$1")
      .replace(/('|’|‘|‛|‚)/g, "`$1")
      .replace(/("|“|”|„)/g, "`$1");
  } else if (quoted) {
    result = result.replace(/("|“|”|„)/g, "$1$1");
  }

  return result;
}

/**
 * Quotes an argument for use in a Windows shell.
 *
 * @param {string} arg The argument to quote.
 * @returns {string} The quoted argument.
 */
function quoteArg(arg) {
  return `"${arg}"`;
}

/**
 * The mapping from shell names to functions that escape arguments for that
 * shell.
 *
 * @constant
 * @type {Map<string, Function>}
 */
const escapeFunctionsByShell = new Map([
  [binCmd, escapeArgCmd],
  [binPowerShell, escapeArgPowerShell],
]);

/**
 * The mapping from shell names to functions that quote arguments for that
 * shell.
 *
 * @constant
 * @type {Map<string, Function>}
 */
const quoteFunctionsByShell = new Map([
  [binCmd, quoteArg],
  [binPowerShell, quoteArg],
]);

/**
 * Returns the basename of a directory or file path on a Windows system.
 *
 * @param {string} fullPath A Windows-style directory or file path.
 * @returns {string} The basename of `fullPath`.
 */
function getBasename(fullPath) {
  return path.win32.basename(fullPath);
}

/**
 * Returns the default shell for Windows systems.
 *
 * For more information, see:
 * https://nodejs.org/api/child_process.html#default-windows-shell
 *
 * @param {Object} args The arguments for this function.
 * @param {Object} args.env The environment variables.
 * @param {string} [args.env.ComSpec] The %COMSPEC% value.
 * @returns {string} The default shell.
 */
export function getDefaultShell({ env }) {
  if (Object.prototype.hasOwnProperty.call(env, "ComSpec")) {
    return env.ComSpec;
  }

  return binCmd;
}

/**
 * Returns a function to escape arguments for use in a particular shell.
 *
 * @param {string} shellName The name of a Windows shell.
 * @returns {Function?} A function to escape arguments for use in the shell.
 */
export function getEscapeFunction(shellName) {
  return escapeFunctionsByShell.get(shellName) || null;
}

/**
 * Returns a function to quote arguments for use in a particular shell.
 *
 * @param {string} shellName The name of a Windows shell.
 * @returns {Function?} A function to quote arguments for use in the shell.
 */
export function getQuoteFunction(shellName) {
  return quoteFunctionsByShell.get(shellName) || null;
}

/**
 * Determines the name of the shell identified by a file path or file name.
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
    return binCmd;
  }

  return shellName;
}
