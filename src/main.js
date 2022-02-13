/**
 * @overview Contains functionality to escape and quote shell arguments on any
 * operating system.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import * as fs from "fs";

import { typeError, win32 } from "./constants.js";
import * as unix from "./unix.js";
import * as win from "./win.js";

/**
 * Check if a value can be converted into a string.
 *
 * @param {any} value The value of interest.
 * @returns {boolean} `true` iff `value` can be converted into a string.
 */
function isStringable(value) {
  if (value === undefined || value === null) {
    return false;
  }

  return typeof value.toString === "function";
}

/**
 * Get the shell to escape arguments for.
 *
 * @param {string} platform The platform to get the shell for.
 * @param {Object} env The environment variables.
 * @param {string} [shell] The provided shell, if any.
 * @returns The shell to escape arguments for.
 */
function getShell(platform, env, shell) {
  // Get default shell if no shell was explicitly specified
  if (shell === undefined) {
    switch (platform) {
      case win32:
        shell = win.getDefaultShell(env);
        break;
      default:
        shell = unix.getDefaultShell();
        break;
    }
  }

  // Check if the shell exists - In the future this should throw an error
  // *before* trying to resolve a symlink as that process should allow failure
  // in case the shell isn't a symlink, but not in case the shell doesn't exist
  const shellExists = fs.existsSync(shell);
  if (!shellExists) {
    return shell;
  }

  // Resolve symbolic links before returning
  try {
    shell = fs.readlinkSync(shell);
  } catch (_) {
    // An error will be thrown if shell is not (sym)link, this is not a problem
    // so the error will be ignored.
  }

  return shell;
}

/**
 * Take a value and escape any dangerous characters.
 *
 * Non-string inputs will be converted to strings using a `toString()` method.
 *
 * @param {string} arg The argument to escape.
 * @param {string} platform The platform to escape the argument for.
 * @param {Object} env The environment variables.
 * @param {string} [shell] The shell to escape the argument for, if any.
 * @param {boolean} [interpolation=false] Is interpolation enabled.
 * @returns {string} The escaped argument.
 * @throws {TypeError} The argument is not stringable.
 */
export function escapeShellArgByPlatform(
  arg,
  platform,
  env,
  shell,
  interpolation = false
) {
  if (!isStringable(arg)) {
    throw new TypeError(typeError);
  }

  shell = getShell(platform, env, shell);
  const argAsString = arg.toString();
  switch (platform) {
    case win32:
      return win.escapeShellArg(argAsString, shell, interpolation);
    default:
      return unix.escapeShellArg(argAsString, shell, interpolation);
  }
}

/**
 * Take a value, put OS-specific quotes around it, and escape any dangerous
 * characters.
 *
 * Non-string inputs will be converted to strings using a `toString()` method.
 *
 * @param {string} arg The argument to escape and quote.
 * @param {string} platform The platform to escape and quote the argument for.
 * @param {Object} env The environment variables.
 * @param {string} [shell] The shell to escape the argument for, if any.
 * @returns {string} The escaped argument.
 * @throws {TypeError} The argument is not stringable.
 */
export function quoteShellArgByPlatform(arg, platform, env, shell) {
  const safeArg = escapeShellArgByPlatform(arg, platform, env, shell, false);
  switch (platform) {
    case win32:
      return `"${safeArg}"`;
    default:
      return `'${safeArg}'`;
  }
}
