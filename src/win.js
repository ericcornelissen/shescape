/**
 * @overview Provides a thin facade for `./win/index.js`.
 * @license MPL-2.0
 */

import * as win from "./win/index.js";

/**
 * Returns a function to escape arguments for use in a particular shell.
 *
 * @param {string} shellName The name of a Windows shell.
 * @returns {Function | undefined} A function to escape arguments.
 */
export function getEscapeFunction(shellName) {
  switch (shellName) {
    case win.binCmd:
    case win.binPowerShell:
      return (arg, options) => win.getEscapeFunction(shellName, options)(arg);
  }
}

export {
  getDefaultShell,
  getQuoteFunction,
  getShellName,
} from "./win/index.js";
