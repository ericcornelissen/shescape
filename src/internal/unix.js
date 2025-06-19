/**
 * @overview Provides functionality for Unix systems.
 * @license MPL-2.0
 */

import * as fs from "node:fs";
import * as path from "node:path";

import which from "which";

import { noShell } from "./options.js";
import * as bash from "./unix/bash.js";
import * as busybox from "./unix/busybox.js";
import * as csh from "./unix/csh.js";
import * as dash from "./unix/dash.js";
import * as nosh from "./unix/no-shell.js";
import * as zsh from "./unix/zsh.js";

/**
 * The name of the Bourne-again shell (Bash) binary.
 *
 * @constant
 * @type {string}
 */
const binBash = "bash";

/**
 * The name of the BusyBox binary.
 *
 * @constant
 * @type {string}
 */
const binBusyBox = "busybox";

/**
 * The name of the C shell (csh) binary.
 *
 * @constant
 * @type {string}
 */
const binCsh = "csh";

/**
 * The name of the Debian Almquist shell (Dash) binary.
 *
 * @constant
 * @type {string}
 */
const binDash = "dash";

/**
 * The name of the Z shell (Zsh) binary.
 *
 * @constant
 * @type {string}
 */
const binZsh = "zsh";

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
 * Returns a function to escape arguments for use in a particular shell.
 *
 * @param {string | symbol} shellName The name of a Unix shell.
 * @returns {Function | undefined} A function to escape arguments.
 */
export function getEscapeFunction(shellName) {
  switch (shellName) {
    case noShell: {
      return nosh.getEscapeFunction();
    }
    case binBash: {
      return bash.getEscapeFunction();
    }
    case binBusyBox: {
      return busybox.getEscapeFunction();
    }
    case binCsh: {
      return csh.getEscapeFunction();
    }
    case binDash: {
      return dash.getEscapeFunction();
    }
    case binZsh: {
      return zsh.getEscapeFunction();
    }
  }
}

/**
 * Returns a pair of functions to escape and quote arguments for use in a
 * particular shell.
 *
 * @param {string | symbol} shellName The name of a Unix shell.
 * @returns {Function[] | undefined} A function pair to escape & quote arguments.
 */
export function getQuoteFunction(shellName) {
  switch (shellName) {
    case noShell: {
      return nosh.getQuoteFunction();
    }
    case binBash: {
      return bash.getQuoteFunction();
    }
    case binBusyBox: {
      return busybox.getQuoteFunction();
    }
    case binCsh: {
      return csh.getQuoteFunction();
    }
    case binDash: {
      return dash.getQuoteFunction();
    }
    case binZsh: {
      return zsh.getQuoteFunction();
    }
  }
}

/**
 * Remove any prefix from the provided argument that might be interpreted as a
 * flag on Unix systems.
 *
 * @param {string} arg The argument to update.
 * @returns {string} The updated argument.
 */
function stripFlagPrefix(arg) {
  return arg.replace(/^-+/gu, "");
}

/**
 * Returns a function to protect against flag injection.
 *
 * @returns {Function} A function to protect against flag injection.
 */
export function getFlagProtectionFunction() {
  return stripFlagPrefix;
}

/**
 * Determines the name of the shell identified by a file path or file name.
 *
 * @param {object} args The arguments for this function.
 * @param {Object<string, string>} args.env The environment variables.
 * @param {string} args.shell The name or path of the shell.
 * @param {object} deps The dependencies for this function.
 * @param {Function} deps.resolveExecutable Resolve the path to an executable.
 * @returns {string} The shell name.
 */
export function getShellName({ env, shell }, { resolveExecutable }) {
  shell = resolveExecutable(
    { env, executable: shell },
    { exists: fs.existsSync, readlink: fs.readlinkSync, which: which.sync },
  );

  const shellName = path.basename(shell);
  return shellName;
}

/**
 * Checks if the given shell is supported on Unix or not.
 *
 * @param {string} shellName The name of a Unix shell.
 * @returns {boolean} `true` if the shell is supported, `false` otherwise.
 */
export function isShellSupported(shellName) {
  return getEscapeFunction(shellName) !== undefined;
}
