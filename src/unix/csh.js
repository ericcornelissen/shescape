/**
 * @overview Provides functionality specifically for the C shell (csh).
 * @license MPL-2.0
 */

/**
 * TODO.
 *
 * @param {string} arg The argument to escape.
 * @returns {string} The escaped argument.
 */
function escapeForInterpolation(arg) {
  const textEncoder = new TextEncoder();
  return arg
    .replace(/[\0\u0008\u001B\u009B]/gu, "")
    .replace(/\r?\n|\r/gu, " ")
    .replace(/\\/gu, "\\\\")
    .replace(/(^|\s)(~)/gu, "$1\\$2")
    .replace(/(["#$&'()*;<>?[`{|])/gu, "\\$1")
    .replace(/([\t ])/gu, "\\$1")
    .split("")
    .map(
      // Due to a bug in C shell version 20110502-7, when a character whose
      // utf-8 encoding includes the bytes 0xA0 (160 in decimal) appears in
      // an argument after an escaped character, it will hang and endlessly
      // consume memory unless the character is escaped with quotes.
      // ref: https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=995013
      (char) => (textEncoder.encode(char).includes(160) ? `'${char}'` : char)
    )
    .join("")
    .replace(/!(?!$)/gu, "\\!");
}

/**
 * TODO.
 *
 * @param {string} arg The argument to escape.
 * @returns {string} The escaped argument.
 */
function escapeForQuoted(arg) {
  return arg
    .replace(/[\0\u0008\u001B\u009B]/gu, "")
    .replace(/\r?\n|\r/gu, " ")
    .replace(/\\!$/gu, "\\\\!")
    .replace(/'/gu, `'\\''`)
    .replace(/!(?!$)/gu, "\\!");
}

/**
 * TODO.
 *
 * @param {string} arg The argument to escape.
 * @returns {string} The escaped argument.
 */
function escapeForUnquoted(arg) {
  return arg
    .replace(/[\0\u0008\u001B\u009B]/gu, "")
    .replace(/\r?\n|\r/gu, " ")
    .replace(/\\!$/gu, "\\\\!")
    .replace(/!(?!$)/gu, "\\!");
}

/**
 * TODO.
 *
 * @param {object} options The options for escaping arguments.
 * @param {boolean} options.interpolation Is interpolation enabled.
 * @param {boolean} options.quoted Will the arguments be quoted.
 * @returns {Function} A function to escape arguments.
 */
export function getEscapeFunction(options) {
  if (options.interpolation) {
    return escapeForInterpolation;
  } else if (options.quoted) {
    return escapeForQuoted;
  } else {
    return escapeForUnquoted;
  }
}

/**
 * Quotes an argument for use in a Unix shell.
 *
 * @param {string} arg The argument to quote.
 * @returns {string} The quoted argument.
 */
function quoteArg(arg) {
  return `'${arg}'`;
}

/**
 * Returns a function to quote arguments for use in a particular shell.
 *
 * @returns {Function} A function to quote arguments.
 */
export function getQuoteFunction() {
  return quoteArg;
}