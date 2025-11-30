/**
 * @overview Provides an interface for interacting with the file system.
 * @license MPL-2.0
 */

import * as fs from "node:fs";

/**
 * Container for internal references. Only intended for testing purposes.
 */
// eslint-disable-next-line no-underscore-dangle, top/no-top-level-variables
export const _internal = {
  fs,
};

/**
 * Synchronously look up if the `path` exists.
 *
 * @param {string} path The path to look up.
 * @returns {boolean} `true` if the path exists, `false` otherwise.
 */
export function existsSync(path) {
  return _internal.fs.existsSync(path);
}

/**
 * Synchronously look up the (target) location of a symbolic link.
 *
 * @param {string} path The path to look up.
 * @returns {string} The contents of `path`.
 * @throws {Error} If `path` is not a symbolic link.
 */
export function readlinkSync(path) {
  return _internal.fs.readlinkSync(path);
}
