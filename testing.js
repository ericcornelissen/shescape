/**
 * @overview Provides instances of shescape for testing purposes.
 * @license MPL-2.0
 */

import { checkedToString, toArrayIfNecessary } from "./src/reflection.js";

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
 * A test stub of shescape that has the same input-output profile as the real
 * shescape implementation.
 *
 * In particular:
 * - Returns a string for all stringable inputs.
 * - Errors on non-stringable inputs.
 * - Converts non-array inputs to single-item arrays where necessary.
 */
export const shescape = {
  escape: (arg, _options) => checkedToString(arg),
  escapeAll: (args, _options) => {
    args = toArrayIfNecessary(args);
    return args.map(shescape.escape);
  },
  quote: (arg, _options) => shescape.escape(arg),
  quoteAll: (args, _options) => shescape.escapeAll(args),
};
