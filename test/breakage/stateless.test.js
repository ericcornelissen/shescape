/**
 * @overview Contains breakage tests for the stateless shescape variant.
 * @license MIT
 */

import * as assert from "node:assert/strict";
import { test } from "node:test";

import * as fc from "fast-check";

import * as shescape from "shescape/stateless";
import * as previouscape from "shescape-previous/stateless";

import { arbitrary } from "./_.js";

test("shescape.escape", () => {
  fc.assert(
    fc.property(
      fc.record({
        arg: fc.anything(),
        options: arbitrary.shescapeOptions(),
      }),
      ({ arg, options }) => {
        let result, errored;
        let previousResult, previousErrored;

        try {
          result = shescape.escape(arg, options);
        } catch {
          errored = true;
        }

        try {
          previousResult = previouscape.escape(arg, options);
        } catch {
          previousErrored = true;
        }

        assert.equal(errored, previousErrored);
        assert.equal(typeof result, typeof previousResult);
      },
    ),
  );
});

test("shescape.escapeAll", () => {
  fc.assert(
    fc.property(
      fc.record({
        args: fc.oneof(fc.anything(), fc.array(fc.anything())),
        options: arbitrary.shescapeOptions(),
      }),
      ({ args, options }) => {
        let result, errored;
        let previousResult, previousErrored;

        try {
          result = shescape.escapeAll(args, options);
        } catch {
          errored = true;
        }

        try {
          previousResult = previouscape.escapeAll(args, options);
        } catch {
          previousErrored = true;
        }

        assert.equal(errored, previousErrored);
        assert.equal(typeof result, typeof previousResult);
      },
    ),
  );
});

test("shescape.quote", () => {
  fc.assert(
    fc.property(
      fc.record({
        arg: fc.anything(),
        options: arbitrary.shescapeOptions(),
      }),
      ({ arg, options }) => {
        let result, errored;
        let previousResult, previousErrored;

        try {
          result = shescape.quote(arg, options);
        } catch {
          errored = true;
        }

        try {
          previousResult = previouscape.quote(arg, options);
        } catch {
          previousErrored = true;
        }

        assert.equal(errored, previousErrored);
        assert.equal(typeof result, typeof previousResult);
      },
    ),
  );
});

test("shescape.quoteAll", () => {
  fc.assert(
    fc.property(
      fc.record({
        args: fc.oneof(fc.anything(), fc.array(fc.anything())),
        options: arbitrary.shescapeOptions(),
      }),
      ({ args, options }) => {
        let result, errored;
        let previousResult, previousErrored;

        try {
          result = shescape.quoteAll(args, options);
        } catch {
          errored = true;
        }

        try {
          previousResult = previouscape.quoteAll(args, options);
        } catch {
          previousErrored = true;
        }

        assert.equal(errored, previousErrored);
        assert.equal(typeof result, typeof previousResult);
      },
    ),
  );
});
