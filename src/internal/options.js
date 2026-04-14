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
 * Check if the Node.js version is before v22.0.0.
 *
 * @param {string} version The `process.version` value.
 * @returns {boolean} `true` if version is before v22.0.0, `false` otherwise.
 */
function isBeforeNode22(version) {
  const [major] = version.replace("v", "").split(".");
  return Number.parseInt(major, 10) < 22; // eslint-disable-line no-magic-numbers
}

/**
 * Parses the `flagProtection` option.
 *
 * @param {object} args The arguments for this function.
 * @param {object} args.options The options for escaping.
 * @returns {object} The parsed option.
 */
function parseFlagProtection({ options }) {
  const flagProtection = hasOwn(options, "flagProtection")
    ? options.flagProtection
    : undefined;
  if (flagProtection === undefined) {
    return true;
  }

  return Boolean(flagProtection);
}

/**
 * Parses the `shell` option.
 *
 * @param {object} args The arguments for this function.
 * @param {Object<string, string>} args.env The environment variables.
 * @param {object} args.options The options for escaping.
 * @param {string} args.version The Node.js version.
 * @param {object} deps The dependencies for this function.
 * @param {function(): string} deps.getDefaultShell Function to get the default shell.
 * @param {function(): string} deps.getShellName Function to get the name of a shell.
 * @param {function(): boolean} deps.isShellSupported Function to see if a shell is usable.
 * @returns {object} The parsed option.
 * @throws {Error} The shell is not supported or could not be found.
 */
function parseShell(
  { env, options, version },
  { getDefaultShell, getShellName, isShellSupported },
) {
  let shell =
    hasOwn(options, "shell") || isBeforeNode22(version)
      ? options.shell
      : undefined;
  let shellName = noShell;

  if (shell !== false) {
    if (!isString(shell)) {
      shell = getDefaultShell({ env });
    }

    shellName = getShellName({ env, shell }, { resolveExecutable });
  }

  if (!isShellSupported(shellName)) {
    throw new Error(`Shescape does not support the shell ${shellName}`);
  }

  return shellName;
}

/**
 * Parses the options provided to shescape.
 *
 * @param {object} args The arguments for this function.
 * @param {Object<string, string>} args.env The environment variables.
 * @param {object} args.options The options for escaping.
 * @param {string} args.version The Node.js version.
 * @param {object} deps The dependencies for this function.
 * @param {function(): string} deps.getDefaultShell Function to get the default shell.
 * @param {function(): string} deps.getShellName Function to get the name of a shell.
 * @param {function(): boolean} deps.isShellSupported Function to see if a shell is usable.
 * @returns {object} The parsed options.
 * @throws {Error} The shell is not supported or could not be found.
 */
export function parseOptions(args, deps) {
  const flagProtection = parseFlagProtection(args);
  const shellName = parseShell(args, deps);
  return { flagProtection, shellName };
}
