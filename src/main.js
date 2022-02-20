/**
 * @overview Contains the logic to escape (and quote) shell arguments given
 * helper functions.
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

  if (typeof value.toString !== "function") {
    return false;
  }

  const str = value.toString();
  return typeof str === "string";
}

/**
 * Escape an argument for the given shell.
 *
 * @param {Object} args The arguments for this function.
 * @param {string} args.arg The argument to escape.
 * @param {boolean} args.interpolation Is interpolation enabled.
 * @param {string} args.shellName The name of the shell to escape `arg` for.
 * @param {Object} deps The dependencies for this function.
 * @param {Function} deps.getEscapeFunction Get the escape function for a shell.
 * @returns {string} The escaped argument.
 * @throws {TypeError} The argument to escape is not stringable.
 */
export function escapeShellArg(
  { arg, interpolation, shellName },
  { getEscapeFunction }
) {
  if (!isStringable(arg)) {
    throw new TypeError(typeError);
  }

  const argAsString = arg.toString();
  const escape = getEscapeFunction(shellName);
  const escapedArg = escape(argAsString, interpolation);
  return escapedArg;
}

/**
 * Get helper functions for escaping an argument for a specific platform.
 *
 * @param {string} platform The platform to get the helpers for.
 * @returns {Object} The helper functions.
 */
export function getPlatformHelpers(platform) {
  switch (platform) {
    case win32:
      return win;
    default:
      return unix;
  }
}

/**
 * Quote and escape an argument for the given shell.
 *
 * @param {Object} args The arguments for this function.
 * @param {string} args.arg The argument to escape.
 * @param {string} args.shellName The name of the shell to escape `arg` for.
 * @param {Object} deps The dependencies for this function.
 * @param {Function} deps.getEscapeFunction Get the escape function for a shell.
 * @param {Function} deps.getQuoteFunction Get the quote function for a shell.
 * @returns {string} The escaped argument.
 * @throws {TypeError} The argument to escape is not stringable.
 */
export function quoteShellArg(
  { arg, shellName },
  { getEscapeFunction, getQuoteFunction }
) {
  const escapedArg = escapeShellArg(
    { arg, interpolation: false, shellName },
    { getEscapeFunction }
  );
  const quote = getQuoteFunction(shellName);
  const escapedAndQuotedArg = quote(escapedArg);
  return escapedAndQuotedArg;
}
