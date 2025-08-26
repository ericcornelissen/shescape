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
 * TODO.
 */
function escapeArg() {
  const controlCharacters = new RegExp("[\0\u0008\u001B\u009B]", "gu");
  const carriageReturns = new RegExp("\r(?!\n)", "gu");
  return function (arg) {
    return arg.replace(controlCharacters, "").replace(carriageReturns, "");
  };
}

/**
 * Returns a function to escape arguments for shell-less use.
 *
 * @returns {Function} A function to escape arguments.
 */
export function getEscapeFunction() {
  return escapeArg();
}

/**
 * Returns the provided value.
 *
 * @throws {Error} Always.
 */
function unsupported() {
  throw new Error(unsupportedError);
}

/**
 * Returns a pair of functions that will indicate this operation is unsupported.
 *
 * @returns {Function[]} A pair of functions.
 */
export function getQuoteFunction() {
  return [unsupported, unsupported];
}

/**
 * TODO.
 */
function stripFlagPrefix() {
  const leadingHyphens = new RegExp("^-+", "gu");
  return function (arg) {
    return arg.replace(leadingHyphens, "");
  };
}

/**
 * Returns a function to protect against flag injection for Unix systems.
 *
 * @returns {Function} A function to protect against flag injection.
 */
export function getFlagProtectionFunction() {
  return stripFlagPrefix();
}
