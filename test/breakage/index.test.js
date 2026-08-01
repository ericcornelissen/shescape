/**
 * @overview Contains breakage tests for the `Shescape` class.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { describe, it } from "node:test";

import * as fc from "fast-check";

import { Shescape } from "shescape";
import { Shescape as Previouscape } from "shescape-previous";

import { arbitrary } from "./_.js";

describe("index.js", () => {
  it("Shescape#constructor", () => {
    fc.assert(
      fc.property(arbitrary.shescapeOptions(), (options) => {
        let errored, previousErrored;

        try {
          // eslint-disable-next-line no-new
          new Shescape(options);
        } catch {
          errored = true;
        }

        try {
          // eslint-disable-next-line no-new
          new Previouscape(options);
        } catch {
          previousErrored = true;
        }

        assert.equal(errored, previousErrored);
      }),
    );
  });

  it("Shescape#escape", () => {
    fc.assert(
      fc.property(
        fc.record({
          arg: fc.anything(),
          options: arbitrary.shescapeOptions(),
        }),
        ({ arg, options }) => {
          let shescape, previouscape;
          let result, previousResult;
          let errored, previousErrored;

          try {
            shescape = new Shescape(options);
            result = shescape.escape(arg);
          } catch {
            errored = true;
          }

          try {
            previouscape = new Previouscape(options);
            previousResult = previouscape.escape(arg);
          } catch {
            previousErrored = true;
          }

          assert.equal(typeof result, typeof previousResult);
          assert.equal(errored, previousErrored);
        },
      ),
    );
  });

  it("Shescape#escapeAll", () => {
    fc.assert(
      fc.property(
        fc.record({
          args: fc.oneof(fc.anything(), fc.array(fc.anything())),
          options: arbitrary.shescapeOptions(),
        }),
        ({ args, options }) => {
          let shescape, previouscape;
          let result, previousResult;
          let errored, previousErrored;

          try {
            shescape = new Shescape(options);
            result = shescape.escapeAll(args);
          } catch {
            errored = true;
          }

          try {
            previouscape = new Previouscape(options);
            previousResult = previouscape.escapeAll(args);
          } catch {
            previousErrored = true;
          }

          assert.equal(typeof result, typeof previousResult);
          assert.equal(errored, previousErrored);
        },
      ),
    );
  });

  it("Shescape#quote", () => {
    fc.assert(
      fc.property(
        fc.record({
          arg: fc.anything(),
          options: arbitrary.shescapeOptions(),
        }),
        ({ arg, options }) => {
          let shescape, previouscape;
          let result, previousResult;
          let errored, previousErrored;

          try {
            shescape = new Shescape(options);
            result = shescape.quote(arg);
          } catch {
            errored = true;
          }

          try {
            previouscape = new Previouscape(options);
            previousResult = previouscape.quote(arg);
          } catch {
            previousErrored = true;
          }

          assert.equal(typeof result, typeof previousResult);
          assert.equal(errored, previousErrored);
        },
      ),
    );
  });

  it("Shescape#quoteAll", () => {
    fc.assert(
      fc.property(
        fc.record({
          args: fc.oneof(fc.anything(), fc.array(fc.anything())),
          options: arbitrary.shescapeOptions(),
        }),
        ({ args, options }) => {
          let shescape, previouscape;
          let result, previousResult;
          let errored, previousErrored;

          try {
            shescape = new Shescape(options);
            result = shescape.quoteAll(args);
          } catch {
            errored = true;
          }

          try {
            previouscape = new Previouscape(options);
            previousResult = previouscape.quoteAll(args);
          } catch {
            previousErrored = true;
          }

          assert.equal(typeof result, typeof previousResult);
          assert.equal(errored, previousErrored);
        },
      ),
    );
  });
});
