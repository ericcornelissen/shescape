/**
 * @overview Temporary file.
 * @license MPL-2.0
 */

import * as fs from "fs";

import which from "which";

/**
 * Determines the name of the shell identified by a file path or file name.
 *
 * @param {object} args The arguments for this function.
 * @param {string} args.shell The name or path of the shell.
 * @param {object} deps The dependencies for this function.
 * @param {Function} deps.getBasename Get the basename for a file.
 * @param {Function} deps.getEscapeFunction Get the escape function for a shell.
 * @param {Function} deps.getFallbackShell Get the fallback shell for the system.
 * @param {Function} deps.resolveExecutable Resolve the path to an executable.
 * @returns {string} The shell name.
 */
export function getShellName(
  { shell },
  { getBasename, getEscapeFunction, getFallbackShell, resolveExecutable }
) {
  shell = resolveExecutable(
    { executable: shell },
    { exists: fs.existsSync, readlink: fs.readlinkSync, which: which.sync }
  );

  const shellName = getBasename(shell);
  if (getEscapeFunction(shellName) === null) {
    return getFallbackShell();
  }

  return shellName;
}
