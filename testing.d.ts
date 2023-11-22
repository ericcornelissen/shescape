/**
 * @overview Contains TypeScript type definitions for shescape/testing.
 * @license MPL-2.0
 */

import type { Shescape as ShescapeType } from "shescape";

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
export const injectionStrings: string[];

/**
 * A test stub of shescape that has the same input-output profile as the real
 * shescape implementation.
 *
 * In particular:
 * - Returns a string for all stringable inputs.
 * - Errors on non-stringable inputs.
 * - Converts non-array inputs to single-item arrays where necessary.
 */
export const Shescape: ShescapeType;

/**
 * A test stub of Shescape that can't be instantiated. This can be used to
 * simulate a failure to instantiate Shescape in your code.
 */
export const Throwscape: ShescapeType;
