/**
 * @overview Provides functionality for Windows systems.
 * @license MPL-2.0
 */

import * as fs from "node:fs";
import * as path from "node:path";

import which from "which";

import * as cmd from "./win/cmd.js";
import * as nosh from "./win/no-shell.js";
import * as powershell from "./win/powershell.js";
import { noShell } from "./options.js";
import { hasOwn } from "./reflection.js";

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
 * @param {Object<string, string>} args.env The environment variables.
 * @returns {string} The default shell.
 */
export function getDefaultShell({ env }) {
  const ComSpec = hasOwn(env, "ComSpec") ? env.ComSpec : undefined;
  if (ComSpec !== undefined) {
    return ComSpec;
  }

  return binCmd;
}

/**
 * Returns a function to escape arguments for use in a particular shell.
 *
 * @param {string | symbol} shellName The name of a Windows shell.
 * @returns {Function | undefined} A function to escape arguments.
 */
export function getEscapeFunction(shellName) {
  if (shellName === noShell) {
    return nosh.getEscapeFunction();
  }

  switch (shellName.toLowerCase()) {
    case binCmd:
      return cmd.getEscapeFunction();
    case binPowerShell:
      return powershell.getEscapeFunction();
  }
}

/**
 * Returns a pair of functions to escape and quote arguments for use in a
 * particular shell.
 *
 * @param {string | symbol} shellName The name of a Windows shell.
 * @returns {Function[] | undefined} A function pair to escape & quote arguments.
 */
export function getQuoteFunction(shellName) {
  if (shellName === noShell) {
    return nosh.getQuoteFunction();
  }

  switch (shellName.toLowerCase()) {
    case binCmd:
      return cmd.getQuoteFunction();
    case binPowerShell:
      return powershell.getQuoteFunction();
  }
}

/**
 * Returns a function to protect against flag injection.
 *
 * @param {string | symbol} shellName The name of a Windows shell.
 * @returns {Function | undefined} A function to protect against flag injection.
 */
export function getFlagProtectionFunction(shellName) {
  if (shellName === noShell) {
    return nosh.getFlagProtectionFunction();
  }

  switch (shellName.toLowerCase()) {
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
 * @param {Object<string, string>} args.env The environment variables.
 * @param {string} args.shell The name or path of the shell.
 * @param {object} deps The dependencies for this function.
 * @param {Function} deps.resolveExecutable Resolve the path to an executable.
 * @returns {string} The shell name.
 */
export function getShellName({ env, shell }, { resolveExecutable }) {
  shell = resolveExecutable(
    { env, executable: shell },
    { exists: fs.existsSync, readlink: fs.readlinkSync, which: which.sync },
  );

  const shellName = path.win32.basename(shell);
  return shellName;
}

/**
 * Checks if the given shell is supported on Windows or not.
 *
 * @param {string} shellName The name of a Windows shell.
 * @returns {boolean} `true` if the shell is supported, `false` otherwise.
 */
export function isShellSupported(shellName) {
  return getEscapeFunction(shellName) !== undefined;
}
