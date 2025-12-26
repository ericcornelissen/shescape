/**
 * @overview Provides functionality for shell-less escaping on Unix systems.
 * @license MPL-2.0
 */

import RegExp from "@ericcornelissen/lregexp";

/**
 * The error message for use of quoting functionality.
 *
 * @constant
 * @type {string}
 */
const unsupportedError = "Quoting is not supported when no shell is used";

/**
 * Returns a function to escape arguments for shell-less use.
 *
 * @returns {function(string): string} A function to escape arguments.
 */
export function getEscapeFunction() {
  const controlCharacters = new RegExp("[\0\u0008\u001B\u009B]", "g");
  const carriageReturns = new RegExp("(?:(\r\n)|\r)", "g");
  return (arg) =>
    arg.replace(controlCharacters, "").replace(carriageReturns, "$1");
}

/**
 * Returns the provided value.
 *
 * @returns {never} Does not return.
 * @throws {Error} Always throws an error.
 */
function unsupported() {
  throw new Error(unsupportedError);
}

/**
 * Returns a pair of functions that will indicate this operation is unsupported.
 *
 * @returns {(function(string): string)[]} A pair of functions.
 */
export function getQuoteFunction() {
  return [unsupported, unsupported];
}

/**
 * Returns a function to protect against flag injection for Unix systems.
 *
 * @returns {function(string): string} A function to protect against flag injection.
 */
export function getFlagProtectionFunction() {
  const leadingHyphens = new RegExp("^-+");
  return (arg) => arg.replace(leadingHyphens, "");
}
