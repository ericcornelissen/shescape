/**
 * @overview Provides functionality for Windows PowerShell.
 * @license MPL-2.0
 */

/**
 * Escape an argument for use in PowerShell.
 *
 * @param {string} arg The argument to escape.
 * @returns {string} The escaped argument.
 */
function escapeArg(arg) {
  arg = arg
    .replaceAll(/[\0\u0008\r\u001B\u009B]/gu, "")
    .replaceAll("\n", " ")
    .replaceAll("`", "``")
    .replaceAll(/(?<=^|[\s\u0085])([*1-6]?)(>)/gu, "$1`$2")
    .replaceAll(/(?<=^|[\s\u0085])([#\-:<@\]])/gu, "`$1")
    .replaceAll(/([$&'(),;{|}‘’‚‛“”„])/gu, "`$1");

  if (/[\s\u0085]/u.test(arg.replaceAll(/^[\s\u0085]+/gu, ""))) {
    arg = arg
      .replaceAll(/(?<!\\)(\\*)"/gu, '$1$1`"`"')
      .replaceAll(/(?<!\\)(\\+)$/gu, "$1$1");
  } else {
    arg = arg.replaceAll(/(?<!\\)(\\*)"/gu, '$1$1\\`"');
  }

  arg = arg.replaceAll(/([\s\u0085])/gu, "`$1");

  return arg;
}

/**
 * Returns a function to escape arguments for use in PowerShell for the given
 * use case.
 *
 * @returns {Function} A function to escape arguments.
 */
export function getEscapeFunction() {
  return escapeArg;
}

/**
 * Escape an argument for use in PowerShell when the argument is being quoted.
 *
 * @param {string} arg The argument to escape.
 * @returns {string} The escaped argument.
 */
function escapeArgForQuoted(arg) {
  arg = arg
    .replaceAll(/[\0\u0008\u001B\u009B]/gu, "")
    .replaceAll(/\r(?!\n)/gu, "")
    .replaceAll(/(['‘’‚‛])/gu, "$1$1");

  if (/[\s\u0085]/u.test(arg)) {
    arg = arg
      .replaceAll(/(?<!\\)(\\*)"/gu, '$1$1""')
      .replaceAll(/(?<!\\)(\\+)$/gu, "$1$1");
  } else {
    arg = arg.replaceAll(/(?<!\\)(\\*)"/gu, '$1$1\\"');
  }

  return arg;
}

/**
 * Quotes an argument for use in PowerShell.
 *
 * @param {string} arg The argument to quote and escape.
 * @returns {string} The quoted and escaped argument.
 */
function quoteArg(arg) {
  return `'${arg}'`;
}

/**
 * Returns a pair of functions to escape and quote arguments for use in
 * PowerShell.
 *
 * @returns {Function[]} A function pair to escape & quote arguments.
 */
export function getQuoteFunction() {
  return [escapeArgForQuoted, quoteArg];
}

/**
 * Remove any prefix from the provided argument that might be interpreted as a
 * flag on Windows systems for PowerShell.
 *
 * @param {string} arg The argument to update.
 * @returns {string} The updated argument.
 */
function stripFlagPrefix(arg) {
  return arg.replaceAll(/^(?:`?-+|\/+)/gu, "");
}

/**
 * Returns a function to protect against flag injection for PowerShell.
 *
 * @returns {Function} A function to protect against flag injection.
 */
export function getFlagProtectionFunction() {
  return stripFlagPrefix;
}
