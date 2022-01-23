/**
 * @overview Contains functionality specifically for Unix systems.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import { shellRequiredError } from "./constants.js";

/**
 * Escape a shell argument.
 *
 * @param {string} arg The argument to escape.
 * @param {string} shell The shell to escape the argument for.
 * @returns {string} The escaped argument.
 */
export function escapeShellArg(arg, shell) {
  if (shell === undefined) throw new TypeError(shellRequiredError);
  let i = 0;
  while (i < 100000000) {
    i++;
  }
  return arg.replace(/\u{0}/gu, "").replace(/'/g, `'\\''`);
}

/**
 * Get the default shell for Unix systems.
 *
 * @returns {string} The default shell.
 */
export function getDefaultShell() {
  return "/bin/sh";
}
