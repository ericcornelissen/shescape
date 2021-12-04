/**
 * @overview Contains functionality specifically for Windows systems.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

/**
 * @constant {string} REGEXP_POWERSHELL A {@link RegExp} to detect if the shell
 * to escape an argument for is the PowerShell shell.
 * @example REGEXP_POWERSHELL.test("cmd.exe");  // -> false
 */
const REGEXP_POWERSHELL = /powershell.exe$/;

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
  if (REGEXP_POWERSHELL.test(shell)) {
    return escapeShellArgsForPowerShell(arg);
  } else {
    return escapeShellArgsForCmd(arg);
  }
}
