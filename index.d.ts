/**
 * @overview Contains TypeScript type definitions for Shescape.
 * @license MPL-2.0
 */

/**
 * Possible values of a shell. `false` and `undefined` mean no shell. `true`
 * means the default system shell, and any non-empty string configures a
 * particular shell.
 */
type ShellOption = boolean | string | undefined;

/**
 * Options for {@link escape} and {@link escapeAll}.
 */
interface EscapeOptions {
  /**
   * Is interpolation enabled.
   *
   * @default false
   */
  readonly interpolation?: boolean;

  /**
   * The shell to escape for.
   *
   * @default undefined
   */
  readonly shell?: ShellOption;
}

/**
 * Options for {@link quote} and {@link quoteAll}.
 */
interface QuoteOptions {
  /**
   * The shell to escape for.
   *
   * @default undefined
   */
  readonly shell?: ShellOption;
}

/**
 * Take a single value, the argument, and escape any dangerous characters.
 *
 * Non-string inputs will be converted to strings using a `toString()` method.
 *
 * @param arg The argument to escape.
 * @param [options] The {@link EscapeOptions}.
 * @returns The escaped argument.
 * @throws The argument is not stringable.
 * @since 0.1.0
 */
export function escape(arg: string, options?: EscapeOptions): string;

/**
 * Take a array of values, the arguments, and escape any dangerous characters in
 * every argument.
 *
 * Non-array inputs will be converted to one-value arrays and non-string values
 * will be converted to strings using a `toString()` method.
 *
 * @param args The arguments to escape.
 * @param [options] The {@link EscapeOptions}.
 * @returns The escaped arguments.
 * @throws One of the arguments is not stringable.
 * @since 1.1.0
 */
export function escapeAll(args: string[], options?: EscapeOptions): string[];

/**
 * Take a single value, the argument, put OS-specific quotes around it and
 * escape any dangerous characters.
 *
 * Non-string inputs will be converted to strings using a `toString()` method.
 *
 * @param arg The argument to quote and escape.
 * @param [options] The {@link QuoteOptions}.
 * @returns The quoted and escaped argument.
 * @throws The argument is not stringable.
 * @since 0.3.0
 */
export function quote(arg: string, options?: QuoteOptions): string;

/**
 * Take an array of values, the arguments, put OS-specific quotes around every
 * argument and escape any dangerous characters in every argument.
 *
 * Non-array inputs will be converted to one-value arrays and non-string values
 * will be converted to strings using a `toString()` method.
 *
 * @param args The arguments to quote and escape.
 * @param [options] The {@link QuoteOptions}.
 * @returns The quoted and escaped arguments.
 * @throws One of the arguments is not stringable.
 * @since 0.4.0
 */
export function quoteAll(args: string[], options?: QuoteOptions): string[];
