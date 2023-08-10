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
export const noShellId = Symbol("no shell");

/**
 * Parses options provided to shescape.
 *
 * @param {object} args The arguments for this function.
 * @param {object} args.options The options for escaping.
 * @param {boolean} [args.options.flagProtection] Is flag protection enabled.
 * @param {boolean | string} [args.options.shell=true] The shell to escape for.
 * @param {object} args.process The `process` values.
 * @param {object} args.process.env The environment variables.
 * @param {object} deps The dependencies for this function.
 * @param {Function} deps.getDefaultShell Function to get the default shell.
 * @param {Function} deps.getShellName Function to get the name of a shell.
 * @returns {object} The parsed arguments.
 */
export function parseOptions(
  { options: { flagProtection, shell }, process: { env } },
  { getDefaultShell, getShellName },
) {
  flagProtection = flagProtection ? true : false;

  let shellName = noShellId;
  if (shell !== false) {
    if (!isString(shell)) {
      shell = getDefaultShell({ env });
    }

    shellName = getShellName({ shell }, { resolveExecutable });
  }

  return { flagProtection, shellName };
}
