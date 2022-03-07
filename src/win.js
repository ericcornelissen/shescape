/**
 * @overview Contains functionality specifically for Windows systems.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import * as fs from "fs";
import * as path from "path";
import which from "which";

/**
 * @constant {string} binZsh The name of the Windows Command Prompt binary.
 */
const binCmd = "cmd.exe";

/**
 * @constant {string} binPowerShell The name of the Windows PowerShell binary.
 */
const binPowerShell = "powershell.exe";

/**
 * Escape a shell argument for use in the Windows Command Prompt.
 *
 * @param {string} arg The argument to escape.
 * @param {boolean} interpolation Is interpolation enabled.
 * @returns {string} The escaped argument.
 */
function escapeArgCmd(arg, interpolation) {
  let result = arg.replace(/\u{0}/gu, "");

  if (interpolation) {
    result = result
      .replace(/\^/g, "^^")
      .replace(/(<|>)/g, "^$1")
      .replace(/(")/g, "^$1")
      .replace(/(\&|\|)/g, "^$1");
  } else {
    result = result.replace(/"/g, `""`);
  }

  return result;
}

/**
 * Escape a shell argument for use in Windows PowerShell.
 *
 * @param {string} arg The argument to escape.
 * @param {boolean} interpolation Is interpolation enabled.
 * @returns {string} The escaped argument.
 */
function escapeArgPowerShell(arg, interpolation) {
  let result = arg
    .replace(/\u{0}/gu, "")
    .replace(/`/g, "``")
    .replace(/\$/g, "`$");

  if (interpolation) {
    result = result
      .replace(/^((?:\*|[1-6])?)(>)/g, "$1`$2")
      .replace(/^(<|@|#|-|\:|\])/g, "`$1")
      .replace(/(,|\;|\&|\|)/g, "`$1")
      .replace(/(\(|\)|\{|\})/g, "`$1")
      .replace(/('|’|‘|‛|‚)/g, "`$1")
      .replace(/("|“|”|„)/g, "`$1");
  } else {
    result = result.replace(/("|“|”|„)/g, "$1$1");
  }

  return result;
}

/**
 * Quote an argument for use in a Windows shell.
 *
 * @param {string} arg The argument to quote.
 * @returns {string} The quoted argument.
 */
function quoteArg(arg) {
  return `"${arg}"`;
}

/**
 * A mapping from shell names to functions that escape arguments for that shell.
 */
const escapeFunctionsByShell = new Map([
  [binCmd, escapeArgCmd],
  [binPowerShell, escapeArgPowerShell],
]);

/**
 * A mapping from shell names to functions that quote arguments for that shell.
 */
const quoteFunctionsByShell = new Map([
  [binCmd, quoteArg],
  [binPowerShell, quoteArg],
]);

/**
 * Get the basename of a directory or file path on a Windows system.
 *
 * @param {string} fullPath A Windows-style directory or file path.
 * @returns {string} The basename of `fullPath`.
 */
function getBasename(fullPath) {
  return path.win32.basename(fullPath);
}

/**
 * Get the default shell for Windows systems.
 *
 * For more information, see:
 * https://nodejs.org/api/child_process.html#default-windows-shell
 *
 * @param {Object} args The arguments for this function.
 * @param {Object} args.env The environment variables.
 * @param {string} [args.env.ComSpec] The ComSpec value.
 * @returns {string} The default shell.
 */
export function getDefaultShell({ env }) {
  if (Object.prototype.hasOwnProperty.call(env, "ComSpec")) {
    return env.ComSpec;
  }

  return binCmd;
}

/**
 * Get a function to escape strings for use in a particular shell.
 *
 * @param {string} shellName The name of a Windows shell.
 * @returns {Function?} A function to escape strings for use in the shell.
 */
export function getEscapeFunction(shellName) {
  return escapeFunctionsByShell.get(shellName) || null;
}

/**
 * Get a function to quote strings for use in a particular shell.
 *
 * @param {string} shellName The name of a Windows shell.
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
    return binCmd;
  }

  return shellName;
}
