/**
 * @overview Provides instances of shescape for testing purposes.
 * @license MPL-2.0
 */

import { checkedToString, ensureArray } from "./internal/reflection.js";

/**
 * A list of example shell injection strings to test whether or not a function
 * is vulnerable to shell injection.
 *
 * @example
 * for (const injectionString of injectionStrings) {
 *   const result = functionThatIsUsingShescape(injectionString);
 *   assert.equal(result, "no injection");
 * }
 */
export const injectionStrings = [
  "\u0000world",
  "&& ls",
  "'; ls #",
  '"; ls #',
  "$PATH",
  "$Env:PATH",
  "%PATH%",
];

/**
 * A test stub of Shescape that can be instantiated but all methods always fail.
 * This can be used to simulate a failure when using Shescape in your code.
 */
export class Failscape {
  /**
   * Always throws an error.
   *
   * @param {string} _arg The argument to escape.
   * @throws {Error} Always throws.
   */
  escape(_arg) {
    throw new Error("escape can't succeed");
  }

  /**
   * Always throws an error.
   *
   * @param {string[]} _args The arguments to escape.
   * @throws {Error} Always throws.
   */
  escapeAll(_args) {
    throw new Error("escapeAll can't succeed");
  }

  /**
   * Always throws an error.
   *
   * @param {string} _arg The argument to quote and escape.
   * @throws {Error} Always throws.
   */
  quote(_arg) {
    throw new Error("quote can't succeed");
  }

  /**
   * Always throws an error.
   *
   * @param {string[]} _args The arguments to quote and escape.
   * @throws {Error} Always throws.
   */
  quoteAll(_args) {
    throw new Error("quoteAll can't succeed");
  }
}

/**
 * An optimistic test stub of Shescape that has the same input-output profile as
 * the real Shescape implementation.
 *
 * In particular:
 * - The constructor never fails.
 * - Returns a string for all stringable inputs.
 * - Errors on non-stringable inputs.
 * - Errors on non-array inputs where arrays are expected.
 * - Errors when trying to quote when `shell: false`.
 */
export class Stubscape {
  /**
   * Create a new {@link Stubscape} instance.
   *
   * @param {object} [options] The escape options.
   * @param {boolean | string} [options.shell=true] The shell to escape for.
   */
  constructor(options = {}) {
    this.shell = options.shell;
  }

  /**
   * Take a single value, the argument, and pretend to escape it.
   *
   * @param {string} arg The argument to escape.
   * @returns {string} The escaped argument.
   * @throws {TypeError} The argument is not stringable.
   */
  escape(arg) {
    return checkedToString(arg);
  }

  /**
   * Take an array of values, the arguments, and pretend to escape every
   * argument.
   *
   * @param {string[]} args The arguments to escape.
   * @returns {string[]} The escaped arguments.
   * @throws {TypeError} The arguments are not an array.
   * @throws {TypeError} One of the arguments is not stringable.
   */
  escapeAll(args) {
    ensureArray(args);
    return args.map((arg) => this.escape(arg));
  }

  /**
   * Take a single value, the argument, and pretend to quote and escape it.
   *
   * @param {string} arg The argument to quote and escape.
   * @returns {string} The quoted and escaped argument.
   * @throws {TypeError} The argument is not stringable.
   * @throws {Error} Quoting is not supported with `shell: false`.
   */
  quote(arg) {
    if (this.shell === false) {
      throw new Error("Shell may not be false");
    }

    return this.escape(arg);
  }

  /**
   * Take an array of values, the arguments, and pretend to quote and escape
   * every argument.
   *
   * @param {string[]} args The arguments to quote and escape.
   * @returns {string[]} The quoted and escaped arguments.
   * @throws {TypeError} The arguments are not an array.
   * @throws {TypeError} One of the arguments is not stringable.
   * @throws {Error} Quoting is not supported with `shell: false`.
   */
  quoteAll(args) {
    ensureArray(args);
    return args.map((arg) => this.quote(arg));
  }
}

/**
 * An optimistic test stub of Shescape that has the same input-output profile as
 * the real Shescape implementation.
 *
 * In particular:
 * - The constructor never fails.
 * - Returns a string for all stringable inputs.
 * - Errors on non-stringable inputs.
 * - Errors on non-array inputs where arrays are expected.
 * - Errors when trying to quote when `shell: false`.
 *
 * @deprecated Use {@link Stubscape} instead.
 * @alias Stubscape
 */
export const Shescape = Stubscape;

/**
 * A test stub of Shescape that can't be instantiated. This can be used to
 * simulate a failure to instantiate Shescape in your code.
 */
export class Throwscape {
  /**
   * Always throws an error.
   *
   * @param {object} [_options] The escape options.
   * @throws {Error} Always throws.
   */
  constructor(_options) {
    throw new Error("Can't be instantiated");
  }
}
