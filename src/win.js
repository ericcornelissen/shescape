/**
 * @overview Contains functionality specifically for Windows systems.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import { regexpPowerShell, shellRequiredError } from "./constants.js";

/**
 * Escape a shell argument for use in CMD.
 *
 * @param {string} arg The argument to escape.
 * @param {boolean} interpolation Is interpolation enabled.
 * @returns {string} The escaped argument.
 */
function escapeShellArgsForCmd(arg, interpolation) {
  let result = arg.replace(/\u{0}/gu, "");

  if (interpolation) {
    result = result
      .replace(/\^/g, "^^")
      .replace(/(<|>)/g, "^$1")
      .replace(/(")/g, "^$1")
      .replace(/(\&|\|)/g, "^$1");
  } else {
    result = result.replace(/"/g, `""`);
  }

  return result;
}

/**
 * Escape a shell argument for use in PowerShell.
 *
 * @param {string} arg The argument to escape.
 * @param {boolean} interpolation Is interpolation enabled.
 * @returns {string} The escaped argument.
 */
function escapeShellArgsForPowerShell(arg, interpolation) {
  let result = arg
    .replace(/\u{0}/gu, "")
    .replace(/`/g, "``")
    .replace(/\$/g, "`$");

  if (interpolation) {
    result = result
      .replace(/^((?:\*|[1-6])?)(>)/g, "$1`$2")
      .replace(/^(<|@|#|-|\:|\])/g, "`$1")
      .replace(/(,|\;|\&|\|)/g, "`$1")
      .replace(/(\(|\)|\{|\})/g, "`$1")
      .replace(/('|’|‘|‛|‚)/g, "`$1")
      .replace(/("|“|”|„)/g, "`$1");
  } else {
    result = result.replace(/("|“|”|„)/g, "$1$1");
  }

  return result;
}

/**
 * Escape a shell argument.
 *
 * @param {string} arg The argument to escape.
 * @param {string} shell The shell to escape the argument for.
 * @param {boolean} interpolation Is interpolation enabled.
 * @returns {string} The escaped argument.
 */
export function escapeShellArg(arg, shell, interpolation) {
  if (shell === undefined) throw new TypeError(shellRequiredError);

  if (regexpPowerShell.test(shell)) {
    return escapeShellArgsForPowerShell(arg, interpolation);
  } else {
    return escapeShellArgsForCmd(arg, interpolation);
  }
}

/**
 * Get the default shell for Windows systems.
 *
 * @param {Object} env The environment variables.
 * @param {string} env.ComSpec The ComSpec value.
 * @returns {string} The default shell.
 */
export function getDefaultShell(env) {
  // See: https://nodejs.org/api/child_process.html#default-windows-shell
  if (Object.prototype.hasOwnProperty.call(env, "ComSpec")) {
    return env.ComSpec;
  }

  return "cmd.exe";
}
