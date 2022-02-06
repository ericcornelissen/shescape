/**
 * @overview Contains functionality specifically for Unix systems.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import { shellRequiredError } from "./constants.js";

/**
 * Escape a shell argument when string interpolation is *disabled* (e.g. when
 * the argument is surrounded by single quotes in bash-family shells).
 *
 * @param {string} arg The argument to escape.
 * @returns {string} The escaped argument.
 */
function escapeShellArgNoInterpolation(arg) {
  return arg.replace(/\u{0}/gu, "").replace(/'/g, `'\\''`);
}

/**
 * Escape a shell argument when string interpolation is *enabled* (e.g. when
 * the argument is surrounded by double quotes in bash-family shells).
 *
 * @param {string} arg The argument to escape.
 * @param {string} shell The shell to escape the argument for.
 * @returns {string} The escaped argument.
 */
function escapeShellArgWithInterpolation(arg, shell) {
  let result = arg
    .replace(/\u{0}/gu, "")
    .replace(/\\/g, "\\\\")
    .replace(/^#/g, "\\#")
    .replace(/(\$|\;|\&|\|)/g, "\\$1")
    .replace(/(\(|\)|\<|\>)/g, "\\$1")
    .replace(/("|'|`)/g, "\\$1");

  if (shell.endsWith("zsh")) {
    result = result.replace(/(\*|\?)/gu, "\\$1").replace(/(\[|\])/g, "\\$1");
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

  if (interpolation) {
    return escapeShellArgWithInterpolation(arg, shell);
  } else {
    return escapeShellArgNoInterpolation(arg);
  }
}

/**
 * Get the default shell for Unix systems.
 *
 * @returns {string} The default shell.
 */
export function getDefaultShell() {
  return "/bin/sh";
}
