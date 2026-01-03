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
  const controls = new RegExp("[\0\u0008\u001B\u009B]", "g");
  const crs = new RegExp("(?:(\r\n)|\r)", "g");
  const quotes = new RegExp("'", "g");
  return [
    (arg) =>
      arg.replace(controls, "").replace(crs, "$1").replace(quotes, "'\\''"),
    (arg) => `'${arg}'`,
  ];
}

/**
 * Returns a function to protect against flag injection for BusyBox.
 *
 * @returns {function(string): string} A function to protect against flag injection.
 */
export function getFlagProtectionFunction() {
  const leadingHyphens = new RegExp("^-+");
  return (arg) => arg.replace(leadingHyphens, "");
}
