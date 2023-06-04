/**
 * @overview Provides functionality for Unix systems.
 * @license MPL-2.0
 */

import * as fs from "fs";
import * as path from "path";

import which from "which";

import * as bash from "./bash.js";
import * as csh from "./csh.js";
import * as dash from "./dash.js";
import * as zsh from "./zsh.js";

/**
 * The name of the Bourne-again shell (Bash) binary.
 *
 * @constant
 * @type {string}
 */
export const binBash = "bash";

/**
 * The name of the C shell (csh) binary.
 *
 * @constant
 * @type {string}
 */
export const binCsh = "csh";

/**
 * The name of the Debian Almquist shell (Dash) binary.
 *
 * @constant
 * @type {string}
 */
export const binDash = "dash";

/**
 * The name of the Z shell (Zsh) binary.
 *
 * @constant
 * @type {string}
 */
export const binZsh = "zsh";

/**
 * Returns the basename of a directory or file path on a Unix system.
 *
 * @param {string} fullPath A Unix-style directory or file path.
 * @returns {string} The basename of `fullPath`.
 */
function getBasename(fullPath) {
  return path.basename(fullPath);
}

/**
 * Returns the default shell for Unix systems.
 *
 * For more information, see `options.shell` in:
 * https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback.
 *
 * @returns {string} The default shell.
 */
export function getDefaultShell() {
  return "/bin/sh";
}

/**
 * TODO.
 *
 * @param {string} arg The argument to TODO.
 * @returns {string} The updated argument.
 */
function stripFlagPrefix(arg) {
  return arg.replace(/^-+/gu, "");
}

/**
 * Returns a function to escape arguments for use in a particular shell.
 *
 * @param {string} shellName The name of a Unix shell.
 * @param {object} options The options for escaping arguments.
 * @param {boolean} options.flagProtection Is flag protection enabled.
 * @param {boolean} options.interpolation Is interpolation enabled.
 * @returns {Function | undefined} A function to escape arguments.
 */
export function getEscapeFunction(shellName, options) {
  let escapeFn;
  switch (shellName) {
    case binBash:
      escapeFn = bash.getEscapeFunction(options);
      break;
    case binCsh:
      escapeFn = csh.getEscapeFunction(options);
      break;
    case binDash:
      escapeFn = dash.getEscapeFunction(options);
      break;
    case binZsh:
      escapeFn = zsh.getEscapeFunction(options);
      break;
    default:
      return;
  }

  if (options.flagProtection) {
    return (arg) => escapeFn(stripFlagPrefix(arg));
  } else {
    return escapeFn;
  }
}

/**
 * Returns a function to quote arguments for use in a particular shell.
 *
 * @param {string} shellName The name of a Unix shell.
 * @param {object} options The options for escaping arguments.
 * @param {boolean} options.flagProtection Is flag protection enabled.
 * @returns {Function | undefined} A function to quote and escape arguments.
 */
export function getQuoteFunction(shellName, options) {
  let quoteFn;
  switch (shellName) {
    case binBash:
      quoteFn = bash.getQuoteFunction();
      break;
    case binCsh:
      quoteFn = csh.getQuoteFunction();
      break;
    case binDash:
      quoteFn = dash.getQuoteFunction();
      break;
    case binZsh:
      quoteFn = zsh.getQuoteFunction();
      break;
    default:
      return;
  }

  if (options.flagProtection) {
    return (arg) => quoteFn(stripFlagPrefix(arg));
  } else {
    return quoteFn;
  }
}

/**
 * Determines the name of the shell identified by a file path or file name.
 *
 * @param {object} args The arguments for this function.
 * @param {string} args.shell The name or path of the shell.
 * @param {object} deps The dependencies for this function.
 * @param {Function} deps.resolveExecutable Resolve the path to an executable.
 * @returns {string} The shell name.
 */
export function getShellName({ shell }, { resolveExecutable }) {
  shell = resolveExecutable(
    { executable: shell },
    { exists: fs.existsSync, readlink: fs.readlinkSync, which: which.sync }
  );

  const shellName = getBasename(shell);
  if (getEscapeFunction(shellName, {}) === undefined) {
    return binBash;
  }

  return shellName;
}
