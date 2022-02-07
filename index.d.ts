/**
 * @overview Contains TypeScript type definitions for Shescape.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

interface Options {
  readonly shell?: string;
}

export function escape(arg: string, options?: Options): string;

export function escapeAll(arg: string[], options?: Options): string[];

export function quote(arg: string, options?: Options): string;

export function quoteAll(arg: string[], options?: Options): string[];
