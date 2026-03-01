/**
 * @overview Provides an interface for interacting with the file system.
 * @license MPL-2.0
 */

import * as fs from "node:fs";

/**
 * Synchronously look up if the `path` exists.
 *
 * @param {string} path The path to look up.
 * @param {object} [deps] Node.js' fs module.
 * @returns {boolean} `true` if the path exists, `false` otherwise.
 */
export function existsSync(path, deps = fs) {
  return deps.existsSync(path);
}

/**
 * Synchronously look up the (target) location of a symbolic link.
 *
 * @param {string} path The path to look up.
 * @param {object} [deps] Node.js' fs module.
 * @returns {string} The contents of `path`.
 * @throws {Error} If `path` is not a symbolic link.
 */
export function readlinkSync(path, deps = fs) {
  return deps.readlinkSync(path);
}
