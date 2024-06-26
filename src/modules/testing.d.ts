/**
 * @overview Contains TypeScript type definitions for shescape/testing.
 * @license MPL-2.0
 */

import type { Shescape as ShescapeType } from "./index.d.ts";

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
 * A test stub of Shescape that can be instantiated but all methods always fail.
 * This can be used to simulate a failure when using Shescape in your code.
 */
export const Failscape: ShescapeType;

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
export const Stubscape: ShescapeType;

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
export const Shescape: ShescapeType;

/**
 * A test stub of Shescape that can't be instantiated. This can be used to
 * simulate a failure to instantiate Shescape in your code.
 */
export const Throwscape: ShescapeType;
