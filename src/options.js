/**
 * @overview Provides functionality for parsing shescape options.
 * @license MPL-2.0
 */

import { resolveExecutable } from "./executables.js";
import { isString } from "./reflection.js";

/**
 * Parses options provided to shescape.
 *
 * @param {object} args The arguments for this function.
 * @param {Object<string, string>} args.env The environment variables.
 * @param {object} args.options The options for escaping.
 * @param {boolean} [args.options.flagProtection] Is flag protection enabled.
 * @param {boolean} [args.options.interpolation] Is interpolation enabled.
 * @param {boolean | string} [args.options.shell] The shell to escape for.
 * @param {object} deps The dependencies for this function.
 * @param {Function} deps.getDefaultShell Function to get the default shell.
 * @param {Function} deps.getShellName Function to get the name of a shell.
 * @returns {object} The parsed arguments.
 */
export function parseOptions(
  { env, options: { flagProtection, interpolation, shell } },
  { getDefaultShell, getShellName },
) {
  flagProtection = flagProtection ? true : false;
  interpolation = interpolation ? true : false;
  shell = isString(shell) ? shell : getDefaultShell({ env });

  const shellName = getShellName({ env, shell }, { resolveExecutable });
  return { flagProtection, interpolation, shellName };
}
