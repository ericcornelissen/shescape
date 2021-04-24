/**
 * @overview Contains TypeScript type definitions for Shescape.
 * @license MPL-2.0
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

export function escape(arg: string): string;

export function escapeAll(arg: string[]): string[];

export function quote(arg: string): string;

export function quoteAll(arg: string[]): string[];
