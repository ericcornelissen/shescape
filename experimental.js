/**
 * @overview Experimental entrypoint for the library. Changes to this public API
 * may change without a major version bump.
 * @license MPL-2.0
 */

import os from "os";
import process from "process";

import * as unix from "./src/unix/index.js";
import { resolveExecutable } from "./src/executables.js";
import {
  isString,
  isStringable,
  toArrayIfNecessary,
} from "./src/reflection.js";

/**
 * The error message for incorrect parameter types.
 *
 * @constant
 * @type {string}
 */
const typeError =
  "Shescape requires strings or values that can be converted into a string using .toString()";

/**
 * Parses options provided {@link Shescape}.
 *
 * @param {object} args The arguments for this function.
 * @param {object} args.options The options for escaping.
 * @param {string} [args.options.shell] The shell to escape for.
 * @param {boolean} [args.options.interpolation] Is interpolation enabled.
 * @param {object} args.process The `process` values.
 * @param {object} args.process.env The environment variables.
 * @returns {object} The parsed arguments.
 */
function parseOptions({ options: { interpolation, shell }, process: { env } }) {
  interpolation = interpolation ? true : false;
  shell = isString(shell) ? shell : unix.getDefaultShell({ env });

  const shellName = unix.getShellName({ shell }, { resolveExecutable });
  return { interpolation, shellName };
}

/**
 * Convert the provided value to a string if possible.
 *
 * @param {any} value The value to convert into a string.
 * @returns {string} The value as a string.
 * @throws {TypeError} The argument is not stringable.
 */
function toString(value) {
  if (!isStringable(value)) {
    throw new TypeError(typeError);
  }

  return value.toString();
}

/**
 * TODO.
 *
 * @since 1.6.7
 */
export class Shescape {
  /**
   * Create an object to repeatedly escape/quote arguments for a given
   * configuration.
   *
   * @param {object} [options] The escape options.
   * @param {boolean} [options.interpolation=false] Is interpolation enabled.
   * @param {boolean | string} [options.shell] The shell to escape for.
   * @since 1.6.7
   */
  constructor(options = {}) {
    const { interpolation, shellName } = parseOptions({ options, process });

    // START - TEMPORARY
    const platform = os.platform();
    if (platform === "win32") {
      throw new Error("windows is currently unsupported");
    }
    // END - TEMPORARY

    const escape = unix.getEscapeFunction(shellName, {
      interpolation,
      quoted: false,
    });
    this._escape = (arg) => escape(arg);

    const escapeForQuote = unix.getEscapeFunction(shellName, {
      interpolation: false,
      quoted: true,
    });
    const quote = unix.getQuoteFunction(shellName);
    this._quote = (arg) => quote(escapeForQuote(arg));
  }

  /**
   * Take a single value, the argument, and escape any dangerous characters.
   *
   * Non-string inputs will be converted to strings using the `toString()`
   * method.
   *
   * @param {string} arg The argument to escape.
   * @returns {string} The escaped argument.
   * @throws {TypeError} The argument is not stringable.
   * @since 1.6.7
   */
  escape(arg) {
    arg = toString(arg);
    return this._escape(arg);
  }

  /**
   * Take a array of values, the arguments, and escape any dangerous characters
   * in every argument.
   *
   * Non-array inputs will be converted to one-value arrays and non-string
   * values will be converted to strings using the `toString()` method.
   *
   * @param {string[]} args The arguments to escape.
   * @returns {string[]} The escaped arguments.
   * @throws {TypeError} One of the arguments is not stringable.
   * @since 1.6.7
   */
  escapeAll(args) {
    args = toArrayIfNecessary(args);
    return args.map((arg) => this.escape(arg));
  }

  /**
   * Take a single value, the argument, put OS-specific quotes around it and
   * escape any dangerous characters.
   *
   * Non-string inputs will be converted to strings using the `toString()`
   * method.
   *
   * @param {string} arg The argument to quote and escape.
   * @returns {string} The quoted and escaped argument.
   * @throws {TypeError} The argument is not stringable.
   * @since 1.6.7
   */
  quote(arg) {
    arg = toString(arg);
    return this._quote(arg);
  }

  /**
   * Take an array of values, the arguments, put OS-specific quotes around every
   * argument and escape any dangerous characters in every argument.
   *
   * Non-array inputs will be converted to one-value arrays and non-string
   * values will be converted to strings using the `toString()` method.
   *
   * @param {string[]} args The arguments to quote and escape.
   * @returns {string[]} The quoted and escaped arguments.
   * @throws {TypeError} One of the arguments is not stringable.
   * @since 1.6.7
   */
  quoteAll(args) {
    args = toArrayIfNecessary(args);
    return args.map((arg) => this.quote(arg));
  }
}
