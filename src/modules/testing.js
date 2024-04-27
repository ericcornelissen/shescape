/**
 * @overview Provides instances of shescape for testing purposes.
 * @license MPL-2.0
 */

import { checkedToString } from "../internal/reflection.js";

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
  "\x00world",
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
  constructor(_options) {
    // Nothing to do here
  }

  escape(_arg) {
    throw new Error("escape can't succeed");
  }

  escapeAll(_args) {
    throw new Error("escapeAll can't succeed");
  }

  quote(_arg) {
    throw new Error("quote can't succeed");
  }

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
  constructor(options = {}) {
    this.shell = options.shell;
  }

  escape(arg) {
    return checkedToString(arg);
  }

  escapeAll(args) {
    return args.map((arg) => this.escape(arg));
  }

  quote(arg) {
    if (this.shell === false) {
      throw new Error();
    }

    return this.escape(arg);
  }

  quoteAll(args) {
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
 * @alias Stubscape
 */
export const Shescape = Stubscape;

/**
 * A test stub of Shescape that can't be instantiated. This can be used to
 * simulate a failure to instantiate Shescape in your code.
 */
export class Throwscape {
  constructor(_options) {
    throw new Error("Can't be instantiated");
  }
}
