/**
 * @overview Contains property tests for the `escapeAll` function of the
 * Shescape API.
 * @license Unlicense
 */

import { testProp } from "ava-fast-check";
import * as fc from "fast-check";

import { arbitrary } from "./_.js";

import { escapeAll } from "../../../index.js";

testProp(
  "return values",
  [fc.array(fc.string()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    const result = escapeAll(args, options);
    for (const entry of result) {
      t.is(typeof entry, "string");
    }

    t.pass(); // in case `result.length === 0`
  }
);

testProp(
  "return size",
  [fc.array(fc.string()), arbitrary.shescapeOptions()],
  (t, args, options) => {
    const result = escapeAll(args, options);
    t.is(result.length, args.length);
  }
);

testProp(
  "string as input",
  [fc.string(), arbitrary.shescapeOptions()],
  (t, arg, options) => {
    const result = escapeAll(arg, options);
    t.is(result.length, 1);

    const entry = result[0];
    t.is(typeof entry, "string");
  }
);
