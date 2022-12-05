/**
 * @overview Contains TypeScript type definitions for Shescape.
 * @license MPL-2.0
 */

type ShellOption = boolean | string | undefined;

interface EscapeOptions {
  readonly interpolation?: boolean;
  readonly shell?: ShellOption;
}

interface QuoteOptions {
  readonly shell?: ShellOption;
}

export function escape(arg: string, options?: EscapeOptions): string;

export function escapeAll(args: string[], options?: EscapeOptions): string[];

export function quote(arg: string, options?: QuoteOptions): string;

export function quoteAll(args: string[], options?: QuoteOptions): string[];
