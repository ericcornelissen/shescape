/**
 * @overview Provides functionality for the BusyBox shell.
 * @license MPL-2.0
 */

import RegExp from "@ericcornelissen/lregexp";

/**
 * Returns a function to escape arguments for use in BusyBox for the given use
 * case.
 *
 * @returns {function(string): string} A function to escape arguments.
 */
export function getEscapeFunction() {
  const controls = new RegExp("[\0\u0008\r\u001B\u009B]", "g");
  const newlines = new RegExp("\n", "g");
  const backslashes = new RegExp("\\\\", "g");
  const comments = new RegExp("(^|\\s)#", "g");
  const home = new RegExp("(^|\\s)~", "g");
  const specials = new RegExp("([\"$&'()*;<>?`|])", "g");
  const whitespace = new RegExp("([\t ])", "g");
  return (arg) =>
    arg
      .replace(controls, "")
      .replace(newlines, " ")
      .replace(backslashes, "\\\\")
      .replace(comments, "$1\\#")
      .replace(home, "$1\\~")
      .replace(specials, "\\$1")
      .replace(whitespace, "\\$1");
}

/**
 * Returns a pair of functions to escape and quote arguments for use in BusyBox.
 *
 * @returns {(function(string): string)[]} A function pair to escape & quote arguments.
 */
export function getQuoteFunction() {
  const controlCharacters = new RegExp("[\0\u0008\u001B\u009B]", "g");
  const carriageReturns = new RegExp("(?:(\r\n)|\r)", "g");
  const quotes = new RegExp("'", "g");
  return [
    (arg) =>
      arg
        .replace(controlCharacters, "")
        .replace(carriageReturns, "$1")
        .replace(quotes, "'\\''"),
    (arg) => `'${arg}'`,
  ];
}

/**
 * Remove any prefix from the provided argument that might be interpreted as a
 * flag on Unix systems for BusyBox.
 *
 * @param {string} arg The argument to update.
 * @returns {string} The updated argument.
 */
function stripFlagPrefix(arg) {
  return arg.replace(/^-+/gu, "");
}

/**
 * Returns a function to protect against flag injection for BusyBox.
 *
 * @returns {function(string): string} A function to protect against flag injection.
 */
export function getFlagProtectionFunction() {
  return stripFlagPrefix;
}
