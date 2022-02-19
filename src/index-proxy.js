/**
 * @overview Proxies calls from `./index.js` to the rest of the system with all
 * inputs being explicit.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import { win32 } from "./constants.js";
import { resolveExecutable } from "./executables.js";
import * as unix from "./unix.js";
import * as win from "./win.js";

/**
 * Get helper functions for escaping an argument for a specific platform.
 *
 * @param {string} platform The platform to get the helpers for.
 * @returns {Object} The helper functions.
 */
function getPlatformHelpers(platform) {
  switch (platform) {
    case win32:
      return win;
    default:
      return unix;
  }
}

/**
 * Take a value and escape any dangerous characters.
 *
 * @param {Object} args The arguments for this function.
 * @param {Object} args.arg The argument to escape.
 * @param {Object} [args.options] The options for escaping `arg`.
 * @param {string} [args.options.shell] The shell to escape `arg` for.
 * @param {string} [args.options.interpolation] Is interpolation enabled.
 * @param {string} args.platform The platform to escape `arg` for.
 * @param {Object} args.process The `process` values.
 * @param {Object} args.process.env The environment variables.
 * @param {Object} deps The dependencies for this function.
 * @param {Function} deps.escapeShellArg A function to escape a shell argument.
 * @returns {string} The escaped argument.
 * @throws {TypeError} The argument to escape is not stringable.
 */
export function escape({ arg, options, platform, process }, deps) {
  const env = process.env;
  const interpolation = options?.interpolation;
  const shell = options?.shell;
  return deps.escapeShellArg(
    { arg, env, interpolation, platform, shell },
    { ...getPlatformHelpers(platform), resolveExecutable }
  );
}

/**
 * Take a value and escape any dangerous characters.
 *
 * @param {Object} args The arguments for this function.
 * @param {Object} args.arg The argument to escape.
 * @param {Object} [args.options] The options for escaping `arg`.
 * @param {string} [args.options.shell] The shell to escape `arg` for.
 * @param {string} args.platform The platform to escape `arg` for.
 * @param {Object} args.process The `process` values.
 * @param {Object} args.process.env The environment variables.
 * @param {Object} deps The dependencies for this function.
 * @param {Function} deps.quoteShellArg A function to quote & escape a shell argument.
 * @returns {string} The escaped argument.
 * @throws {TypeError} The argument to escape is not stringable.
 */
export function quote({ arg, options, platform, process }, deps) {
  const env = process.env;
  const shell = options?.shell;
  return deps.quoteShellArg(
    { arg, env, platform, shell },
    { ...getPlatformHelpers(platform), resolveExecutable }
  );
}
