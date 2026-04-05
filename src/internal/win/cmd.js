/**
 * @overview Provides functionality for the Windows Command Prompt.
 * @license MPL-2.0
 */

import RegExp from "@ericcornelissen/lregexp";

/**
 * Returns a function to escape arguments for use in CMD for the given use case.
 *
 * @returns {function(string): string} A function to escape arguments.
 */
export function getEscapeFunction() {
  const controls = new RegExp(/[\0\u0008\r\u001B\u009B]/g);
  const newlines = new RegExp(/\n/g);
  const specials = new RegExp(/([%&<>^|])/g);
  const quotes = new RegExp(/"/g);
  const backslashes = new RegExp(/(^|[^\\])(\\*)\0/g);
  return (arg) =>
    arg
      .replace(controls, "")
      .replace(newlines, " ")
      .replace(specials, "^$1")
      .replace(quotes, '\0\\^"')
      .replace(backslashes, "$1$2$2");
}

/**
 * Escape an argument for use in CMD when the argument is being quoted.
 *
 * @returns {function(string): string} A function to escape arguments.
 */
function getQuoteEscapeFunction() {
  const controls = new RegExp(/[\0\u0008\r\u001B\u009B]/g);
  const newlines = new RegExp(/\n/g);
  const quotes = new RegExp(/"/g);
  const specials = new RegExp(/([%&<>^|])/g);
  const backslashes = new RegExp(/(^|[^\\])(\\+)("|$)/g);
  return (arg) =>
    arg
      .replace(controls, "")
      .replace(newlines, " ")
      .replace(quotes, '""')
      .replace(specials, '"^$1"')
      .replace(backslashes, "$1$2$2$3");
}

/**
 * Quotes an argument for use in CMD.
 *
 * @param {string} arg The argument to quote.
 * @returns {string} The quoted argument.
 */
function quoteArg(arg) {
  return `"${arg}"`;
}

/**
 * Returns a pair of functions to escape and quote arguments for use in CMD.
 *
 * @returns {(function(string): string)[]} A function pair to escape & quote arguments.
 */
export function getQuoteFunction() {
  return [getQuoteEscapeFunction(), quoteArg];
}
