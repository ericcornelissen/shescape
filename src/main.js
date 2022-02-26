/**
 * @overview Contains the logic to escape (and quote) shell arguments given
 * helper functions.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import { typeError } from "./constants.js";
import { resolveExecutable } from "./executables.js";

/**
 * Merge any number of objects into a single object.
 *
 * Note: the values of objects appearing later in the list of arguments take
 * precedence when merging.
 *
 * @param {...Object} objects The objects to merge.
 * @returns {Object} The merged object.
 */
function mergeObjects(...objects) {
  const mergedObjects = Object.assign(Object.create(null), ...objects);
  return mergedObjects;
}

/**
 * Check if a value can be converted into a string.
 *
 * @param {any} value The value of interest.
 * @returns {boolean} `true` iff `value` can be converted into a string.
 */
function isStringable(value) {
  if (value === undefined || value === null) {
    return false;
  }

  if (typeof value.toString !== "function") {
    return false;
  }

  const str = value.toString();
  return typeof str === "string";
}

/**
 * Parse inputs and escape the provided argument.
 *
 * @param {Object} args The arguments for this function.
 * @param {string} args.arg The argument to escape.
 * @param {Object} args.options The options for escaping `arg`.
 * @param {string} [args.options.shell] The shell to escape `arg` for.
 * @param {boolean} [args.options.interpolation] Is interpolation enabled.
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
 * Escape an argument for the given shell.
 *
 * @param {Object} args The arguments for this function.
 * @param {string} args.arg The argument to escape.
 * @param {boolean} args.interpolation Is interpolation enabled.
 * @param {string} args.shellName The name of the shell to escape `arg` for.
 * @param {Object} deps The dependencies for this function.
 * @param {Function} deps.getEscapeFunction Get the escape function for a shell.
 * @returns {string} The escaped argument.
 * @throws {TypeError} The argument to escape is not stringable.
 */
function escape({ arg, interpolation, shellName }, { getEscapeFunction }) {
  if (!isStringable(arg)) {
    throw new TypeError(typeError);
  }

  const argAsString = arg.toString();
  const escape = getEscapeFunction(shellName);
  const escapedArg = escape(argAsString, interpolation);
  return escapedArg;
}

/**
 * Quote and escape an argument for the given shell.
 *
 * @param {Object} args The arguments for this function.
 * @param {string} args.arg The argument to escape.
 * @param {string} args.shellName The name of the shell to escape `arg` for.
 * @param {Object} deps The dependencies for this function.
 * @param {Function} deps.getEscapeFunction Get the escape function for a shell.
 * @param {Function} deps.getQuoteFunction Get the quote function for a shell.
 * @returns {string} The escaped argument.
 * @throws {TypeError} The argument to escape is not stringable.
 */
function quote({ arg, shellName }, { getEscapeFunction, getQuoteFunction }) {
  const escapedArg = escape(
    { arg, interpolation: false, shellName },
    { getEscapeFunction }
  );
  const quote = getQuoteFunction(shellName);
  const escapedAndQuotedArg = quote(escapedArg);
  return escapedAndQuotedArg;
}

/**
 * Escape an argument for the given shell.
 *
 * @param {Object} args The arguments for this function.
 * @param {string} args.arg The argument to escape.
 * @param {Object} args.options The options for escaping `arg`.
 * @param {string} [args.options.shell] The shell to escape `arg` for.
 * @param {boolean} [args.options.interpolation=false] Is interpolation enabled.
 * @param {Object} args.process The `process` values.
 * @param {Object} args.process.env The environment variables.
 * @param {Object} deps The dependencies for this function.
 * @param {Function} deps.getEscapeFunction Get an escape function for a shell.
 * @param {Function} deps.getShellName Get the name of a specified or default shell.
 * @returns {string} The escaped argument.
 */
export function escapeShellArg({ arg, options, process }, deps) {
  options = mergeObjects({ interpolation: false }, options);
  return parseArgsAndEscape(
    { arg, options, process },
    { escape: escape, ...deps }
  );
}

/**
 * Quote and escape an argument for the given shell.
 *
 * @param {Object} args The arguments for this function.
 * @param {string} args.arg The argument to escape.
 * @param {Object} args.options The options for escaping `arg`.
 * @param {string} [args.options.shell] The shell to escape `arg` for.
 * @param {Object} args.process The `process` values.
 * @param {Object} args.process.env The environment variables.
 * @param {Object} deps The dependencies for this function.
 * @param {Function} deps.getEscapeFunction Get an escape function for a shell.
 * @param {Function} deps.getQuoteFunction Get a quote function for a shell.
 * @param {Function} deps.getShellName Get the name of a specified or default shell.
 * @returns {string} The quoted and escaped argument.
 */
export function quoteShellArg({ arg, options, process }, deps) {
  return parseArgsAndEscape(
    { arg, options, process },
    { escape: quote, ...deps }
  );
}
