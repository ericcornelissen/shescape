/**
 * @overview Contains breakage tests for the shescape testing module.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { test } from "node:test";

import * as fc from "fast-check";

import { Stubscape, Throwscape } from "shescape/testing";
import {
  Stubscape as PreviousStub,
  Throwscape as PreviousThrow,
} from "shescape-previous/testing";

import { arbitrary } from "./_.js";

test("testing.js", async (t) => {
  await t.test("Stubscape#constructor", () => {
    fc.assert(
      fc.property(arbitrary.shescapeOptions(), (options) => {
        let errored, previousErrored;

        try {
          // eslint-disable-next-line no-new
          new Stubscape(options);
        } catch {
          errored = true;
        }

        try {
          // eslint-disable-next-line no-new
          new PreviousStub(options);
        } catch {
          previousErrored = true;
        }

        assert.equal(errored, previousErrored);
      }),
    );
  });

  await t.test("Stubscape#escape", () => {
    fc.assert(
      fc.property(
        fc.record({
          arg: fc.anything(),
          options: arbitrary.shescapeOptions(),
        }),
        ({ arg, options }) => {
          let stubscape, previoustub;
          let result, previousResult;
          let errored, previousErrored;

          try {
            stubscape = new Stubscape(options);
            result = stubscape.escape(arg);
          } catch {
            errored = true;
          }

          try {
            previoustub = new PreviousStub(options);
            previousResult = previoustub.escape(arg);
          } catch {
            previousErrored = true;
          }

          assert.equal(typeof result, typeof previousResult);
          assert.equal(errored, previousErrored);
        },
      ),
    );
  });

  await t.test("Stubscape#escapeAll", () => {
    fc.assert(
      fc.property(
        fc.record({
          args: fc.oneof(fc.anything(), fc.array(fc.anything())),
          options: arbitrary.shescapeOptions(),
        }),
        ({ args, options }) => {
          let stubscape, previoustub;
          let result, previousResult;
          let errored, previousErrored;

          try {
            stubscape = new Stubscape(options);
            result = stubscape.escapeAll(args);
          } catch {
            errored = true;
          }

          try {
            previoustub = new PreviousStub(options);
            previousResult = previoustub.escapeAll(args);
          } catch {
            previousErrored = true;
          }

          assert.equal(typeof result, typeof previousResult);
          assert.equal(errored, previousErrored);
        },
      ),
    );
  });

  await t.test("Stubscape#quote", () => {
    fc.assert(
      fc.property(
        fc.record({
          arg: fc.anything(),
          options: arbitrary.shescapeOptions(),
        }),
        ({ arg, options }) => {
          let stubscape, previoustub;
          let result, previousResult;
          let errored, previousErrored;

          try {
            stubscape = new Stubscape(options);
            result = stubscape.quote(arg);
          } catch {
            errored = true;
          }

          try {
            previoustub = new PreviousStub(options);
            previousResult = previoustub.quote(arg);
          } catch {
            previousErrored = true;
          }

          assert.equal(typeof result, typeof previousResult);
          assert.equal(errored, previousErrored);
        },
      ),
    );
  });

  await t.test("Stubscape#quoteAll", () => {
    fc.assert(
      fc.property(
        fc.record({
          args: fc.oneof(fc.anything(), fc.array(fc.anything())),
          options: arbitrary.shescapeOptions(),
        }),
        ({ args, options }) => {
          let stubscape, previoustub;
          let result, previousResult;
          let errored, previousErrored;

          try {
            stubscape = new Stubscape(options);
            result = stubscape.quoteAll(args);
          } catch {
            errored = true;
          }

          try {
            previoustub = new PreviousStub(options);
            previousResult = previoustub.quoteAll(args);
          } catch {
            previousErrored = true;
          }

          assert.equal(typeof result, typeof previousResult);
          assert.equal(errored, previousErrored);
        },
      ),
    );
  });

  await t.test("Throwscape#constructor", () => {
    fc.assert(
      fc.property(arbitrary.shescapeOptions(), (options) => {
        let errored, previousErrored;

        try {
          // eslint-disable-next-line no-new
          new Throwscape(options);
        } catch {
          errored = true;
        }

        try {
          // eslint-disable-next-line no-new
          new PreviousThrow(options);
        } catch {
          previousErrored = true;
        }

        assert.equal(errored, previousErrored);
      }),
    );
  });
});
