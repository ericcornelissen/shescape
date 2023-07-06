/**
 * @overview Contains TypeScript type definitions for Shescape.
 * @license MPL-2.0
 */

/**
 * Options for functions from the `node:child_process` module.
 *
 * @since 2.0.0
 */
interface ChildProcessOptions {
  /**
   * The shell to escape for. `false` and `undefined` mean no shell. `true`
   * means the default system shell, and any non-empty string configures a
   * particular shell.
   *
   * @default undefined
   * @since 2.0.0
   */
  readonly shell?: boolean | string;
}

/**
 * Options for {@link Shescape}.
 *
 * @since 2.0.0
 */
interface ShescapeOptions {
  /**
   * The options object that will be provided to a function from the
   * `node:child_process` module.
   *
   * @default {}
   * @since 2.0.0
   */
  readonly childProcess: ChildProcessOptions;

  /**
   * Whether or not to protect against flag and option (such as `--verbose`)
   * injection
   *
   * @default true
   * @since 2.0.0
   */
  readonly flagProtection?: boolean;

  /**
   * Is interpolation enabled.
   *
   * @default true
   * @since 2.0.0
   */
  readonly interpolation?: boolean;
}

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
interface Shescape {
  /**
   * Create a new {@link Shescape} instance.
   *
   * @param {object} [options] The escape options.
   * @param {boolean} [options.flagProtection=true] Is flag protection enabled.
   * @param {boolean} [options.interpolation=true] Is interpolation enabled.
   * @param {boolean | string} [options.shell] The shell to escape for.
   * @since 2.0.0
   */
  new (options: ShescapeOptions): Shescape;

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
   * @throws {TypeError} One of the arguments is not stringable.
   * @since 2.0.0
   */
  quoteAll(args: string[]): string[];
}
