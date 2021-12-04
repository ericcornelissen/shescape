/**
 * @overview Contains functionality specifically for Windows systems.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import { regexpPowerShell } from "./constants.js";

/**
 * Escape a shell argument for use in CMD.
 *
 * @param {string} arg The argument to escape.
 * @returns {string} The escaped argument.
 */
function escapeShellArgsForCmd(arg) {
  return arg.replace(/\u{0}/gu, "").replace(/"/g, `""`);
}

/**
 * Escape a shell argument for use in PowerShell.
 *
 * @param {string} arg The argument to escape.
 * @returns {string} The escaped argument.
 */
function escapeShellArgsForPowerShell(arg) {
  return arg.replace(/\u{0}/gu, "").replace(/"/g, `""`).replace(/\$/g, "`$");
}

/**
 * Escape a shell argument.
 *
 * @param {string} arg The argument to escape.
 * @param {string} [shell] The shell to escape the argument for.
 * @returns {string} The escaped argument.
 */
export function escapeShellArg(arg, shell) {
  if (regexpPowerShell.test(shell)) {
    return escapeShellArgsForPowerShell(arg);
  } else {
    return escapeShellArgsForCmd(arg);
  }
}
