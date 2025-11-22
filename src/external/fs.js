/**
 * @overview Provides a facade for interacting with the file system.
 * @license MPL-2.0
 */

import * as fs from "node:fs";

/**
 * Synchronously look up if the `path` exists.
 *
 * @param {string} path The path to look up.
 * @returns {boolean} `true` if the path exists, `false` otherwise.
 */
export function existsSync(path) {
  return fs.existsSync(path);
}

/**
 * Synchronously look up the (target) location of a symbolic link.
 *
 * @param {string} path The path to look up.
 * @returns {boolean} The contents of `path`.
 * @throws {Error} If `path` is not a symbolic link.
 */
export function readlinkSync(path) {
  return fs.readlinkSync(path);
}
