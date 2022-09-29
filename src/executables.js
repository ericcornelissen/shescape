/**
 * @overview Provides functionality related to working with executables.
 * @license MPL-2.0
 */

/**
 * Resolves the location of an executable given an arbitrary valid string
 * representation of that executable.
 *
 * To obtain the location of the executable this function (if necessary):
 * - Expands the provided string to a absolute path.
 * - Follows symbolic links.
 *
 * @param {object} args The arguments for this function.
 * @param {string} args.executable A string representation of the executable.
 * @param {object} deps The dependencies for this function.
 * @param {Function} deps.exists A function to check if a file exists.
 * @param {Function} deps.readlink A function to resolve (sym)links.
 * @param {Function} deps.which A function to perform a `which(1)`-like lookup.
 * @returns {string} The full path to the binary of the executable.
 * @throws {Error} If the `deps` aren't provided.
 */
export function resolveExecutable({ executable }, { exists, readlink, which }) {
  if (readlink === undefined || which === undefined) {
    throw new Error();
  }

  try {
    executable = which(executable);
  } catch (_) {
    // For backwards compatibility return the executable even if its location
    // cannot be obtained
    return executable;
  }

  if (!exists(executable)) {
    // For backwards compatibility return the executable even if there exists no
    // file at the specified path
    return executable;
  }

  try {
    executable = readlink(executable);
  } catch (_) {
    // An error will be thrown if the executable is not a (sym)link, this is not
    // a problem so the error is ignored
  }

  return executable;
}
