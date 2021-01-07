/**
 * A simple shell escape package. Use it to escape user-controlled inputs to
 * shell commands to prevent shell injection.
 *
 * @example
 *   const cp = require("child_process");
 *   const shescape = require("shescape");
 *   cp.spawn("command", shescape.escapeAll(userInput), options);
 *
 * @module shescape
 * @version 1.1.1
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

const os = require("os");

const main = require("./src/main.js");

/**
 * Take a single value, the argument, and escape any dangerous characters.
 *
 * Non-string inputs will be converted to strings using a `toString()` method.
 *
 * @param {string} arg The argument to escape.
 * @returns {string} The escaped argument.
 * @throws {TypeError} The argument is not stringable.
 * @since 0.1.0
 */
module.exports.escape = function (arg) {
  const platform = os.platform();
  return main.escapeShellArgByPlatform(arg, platform);
};

/**
 * Take a array of values, the arguments, and escape any dangerous characters in
 * every argument.
 *
 * Non-array inputs will be converted to one-value arrays and non-string values
 * will be converted to strings using a `toString()` method.
 *
 * @param {string[]} args The arguments to escape.
 * @returns {string[]} The escaped arguments.
 * @throws {TypeError} One of the arguments is not stringable.
 * @since 1.1.0
 */
module.exports.escapeAll = function (args) {
  if (!Array.isArray(args)) args = [args];

  const platform = os.platform();
  const result = [];
  for (const arg of args) {
    const safeArg = main.escapeShellArgByPlatform(arg, platform);
    result.push(safeArg);
  }

  return result;
};

/**
 * Take a single value, the argument, put OS-specific quotes around it and
 * escape any dangerous characters.
 *
 * Non-string inputs will be converted to strings using a `toString()` method.
 *
 * @param {string} arg The argument to quote and escape.
 * @returns {string} The quoted and escaped argument.
 * @throws {TypeError} The argument is not stringable.
 * @since 0.3.0
 */
module.exports.quote = function (arg) {
  const platform = os.platform();
  return main.quoteByPlatform(arg, platform);
};

/**
 * Take an array of values, the arguments, put OS-specific quotes around every
 * argument and escape any dangerous characters in every argument.
 *
 * Non-array inputs will be converted to one-value arrays and non-string values
 * will be converted to strings using a `toString()` method.
 *
 * @param {string[]} args The arguments to quote and escape.
 * @returns {string[]} The quoted and escaped arguments.
 * @throws {TypeError} One of the arguments is not stringable.
 * @since 0.4.0
 */
module.exports.quoteAll = function (args) {
  if (!Array.isArray(args)) args = [args];

  const platform = os.platform();
  const result = [];
  for (const arg of args) {
    const safeArg = main.quoteByPlatform(arg, platform);
    result.push(safeArg);
  }

  return result;
};
