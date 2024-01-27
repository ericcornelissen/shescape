/**
 * @overview Provides functionality related to working with executables.
 * @license MPL-2.0
 */

import { hasOwn } from "./reflection.js";

/**
 * Build error messages for when executables cannot be found.
 *
 * @param {string} executable The executable being looked up.
 * @returns {string} The executable not found error message.
 */
function notFoundError(executable) {
  return `No executable could be found for ${executable}`;
}

/**
 * Resolves the location of an executable given an arbitrary valid string
 * representation of that executable.
 *
 * To obtain the location of the executable this function (if necessary):
 * - Expands the provided string to an absolute path.
 * - Follows symbolic links.
 *
 * @param {object} args The arguments for this function.
 * @param {Object<string, string>} args.env The environment variables.
 * @param {string} args.executable A string representation of the executable.
 * @param {object} deps The dependencies for this function.
 * @param {Function} deps.exists A function to check if a file exists.
 * @param {Function} deps.readlink A function to resolve (sym)links.
 * @param {Function} deps.which A function to perform a `which(1)`-like lookup.
 * @returns {string} The full path to the binary of the executable.
 * @throws {Error} If the executable could not be found.
 */
export function resolveExecutable(
  { env, executable },
  { exists, readlink, which },
) {
  let resolved = executable;
  try {
    const path = hasOwn(env, "PATH")
      ? env.PATH
      : hasOwn(env, "Path")
        ? env.Path
        : undefined;
    resolved = which(resolved, { path });
  } catch (_) {
    throw new Error(notFoundError(executable));
  }

  if (!exists(resolved)) {
    throw new Error(notFoundError(executable));
  }

  try {
    resolved = readlink(resolved);
  } catch (_) {
    // An error will be thrown if the executable is not a (sym)link, this is not
    // a problem so the error is ignored
  }

  return resolved;
}
