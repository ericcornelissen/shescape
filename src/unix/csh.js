/**
 * @overview Provides functionality for the C shell (csh).
 * @license MPL-2.0
 */

/**
 * Escape an argument for use in csh when interpolation is active.
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
    .replace(/(?<=^|\s)(~)/gu, "\\$1")
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
 * Escape an argument for use in csh when the argument is being quoted.
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
 * Escape an argument for use in csh when the argument is not being quoted (but
 * interpolation is inactive).
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
 * Returns a function to escape arguments for use in csh for the given use case.
 *
 * @param {object} options The options for escaping arguments.
 * @param {boolean} options.interpolation Is interpolation enabled.
 * @returns {Function} A function to escape arguments.
 */
export function getEscapeFunction(options) {
  if (options.interpolation) {
    return escapeForInterpolation;
  } else {
    return escapeForUnquoted;
  }
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
 * @returns {Function[]} Two functions to escape & quote arguments.
 */
export function getQuoteFunction() {
  return [escapeForQuoted, quoteArg];
}

/**
 * Returns a function to remove any prefix from the provided argument that might
 * be interpreted as a flag on Unix systems for csh.
 *
 * @returns {Function} A function to strip flag prefixes.
 */
export function getStripFlagPrefixFunction() {
  return (arg) => arg.replace(/^-+/gu, "");
}
