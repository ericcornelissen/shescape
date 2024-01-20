/**
 * @overview Provides functionality for parsing shescape options.
 * @license MPL-2.0
 */

import { resolveExecutable } from "./executables.js";
import { hasOwn, isString } from "./reflection.js";

/**
 * The identifier for 'no shell' or the absence of a shell.
 *
 * @constant
 * @type {symbol}
 */
export const noShell = Symbol();

/**
 * Build error messages for unsupported shells.
 *
 * @param {string} shellName The full name of a shell.
 * @returns {string} The unsupported shell error message.
 */
function unsupportedError(shellName) {
  return `Shescape does not support the shell ${shellName}`;
}

/**
 * Parses options provided to shescape.
 *
 * @param {object} args The arguments for this function.
 * @param {Object<string, string>} args.env The environment variables.
 * @param {object} args.options The options for escaping.
 * @param {object} deps The dependencies for this function.
 * @param {Function} deps.getDefaultShell Function to get the default shell.
 * @param {Function} deps.getShellName Function to get the name of a shell.
 * @param {Function} deps.isShellSupported Function to see if a shell is usable.
 * @returns {object} The parsed arguments.
 * @throws {Error} The shell is not supported or could not be found.
 */
export function parseOptions(
  { env, options },
  { getDefaultShell, getShellName, isShellSupported },
) {
  let flagProtection = hasOwn(options, "flagProtection")
    ? options.flagProtection
    : undefined;
  let shell = hasOwn(options, "shell") ? options.shell : undefined;

  flagProtection =
    flagProtection === undefined ? true : flagProtection ? true : false;

  let shellName = noShell;
  if (shell !== false) {
    if (!isString(shell)) {
      shell = getDefaultShell({ env });
    }

    shellName = getShellName({ env, shell }, { resolveExecutable });
  }

  if (!isShellSupported(shellName)) {
    throw new Error(unsupportedError(shellName));
  }

  return { flagProtection, shellName };
}
