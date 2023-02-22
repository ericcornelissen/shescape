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
 * Parses options provided to {@link escapeShellArg} or {@link quoteShellArg}.
 *
 * @param {object} args The arguments for this function.
 * @param {object} args.options The options for escaping.
 * @param {string} [args.options.shell] The shell to escape for.
 * @param {boolean} [args.options.interpolation] Is interpolation enabled.
 * @param {object} args.process The `process` values.
 * @param {object} args.process.env The environment variables.
 * @param {object} deps The dependencies for this function.
 * @param {Function} deps.getDefaultShell Get the default shell for the system.
 * @param {Function} deps.getShellName Get the name of a shell.
 * @returns {object} The parsed arguments.
 */
function parseOptions(
  { options: { interpolation, shell }, process: { env } },
  { getDefaultShell, getShellName }
) {
  interpolation = interpolation ? true : false;
  shell = isString(shell) ? shell : getDefaultShell({ env });

  const shellName = getShellName({ shell }, { resolveExecutable });
  return { interpolation, shellName };
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
  const escapedArg = escape(argAsString, { interpolation, quoted });
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
 * @param {boolean} [args.options.interpolation] Is interpolation enabled.
 * @param {string} [args.options.shell] The shell to escape `arg` for.
 * @param {object} args.process The `process` values.
 * @param {object} args.process.env The environment variables.
 * @param {object} deps The dependencies for this function.
 * @param {Function} deps.getDefaultShell Get the default shell for the system.
 * @param {Function} deps.getEscapeFunction Get an escape function for a shell.
 * @param {Function} deps.getShellName Get the name of a shell.
 * @returns {string} The escaped argument.
 */
export function escapeShellArg(
  { arg, options: { interpolation, shell }, process: { env } },
  { getDefaultShell, getEscapeFunction, getShellName }
) {
  const options = parseOptions(
    { options: { interpolation, shell }, process: { env } },
    { getDefaultShell, getShellName }
  );
  return escape(
    {
      arg,
      interpolation: options.interpolation,
      quoted: false,
      shellName: options.shellName,
    },
    { getEscapeFunction }
  );
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
export function quoteShellArg(
  { arg, options: { shell }, process: { env } },
  { getDefaultShell, getEscapeFunction, getQuoteFunction, getShellName }
) {
  const options = parseOptions(
    { options: { shell }, process: { env } },
    { getDefaultShell, getShellName }
  );
  return quote(
    { arg, shellName: options.shellName },
    { getEscapeFunction, getQuoteFunction }
  );
}
