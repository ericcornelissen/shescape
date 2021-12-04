/**
 * @overview Contains functionality specifically for Windows systems.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

/**
 * Escape a shell argument.
 *
 * @param {string} arg The argument to escape.
 * @param {string} [shell] The shell to escape argument for.
 * @returns {string} The escaped argument.
 */
export function escapeShellArg(arg, shell) {
  return arg.replace(/\u{0}/gu, "").replace(/"/g, `""`);
}
