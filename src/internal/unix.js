/**
 * @overview Provides functionality for Unix systems.
 * @license MPL-2.0
 */

import * as path from "node:path";

import which from "which";

import * as fs from "./fs.js";
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
 * Returns the helper functions to handle arguments for use with a particular
 * shell.
 *
 * @param {string | symbol} shellName The identifier of a Unix shell.
 * @returns {object} A set of functions to escape arguments.
 */
export function getShellHelpers(shellName) {
  switch (shellName) {
    case noShell: {
      return nosh;
    }
    case binBash: {
      return bash;
    }
    case binBusyBox: {
      return busybox;
    }
    case binCsh: {
      return csh;
    }
    case binDash: {
      return dash;
    }
    case binZsh: {
      return zsh;
    }
  }
}

/**
 * Determines the name of the shell identified by a file path or file name.
 *
 * @param {object} args The arguments for this function.
 * @param {Object<string, string>} args.env The environment variables.
 * @param {string} args.shell The name or path of the shell.
 * @param {object} deps The dependencies for this function.
 * @param {function(): string} deps.resolveExecutable Resolve the path to an executable.
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
  return getShellHelpers(shellName) !== undefined;
}
