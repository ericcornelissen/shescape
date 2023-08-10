import shescape from "shescape";

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
export const shescape: {
  escape: shescape.escape;
  escapeAll: shescape.escapeAll;
  quote: shescape.quote;
  quoteAll: shescape.quoteAll;
};
