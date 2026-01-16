/**
 * @overview Provides functionality for the C shell (csh).
 * @license MPL-2.0
 */

import { TextEncoder } from "node:util";

import RegExp from "@ericcornelissen/lregexp";

/**
 * Returns a function to escape arguments for use in csh for the given use case.
 *
 * @returns {function(string): string} A function to escape arguments.
 */
export function getEscapeFunction() {
  const controls = new RegExp("[\0\u0008\r\u001B\u009B]", "g");
  const newlines = new RegExp("\n", "g");
  const backslashes = new RegExp("\\\\", "g");
  const home = new RegExp("(^|\\s)~", "g");
  const history = new RegExp("!", "g");
  const specials = new RegExp("([\"#$&'()*;<>?[`{|])", "g");
  const whitespace = new RegExp("([\t ])", "g");

  const textEncoder = new TextEncoder();
  return (arg) =>
    arg
      .replace(controls, "")
      .replace(newlines, " ")
      .replace(backslashes, "\\\\")
      .replace(home, "$1\\~")
      .replace(history, "\\!")
      .replace(specials, "\\$1")
      .replace(whitespace, "\\$1")
      .split("")
      .map(
        // Due to a bug in C shell version 20110502-7, when a character whose
        // utf-8 encoding includes the bytes 0xA0 (160 in decimal) appears in
        // an argument after an escaped character, it will hang and endlessly
        // consume memory unless the character is escaped with quotes.
        // ref: https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=995013
        (char) => (textEncoder.encode(char).includes(160) ? `'${char}'` : char),
      )
      .join("");
}

/**
 * Escape an argument for use in csh when the argument is being quoted.
 *
 * @param {string} arg The argument to escape.
 * @returns {string} The escaped argument.
 */
function escapeArgForQuoted(arg) {
  return arg
    .replace(/[\0\u0008\r\u001B\u009B]/gu, "")
    .replace(/\n/gu, " ")
    .replace(/'/gu, "'\\''")
    .replace(/\\!$/gu, "\\\\!")
    .replace(/!(?!$)/gu, "\\!");
}

/**
 * Quotes an argument for use in csh.
 *
 * @param {string} arg The argument to quote.
 * @returns {string} The quoted argument.
 */
function quoteArg(arg) {
  return `'${arg}'`;
}

/**
 * Returns a pair of functions to escape and quote arguments for use in csh.
 *
 * @returns {(function(string): string)[]} A function pair to escape & quote arguments.
 */
export function getQuoteFunction() {
  return [escapeArgForQuoted, quoteArg];
}

/**
 * Remove any prefix from the provided argument that might be interpreted as a
 * flag on Unix systems for csh.
 *
 * @param {string} arg The argument to update.
 * @returns {string} The updated argument.
 */
function stripFlagPrefix(arg) {
  return arg.replace(/^-+/gu, "");
}

/**
 * Returns a function to protect against flag injection for csh.
 *
 * @returns {function(string): string} A function to protect against flag injection.
 */
export function getFlagProtectionFunction() {
  return stripFlagPrefix;
}
