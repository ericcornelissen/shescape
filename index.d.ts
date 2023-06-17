/**
 * @overview Contains TypeScript type definitions for Shescape.
 * @license MPL-2.0
 */

/**
 * Options for {@link Shescape}.
 *
 * @since 2.0.0
 */
interface ShescapeOptions {
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

  /**
   * The shell to escape for.  `false` and `undefined` mean no shell. `true`
   * means the default system shell, and any non-empty string configures a
   * particular shell.
   *
   * @default undefined
   * @since 2.0.0
   */
  readonly shell?: boolean | string | undefined;
}

/**
 * TODO: copy from index.js
 */
interface Shescape {
  /**
   * TODO: copy from index.js
   *
   * @since 2.0.0
   */
  new (options: Shescape): Shescape;

  /**
   * TODO: copy from index.js
   *
   * @since 2.0.0
   */
  escape(arg: string): string;

  /**
   * TODO: copy from index.js
   *
   * @since 2.0.0
   */
  escapeAll(args: string[]): string[];

  /**
   * TODO: copy from index.js
   *
   * @since 2.0.0
   */
  quote(arg: string): string;

  /**
   * TODO: copy from index.js
   *
   * @since 2.0.0
   */
  quoteAll(args: string[]): string[];
}
