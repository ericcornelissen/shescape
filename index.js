/**
 * A simple shell escape library. Use it to escape user-controlled inputs to
 * shell commands to prevent shell injection.
 *
 * @overview Entrypoint for the library.
 * @module shescape
 * @version 1.7.1
 * @license MPL-2.0
 */

import os from "node:os";
import process from "node:process";

import { parseOptions } from "./src/options.js";
import { getHelpersByPlatform } from "./src/platforms.js";
import { checkedToString, toArrayIfNecessary } from "./src/reflection.js";

/**
 * A class to escape user-controlled inputs to shell commands to prevent shell
 * injection.
 *
 * @example
 * import { spawn } from "node:child_process";
 * const shescape = Shescape();
 * spawn(
 *   "echo",
 *   ["Hello", shescape.escape(userInput)],
 *   null // `options.shell` MUST be falsy
 * );
 * @example
 * import { spawn } from "node:child_process";
 * const shescape = Shescape();
 * spawn(
 *   "echo",
 *   shescape.escapeAll(["Hello", userInput]),
 *   null // `options.shell` MUST be falsy
 * );
 * @example
 * import { spawn } from "node:child_process";
 * const spawnOptions = { shell: true }; // `options.shell` SHOULD be truthy
 * const shescape = Shescape({ childProcess: spawnOptions });
 * spawn(
 *   "echo",
 *   ["Hello", shescape.quote(userInput)],
 *   spawnOptions
 * );
 * @example
 * import { spawn } from "node:child_process";
 * const spawnOptions = { shell: true }; // `options.shell` SHOULD be truthy
 * const shescape = Shescape({ childProcess: spawnOptions });
 * spawn(
 *   "echo",
 *   shescape.quoteAll(["Hello", userInput]),
 *   spawnOptions
 * );
 */
export class Shescape {
  /**
   * Create a new {@link Shescape} instance.
   *
   * @param {object} [options] The escape options.
   * @param {boolean} [options.flagProtection=true] Is flag protection enabled.
   * @param {boolean} [options.interpolation=true] Is interpolation enabled.
   * @param {boolean | string} [options.shell] The shell to escape for.
   * @since 2.0.0
   */
  constructor(options = {}) {
    const platform = os.platform();
    const helpers = getHelpersByPlatform({ env: process.env, platform });

    const { flagProtection, interpolation, shellName } = parseOptions(
      { options, process },
      helpers,
    );

    {
      const escape = helpers.getEscapeFunction(shellName, { interpolation });
      if (flagProtection) {
        const flagProtect = helpers.getFlagProtectionFunction(shellName);
        this._escape = (arg) => flagProtect(escape(arg));
      } else {
        this._escape = escape;
      }
    }

    {
      const [escape, quote] = helpers.getQuoteFunction(shellName);
      if (flagProtection) {
        const flagProtect = helpers.getFlagProtectionFunction(shellName);
        this._quote = (arg) => quote(flagProtect(escape(arg)));
      } else {
        this._quote = (arg) => quote(escape(arg));
      }
    }
  }

  /**
   * Take a single value, the argument, and escape any dangerous characters.
   *
   * Non-string inputs will be converted to strings using a `toString()` method.
   *
   * @param {string} arg The argument to escape.
   * @returns {string} The escaped argument.
   * @throws {TypeError} The argument is not stringable.
   * @since 2.0.0
   */
  escape(arg) {
    const argAsString = checkedToString(arg);
    return this._escape(argAsString);
  }

  /**
   * Take a array of values, the arguments, and escape any dangerous characters
   * in every argument.
   *
   * Non-array inputs will be converted to one-value arrays and non-string
   * values will be converted to strings using a `toString()` method.
   *
   * @param {string[]} args The arguments to escape.
   * @returns {string[]} The escaped arguments.
   * @throws {TypeError} One of the arguments is not stringable.
   * @since 2.0.0
   */
  escapeAll(args) {
    args = toArrayIfNecessary(args);
    return args.map((arg) => this.escape(arg));
  }

  /**
   * Take a single value, the argument, put shell-specific quotes around it and
   * escape any dangerous characters.
   *
   * Non-string inputs will be converted to strings using a `toString()` method.
   *
   * @param {string} arg The argument to quote and escape.
   * @returns {string} The quoted and escaped argument.
   * @throws {TypeError} The argument is not stringable.
   * @since 2.0.0
   */
  quote(arg) {
    const argAsString = checkedToString(arg);
    return this._quote(argAsString);
  }

  /**
   * Take an array of values, the arguments, put shell-specific quotes around
   * every argument and escape any dangerous characters in every argument.
   *
   * Non-array inputs will be converted to one-value arrays and non-string
   * values will be converted to strings using a `toString()` method.
   *
   * @param {string[]} args The arguments to quote and escape.
   * @returns {string[]} The quoted and escaped arguments.
   * @throws {TypeError} One of the arguments is not stringable.
   * @since 2.0.0
   */
  quoteAll(args) {
    args = toArrayIfNecessary(args);
    return args.map((arg) => this.quote(arg));
  }
}
