/**
 * @overview Contains functionality to escape and quote shell arguments on any
 * operating system.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import * as fs from "fs";
import * as path from "path";
import * as pathWin from "path/win32";
import which from "which";

import { typeError, win32 } from "./constants.js";
import { resolveExecutable } from "./executables.js";
import * as unix from "./unix.js";
import * as win from "./win.js";

/**
 * Check if a value can be converted into a string.
 *
 * @param {any} value The value of interest.
 * @returns {boolean} `true` iff `value` can be converted into a string.
 */
function isStringable(value) {
  if (value === undefined || value === null) {
    return false;
  }

  return typeof value.toString === "function";
}

/**
 * Get a function to get the basename from a path.
 *
 * @param {string} platform The platform to get the basename function for.
 * @returns The basename function for `platform`.
 */
function getBasenameFnForPlatform(platform) {
  switch (platform) {
    case win32:
      return pathWin.basename;
    default:
      return path.basename;
  }
}

/**
 * Get the default shell for a given platform.
 *
 * @param {string} platform The platform to get the default shell for.
 * @returns The default shell for `platform`.
 */
function getDefaultShellForPlatform(platform) {
  switch (platform) {
    case win32:
      return "cmd.exe";
    default:
      return "bash";
  }
}

/**
 * Get the shell-escapeFn map for a given platform.
 *
 * @param {string} platform The platform to get the escape function for.
 * @returns The escape function for `platform`.
 */
function getMapForPlatform(platform) {
  switch (platform) {
    case win32:
      return win.escapeFunctionsByShell;
    default:
      return unix.escapeFunctionsByShell;
  }
}

/**
 * Get the shell to escape arguments for.
 *
 * @param {string} platform The platform to get the shell for.
 * @param {Object} env The environment variables.
 * @param {string} [shell] The provided shell, if any.
 * @returns The shell to escape arguments for.
 */
function getShell(platform, env, shell) {
  if (shell === undefined) {
    switch (platform) {
      case win32:
        shell = win.getDefaultShell(env);
        break;
      default:
        shell = unix.getDefaultShell();
        break;
    }
  }

  return resolveExecutable(
    {
      executable: shell,
    },
    {
      exists: fs.existsSync,
      readlink: fs.readlinkSync,
      which: which.sync,
    }
  );
}

/**
 * Escape a shell argument.
 *
 * @param {Object} args The arguments for this function.
 * @param {string} args.arg The argument to escape.
 * @param {string} args.shell The shell to escape the argument for.
 * @param {boolean} args.interpolation Is interpolation enabled.
 * @param {boolean} args.m TODO.
 * @param {boolean} args.default The default shell.
 * @param {Object} deps The dependencies for this function.
 * @param {Function} deps.basename A function to get the basename from a path.
 * @returns {string} The escaped argument.
 */
function escapeShellArg(args, { basename }) {
  const shell = basename(args.shell);
  const escapeArg = args.m.has(shell)
    ? args.m.get(shell)
    : args.m.get(args.default);
  return escapeArg(args.arg, args.interpolation);
}

/**
 * Take a value and escape any dangerous characters.
 *
 * Non-string inputs will be converted to strings using a `toString()` method.
 *
 * @param {string} arg The argument to escape.
 * @param {string} platform The platform to escape the argument for.
 * @param {Object} env The environment variables.
 * @param {string} [shell] The shell to escape the argument for, if any.
 * @param {boolean} [interpolation=false] Is interpolation enabled.
 * @returns {string} The escaped argument.
 * @throws {TypeError} The argument is not stringable.
 */
export function escapeShellArgByPlatform(
  arg,
  platform,
  env,
  shell,
  interpolation = false
) {
  if (!isStringable(arg)) {
    throw new TypeError(typeError);
  }

  return escapeShellArg(
    {
      arg: arg.toString(),
      shell: getShell(platform, env, shell),
      interpolation,
      m: getMapForPlatform(platform),
      default: getDefaultShellForPlatform(platform),
    },
    {
      basename: getBasenameFnForPlatform(platform),
    }
  );
}

/**
 * Take a value, put OS-specific quotes around it, and escape any dangerous
 * characters.
 *
 * Non-string inputs will be converted to strings using a `toString()` method.
 *
 * @param {string} arg The argument to escape and quote.
 * @param {string} platform The platform to escape and quote the argument for.
 * @param {Object} env The environment variables.
 * @param {string} [shell] The shell to escape the argument for, if any.
 * @returns {string} The escaped argument.
 * @throws {TypeError} The argument is not stringable.
 */
export function quoteShellArgByPlatform(arg, platform, env, shell) {
  const safeArg = escapeShellArgByPlatform(arg, platform, env, shell, false);
  switch (platform) {
    case win32:
      return `"${safeArg}"`;
    default:
      return `'${safeArg}'`;
  }
}
