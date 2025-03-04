/**
 * @overview Contains smoke tests for the main shescape module to verify
 * compatibility with Node.js versions.
 * @license MIT
 */

import * as fc from "fast-check";

import { Shescape } from "../../src/modules/index.js";

import { arbitrary } from "./_.js";

export function testShescapeEscape() {
  fc.assert(
    fc.property(
      arbitrary.shescapeOptions(),
      arbitrary.shescapeArg(),
      (options, arg) => {
        let shescape;

        try {
          shescape = new Shescape(options);
        } catch (error) {
          const known = [
            "No executable could be found for ",
            "Shescape does not support the shell ",
          ];

          if (!known.some((knownError) => error.message.includes(knownError))) {
            throw new Error(`Unexpected error:\n${error}`);
          }
        }

        try {
          shescape.escape(arg);
        } catch (error) {
          const known = [
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
      arbitrary.shescapeOptions(),
      fc.array(arbitrary.shescapeArg()),
      (options, args) => {
        let shescape;

        try {
          shescape = new Shescape(options);
        } catch (error) {
          const known = [
            "No executable could be found for ",
            "Shescape does not support the shell ",
          ];

          if (!known.some((knownError) => error.message.includes(knownError))) {
            throw new Error(`Unexpected error:\n${error}`);
          }
        }

        try {
          shescape.escapeAll(args);
        } catch (error) {
          const known = [
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
      arbitrary.shescapeOptions(),
      arbitrary.shescapeArg(),
      (options, arg) => {
        let shescape;

        try {
          shescape = new Shescape(options);
        } catch (error) {
          const known = [
            "No executable could be found for ",
            "Shescape does not support the shell ",
          ];

          if (!known.some((knownError) => error.message.includes(knownError))) {
            throw new Error(`Unexpected error:\n${error}`);
          }
        }

        try {
          shescape.quote(arg);
        } catch (error) {
          const known = [
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
      arbitrary.shescapeOptions(),
      fc.array(arbitrary.shescapeArg()),
      (options, args) => {
        let shescape;

        try {
          shescape = new Shescape(options);
        } catch (error) {
          const known = [
            "No executable could be found for ",
            "Shescape does not support the shell ",
          ];

          if (!known.some((knownError) => error.message.includes(knownError))) {
            throw new Error(`Unexpected error:\n${error}`);
          }
        }

        try {
          shescape.quoteAll(args);
        } catch (error) {
          const known = [
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
