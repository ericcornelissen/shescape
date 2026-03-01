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
  const controls = new RegExp("[\0\u0008\r\u001B\u009B]", "g");
  const newlines = new RegExp("\n", "g");
  const quotes = new RegExp('(^|[^\\\\])(\\\\*)"', "g");
  const specials = new RegExp('(["%&<>^|])', "g");
  return (arg) =>
    arg
      .replace(controls, "")
      .replace(newlines, " ")
      .replace(quotes, '$1$2$2\\"')
      .replace(specials, "^$1");
}

/**
 * Escape an argument for use in CMD when the argument is being quoted.
 *
 * @param {string} arg The argument to escape.
 * @returns {string} The escaped argument.
 */
function escapeArgForQuoted(arg) {
  return arg
    .replace(/[\0\u0008\r\u001B\u009B]/gu, "")
    .replace(/\n/gu, " ")
    .replace(/"/gu, '""')
    .replace(/([%&<>^|])/gu, '"^$1"')
    .replace(/(?<!\\)(\\*)(?="|$)/gu, "$1$1");
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
  return [escapeArgForQuoted, quoteArg];
}

/**
 * Remove any prefix from the provided argument that might be interpreted as a
 * flag on Windows systems for CMD.
 *
 * @param {string} arg The argument to update.
 * @returns {string} The updated argument.
 */
function stripFlagPrefix(arg) {
  return arg.replace(/^(?:-+|\/+)/gu, "");
}

/**
 * Returns a function to protect against flag injection for CMD.
 *
 * @returns {function(string): string} A function to protect against flag injection.
 */
export function getFlagProtectionFunction() {
  return stripFlagPrefix;
}
