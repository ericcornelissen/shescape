/**
 * @overview Contains logic related to choosing a platforms.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import * as unix from "./unix.js";
import * as win from "./win.js";

/**
 * @constant {string} cygwin The string identifying the OS type cygwin.
 */
const cygwin = "cygwin";

/**
 * @constant {string} msys The string identifying the OS type msys.
 */
const msys = "msys";

/**
 * @constant {string} win32 The string identifying Windows systems.
 */
const win32 = "win32";

/**
 * Check if the current platform is Windows.
 *
 * @param {Object} args The arguments for this function.
 * @param {string} args.platform The `os.platform()` value.
 * @param {Object} args.process The `process` values.
 * @param {Object} args.process.env The environment variables.
 * @returns {boolean} `true` iff the current platform is Windows.
 */
function isWindow({ platform, process }) {
  return (
    process.env.OSTYPE === cygwin ||
    process.env.OSTYPE === msys ||
    platform === win32
  );
}

/**
 * Get all helper functions for a specific platform.
 *
 * @param {Object} args The arguments for this function.
 * @param {string} args.platform The `os.platform()` value.
 * @param {Object} args.process The `process` values.
 * @param {Object} args.process.env The environment variables.
 * @returns {Object} The helper functions for the current platform.
 */
export function getHelpersByPlatform(args) {
  if (isWindow(args)) {
    return win;
  }

  return unix;
}
