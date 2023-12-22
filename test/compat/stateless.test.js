/**
 * @overview Contains smoke tests for the stateless shescape module to verify
 * compatibility with Node.js versions.
 * @license MIT
 */

import * as fc from "fast-check";

import { arbitrary } from "./_.js";

import * as shescape from "../../stateless.js";

export function testShescapeEscape() {
  fc.assert(
    fc.property(
      arbitrary.shescapeArg(),
      arbitrary.shescapeOptions(),
      (arg, options) => {
        try {
          shescape.escape(arg, options);
        } catch (error) {
          const known = [
            "No executable could be found for ",
            "Shescape does not support the shell ",
            "Cannot read property 'escape' of undefined",
            "Cannot read properties of undefined (reading 'escape')",
          ];

          if (!known.some((knownError) => error.message.includes(knownError))) {
            throw new Error(`Unexpected error:\n${error}`);
          }
        }
      },
    ),
  );
}

export function testShescapeEscapeAll() {
  fc.assert(
    fc.property(
      fc.array(arbitrary.shescapeArg()),
      arbitrary.shescapeOptions(),
      (args, options) => {
        try {
          shescape.escapeAll(args, options);
        } catch (error) {
          const known = [
            "No executable could be found for ",
            "Shescape does not support the shell ",
            "Cannot read property 'escapeAll' of undefined",
            "Cannot read properties of undefined (reading 'escapeAll')",
          ];

          if (!known.some((knownError) => error.message.includes(knownError))) {
            throw new Error(`Unexpected error:\n${error}`);
          }
        }
      },
    ),
  );
}

export function testShescapeQuote() {
  fc.assert(
    fc.property(
      arbitrary.shescapeArg(),
      arbitrary.shescapeOptions(),
      (arg, options) => {
        try {
          shescape.quote(arg, options);
        } catch (error) {
          const known = [
            "No executable could be found for ",
            "Shescape does not support the shell ",
            "Cannot read property 'quote' of undefined",
            "Cannot read properties of undefined (reading 'quote')",
            "Quoting is not supported when no shell is used",
          ];

          if (!known.some((knownError) => error.message.includes(knownError))) {
            throw new Error(`Unexpected error:\n${error}`);
          }
        }
      },
    ),
  );
}

export function testShescapeQuoteAll() {
  fc.assert(
    fc.property(
      fc.array(arbitrary.shescapeArg()),
      arbitrary.shescapeOptions(),
      (args, options) => {
        try {
          shescape.quoteAll(args, options);
        } catch (error) {
          const known = [
            "No executable could be found for ",
            "Shescape does not support the shell ",
            "Cannot read property 'quoteAll' of undefined",
            "Cannot read properties of undefined (reading 'quoteAll')",
            "Quoting is not supported when no shell is used",
          ];

          if (!known.some((knownError) => error.message.includes(knownError))) {
            throw new Error(`Unexpected error:\n${error}`);
          }
        }
      },
    ),
  );
}
