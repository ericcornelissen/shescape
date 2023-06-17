/**
 * @overview Contains smoke tests for Shescape to verify compatibility with Node
 * versions.
 * @license MIT
 */

const assert = require("assert");

const { Shescape } = require("../../index.cjs");

describe("index.cjs", function () {
  let shescape;

  before(function () {
    shescape = new Shescape();
  });

  it("has a functioning `escape` function", function () {
    assert.ok(typeof shescape.escape === "function");

    const input = "Hello world!";
    const result = shescape.escape(input);
    assert.notStrictEqual(result, "");
    assert.ok(!/^(?<q>["']).*\k<q>$/u.test(result));
  });

  it("has a functioning `escapeAll` function", function () {
    assert.ok(typeof shescape.escapeAll === "function");

    const inputs = ["foo", "bar"];
    const result = shescape.escapeAll(inputs);
    for (const output of result) {
      assert.notStrictEqual(output, "");
      assert.ok(!/^(?<q>["']).*\k<q>$/u.test(output));
    }
  });

  it("has a functioning `quote` function", function () {
    assert.ok(typeof shescape.quote === "function");

    const input = "Hello world!";
    const result = shescape.quote(input);
    assert.notStrictEqual(result, "");
    assert.ok(/^(?<q>["']).*\k<q>$/u.test(result));
  });

  it("has a functioning `quoteAll` function", function () {
    assert.ok(typeof shescape.quoteAll === "function");

    const inputs = ["foo", "bar"];
    const result = shescape.quoteAll(inputs);
    for (const output of result) {
      assert.notStrictEqual(output, "");
      assert.ok(/^(?<q>["']).*\k<q>$/u.test(output));
    }
  });
});
