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
 * Get all helper functions for a specific platform.
 *
 * @param {string} platform The platform to get the helpers for.
 * @returns {Object} The helper functions for `platform`.
 */
export function getHelpersByPlatform(platform) {
  switch (platform) {
    case win32:
      return win;
    default:
      return unix;
  }
}
