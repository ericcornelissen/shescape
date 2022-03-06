/**
 * @overview Contains logic related to choosing a platforms.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import * as unix from "./unix.js";
import * as win from "./win.js";

/**
 * @constant {string} win32 The string identifying Windows systems.
 */
const win32 = "win32";

/**
 * Check if the current platform is Windows.
 *
 * @param {Object} args The arguments for this function.
 * @param {string} args.platform The os.platform()` value.
 * @returns {boolean} `true` iff the current platform is Windows.
 */
function isWindow({ platform }) {
  return platform === win32;
}

/**
 * Get all helper functions for a specific platform.
 *
 * @param {Object} args The arguments for this function.
 * @param {string} args.platform The platform to get the helpers for.
 * @returns {Object} The helper functions for the current platform.
 */
export function getHelpersByPlatform(args) {
  if (isWindow(args)) {
    return win;
  }

  return unix;
}
