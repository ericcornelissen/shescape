/**
 * @overview Provides functionality for the Debian Almquist shell (Dash).
 * @license MPL-2.0
 */

/**
 * Escape an argument for use in Dash when interpolation is active.
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
    .replace(/(["$&'()*;<>?`|])/gu, "\\$1")
    .replace(/([\t\n ])/gu, "\\$1");
}

/**
 * Escape an argument for use in Dash when the argument is being quoted.
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
 * Escape an argument for use in Dash when the argument is not being quoted (but
 * interpolation is inactive).
 *
 * @param {string} arg The argument to escape.
 * @returns {string} The escaped argument.
 */
function escapeForUnquoted(arg) {
  return arg.replace(/[\0\u0008\u001B\u009B]/gu, "").replace(/\r(?!\n)/gu, "");
}

/**
 * Returns a function to escape arguments for use in Dash for the given use
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
 * Quotes an argument for use in Dash.
 *
 * @param {string} arg The argument to quote.
 * @returns {string} The quoted argument.
 */
function quoteArg(arg) {
  return `'${arg}'`;
}

/**
 * Returns a pair of functions to escape and quote arguments for use in Dash.
 *
 * @returns {Function[]} Two functions to escape & quote arguments.
 */
export function getQuoteFunction() {
  return [escapeForQuoted, quoteArg];
}

/**
 * Returns a function to remove any prefix from the provided argument that might
 * be interpreted as a flag on Unix systems for Dash.
 *
 * @returns {Function} A function to strip flag prefixes.
 */
export function getStripFlagPrefixFunction() {
  return (arg) => arg.replace(/^-+/gu, "");
}
