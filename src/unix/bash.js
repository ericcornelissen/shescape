/**
 * @overview Provides functionality for the Bourne-again shell (Bash).
 * @license MPL-2.0
 */

/**
 * Escape an argument for use in Bash when interpolation is active.
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
    .replace(/(?<=^|\s)([#~])/gu, "\\$1")
    .replace(/(["$&'()*;<>?`{|])/gu, "\\$1")
    .replace(/(?<=[:=])(~)(?=[\s+\-/0:=]|$)/gu, "\\$1")
    .replace(/([\t ])/gu, "\\$1");
}

/**
 * Escape an argument for use in Bash when the argument is not being quoted (but
 * interpolation is inactive).
 *
 * @param {string} arg The argument to escape.
 * @returns {string} The escaped argument.
 */
function escapeForUnquoted(arg) {
  return arg.replace(/[\0\u0008\u001B\u009B]/gu, "").replace(/\r(?!\n)/gu, "");
}

/**
 * Returns a function to escape arguments for use in Bash for the given use
 * case.
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
 * Quotes an argument for use in Bash.
 *
 * @param {string} arg The argument to quote and escape.
 * @returns {string} The quoted and escaped argument.
 */
function quoteArg(arg) {
  const escapedArg = arg
    .replace(/[\0\u0008\u001B\u009B]/gu, "")
    .replace(/\r(?!\n)/gu, "")
    .replace(/'/gu, `'\\''`);
  return `'${escapedArg}'`;
}

/**
 * Returns a function to quote arguments for use in Bash.
 *
 * @returns {Function} A function to quote arguments.
 */
export function getQuoteFunction() {
  return quoteArg;
}
