/**
 * @overview Provides an API to consistently escape or quote shell arguments
 * across platforms.
 * @license MPL-2.0
 */

import { resolveExecutable } from "./executables.js";

/**
 * The error message for incorrect parameter types.
 *
 * @constant
 * @type {string}
 */
const typeError =
  "Shescape requires strings or values that can be converted into a string using .toString()";

/**
 * The `typeof` value of functions.
 *
 * @constant
 * @type {string}
 */
const typeofFunction = "function";

/**
 * The `typeof` value of strings.
 *
 * @constant
 * @type {string}
 */
const typeofString = "string";

/**
 * Checks if a value is a string.
 *
 * @param {any} value The value of interest.
 * @returns {boolean} `true` if `value` is a string, `false` otherwise.
 */
function isString(value) {
  return typeof value === typeofString;
}

/**
 * Checks if a value can be converted into a string.
 *
 * @param {any} value The value of interest.
 * @returns {boolean} `true` if `value` is stringable, `false` otherwise.
 */
function isStringable(value) {
  if (value === undefined || value === null) {
    return false;
  }

  if (typeof value.toString !== typeofFunction) {
    return false;
  }

  const str = value.toString();
  return isString(str);
}

/**
 * Merges any number of objects into a single object.
 *
 * Note: the values of objects appearing later in the list of arguments take
 * precedence when merging.
 *
 * @param {...object} objects The objects to merge.
 * @returns {object} The merged object.
 */
function mergeObjects(...objects) {
  const baseObject = Object.create(null);
  const mergedObjects = Object.assign(baseObject, ...objects);
  return mergedObjects;
}

/**
 * Parses arguments provided to {@link escapeShellArg} or {@link quoteShellArg}.
 *
 * @param {object} args The arguments for this function.
 * @param {string} args.arg The argument to escape.
 * @param {object} args.options The options for escaping `arg`.
 * @param {string} [args.options.shell] The shell to escape `arg` for.
 * @param {boolean} [args.options.interpolation] Is interpolation enabled.
 * @param {boolean} [args.options.quoted] Is `arg` being quoted.
 * @param {object} args.process The `process` values.
 * @param {object} args.process.env The environment variables.
 * @param {object} deps The dependencies for this function.
 * @param {Function} deps.getDefaultShell Get the default shell for the system.
 * @param {Function} deps.getShellName Get the name of a shell.
 * @returns {object} The parsed arguments.
 */
function parseArgs(
  { arg, options: { interpolation, quoted, shell }, process: { env } },
  { getDefaultShell, getShellName }
) {
  interpolation = interpolation ? true : false;
  shell = isString(shell) ? shell : getDefaultShell({ env });

  const shellName = getShellName({ shell }, { resolveExecutable });
  return { arg, interpolation, quoted, shellName };
}

/**
 * Escapes an argument for the given shell.
 *
 * @param {object} args The arguments for this function.
 * @param {string} args.arg The argument to escape.
 * @param {boolean} args.interpolation Is interpolation enabled.
 * @param {boolean} args.quoted Is `arg` being quoted.
 * @param {string} args.shellName The name of the shell to escape `arg` for.
 * @param {object} deps The dependencies for this function.
 * @param {Function} deps.getEscapeFunction Get the escape function for a shell.
 * @returns {string} The escaped argument.
 * @throws {TypeError} The argument to escape is not stringable.
 */
function escape(
  { arg, interpolation, quoted, shellName },
  { getEscapeFunction }
) {
  if (!isStringable(arg)) {
    throw new TypeError(typeError);
  }

  const argAsString = arg.toString();
  const escape = getEscapeFunction(shellName);
  const escapedArg = escape(argAsString, interpolation, quoted);
  return escapedArg;
}

/**
 * Quotes and escape an argument for the given shell.
 *
 * @param {object} args The arguments for this function.
 * @param {string} args.arg The argument to escape.
 * @param {string} args.shellName The name of the shell to escape `arg` for.
 * @param {object} deps The dependencies for this function.
 * @param {Function} deps.getEscapeFunction Get the escape function for a shell.
 * @param {Function} deps.getQuoteFunction Get the quote function for a shell.
 * @returns {string} The quoted and escaped argument.
 * @throws {TypeError} The argument to escape is not stringable.
 */
function quote({ arg, shellName }, { getEscapeFunction, getQuoteFunction }) {
  const escapedArg = escape(
    { arg, interpolation: false, quoted: true, shellName },
    { getEscapeFunction }
  );
  const quote = getQuoteFunction(shellName);
  const escapedAndQuotedArg = quote(escapedArg);
  return escapedAndQuotedArg;
}

/**
 * Escapes an argument for the given shell.
 *
 * @param {object} args The arguments for this function.
 * @param {string} args.arg The argument to escape.
 * @param {object} args.options The options for escaping `arg`.
 * @param {object} args.process The `process` values.
 * @param {object} deps The dependencies for this function.
 * @param {Function} deps.getDefaultShell Get the default shell for the system.
 * @param {Function} deps.getEscapeFunction Get an escape function for a shell.
 * @param {Function} deps.getShellName Get the name of a shell.
 * @returns {string} The escaped argument.
 */
export function escapeShellArg({ arg, options, process }, deps) {
  options = mergeObjects(options, { quoted: false });
  const escapeArgs = parseArgs({ arg, options, process }, deps);
  return escape(escapeArgs, deps);
}

/**
 * Quotes and escape an argument for the given shell.
 *
 * @param {object} args The arguments for this function.
 * @param {string} args.arg The argument to escape.
 * @param {object} args.options The options for escaping `arg`.
 * @param {string} [args.options.shell] The shell to escape `arg` for.
 * @param {object} args.process The `process` values.
 * @param {object} args.process.env The environment variables.
 * @param {object} deps The dependencies for this function.
 * @param {Function} deps.getDefaultShell Get the default shell for the system.
 * @param {Function} deps.getEscapeFunction Get an escape function for a shell.
 * @param {Function} deps.getQuoteFunction Get a quote function for a shell.
 * @param {Function} deps.getShellName Get the name of a shell.
 * @returns {string} The quoted and escaped argument.
 */
export function quoteShellArg(args, deps) {
  const quoteArgs = parseArgs(args, deps);
  return quote(quoteArgs, deps);
}
