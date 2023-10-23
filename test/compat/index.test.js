/**
 * @overview Contains smoke tests for the main shescape module to verify
 * compatibility with Node.js versions.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";

import { arbitrary } from "./_.js";

import { Shescape } from "../../index.js";

testProp(
  "Shescape#escape",
  [arbitrary.shescapeOptions(), arbitrary.shescapeArg()],
  (t, options, arg) => {
    let shescape;

    try {
      shescape = new Shescape(options);
    } catch (error) {
      const known = ["No executable could be found for "];

      if (!known.some((knownError) => error.message.includes(knownError))) {
        t.fail(`Unexpected error:\n${error}`);
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
        t.fail(`Unexpected error:\n${error}`);
      }
    }

    t.pass();
  },
);

testProp(
  "Shescape#escapeAll",
  [arbitrary.shescapeOptions(), fc.array(arbitrary.shescapeArg())],
  (t, options, args) => {
    let shescape;

    try {
      shescape = new Shescape(options);
    } catch (error) {
      const known = ["No executable could be found for "];

      if (!known.some((knownError) => error.message.includes(knownError))) {
        t.fail(`Unexpected error:\n${error}`);
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
        t.fail(`Unexpected error:\n${error}`);
      }
    }

    t.pass();
  },
);

testProp(
  "Shescape#quote",
  [arbitrary.shescapeOptions(), arbitrary.shescapeArg()],
  (t, options, arg) => {
    let shescape;

    try {
      shescape = new Shescape(options);
    } catch (error) {
      const known = ["No executable could be found for "];

      if (!known.some((knownError) => error.message.includes(knownError))) {
        t.fail(`Unexpected error:\n${error}`);
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
        t.fail(`Unexpected error:\n${error}`);
      }
    }

    t.pass();
  },
);

testProp(
  "Shescape#quoteAll",
  [arbitrary.shescapeOptions(), fc.array(arbitrary.shescapeArg())],
  (t, options, args) => {
    let shescape;

    try {
      shescape = new Shescape(options);
    } catch (error) {
      const known = ["No executable could be found for "];

      if (!known.some((knownError) => error.message.includes(knownError))) {
        t.fail(`Unexpected error:\n${error}`);
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
        t.fail(`Unexpected error:\n${error}`);
      }
    }

    t.pass();
  },
);
