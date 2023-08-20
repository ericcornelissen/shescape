/**
 * @overview Provides instances of shescape for testing purposes.
 * @license MPL-2.0
 */

import { checkedToString } from "./src/reflection.js";

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
 * A test stub of Shescape that has the same input-output profile as the real
 * shescape implementation.
 *
 * In particular:
 * - Returns a string for all stringable inputs.
 * - Errors on non-stringable inputs.
 * - Converts non-array inputs to single-item arrays where necessary.
 */
export class Shescape {
  constructor(_options) {
    // Nothing to do.
  }

  escape(arg) {
    return checkedToString(arg);
  }

  escapeAll(args) {
    return args.map((arg) => this.escape(arg));
  }

  quote(arg) {
    return this.escape(arg);
  }

  quoteAll(args) {
    return this.escapeAll(args);
  }
}
