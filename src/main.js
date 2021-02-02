/**
 * @overview Contains functionality to escape and quote shell arguments on any
 * operating system.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

const { typeError, win32 } = require("./constants.js");
const unix = require("./unix.js");
const win = require("./win.js");

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
function escapeShellArgByPlatform(arg, platform) {
  let argAsString = arg;
  if (typeof arg !== "string") {
    if (!isStringable(arg)) {
      throw new TypeError(typeError);
    }

    argAsString = arg.toString();
  }

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
function quoteShellArgByPlatform(arg, platform) {
  const safeArg = escapeShellArgByPlatform(arg, platform);
  switch (platform) {
    case win32:
      return `"${safeArg}"`;
    default:
      return `'${safeArg}'`;
  }
}

module.exports.escapeShellArgByPlatform = escapeShellArgByPlatform;
module.exports.quoteShellArgByPlatform = quoteShellArgByPlatform;
