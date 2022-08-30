/**
 * @overview Provides functionality related to getting the platform module for
 * the current system.
 * @license MPL-2.0
 */

import * as unix from "./unix.js";
import * as win from "./win.js";

/**
 * The string identifying the OS type Cygwin.
 *
 * @constant
 * @type {string}
 */
const cygwin = "cygwin";

/**
 * The string identifying the OS type MSYS.
 *
 * @constant
 * @type {string}
 */
const msys = "msys";

/**
 * The string identifying Windows platforms.
 *
 * @constant
 * @type {string}
 */
const win32 = "win32";

/**
 * Checks if the current system is a Windows system.
 *
 * @param {object} args The arguments for this function.
 * @param {Object<string, string>} args.env The environment variables.
 * @param {string} args.platform The `os.platform()` value.
 * @returns {boolean} `true` if the system is Windows, `false` otherwise.
 */
function isWindow({ env, platform }) {
  return env.OSTYPE === cygwin || env.OSTYPE === msys || platform === win32;
}

/**
 * Returns all helper functions for a specific system.
 *
 * @param {object} args The arguments for this function.
 * @param {Object<string, string>} args.env The environment variables.
 * @param {string} args.platform The `os.platform()` value.
 * @returns {object} The helper functions for the current system.
 */
export function getHelpersByPlatform(args) {
  if (isWindow(args)) {
    return win;
  }

  return unix;
}
