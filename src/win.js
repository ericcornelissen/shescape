/**
 * @overview Contains functionality specifically for Windows systems.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

/**
 * String defining the Windows Command Prompt binary.
 */
const binCmd = "cmd.exe";

/**
 * String defining the Windows PowerShell binary.
 */
const binPowerShell = "powershell.exe";

/**
 * Escape a shell argument for use in the Windows Command Prompt.
 *
 * @param {string} arg The argument to escape.
 * @param {boolean} interpolation Is interpolation enabled.
 * @returns {string} The escaped argument.
 */
function escapeArgCmd(arg, interpolation) {
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
 * Escape a shell argument for use in Windows PowerShell.
 *
 * @param {string} arg The argument to escape.
 * @param {boolean} interpolation Is interpolation enabled.
 * @returns {string} The escaped argument.
 */
function escapeArgPowerShell(arg, interpolation) {
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
 * A mapping from shell names to functions that escape arguments for that shell.
 */
export const escapeFunctionsByShell = new Map([
  [binCmd, escapeArgCmd],
  [binPowerShell, escapeArgPowerShell],
]);

/**
 * Get the default shell for Windows systems.
 *
 * @param {Object} env The environment variables.
 * @param {string} env.ComSpec The ComSpec value.
 * @returns {string} The default shell.
 */
export function getDefaultShell(env) {
  return env.ComSpec;
}
