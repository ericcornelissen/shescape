/**
 * @overview Contains TypeScript type definitions for the experimental Shescape
 * API.
 * @license MPL-2.0
 */

/**
 * TODO.
 */
interface Options {
  /**
   * TODO.
   */
  readonly interpolation?: boolean;

  /**
   * TODO.
   */
  readonly shell?: boolean | string | undefined;
}

/**
 * TODO.
 */
class Shescape {
  /**
   * TODO.
   */
  constructor(options: Options);

  /**
   * TODO.
   */
  escape(arg: string): string;

  /**
   * TODO.
   */
  escapeAll(args: string[]): string[];

  /**
   * TODO.
   */
  quote(arg: string): string;

  /**
   * TODO.
   */
  quoteAll(arg: strings[]): string[];
}
