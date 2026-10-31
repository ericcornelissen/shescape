/**
 * @overview Provides functionality related to working with executables.
 * @license MPL-2.0
 */

import { hasOwn } from "./reflection.js";

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
 * @param {function(): string} deps.dirname A function to obtain a path's dirname.
 * @param {function(): boolean} deps.exists A function to check if a file exists.
 * @param {function(): string} deps.readlink A function to resolve (sym)links.
 * @param {function(): string} deps.resolve A function to resolve a file system path.
 * @param {function(): string} deps.which A function to perform a `which(1)`-like lookup.
 * @returns {string} The full path to the binary of the executable.
 * @throws {Error} If the executable could not be found.
 */
export function resolveExecutable(
  { env, executable },
  { dirname, exists, readlink, resolve, which },
) {
  const PATH = hasOwn(env, "PATH")
    ? env.PATH
    : hasOwn(env, "Path")
      ? env.Path
      : undefined;

  let resolved = executable;
  try {
    resolved = which(resolved, { path: PATH });
  } catch {
    throw new Error(`No executable could be found for ${executable}`);
  }

  if (!exists(resolved)) {
    throw new Error(`No executable could be found for ${executable}`);
  }

  const seen = {};
  while (!hasOwn(seen, resolved)) {
    try {
      seen[resolved] = null;
      const link = readlink(resolved);
      const base = dirname(resolved);
      resolved = resolve(base, link);
    } catch {
      // An error is thrown if the argument is not a (sym)link, this is what we
      // want so we return.
      return resolved;
    }
  }

  throw new Error(`${executable} points to a link loop, cannot resolve shell`);
}
