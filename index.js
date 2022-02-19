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
 * @version 1.5.1
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import os from "os";

import * as main from "./src/main.js";

/**
 * Take a single value, the argument, and escape any dangerous characters.
 *
 * Non-string inputs will be converted to strings using a `toString()` method.
 *
 * @param {string} arg The argument to escape.
 * @param {Object} [options] The escape options.
 * @param {string} [options.interpolation=false] Is interpolation enabled.
 * @param {string} [options.shell] The shell to escape the argument for.
 * @returns {string} The escaped argument.
 * @throws {TypeError} The argument is not stringable.
 * @since 0.1.0
 */
export function escape(arg, options = {}) {
  const { interpolation, shell } = options;
  const env = process.env;
  const platform = os.platform();
  return main.escapeShellArgByPlatform(
    arg,
    platform,
    env,
    shell,
    interpolation
  );
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
 * @param {string} [options.interpolation=false] Is interpolation enabled.
 * @param {string} [options.shell] The shell to escape the arguments for.
 * @returns {string[]} The escaped arguments.
 * @throws {TypeError} One of the arguments is not stringable.
 * @since 1.1.0
 */
export function escapeAll(args, options = {}) {
  if (!Array.isArray(args)) args = [args];

  const { interpolation, shell } = options;
  const env = process.env;
  const platform = os.platform();
  const result = [];
  for (const arg of args) {
    const safeArg = main.escapeShellArgByPlatform(
      arg,
      platform,
      env,
      shell,
      interpolation
    );
    result.push(safeArg);
  }

  return result;
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
  const shell = options.shell;
  const env = process.env;
  const platform = os.platform();
  return main.quoteShellArgByPlatform(arg, platform, env, shell);
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

  const shell = options.shell;
  const env = process.env;
  const platform = os.platform();
  const result = [];
  for (const arg of args) {
    const safeArg = main.quoteShellArgByPlatform(arg, platform, env, shell);
    result.push(safeArg);
  }

  return result;
}
