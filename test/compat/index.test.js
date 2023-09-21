/**
 * @overview Contains smoke tests for Shescape to verify compatibility with Node
 * versions.
 * @license MIT
 */

import test from "ava";

import * as constants from "../_constants.js";

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
