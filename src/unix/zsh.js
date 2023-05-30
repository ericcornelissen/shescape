/**
 * @overview Provides functionality for the Z shell (Zsh).
 * @license MPL-2.0
 */

/**
 * Escape an argument for use in Zsh when interpolation is active.
 *
 * @param {string} arg The argument to escape.
 * @returns {string} The escaped argument.
 */
function escapeForInterpolation(arg) {
  return arg
    .replace(/[\0\u0008\u001B\u009B]/gu, "")
    .replace(/\r(?!\n)/gu, "")
    .replace(/\\/gu, "\\\\")
    .replace(/\r?\n/gu, " ")
    .replace(/(?<=^|\s)([#=~])/gu, "\\$1")
    .replace(/(["$&'()*;<>?[\]`{|}])/gu, "\\$1")
    .replace(/([\t ])/gu, "\\$1");
}

/**
 * Escape an argument for use in Zsh when the argument is being quoted.
 *
 * @param {string} arg The argument to escape.
 * @returns {string} The escaped argument.
 */
function escapeForQuoted(arg) {
  return arg
    .replace(/[\0\u0008\u001B\u009B]/gu, "")
    .replace(/\r(?!\n)/gu, "")
    .replace(/'/gu, `'\\''`);
}

/**
 * Escape an argument for use in Zsh when the argument is not being quoted (but
 * interpolation is inactive).
 *
 * @param {string} arg The argument to escape.
 * @returns {string} The escaped argument.
 */
function escapeForUnquoted(arg) {
  return arg.replace(/[\0\u0008\u001B\u009B]/gu, "").replace(/\r(?!\n)/gu, "");
}

/**
 * Returns a function to escape arguments for use in Zsh for the given use case.
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
 * Quotes an argument for use in Zsh.
 *
 * @param {string} arg The argument to quote and escape.
 * @returns {string} The quoted and escaped argument.
 */
function quoteArg(arg) {
  const escapedArg = escapeForQuoted(arg);
  return `'${escapedArg}'`;
}

/**
 * Returns a function to quote arguments for use in Zsh.
 *
 * @returns {Function} A function to quote arguments.
 */
export function getQuoteFunction() {
  return quoteArg;
}
