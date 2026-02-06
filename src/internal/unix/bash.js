/**
 * @overview Provides functionality for the Bourne-again shell (Bash).
 * @license MPL-2.0
 */

import RegExp from "@ericcornelissen/lregexp";

/**
 * Returns a function to escape arguments for use in Bash for the given use
 * case.
 *
 * @returns {function(string): string} A function to escape arguments.
 */
export function getEscapeFunction() {
  const controls = new RegExp("[\0\u0008\r\u001B\u009B]", "g");
  const newlines = new RegExp("\n", "g");
  const backslashes = new RegExp("\\\\", "g");
  const comments = new RegExp("(^|\\s)#", "g");
  const home = new RegExp("(^|[\\s:=])~", "g");
  const specials = new RegExp("([\"$&'()*;<>?`{|])", "g");
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
 * Escape an argument for use in Bash when the argument is being quoted.
 *
 * @returns {function(string): string} A function to escape arguments.
 */
function getQuoteEscapeFunction() {
  const controls = new RegExp("[\0\u0008\u001B\u009B]", "g");
  const crs = new RegExp("(?:(\r\n)|\r)", "g");
  const quotes = new RegExp("'", "g");
  return (arg) =>
    arg.replace(controls, "").replace(crs, "$1").replace(quotes, "'\\''");
}

/**
 * Quotes an argument for use in Bash.
 *
 * @param {string} arg The argument to quote.
 * @returns {string} The quoted argument.
 */
function quoteArg(arg) {
  return `'${arg}'`;
}

/**
 * Returns a pair of functions to escape and quote arguments for use in Bash.
 *
 * @returns {(function(string): string)[]} A function pair to escape & quote arguments.
 */
export function getQuoteFunction() {
  return [getQuoteEscapeFunction(), quoteArg];
}

/**
 * Remove any prefix from the provided argument that might be interpreted as a
 * flag on Unix systems for Bash.
 *
 * @param {string} arg The argument to update.
 * @returns {string} The updated argument.
 */
function stripFlagPrefix(arg) {
  return arg.replace(/^-+/gu, "");
}

/**
 * Returns a function to protect against flag injection for Bash.
 *
 * @returns {function(string): string} A function to protect against flag injection.
 */
export function getFlagProtectionFunction() {
  return stripFlagPrefix;
}
