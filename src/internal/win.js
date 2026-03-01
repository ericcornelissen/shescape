/**
 * @overview Provides functionality for Windows systems.
 * @license MPL-2.0
 */

import * as path from "node:path";

import which from "which";

import * as fs from "./fs.js";
import { noShell } from "./options.js";
import { hasOwn } from "./reflection.js";
import * as cmd from "./win/cmd.js";
import * as nosh from "./win/no-shell.js";
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
 * Returns the helper functions to handle arguments for use with a particular
 * shell.
 *
 * @param {string | symbol} shellName The identifier of a Windows shell.
 * @returns {object} A set of functions to escape arguments.
 */
export function getShellHelpers(shellName) {
  if (shellName === noShell) {
    return nosh;
  }

  switch (shellName.toLowerCase()) {
    case binCmd: {
      return cmd;
    }
    case binPowerShell: {
      return powershell;
    }
  }
}

/**
 * Determines the name of the shell identified by a file path or file name.
 *
 * @param {object} args The arguments for this function.
 * @param {Object<string, string>} args.env The environment variables.
 * @param {string} args.shell The name or path of the shell.
 * @param {object} deps The dependencies for this function.
 * @param {function(): string} deps.resolveExecutable Resolve the path to an executable.
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
  return getShellHelpers(shellName) !== undefined;
}
