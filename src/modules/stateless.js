/**
 * @overview Alternative entrypoint for the library that provides a stateless
 * API.
 * @license MPL-2.0
 */

import { Shescape } from "./index.js";

/**
 * Take a single value, the argument, and escape any dangerous characters.
 *
 * Non-string inputs will be converted to strings using a `toString()` method.
 *
 * @example
 * import { spawn } from "node:child_process";
 * spawn(
 *   "echo",
 *   ["Hello", shescape.escape(userInput, { shell: false })],
 *   null // `options.shell` MUST be falsy
 * );
 * @param {string} arg The argument to escape.
 * @param {object} [options] The options for escaping.
 * @param {boolean} [options.flagProtection=true] Is flag protection enabled.
 * @param {boolean | string} [options.shell=true] The shell to escape for.
 * @returns {string} The escaped argument.
 * @throws {TypeError} The argument is not stringable.
 * @throws {Error} The shell is not supported or could not be found.
 * @since 2.1.0
 */
export function escape(arg, options) {
  const shescape = new Shescape(options);
  return shescape.escape(arg);
}

/**
 * Take an array of values, the arguments, and escape any dangerous characters
 * in every argument.
 *
 * Non-array inputs will be converted to one-value arrays and non-string values
 * will be converted to strings using a `toString()` method.
 *
 * @example
 * import { spawn } from "node:child_process";
 * spawn(
 *   "echo",
 *   shescape.escapeAll(["Hello", userInput], { shell: false }),
 *   null // `options.shell` MUST be falsy
 * );
 * @param {string[]} args The arguments to escape.
 * @param {object} [options] The options for escaping.
 * @param {boolean} [options.flagProtection=true] Is flag protection enabled.
 * @param {boolean | string} [options.shell=true] The shell to escape for.
 * @returns {string[]} The escaped arguments.
 * @throws {TypeError} One of the arguments is not stringable.
 * @throws {Error} The shell is not supported or could not be found.
 * @since 2.1.0
 */
export function escapeAll(args, options) {
  const shescape = new Shescape(options);
  return shescape.escapeAll(args);
}

/**
 * Take a single value, the argument, put shell-specific quotes around it and
 * escape any dangerous characters.
 *
 * Non-string inputs will be converted to strings using a `toString()` method.
 *
 * @example
 * import { spawn } from "node:child_process";
 * const spawnOptions = { shell: true }; // `options.shell` SHOULD be truthy
 * spawn(
 *   "echo",
 *   ["Hello", shescape.quote(userInput, { shell: spawnOptions.shell })],
 *   spawnOptions
 * );
 * @param {string} arg The argument to quote and escape.
 * @param {object} [options] The options for escaping.
 * @param {boolean} [options.flagProtection=true] Is flag protection enabled.
 * @param {boolean | string} [options.shell=true] The shell to escape for.
 * @returns {string} The quoted and escaped argument.
 * @throws {TypeError} The argument is not stringable.
 * @throws {Error} The shell is not supported or could not be found.
 * @throws {Error} Quoting is not supported with `shell: false`.
 * @since 2.1.0
 */
export function quote(arg, options) {
  const shescape = new Shescape(options);
  return shescape.quote(arg);
}

/**
 * Take an array of values, the arguments, put shell-specific quotes around
 * every argument and escape any dangerous characters in every argument.
 *
 * Non-array inputs will be converted to one-value arrays and non-string
 * values will be converted to strings using a `toString()` method.
 *
 * @example
 * import { spawn } from "node:child_process";
 * const spawnOptions = { shell: true }; // `options.shell` SHOULD be truthy
 * spawn(
 *   "echo",
 *   shescape.quoteAll(["Hello", userInput], { shell: spawnOptions.shell }),
 *   spawnOptions
 * );
 * @param {string[]} args The arguments to quote and escape.
 * @param {object} [options] The options for escaping.
 * @param {boolean} [options.flagProtection=true] Is flag protection enabled.
 * @param {boolean | string} [options.shell=true] The shell to escape for.
 * @returns {string[]} The quoted and escaped arguments.
 * @throws {TypeError} One of the arguments is not stringable.
 * @throws {Error} The shell is not supported or could not be found.
 * @throws {Error} Quoting is not supported with `shell: false`.
 * @since 2.1.0
 */
export function quoteAll(args, options) {
  const shescape = new Shescape(options);
  return shescape.quoteAll(args);
}
