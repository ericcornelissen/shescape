/**
 * @overview Contains constants that may be used in multiple modules.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

/**
 * @constant {string} REGEXP_POWERSHELL A {@link RegExp} to detect if the shell
 * to escape an argument for is "PowerShell".
 * @example REGEXP_POWERSHELL.test("cmd.exe");  // -> false
 */
export const regexpPowerShell = /powershell.exe$/;

/**
 * @constant {string} typeError The error message for incorrect parameter types.
 */
export const typeError =
  "Shescape requires strings or values that can be converted into a string using .toString()";

/**
 * @constant {string} win32 The string identifying Windows systems.
 */
export const win32 = "win32";
