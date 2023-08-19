/**
 * A simple shell escape library. Use it to escape user-controlled inputs to
 * shell commands to prevent shell injection.
 *
 * @overview Entrypoint for the library.
 * @module shescape
 * @version 1.7.3
 * @license MPL-2.0
 */

import os from "os";
import process from "process";

import { parseOptions } from "./src/options.js";
import { getHelpersByPlatform } from "./src/platforms.js";
import { checkedToString, toArrayIfNecessary } from "./src/reflection.js";

/**
 * Get the helper functions for the current platform.
 *
 * @returns {object} The helper functions for the current platform.
 */
function getPlatformHelpers() {
  const platform = os.platform();
  const helpers = getHelpersByPlatform({ env: process.env, platform });
  return helpers;
}

/**
 * Take a single value, the argument, and escape any dangerous characters.
 *
 * Non-string inputs will be converted to strings using a `toString()` method.
 *
 * NOTE: when the `interpolation` option is set to `true`, whitespace is escaped
 * to prevent argument splitting except for cmd.exe (which does not support it).
 *
 * @example
 * import { spawn } from "node:child_process";
 * spawn(
 *   "echo",
 *   ["Hello", shescape.escape(userInput)],
 *   null // `options.shell` MUST be falsy
 * );
 * @param {string} arg The argument to escape.
 * @param {object} [options] The escape options.
 * @param {boolean} [options.flagProtection=false] Is flag protection enabled.
 * @param {boolean} [options.interpolation=false] Is interpolation enabled.
 * @param {boolean | string} [options.shell] The shell to escape for.
 * @returns {string} The escaped argument.
 * @throws {TypeError} The argument is not stringable.
 * @since 0.1.0
 */
export function escape(arg, options = {}) {
  const helpers = getPlatformHelpers();
  const { flagProtection, interpolation, shellName } = parseOptions(
    { options, process },
    helpers,
  );
  const argAsString = checkedToString(arg);
  const escape = helpers.getEscapeFunction(shellName, { interpolation });
  const escapedArg = escape(argAsString);
  if (flagProtection) {
    const flagProtect = helpers.getFlagProtectionFunction(shellName);
    return flagProtect(escapedArg);
  } else {
    return escapedArg;
  }
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
 *   shescape.escapeAll(["Hello", userInput]),
 *   null // `options.shell` MUST be falsy
 * );
 * @param {string[]} args The arguments to escape.
 * @param {object} [options] The escape options.
 * @param {boolean} [options.flagProtection=false] Is flag protection enabled.
 * @param {boolean} [options.interpolation=false] Is interpolation enabled.
 * @param {boolean | string} [options.shell] The shell to escape for.
 * @returns {string[]} The escaped arguments.
 * @throws {TypeError} One of the arguments is not stringable.
 * @since 1.1.0
 */
export function escapeAll(args, options = {}) {
  args = toArrayIfNecessary(args);
  return args.map((arg) => escape(arg, options));
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
 * const shescapeOptions = { shell: spawnOptions.shell };
 * spawn(
 *   "echo",
 *   ["Hello", shescape.quote(userInput, shescapeOptions)],
 *   spawnOptions
 * );
 * @example
 * import { exec } from "node:child_process";
 * const execOptions = null || { };
 * const shescapeOptions = { shell: execOptions.shell };
 * exec(
 *   `echo Hello ${shescape.quote(userInput, shescapeOptions)}`,
 *   execOptions
 * );
 * @param {string} arg The argument to quote and escape.
 * @param {object} [options] The escape and quote options.
 * @param {boolean} [options.flagProtection=false] Is flag protection enabled.
 * @param {boolean | string} [options.shell] The shell to escape for.
 * @returns {string} The quoted and escaped argument.
 * @throws {TypeError} The argument is not stringable.
 * @since 0.3.0
 */
export function quote(arg, options = {}) {
  const helpers = getPlatformHelpers();
  const { flagProtection, shellName } = parseOptions(
    { options, process },
    helpers,
  );
  const argAsString = checkedToString(arg);
  const [escape, quote] = helpers.getQuoteFunction(shellName);
  const escapedArg = escape(argAsString);
  if (flagProtection) {
    const flagProtect = helpers.getFlagProtectionFunction(shellName);
    return quote(flagProtect(escapedArg));
  } else {
    return quote(escapedArg);
  }
}

/**
 * Take an array of values, the arguments, put shell-specific quotes around
 * every argument and escape any dangerous characters in every argument.
 *
 * Non-array inputs will be converted to one-value arrays and non-string values
 * will be converted to strings using a `toString()` method.
 *
 * @example
 * import { spawn } from "node:child_process";
 * const spawnOptions = { shell: true }; // `options.shell` SHOULD be truthy
 * const shescapeOptions = { shell: spawnOptions.shell };
 * spawn(
 *   "echo",
 *   shescape.quoteAll(["Hello", userInput], shescapeOptions),
 *   spawnOptions
 * );
 * @param {string[]} args The arguments to quote and escape.
 * @param {object} [options] The escape and quote options.
 * @param {boolean} [options.flagProtection=false] Is flag protection enabled.
 * @param {boolean | string} [options.shell] The shell to escape for.
 * @returns {string[]} The quoted and escaped arguments.
 * @throws {TypeError} One of the arguments is not stringable.
 * @since 0.4.0
 */
export function quoteAll(args, options = {}) {
  args = toArrayIfNecessary(args);
  return args.map((arg) => quote(arg, options));
}
