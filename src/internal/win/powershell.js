/**
 * @overview Provides functionality for Windows PowerShell.
 * @license MPL-2.0
 */

import RegExp from "@ericcornelissen/lregexp";

/**
 * Returns a function to escape arguments for use in PowerShell for the given
 * use case.
 *
 * @returns {function(string): string} A function to escape arguments.
 */
export function getEscapeFunction() {
  const controls = new RegExp(/[\0\u0008\r\u001B\u009B]/g);
  const newlines = new RegExp(/\n/g);
  const backticks = new RegExp(/`/g);
  const redirects = new RegExp(/(^|[\s\u0085])([*1-6]?)(>)/g);
  const specials1 = new RegExp(/(^|[\s\u0085])([#\-:<@\]])/g);
  const specials2 = new RegExp(/([$&'(),;{|}‘’‚‛“”„])/g);

  const whitespace = new RegExp(/([\s\u0085])/g);
  const whitespacePrefix = new RegExp(/^[\s\u0085]+/);

  const quote = new RegExp('"', "g");
  const backslashBeforeQuote = new RegExp(/(^|[^\\])(\\*)\0/g);

  const backslashSuffix = new RegExp(/([^\\])(\\+)$/);

  return (arg) => {
    arg = arg
      .replace(controls, "")
      .replace(newlines, " ")
      .replace(backticks, "``")
      .replace(redirects, "$1$2`$3")
      .replace(specials1, "$1`$2")
      .replace(specials2, "`$1");

    if (whitespace.test(arg.replace(whitespacePrefix, ""))) {
      arg = arg
        .replace(quote, '\0`"`"')
        .replace(backslashBeforeQuote, "$1$2$2")
        .replace(backslashSuffix, "$1$2$2");
    } else {
      arg = arg
        .replace(quote, '\0\\`"')
        .replace(backslashBeforeQuote, "$1$2$2");
    }

    arg = arg.replace(whitespace, "`$1");

    return arg;
  };
}

/**
 * Escape an argument for use in PowerShell when the argument is being quoted.
 *
 * @returns {function(string): string} A function to escape arguments.
 */
function getQuoteEscapeFunction() {
  const controls = new RegExp(/[\0\u0008\u001B\u009B]/g);
  const crs = new RegExp(/(\r\n)|\r/g);
  const quotes = new RegExp(/(['‘’‚‛])/g);

  const whitespace = new RegExp(/[\s\u0085]/);

  const quote = new RegExp('"', "g");
  const backslashBeforeQuote = new RegExp(/(^|[^\\])(\\*)\0/g);

  const backslashSuffix = new RegExp(/([^\\])(\\+)$/);

  return (arg) => {
    arg = arg.replace(controls, "").replace(crs, "$1").replace(quotes, "$1$1");

    if (whitespace.test(arg)) {
      arg = arg
        .replace(quote, '\0""')
        .replace(backslashBeforeQuote, "$1$2$2")
        .replace(backslashSuffix, "$1$2$2");
    } else {
      arg = arg.replace(quote, '\0\\"').replace(backslashBeforeQuote, "$1$2$2");
    }

    return arg;
  };
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
 * @returns {(function(string): string)[]} A function pair to escape & quote arguments.
 */
export function getQuoteFunction() {
  return [getQuoteEscapeFunction(), quoteArg];
}

/**
 * Returns a function to protect against flag injection for PowerShell.
 *
 * @returns {function(string): string} A function to protect against flag injection.
 */
export function getFlagProtectionFunction() {
  const leadingHyphensAndSlashes = new RegExp(/^(?:`?-+|\/+)/);
  return (arg) => arg.replace(leadingHyphensAndSlashes, "");
}
