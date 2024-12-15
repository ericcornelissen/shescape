/**
 * @overview Provides functionality for the Bourne-again shell (Bash).
 * @license MPL-2.0
 */

/**
 * Escape an argument for use in Bash.
 *
 * @param {string} arg The argument to escape.
 * @returns {string} The escaped argument.
 */
function escapeArg(arg) {
  return arg
    .replaceAll(/[\0\u0008\r\u001B\u009B]/gu, "")
    .replaceAll("\n", " ")
    .replaceAll("\\", "\\\\")
    .replaceAll(/(?<=^|\s)([#~])/gu, "\\$1")
    .replaceAll(/(["$&'()*;<>?`{|])/gu, "\\$1")
    .replaceAll(/(?<=[:=])(~)(?=[\s+\-/0:=]|$)/gu, "\\$1")
    .replaceAll(/([\t ])/gu, "\\$1");
}

/**
 * Returns a function to escape arguments for use in Bash for the given use
 * case.
 *
 * @returns {Function} A function to escape arguments.
 */
export function getEscapeFunction() {
  return escapeArg;
}

/**
 * Escape an argument for use in Bash when the argument is being quoted.
 *
 * @param {string} arg The argument to escape.
 * @returns {string} The escaped argument.
 */
function escapeArgForQuoted(arg) {
  return arg
    .replaceAll(/[\0\u0008\u001B\u009B]/gu, "")
    .replaceAll(/\r(?!\n)/gu, "")
    .replaceAll("'", "'\\''");
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
 * @returns {Function[]} A function pair to escape & quote arguments.
 */
export function getQuoteFunction() {
  return [escapeArgForQuoted, quoteArg];
}

/**
 * Remove any prefix from the provided argument that might be interpreted as a
 * flag on Unix systems for Bash.
 *
 * @param {string} arg The argument to update.
 * @returns {string} The updated argument.
 */
function stripFlagPrefix(arg) {
  return arg.replaceAll(/^-+/gu, "");
}

/**
 * Returns a function to protect against flag injection for Bash.
 *
 * @returns {Function} A function to protect against flag injection.
 */
export function getFlagProtectionFunction() {
  return stripFlagPrefix;
}
