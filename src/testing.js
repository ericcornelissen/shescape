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
   * @returns {string} Never returns.
   * @throws {Error} Always throws.
   */
  escape(_arg) {
    throw new Error("escape can't succeed");
  }

  /**
   * Always throws an error.
   *
   * @param {string[]} _args The arguments to escape.
   * @returns {string[]} Never returns.
   * @throws {Error} Always throws.
   */
  escapeAll(_args) {
    throw new Error("escapeAll can't succeed");
  }

  /**
   * Always throws an error.
   *
   * @param {string} _arg The argument to quote and escape.
   * @returns {string} Never returns.
   * @throws {Error} Always throws.
   */
  quote(_arg) {
    throw new Error("quote can't succeed");
  }

  /**
   * Always throws an error.
   *
   * @param {string[]} _args The arguments to quote and escape.
   * @returns {string[]} Never returns.
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
   * @param {object} [options] The options for escaping.
   * @param {boolean|string} [options.shell] The shell to simulate.
   */
  constructor(options = {}) {
    this.shell = options.shell;
  }

  /**
   * Take a single value and escape any dangerous characters.
   *
   * @param {string} arg The argument to escape.
   * @returns {string} The escaped argument.
   * @throws {TypeError} If `arg` is not a stringable value.
   */
  escape(arg) {
    return checkedToString(arg);
  }

  /**
   * Take an array of values and escape any dangerous characters in every
   * element.
   *
   * @param {string[]} args The arguments to escape.
   * @returns {string[]} The escaped arguments.
   * @throws {TypeError} If `args` is not an array.
   * @throws {TypeError} If any element of `args` is not a stringable value.
   */
  escapeAll(args) {
    ensureArray(args);
    return args.map((arg) => this.escape(arg));
  }

  /**
   * Take a single value, quote it, and escape any dangerous characters.
   *
   * @param {string} arg The argument to quote and escape.
   * @returns {string} The quoted and escaped argument.
   * @throws {Error} If `shell` is set to `false`.
   * @throws {TypeError} If `arg` is not a stringable value.
   */
  quote(arg) {
    if (this.shell === false) {
      throw new Error("Shell may not be false");
    }

    return this.escape(arg);
  }

  /**
   * Take an array of values, quote every element, and escape any dangerous
   * characters in every element.
   *
   * @param {string[]} args The arguments to quote and escape.
   * @returns {string[]} The quoted and escaped arguments.
   * @throws {Error} If `shell` is set to `false`.
   * @throws {TypeError} If `args` is not an array.
   * @throws {TypeError} If any element of `args` is not a stringable value.
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
   * @param {object} [_options] The options (ignored).
   * @throws {Error} Always throws.
   */
  constructor(_options) {
    throw new Error("Can't be instantiated");
  }
}
