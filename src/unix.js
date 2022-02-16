/**
 * @overview Contains functionality specifically for Unix systems.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import * as path from "path";

/**
 * String defining the Bourne-again shell (Bash) binary.
 */
const binBash = "bash";

/**
 * String defining the Debian Almquist shell (Dash) binary.
 */
const binDash = "dash";

/**
 * String defining the Zsh (Z shell) binary.
 */
const binZsh = "zsh";

/**
 * Escape a shell argument for use in Bash (like shells).
 *
 * @param {string} arg The argument to escape.
 * @param {boolean} interpolation Is interpolation enabled.
 * @returns {string} The escaped argument.
 */
function escapeArgBash(arg, interpolation) {
  let result = arg.replace(/\u{0}/gu, "");

  if (interpolation) {
    result = result
      .replace(/\\/g, "\\\\")
      .replace(/^(~|#)/g, "\\$1")
      .replace(/(\*|\?)/gu, "\\$1")
      .replace(/(\$|\;|\&|\|)/g, "\\$1")
      .replace(/(\(|\)|\<|\>)/g, "\\$1")
      .replace(/("|'|`)/g, "\\$1");
  } else {
    result = result.replace(/'/g, `'\\''`);
  }

  return result;
}

/**
 * Escape a shell argument for use in Zsh.
 *
 * @param {string} arg The argument to escape.
 * @param {boolean} interpolation Is interpolation enabled.
 * @returns {string} The escaped argument.
 */
function escapeArgZsh(arg, interpolation) {
  let result = arg.replace(/\u{0}/gu, "");

  if (interpolation) {
    result = result
      .replace(/\\/g, "\\\\")
      .replace(/^(~|#)/g, "\\$1")
      .replace(/(\*|\?)/gu, "\\$1")
      .replace(/(\$|\;|\&|\|)/g, "\\$1")
      .replace(/(\(|\)|\<|\>)/g, "\\$1")
      .replace(/("|'|`)/g, "\\$1")
      .replace(/^=/gu, "\\=")
      .replace(/(\[|\]|\{|\})/g, "\\$1");
  } else {
    result = result.replace(/'/g, `'\\''`);
  }

  return result;
}

/**
 * A mapping from shell names to functions that escape arguments for that shell.
 */
const escapeFunctionsByShell = new Map([
  [binBash, escapeArgBash],
  [binDash, escapeArgBash],
  [binZsh, escapeArgZsh],
]);

/**
 * Get the basename of a directory or file path on a Unix system.
 *
 * @param {string} fullPath A Unix-style directory or file path.
 * @returns {string} The basename of `fullPath`.
 */
export function getBasename(fullPath) {
  return path.basename(fullPath);
}

/**
 * Get the default shell for Unix systems.
 *
 * @returns {string} The default shell.
 */
export function getDefaultShell() {
  return "/bin/sh";
}

/**
 * Get a function to escape strings for use in a particular shell.
 *
 * @param {string} shellName The name of a Unix shell.
 * @returns {Function} A function to escape strings for use in the shell.
 */
export function getEscapeFunction(shellName) {
  return escapeFunctionsByShell.get(shellName);
}
