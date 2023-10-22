/**
 * @overview Contains smoke tests for shescape testing module to verify
 * compatibility with Node.js versions.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { arbitrary } from "./_.js";

import { Shescape as Stubscape, Throwscape } from "../../testing.js";

testProp(
  "Stubscape#escape",
  [arbitrary.shescapeOptions(), arbitrary.shescapeArg()],
  (t, options, arg) => {
    let stubscape;

    try {
      stubscape = new Stubscape(options);
    } catch (error) {
      t.fail(`Unexpected error:\n${error}`);
    }

    try {
      stubscape.escape(arg);
    } catch (error) {
      t.fail(`Unexpected error:\n${error}`);
    }

    t.pass();
  },
);

testProp(
  "Stubscape#escapeAll",
  [arbitrary.shescapeOptions(), fc.array(arbitrary.shescapeArg())],
  (t, options, args) => {
    let stubscape;

    try {
      stubscape = new Stubscape(options);
    } catch (error) {
      t.fail(`Unexpected error:\n${error}`);
    }

    try {
      stubscape.escapeAll(args);
    } catch (error) {
      t.fail(`Unexpected error:\n${error}`);
    }

    t.pass();
  },
);

testProp(
  "Stubscape#quote",
  [arbitrary.shescapeOptions(), arbitrary.shescapeArg()],
  (t, options, arg) => {
    let stubscape;

    try {
      stubscape = new Stubscape(options);
    } catch (error) {
      t.fail(`Unexpected error:\n${error}`);
    }

    try {
      stubscape.quote(arg);
    } catch (error) {
      const knownErrors = ["Can't quote when shell is false"];

      if (!knownErrors.includes(error.message)) {
        t.fail(`Unexpected error:\n${error}`);
      }
    }

    t.pass();
  },
);

testProp(
  "Stubscape#quoteAll",
  [arbitrary.shescapeOptions(), fc.array(arbitrary.shescapeArg())],
  (t, options, args) => {
    let stubscape;

    try {
      stubscape = new Stubscape(options);
    } catch (error) {
      t.fail(`Unexpected error:\n${error}`);
    }

    try {
      stubscape.quoteAll(args);
    } catch (error) {
      const knownErrors = ["Can't quote when shell is false"];

      if (!knownErrors.includes(error.message)) {
        t.fail(`Unexpected error:\n${error}`);
      }
    }

    t.pass();
  },
);

testProp(
  "Throwscape#constructor",
  [arbitrary.shescapeOptions()],
  (t, options) => {
    try {
      new Throwscape(options);
    } catch (error) {
      const knownErrors = ["Can't be instantiated"];

      if (!knownErrors.includes(error.message)) {
        t.fail(`Unexpected error:\n${error}`);
      }
    }

    t.pass();
  },
);
