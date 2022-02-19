/**
 * @overview Contains functionality to escape and quote shell arguments on any
 * operating system.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import * as fs from "fs";
import which from "which";

import { typeError, win32 } from "./constants.js";
import { binBash } from "./unix.js";
import { binCmd } from "./win.js";

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

  if (typeof value.toString !== "function") {
    return false;
  }

  const str = value.toString();
  return typeof str === "string";
}

/**
 * Get the fallback shell for a given platform in case of an unsupported shell.
 *
 * @param {string} platform The platform to get the default shell for.
 * @returns {string} The default shell for `platform`.
 */
function getFallbackShellIfShellIsNotSupported(platform) {
  switch (platform) {
    case win32:
      return binCmd;
    default:
      return binBash;
  }
}

/**
 * Take a value and escape any dangerous characters.
 *
 * Non-string inputs will be converted to strings using a `toString()` method.
 *
 * @param {Object} args The arguments for this function.
 * @param {string} args.arg The argument to escape.
 * @param {Object} args.env The environment variables.
 * @param {boolean} args.interpolation Is interpolation enabled.
 * @param {string} args.platform The platform to escape the argument for.
 * @param {string} [args.shell] The shell to escape the argument for.
 * @param {Object} deps The dependencies for this function.
 * @param {Function} deps.getBasename Get the basename of a path.
 * @param {Function} deps.getDefaultShell Get the default shell.
 * @param {Function} deps.getEscapeFunction Get the escape function for a shell.
 * @param {Function} deps.resolveExecutable Resolve the path to an executable.
 * @returns {string} The escaped argument.
 * @throws {TypeError} The argument to escape is not stringable.
 */
export function escapeShellArg(
  { arg, env, interpolation, platform, shell },
  { getBasename, getDefaultShell, getEscapeFunction, resolveExecutable }
) {
  if (!isStringable(arg)) {
    throw new TypeError(typeError);
  }

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
  return escape(argAsString, interpolation || false);
}

/**
 * Take a value, put quotes around it, and escape any dangerous characters.
 *
 * Non-string inputs will be converted to strings using a `toString()` method.
 *
 * @param {Object} args The arguments for this function.
 * @param {string} args.arg The argument to escape.
 * @param {Object} args.env The environment variables.
 * @param {string} args.platform The platform to escape the argument for.
 * @param {string} [args.shell] The shell to escape the argument for.
 * @param {Object} deps The dependencies for this function.
 * @param {Function} deps.getBasename Get the basename of a path.
 * @param {Function} deps.getDefaultShell Get the default shell.
 * @param {Function} deps.getEscapeFunction Get the escape function for a shell.
 * @param {Function} deps.quoteArg Quote an argument.
 * @param {Function} deps.resolveExecutable Resolve the path to an executable.
 * @returns {string} The escaped argument.
 * @throws {TypeError} The argument to escape is not stringable.
 */
export function quoteShellArg(args, deps) {
  const safeArg = escapeShellArg(args, deps);
  return deps.quoteArg(safeArg);
}
