/**
 * @overview Provides functionality for Windows systems.
 * @license MPL-2.0
 */

import * as fs from "node:fs";
import * as path from "node:path";

import which from "which";

import * as cmd from "./win/cmd.js";
import * as powershell from "./win/powershell.js";

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
 * Returns a function to escape arguments for use in a particular shell.
 *
 * @param {string} shellName The name of a Windows shell.
 * @param {object} options The options for escaping arguments.
 * @param {boolean} options.interpolation Is interpolation enabled.
 * @returns {Function | undefined} A function to escape arguments.
 */
export function getEscapeFunction(shellName, options) {
  switch (shellName) {
    case binCmd:
      return cmd.getEscapeFunction(options);
    case binPowerShell:
      return powershell.getEscapeFunction(options);
  }
}

/**
 * Returns a pair of functions to escape and quote arguments for use in a
 * particular shell.
 *
 * @param {string} shellName The name of a Windows shell.
 * @returns {Function[] | undefined} A function pair to escape & quote arguments.
 */
export function getQuoteFunction(shellName) {
  switch (shellName) {
    case binCmd:
      return cmd.getQuoteFunction();
    case binPowerShell:
      return powershell.getQuoteFunction();
  }
}

/**
 * Returns a function to protect against flag injection.
 *
 * @param {string} shellName The name of a Windows shell.
 * @returns {Function | undefined} A function to protect against flag injection.
 */
export function getFlagProtectionFunction(shellName) {
  switch (shellName) {
    case binCmd:
      return cmd.getFlagProtectionFunction();
    case binPowerShell:
      return powershell.getFlagProtectionFunction();
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
    { exists: fs.existsSync, readlink: fs.readlinkSync, which: which.sync },
  );

  const shellName = path.win32.basename(shell);
  if (getEscapeFunction(shellName, {}) === undefined) {
    return binCmd;
  }

  return shellName;
}
