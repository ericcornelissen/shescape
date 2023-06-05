/**
 * @overview Provides an API to consistently escape or quote shell arguments
 * across platforms.
 * @license MPL-2.0
 */

import { resolveExecutable } from "./executables.js";
import { isString, isStringable } from "./reflection.js";

/**
 * The error message for incorrect parameter types.
 *
 * @constant
 * @type {string}
 */
const typeError =
  "Shescape requires strings or values that can be converted into a string using .toString()";

/**
 * Convert a value into a string if that is possible.
 *
 * @param {any} value The value to convert into a string.
 * @returns {string} The `value` as a string.
 * @throws {TypeError} The `value` is not stringable.
 */
function checkedToString(value) {
  if (!isStringable(value)) {
    throw new TypeError(typeError);
  }

  const valueAsString = value.toString();
  return valueAsString;
}

/**
 * Parses options provided to {@link escapeShellArg} or {@link quoteShellArg}.
 *
 * @param {object} args The arguments for this function.
 * @param {object} args.options The options for escaping.
 * @param {boolean} [args.options.flagProtection] Is flag protection enabled.
 * @param {boolean} [args.options.interpolation] Is interpolation enabled.
 * @param {boolean | string} [args.options.shell] The shell to escape for.
 * @param {object} args.process The `process` values.
 * @param {object} args.process.env The environment variables.
 * @param {object} deps The dependencies for this function.
 * @param {Function} deps.getDefaultShell Function to get the default shell.
 * @param {Function} deps.getShellName Function to get the name of a shell.
 * @returns {object} The parsed arguments.
 */
function parseOptions(
  { options: { flagProtection, interpolation, shell }, process: { env } },
  { getDefaultShell, getShellName }
) {
  flagProtection = flagProtection ? true : false;
  interpolation = interpolation ? true : false;
  shell = isString(shell) ? shell : getDefaultShell({ env });

  const shellName = getShellName({ shell }, { resolveExecutable });
  return { flagProtection, interpolation, shellName };
}

/**
 * Escapes an argument for the given shell.
 *
 * @param {object} args The arguments for this function.
 * @param {string} args.arg The argument to escape.
 * @param {boolean} args.flagProtection Is flag protection enabled.
 * @param {boolean} args.interpolation Is interpolation enabled.
 * @param {string} args.shellName The name of the shell to escape `arg` for.
 * @param {object} deps The dependencies for this function.
 * @param {Function} deps.getEscapeFunction Get the escape function for a shell.
 * @param {Function} deps.stripFlagPrefix A function to strip flag prefixes.
 * @returns {string} The escaped argument.
 * @throws {TypeError} The argument to escape is not stringable.
 */
function escape(
  { arg, flagProtection, interpolation, shellName },
  { getEscapeFunction, stripFlagPrefix }
) {
  const argAsString = checkedToString(arg);
  const escape = getEscapeFunction(shellName, { interpolation });
  if (flagProtection) {
    return escape(stripFlagPrefix(argAsString));
  } else {
    return escape(argAsString);
  }
}

/**
 * Quotes and escape an argument for the given shell.
 *
 * @param {object} args The arguments for this function.
 * @param {string} args.arg The argument to escape.
 * @param {boolean} args.flagProtection Is flag protection enabled.
 * @param {string} args.shellName The name of the shell to escape `arg` for.
 * @param {object} deps The dependencies for this function.
 * @param {Function} deps.getQuoteFunction Get the quote function for a shell.
 * @param {Function} deps.stripFlagPrefix A function to strip flag prefixes.
 * @returns {string} The quoted and escaped argument.
 * @throws {TypeError} The argument to escape is not stringable.
 */
function quote(
  { arg, flagProtection, shellName },
  { getQuoteFunction, stripFlagPrefix }
) {
  const argAsString = checkedToString(arg);
  const quote = getQuoteFunction(shellName);
  if (flagProtection) {
    return quote(stripFlagPrefix(argAsString));
  } else {
    return quote(argAsString);
  }
}

/**
 * Escapes an argument for the given shell.
 *
 * @param {object} args The arguments for this function.
 * @param {string} args.arg The argument to escape.
 * @param {object} args.options The options for escaping `arg`.
 * @param {boolean} [args.options.flagProtection] Is flag protection enabled.
 * @param {boolean} [args.options.interpolation] Is interpolation enabled.
 * @param {boolean | string} [args.options.shell] The shell to escape `arg` for.
 * @param {object} args.process The `process` values.
 * @param {object} args.process.env The environment variables.
 * @param {object} deps The dependencies for this function.
 * @param {Function} deps.getDefaultShell Function to get the default shell.
 * @param {Function} deps.getEscapeFunction Get an escape function for a shell.
 * @param {Function} deps.getShellName Function to get the name of a shell.
 * @param {Function} deps.stripFlagPrefix A function to strip flag prefixes.
 * @returns {string} The escaped argument.
 */
export function escapeShellArg(
  { arg, options: { flagProtection, interpolation, shell }, process: { env } },
  { getDefaultShell, getEscapeFunction, getShellName, stripFlagPrefix }
) {
  const options = parseOptions(
    { options: { flagProtection, interpolation, shell }, process: { env } },
    { getDefaultShell, getShellName }
  );
  return escape(
    {
      arg,
      flagProtection: options.flagProtection,
      interpolation: options.interpolation,
      shellName: options.shellName,
    },
    { getEscapeFunction, stripFlagPrefix }
  );
}

/**
 * Quotes and escape an argument for the given shell.
 *
 * @param {object} args The arguments for this function.
 * @param {string} args.arg The argument to escape.
 * @param {object} args.options The options for escaping `arg`.
 * @param {boolean} [args.options.flagProtection] Is flag protection enabled.
 * @param {boolean | string} [args.options.shell] The shell to escape `arg` for.
 * @param {object} args.process The `process` values.
 * @param {object} args.process.env The environment variables.
 * @param {object} deps The dependencies for this function.
 * @param {Function} deps.getDefaultShell Function to get the default shell.
 * @param {Function} deps.getQuoteFunction Get a quote function for a shell.
 * @param {Function} deps.getShellName Function to get the name of a shell.
 * @param {Function} deps.stripFlagPrefix A function to strip flag prefixes.
 * @returns {string} The quoted and escaped argument.
 */
export function quoteShellArg(
  { arg, options: { flagProtection, shell }, process: { env } },
  { getDefaultShell, getQuoteFunction, getShellName, stripFlagPrefix }
) {
  const options = parseOptions(
    { options: { flagProtection, shell }, process: { env } },
    { getDefaultShell, getShellName }
  );
  return quote(
    {
      arg,
      flagProtection: options.flagProtection,
      shellName: options.shellName,
    },
    { getQuoteFunction, stripFlagPrefix }
  );
}
