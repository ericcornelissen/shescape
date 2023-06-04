/**
 * @overview Provides functionality for Windows systems.
 * @license MPL-2.0
 */

import * as fs from "fs";
import * as path from "path";

import which from "which";

import * as cmd from "./cmd.js";
import * as powershell from "./powershell.js";

/**
 * The name of the Windows Command Prompt binary.
 *
 * @constant
 * @type {string}
 */
export const binCmd = "cmd.exe";

/**
 * The name of the Windows PowerShell binary.
 *
 * @constant
 * @type {string}
 */
export const binPowerShell = "powershell.exe";

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
 * https://nodejs.org/api/child_process.html#default-windows-shell.
 *
 * @param {object} args The arguments for this function.
 * @param {object} args.env The environment variables.
 * @param {string} [args.env.ComSpec] The %COMSPEC% value.
 * @returns {string} The default shell.
 */
export function getDefaultShell({ env: { ComSpec } }) {
  if (ComSpec !== undefined) {
    return ComSpec;
  }

  return binCmd;
}

/**
 * TODO.
 *
 * @param {string} arg The argument to TODO.
 * @returns {string} The updated argument.
 */
function stripFlagPrefix(arg) {
  return arg.replace(/^(?:-+|\/)/gu, "");
}

/**
 * Returns a function to escape arguments for use in a particular shell.
 *
 * @param {string} shellName The name of a Windows shell.
 * @param {object} options The options for escaping arguments.
 * @param {boolean} options.interpolation Is interpolation enabled.
 * @returns {Function | undefined} A function to escape arguments.
 */
export function getEscapeFunction(shellName, options) {
  let escapeFn;
  switch (shellName) {
    case binCmd:
      escapeFn = cmd.getEscapeFunction(options);
      break;
    case binPowerShell:
      escapeFn = powershell.getEscapeFunction(options);
      break;
    default:
      return;
  }

  if (options.flagProtection) {
    return (arg) => escapeFn(stripFlagPrefix(arg));
  } else {
    return escapeFn;
  }
}

/**
 * Returns a function to quote arguments for use in a particular shell.
 *
 * @param {string} shellName The name of a Windows shell.
 * @param {object} options The options for escaping arguments.
 * @param {boolean} options.flagProtection Is flag protection enabled.
 * @returns {Function | undefined} A function to quote and escape arguments.
 */
export function getQuoteFunction(shellName, options) {
  let quoteFn;
  switch (shellName) {
    case binCmd:
      quoteFn = cmd.getQuoteFunction();
      break;
    case binPowerShell:
      quoteFn = powershell.getQuoteFunction();
      break;
    default:
      return;
  }

  if (options.flagProtection) {
    return (arg) => quoteFn(stripFlagPrefix(arg));
  } else {
    return quoteFn;
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
  if (getEscapeFunction(shellName, {}) === undefined) {
    return binCmd;
  }

  return shellName;
}
