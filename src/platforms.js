/**
 * @overview Contains logic related to choosing a platforms.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import * as unix from "./unix.js";
import * as win from "./win.js";

/**
 * @constant {string} cygwin The string identifying the OS type Cygwin.
 */
const cygwin = "cygwin";

/**
 * @constant {string} msys The string identifying the OS type MSYS.
 */
const msys = "msys";

/**
 * @constant {string} win32 The string identifying Windows platforms.
 */
const win32 = "win32";

/**
 * Check if the current system is a Windows system.
 *
 * @param {Object} args The arguments for this function.
 * @param {string} args.platform The `os.platform()` value.
 * @param {Object} args.process The `process` values.
 * @param {Object} args.process.env The environment variables.
 * @returns {boolean} `true` if the system is Windows, `false` otherwise.
 */
function isWindow({ platform, process }) {
  return (
    platform === win32 ||
    process.env.OSTYPE === cygwin ||
    process.env.OSTYPE === msys
  );
}

/**
 * Get all helper functions for a specific system.
 *
 * @param {Object} args The arguments for this function.
 * @param {string} args.platform The `os.platform()` value.
 * @param {Object} args.process The `process` values.
 * @param {Object} args.process.env The environment variables.
 * @returns {Object} The helper functions for the current system.
 */
export function getHelpersByPlatform(args) {
  if (isWindow(args)) {
    return win;
  }

  return unix;
}
