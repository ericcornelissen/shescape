/**
 * @overview Contains functionality to escape and quote shell arguments on any
 * operating system.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

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
 * Take a value and escape any dangerous characters.
 *
 * Non-string inputs will be converted to strings using a `toString()` method.
 *
 * @param {string} arg The argument to escape.
 * @param {string} platform The platform to escape the argument for.
 * @returns {string} The escaped argument.
 * @throws {TypeError} The argument is not stringable.
 */
export function escapeShellArgByPlatform(arg, platform) {
  if (!isStringable(arg)) {
    throw new TypeError(typeError);
  }

  const argAsString = arg.toString();
  switch (platform) {
    case win32:
      return win.escapeShellArg(argAsString);
    default:
      return unix.escapeShellArg(argAsString);
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
 * @returns {string} The escaped argument.
 * @throws {TypeError} The argument is not stringable.
 */
export function quoteShellArgByPlatform(arg, platform) {
  const safeArg = escapeShellArgByPlatform(arg, platform);
  switch (platform) {
    case win32:
      return `"${safeArg}"`;
    default:
      return `'${safeArg}'`;
  }
}
