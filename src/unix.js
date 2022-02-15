/**
 * @overview Contains functionality specifically for Unix systems.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

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
export const escapeFunctionsByShell = new Map([
  [binBash, escapeArgBash],
  [binDash, escapeArgBash],
  [binZsh, escapeArgZsh],
]);

/**
 * Get the default shell for Unix systems.
 *
 * @returns {string} The default shell.
 */
export function getDefaultShell() {
  return "/bin/sh";
}
