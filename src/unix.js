/**
 * @overview Provides a thin facade for `./unix/index.js`.
 * @license MPL-2.0
 */

import * as unix from "./unix/index.js";

/**
 * Returns a function to escape arguments for use in a particular shell.
 *
 * @param {string} shellName The name of a Unix shell.
 * @returns {Function | undefined} A function to escape arguments.
 */
export function getEscapeFunction(shellName) {
  switch (shellName) {
    case unix.binBash:
    case unix.binCsh:
    case unix.binDash:
    case unix.binZsh:
      return (arg, options) => unix.getEscapeFunction(shellName, options)(arg);
  }
}

/**
 * Returns a function to quote arguments for use in a particular shell.
 *
 * @param {string} shellName The name of a Unix shell.
 * @returns {Function | undefined} A function to quote arguments.
 */
export function getQuoteFunction(shellName) {
  switch (shellName) {
    case unix.binBash:
    case unix.binCsh:
    case unix.binDash:
    case unix.binZsh:
      return (arg, options) => unix.getQuoteFunction(shellName, options)(arg);
  }
}

export { getDefaultShell, getShellName } from "./unix/index.js";
