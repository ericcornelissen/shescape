/**
 * @overview Provides functionality for parsing shescape options.
 * @license MPL-2.0
 */

import { resolveExecutable } from "./executables.js";
import { isString } from "./reflection.js";

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
function shellError(shellName) {
  return `Shescape does not support the shell ${shellName}`;
}

/**
 * Parses options provided to shescape.
 *
 * @param {object} args The arguments for this function.
 * @param {Object<string, string>} args.env The environment variables.
 * @param {object} args.options The options for escaping.
 * @param {boolean} [args.options.flagProtection] Is flag protection enabled.
 * @param {boolean | string} [args.options.shell=true] The shell to escape for.
 * @param {object} deps The dependencies for this function.
 * @param {Function} deps.getDefaultShell Function to get the default shell.
 * @param {Function} deps.getShellName Function to get the name of a shell.
 * @param {Function} deps.isShellSupported Function to see if a shell is usable.
 * @returns {object} The parsed arguments.
 * @throws {Error} The shell is not supported.
 */
export function parseOptions(
  { env, options: { flagProtection, shell } },
  { getDefaultShell, getShellName, isShellSupported },
) {
  flagProtection = flagProtection ? true : false;

  let shellName = noShell;
  if (shell !== false) {
    if (!isString(shell)) {
      shell = getDefaultShell({ env });
    }

    shellName = getShellName({ env, shell }, { resolveExecutable });
  }

  if (!isShellSupported(shellName)) {
    throw new Error(shellError(shellName));
  }

  return { flagProtection, shellName };
}
