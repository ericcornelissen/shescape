/**
 * @overview Proxies calls from `./index.js` to the rest of the system with all
 * inputs being explicit.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

/**
 * Proxy a call to escape an argument with all inputs being explicit.
 *
 * @param {Object} args The arguments for this function.
 * @param {string} args.arg The argument to escape.
 * @param {Object} args.options The options for escaping `arg`.
 * @param {boolean} [args.options.interpolation] Is interpolation enabled.
 * @param {string} [args.options.shell] The shell to escape `arg` for.
 * @param {string} args.platform The platform to escape `arg` for.
 * @param {Object} args.process The `process` values.
 * @param {Object} args.process.env The environment variables.
 * @param {Object} deps The dependencies for this function.
 * @param {Function} deps.escape A function to escape a shell argument.
 * @param {Function} deps.getPlatformHelpers A function to get helper functions.
 * @returns {string} The escaped argument.
 */
export function escape(
  { arg, options, platform, process },
  { escape, getPlatformHelpers }
) {
  const platformDeps = getPlatformHelpers(platform);
  return escape({ arg, options, process }, platformDeps);
}
