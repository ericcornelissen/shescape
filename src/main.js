/**
 * @overview Contains functionality to escape and quote shell arguments on any
 * operating system.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import * as fs from "fs";
import which from "which";

import { typeError, win32 } from "./constants.js";
import { resolveExecutable } from "./executables.js";
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
 * Get the fallback shell for a given platform in case of an unsupported shell.
 *
 * @param {string} platform The platform to get the default shell for.
 * @returns The default shell for `platform`.
 */
function getFallbackShellIfShellIsNotSupported(platform) {
  switch (platform) {
    case win32:
      return "cmd.exe";
    default:
      return "bash";
  }
}

/**
 * Escape a shell argument.
 *
 * @param {Object} args The arguments for this function.
 * @param {string} args.arg The argument to escape.
 * @param {Object} args.env The environment variables.
 * @param {boolean} args.interpolation Is interpolation enabled.
 * @param {boolean} args.platform The platform to escape the argument for.
 * @param {string} [args.shell] The shell to escape the argument for.
 * @param {Object} deps The dependencies for this function.
 * @param {Function} deps.getBasename Get the basename of a path.
 * @param {Function} deps.getDefaultShell Get the default shell.
 * @param {Function} deps.getEscapeFunction Get the escape function for a shell.
 * @returns {string} The escaped argument.
 */
function escapeShellArg(
  { arg, env, interpolation, platform, shell },
  { getBasename, getDefaultShell, getEscapeFunction }
) {
  shell = resolveExecutable(
    { executable: shell === undefined ? getDefaultShell(env) : shell },
    { exists: fs.existsSync, readlink: fs.readlinkSync, which: which.sync }
  );

  let shellName = getBasename(shell);
  if (getEscapeFunction(shellName) === undefined) {
    shellName = getFallbackShellIfShellIsNotSupported(platform);
  }

  const argAsString = arg.toString();
  const escape = getEscapeFunction(shellName);
  return escape(argAsString, interpolation);
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

  return escapeShellArg(
    { arg, env, interpolation, platform, shell },
    { ...(platform === win32 ? win : unix) }
  );
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
