/**
 * @overview Provides functionality for the C shell (csh).
 * @license MPL-2.0
 */

import { TextEncoder } from "node:util";

/**
 * Escape an argument for use in csh.
 *
 * @param {string} arg The argument to escape.
 * @returns {string} The escaped argument.
 */
function escapeArg(arg) {
  const textEncoder = new TextEncoder();
  return arg
    .replace(/[\0\u0008\r\u001B\u009B]/gu, "")
    .replace(/\n/gu, " ")
    .replace(/\\/gu, "\\\\")
    .replace(/(?<=^|\s)(~)/gu, "\\$1")
    .replace(/!(?!$)/gu, "\\!")
    .replace(/(["#$&'()*;<>?[`{|])/gu, "\\$1")
    .replace(/([\t ])/gu, "\\$1")
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
 * Returns a function to escape arguments for use in csh for the given use case.
 *
 * @returns {Function} A function to escape arguments.
 */
export function getEscapeFunction() {
  return escapeArg;
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
 * @returns {Function[]} A function pair to escape & quote arguments.
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
 * @returns {Function} A function to protect against flag injection.
 */
export function getFlagProtectionFunction() {
  return stripFlagPrefix;
}
