/**
 * @overview Contains TypeScript type definitions for Shescape.
 * @license MPL-2.0
 */

/**
 * Options for {@link Shescape}.
 *
 * @since 2.0.0
 */
export interface ShescapeOptions {
  /**
   * Whether or not to protect against flag and option (such as `--verbose`)
   * injection
   *
   * @default true
   * @since 2.0.0
   */
  readonly flagProtection?: boolean;

  /**
   * The shell to escape for. `false` means no shell, `true` means the default
   * system shell, and any non-empty string configures a particular shell.
   *
   * @default true
   * @since 2.0.0
   */
  readonly shell?: boolean | string;
}

/**
 * A class to escape user-controlled inputs to shell commands to prevent shell
 * injection.
 *
 * @example
 * import { spawn } from "node:child_process";
 * const shescape = new Shescape({ shell: false });
 * spawn(
 *   "echo",
 *   ["Hello", shescape.escape(userInput)],
 *   null // `options.shell` MUST be falsy
 * );
 * @example
 * import { spawn } from "node:child_process";
 * const shescape = new Shescape({ shell: false });
 * spawn(
 *   "echo",
 *   shescape.escapeAll(["Hello", userInput]),
 *   null // `options.shell` MUST be falsy
 * );
 * @example
 * import { spawn } from "node:child_process";
 * const spawnOptions = { shell: true }; // `options.shell` SHOULD be truthy
 * const shescape = new Shescape({ shell: spawnOptions.shell });
 * spawn(
 *   "echo",
 *   ["Hello", shescape.quote(userInput)],
 *   spawnOptions
 * );
 * @example
 * import { spawn } from "node:child_process";
 * const spawnOptions = { shell: true }; // `options.shell` SHOULD be truthy
 * const shescape = new Shescape({ shell: spawnOptions.shell });
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
   * @param {boolean | string} [options.shell=true] The shell to escape for.
   * @throws {Error} The shell is not supported or could not be found.
   * @since 2.0.0
   */
  constructor(options: ShescapeOptions);

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
  escape(arg: string): string;

  /**
   * Take an array of values, the arguments, and escape any dangerous characters
   * in every argument.
   *
   * Non-array inputs will be converted to one-value arrays and non-string
   * values will be converted to strings using a `toString()` method.
   *
   * @param {string[]} args The arguments to escape.
   * @returns {string[]} The escaped arguments.
   * @throws {TypeError} The arguments are not an array.
   * @throws {TypeError} One of the arguments is not stringable.
   * @since 2.0.0
   */
  escapeAll(args: string[]): string[];

  /**
   * Take a single value, the argument, put shell-specific quotes around it and
   * escape any dangerous characters.
   *
   * Non-string inputs will be converted to strings using a `toString()` method.
   *
   * @param {string} arg The argument to quote and escape.
   * @returns {string} The quoted and escaped argument.
   * @throws {TypeError} The argument is not stringable.
   * @throws {Error} Quoting is not supported with `shell: false`.
   * @since 2.0.0
   */
  quote(arg: string): string;

  /**
   * Take an array of values, the arguments, put shell-specific quotes around
   * every argument and escape any dangerous characters in every argument.
   *
   * Non-array inputs will be converted to one-value arrays and non-string
   * values will be converted to strings using a `toString()` method.
   *
   * @param {string[]} args The arguments to quote and escape.
   * @returns {string[]} The quoted and escaped arguments.
   * @throws {TypeError} The arguments are not an array.
   * @throws {TypeError} One of the arguments is not stringable.
   * @throws {Error} Quoting is not supported with `shell: false`.
   * @since 2.0.0
   */
  quoteAll(args: string[]): string[];
}
