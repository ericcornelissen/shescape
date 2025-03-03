/**
 * @overview Contains smoke tests for the shescape testing module to verify
 * compatibility with Node.js versions.
 * @license MIT
 */

import * as fc from "fast-check";

import { Stubscape, Throwscape } from "../../src/modules/testing.js";

import { arbitrary } from "./_.js";

export function testStubscapeEscape() {
  fc.assert(
    fc.property(
      arbitrary.shescapeOptions(),
      arbitrary.shescapeArg(),
      (options, arg) => {
        let stubscape;

        try {
          stubscape = new Stubscape(options);
        } catch (error) {
          throw new Error(`Unexpected error:\n${error}`);
        }

        try {
          stubscape.escape(arg);
        } catch (error) {
          throw new Error(`Unexpected error:\n${error}`);
        }
      },
    ),
  );
}

export function testStubscapeEscapeAll() {
  fc.assert(
    fc.property(
      arbitrary.shescapeOptions(),
      fc.array(arbitrary.shescapeArg()),
      (options, args) => {
        let stubscape;

        try {
          stubscape = new Stubscape(options);
        } catch (error) {
          throw new Error(`Unexpected error:\n${error}`);
        }

        try {
          stubscape.escapeAll(args);
        } catch (error) {
          throw new Error(`Unexpected error:\n${error}`);
        }
      },
    ),
  );
}

export function testStubscapeQuote() {
  fc.assert(
    fc.property(
      arbitrary.shescapeOptions(),
      arbitrary.shescapeArg(),
      (options, arg) => {
        let stubscape;

        try {
          stubscape = new Stubscape(options);
        } catch (error) {
          throw new Error(`Unexpected error:\n${error}`);
        }

        try {
          stubscape.quote(arg);
        } catch (error) {
          const knownErrors = ["Shell may not be false"];

          if (!knownErrors.includes(error.message)) {
            throw new Error(`Unexpected error:\n${error}`);
          }
        }
      },
    ),
  );
}

export function testStubscapeQuoteAll() {
  fc.assert(
    fc.property(
      arbitrary.shescapeOptions(),
      fc.array(arbitrary.shescapeArg()),
      (options, args) => {
        let stubscape;

        try {
          stubscape = new Stubscape(options);
        } catch (error) {
          throw new Error(`Unexpected error:\n${error}`);
        }

        try {
          stubscape.quoteAll(args);
        } catch (error) {
          const knownErrors = ["Shell may not be false"];

          if (!knownErrors.includes(error.message)) {
            throw new Error(`Unexpected error:\n${error}`);
          }
        }
      },
    ),
  );
}

export function testThrowscapeConstructor() {
  fc.assert(
    fc.property(arbitrary.shescapeOptions(), (options) => {
      try {
        // eslint-disable-next-line no-new
        new Throwscape(options);
      } catch (error) {
        const knownErrors = ["Can't be instantiated"];

        if (!knownErrors.includes(error.message)) {
          throw new Error(`Unexpected error:\n${error}`);
        }
      }
    }),
  );
}
