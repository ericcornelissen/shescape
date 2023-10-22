/**
 * @overview Contains smoke tests for the main shescape module to verify
 * compatibility with Node.js versions.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";
import test from "ava";

import { arbitrary, constants } from "./_.js";

import { Shescape } from "../../index.js";

test.before((t) => {
  t.context.quoteShell = constants.isWindows
    ? constants.binCmd
    : constants.binBash;
});

test("has a working `escape` function", (t) => {
  const shescape = new Shescape({ shell: false });

  t.true(typeof shescape.escape === "function");

  const input = "Hello world!";
  const result = shescape.escape(input);
  t.is(typeof result, "string");
});

test("has a working `escapeAll` function", (t) => {
  const shescape = new Shescape({ shell: false });

  t.true(typeof shescape.escapeAll === "function");

  const inputs = ["foo", "bar"];
  const result = shescape.escapeAll(inputs);
  for (const output of result) {
    t.is(typeof output, "string");
  }
});

test("has a working `quote` function", (t) => {
  const shescape = new Shescape({ shell: t.context.quoteShell });

  t.true(typeof shescape.quote === "function");

  const input = "Hello world!";
  const result = shescape.quote(input);
  t.is(typeof result, "string");
});

test("has a working `quoteAll` function", (t) => {
  const shescape = new Shescape({ shell: t.context.quoteShell });

  t.true(typeof shescape.quoteAll === "function");

  const inputs = ["foo", "bar"];
  const result = shescape.quoteAll(inputs);
  for (const output of result) {
    t.is(typeof output, "string");
  }
});

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
