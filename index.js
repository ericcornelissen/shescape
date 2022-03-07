/**
 * A simple shell escape package. Use it to escape user-controlled inputs to
 * shell commands to prevent shell injection.
 *
 * @example
 *   import cp from "child_process";
 *   import * as shescape from "shescape";
 *   cp.spawn("command", shescape.escapeAll(userInput), options);
 *
 * @module shescape
 * @version 1.5.3
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import os from "os";
import process from "process";

import { escapeShellArg, quoteShellArg } from "./src/main.js";
import { getHelpersByPlatform } from "./src/platforms.js";

/**
 * Get the helper functions for the current platform.
 *
 * @returns {Object} The helper functions for the current platform.
 */
function getPlatformHelpers() {
  const platform = os.platform();
  const helpers = getHelpersByPlatform({ platform, process });
  return helpers;
}

/**
 * Take a single value, the argument, and escape any dangerous characters.
 *
 * Non-string inputs will be converted to strings using a `toString()` method.
 *
 * @param {string} arg The argument to escape.
 * @param {Object} [options] The escape options.
 * @param {boolean} [options.interpolation=false] Is interpolation enabled.
 * @param {string} [options.shell] The shell to escape the argument for.
 * @returns {string} The escaped argument.
 * @throws {TypeError} The argument is not stringable.
 * @since 0.1.0
 */
export function escape(arg, options = {}) {
  const helpers = getPlatformHelpers();
  return escapeShellArg({ arg, options, process }, helpers);
}

/**
 * Take a array of values, the arguments, and escape any dangerous characters in
 * every argument.
 *
 * Non-array inputs will be converted to one-value arrays and non-string values
 * will be converted to strings using a `toString()` method.
 *
 * @param {string[]} args The arguments to escape.
 * @param {Object} [options] The escape options.
 * @param {boolean} [options.interpolation=false] Is interpolation enabled.
 * @param {string} [options.shell] The shell to escape the arguments for.
 * @returns {string[]} The escaped arguments.
 * @throws {TypeError} One of the arguments is not stringable.
 * @since 1.1.0
 */
export function escapeAll(args, options = {}) {
  if (!Array.isArray(args)) args = [args];

  const helpers = getPlatformHelpers();
  return args.map((arg) => escapeShellArg({ arg, options, process }, helpers));
}

/**
 * Take a single value, the argument, put OS-specific quotes around it and
 * escape any dangerous characters.
 *
 * Non-string inputs will be converted to strings using a `toString()` method.
 *
 * @param {string} arg The argument to quote and escape.
 * @param {Object} [options] The escape and quote options.
 * @param {string} [options.shell] The shell to escape the argument for.
 * @returns {string} The quoted and escaped argument.
 * @throws {TypeError} The argument is not stringable.
 * @since 0.3.0
 */
export function quote(arg, options = {}) {
  const helpers = getPlatformHelpers();
  return quoteShellArg({ arg, options, process }, helpers);
}

/**
 * Take an array of values, the arguments, put OS-specific quotes around every
 * argument and escape any dangerous characters in every argument.
 *
 * Non-array inputs will be converted to one-value arrays and non-string values
 * will be converted to strings using a `toString()` method.
 *
 * @param {string[]} args The arguments to quote and escape.
 * @param {Object} [options] The escape and quote options.
 * @param {string} [options.shell] The shell to escape the arguments for.
 * @returns {string[]} The quoted and escaped arguments.
 * @throws {TypeError} One of the arguments is not stringable.
 * @since 0.4.0
 */
export function quoteAll(args, options = {}) {
  if (!Array.isArray(args)) args = [args];

  const helpers = getPlatformHelpers();
  return args.map((arg) => quoteShellArg({ arg, options, process }, helpers));
}
