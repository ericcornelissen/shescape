/**
 * @overview Proxies calls from `./index.js` to the rest of the system with all
 * inputs being explicit.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import { resolveExecutable } from "./executables.js";

/**
 * Merge any number of objects into a single object.
 *
 * Note: the values of objects appearing later in the list of arguments take
 * precedence when merging.
 *
 * @param {...Object} objects The objects to merge.
 * @returns The merged object
 */
function mergeObjects(...objects) {
  return Object.assign(Object.create(null), ...objects);
}

/**
 * Parse the inputs to Shescape and escape the provided argument.
 *
 * @param {Object} args The arguments for this function.
 * @param {Object} args.arg The argument to escape.
 * @param {Object} args.options The options for escaping `arg`.
 * @param {string} [args.options.shell] The shell to escape `arg` for.
 * @param {string} args.options.interpolation Is interpolation enabled.
 * @param {Object} args.process The `process` values.
 * @param {Object} args.process.env The environment variables.
 * @param {Object} deps The dependencies for this function.
 * @param {Function} deps.escape A function to escape an arg.
 * @param {Function} deps.getEscapeFunction Get an escape function for a shell.
 * @param {Function} deps.getQuoteFunction Get a quote function for a shell.
 * @param {Function} deps.getShellName Get the name of a specified or default shell.
 * @returns {string} The escaped argument.
 */
function parseArgsAndEscape(
  { arg, options, process },
  { escape, getEscapeFunction, getQuoteFunction, getShellName }
) {
  const env = process.env;
  const interpolation = options.interpolation;
  const shell = options.shell;

  const shellName = getShellName({ env, shell }, { resolveExecutable });
  return escape(
    { arg, interpolation, shellName },
    { getEscapeFunction, getQuoteFunction }
  );
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
 * @param {Function} deps.getPlatformHelpers A function to get helper functions.
 * @returns {string} The escaped argument.
 */
export function escape(
  { arg, options, platform, process },
  { escapeShellArg, getPlatformHelpers }
) {
  options = mergeObjects({ interpolation: false }, options);
  return parseArgsAndEscape(
    { arg, options, process },
    { ...getPlatformHelpers(platform), escape: escapeShellArg }
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
 * @param {Function} deps.getPlatformHelpers A function to get helper functions.
 * @param {Function} deps.quoteShellArg A function to quote & escape a shell argument.
 * @returns {string} The escaped argument.
 */
export function quote(
  { arg, options, platform, process },
  { getPlatformHelpers, quoteShellArg }
) {
  options = mergeObjects(options, { interpolation: false });
  return parseArgsAndEscape(
    { arg, options, process },
    { ...getPlatformHelpers(platform), escape: quoteShellArg }
  );
}
