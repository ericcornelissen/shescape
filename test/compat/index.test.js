/**
 * @overview Contains smoke tests for Shescape to verify compatibility with Node
 * versions.
 * @license MIT
 */

import test from "ava";

import { Shescape } from "../../index.js";

test.beforeEach((t) => {
  t.context.shescape = new Shescape({ shell: true });
});

test("has a functioning `escape` function", (t) => {
  const { shescape } = t.context;

  t.true(typeof shescape.escape === "function");

  const input = "Hello world!";
  const result = shescape.escape(input);
  t.is(typeof result, "string");
});

test("has a functioning `escapeAll` function", (t) => {
  const { shescape } = t.context;

  t.true(typeof shescape.escapeAll === "function");

  const inputs = ["foo", "bar"];
  const result = shescape.escapeAll(inputs);
  for (const output of result) {
    t.is(typeof output, "string");
  }
});

test("has a functioning `quote` function", (t) => {
  const { shescape } = t.context;

  t.true(typeof shescape.quote === "function");

  const input = "Hello world!";
  const result = shescape.quote(input);
  t.is(typeof result, "string");
});

test("has a functioning `quoteAll` function", (t) => {
  const { shescape } = t.context;

  t.true(typeof shescape.quoteAll === "function");

  const inputs = ["foo", "bar"];
  const result = shescape.quoteAll(inputs);
  for (const output of result) {
    t.is(typeof output, "string");
  }
});
