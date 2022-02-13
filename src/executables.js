/**
 * @overview Contains functionality related to working with executables.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

/**
 * Resolve the location of an executable given an arbitrary valid string
 * representation of that executable.
 *
 * To obtain the location of the executable this function (if necessary):
 * - Expands the provided string to a full path.
 * - Follows symbolic links.
 *
 * @param {Object} args The arguments for this function.
 * @param {string} args.executable The string to resolve.
 * @param {Object} deps The dependencies for this function.
 * @param {Function} deps.exists A function to check if a file exists.
 * @param {Function} deps.readlink A function to resolve (sym)links.
 * @param {Function} deps.which A function to resolve the path to an executable.
 * @returns The full path to the binary of the executable.
 */
export function resolveExecutable({ executable }, { exists, readlink, which }) {
  if (readlink === undefined || which === undefined) {
    throw new Error();
  }

  // Expand the executable to its full path
  try {
    executable = which(executable);
  } catch (_) {
    // for backwards compatibility return the executable even if its location
    // cannot be obtained
    return executable;
  }

  // Check if the executable exists - In the future this should throw an error
  // *before* trying to resolve a (sym)link as that process should allow failure
  // in case the executable isn't a (sym)link, but not in case the executable
  // doesn't exist
  if (!exists(executable)) {
    return executable;
  }

  // Resolve (sym)links before returning the location of the executable
  try {
    executable = readlink(executable);
  } catch (_) {
    // An error will be thrown if the executable is not (sym)link, this is not a
    // problem so the error will be ignored.
  }

  return executable;
}
