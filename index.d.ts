/**
 * @overview Contains TypeScript type definitions for Shescape.
 * @license MPL-2.0
 */

interface EscapeOptions {
  readonly interpolation?: boolean;
  readonly shell?: boolean | string;
}

interface QuoteOptions {
  readonly shell?: boolean | string;
}

export function escape(arg: string, options?: EscapeOptions): string;

export function escapeAll(arg: string[], options?: EscapeOptions): string[];

export function quote(arg: string, options?: QuoteOptions): string;

export function quoteAll(arg: string[], options?: QuoteOptions): string[];
