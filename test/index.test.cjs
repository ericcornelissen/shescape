/**
 * @overview Contains smoke tests for `./index.cjs`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

const assert = require("assert");

const shescape = require("../index.cjs");

describe("index.cjs", function () {
  it("has a functioning `escape` function", function () {
    assert.ok(shescape.hasOwnProperty("escape"));
    assert.ok(typeof shescape.escape === "function");

    const input = "Hello world!";
    const result = shescape.escape(input);
    assert.notStrictEqual(result, "");
    assert.ok(!/^(?<q>"|').*(\k<q>)$/.test(result));
  });

  it("has a functioning `escapeAll` function", function () {
    assert.ok(shescape.hasOwnProperty("escapeAll"));
    assert.ok(typeof shescape.escapeAll === "function");

    const inputs = ["foo", "bar"];
    const result = shescape.escapeAll(inputs);
    for (const output of result) {
      assert.notStrictEqual(output, "");
      assert.ok(!/^(?<q>"|').*(\k<q>)$/.test(output));
    }
  });

  it("has a functioning `quote` function", function () {
    assert.ok(shescape.hasOwnProperty("quote"));
    assert.ok(typeof shescape.quote === "function");

    const input = "Hello world!";
    const result = shescape.quote(input);
    assert.notStrictEqual(result, "");
    assert.ok(/^(?<q>"|').*(\k<q>)$/.test(result));
  });

  it("has a functioning `quoteAll` function", function () {
    assert.ok(shescape.hasOwnProperty("quoteAll"));
    assert.ok(typeof shescape.quoteAll === "function");

    const inputs = ["foo", "bar"];
    const result = shescape.quoteAll(inputs);
    for (const output of result) {
      assert.notStrictEqual(output, "");
      assert.ok(/^(?<q>"|').*(\k<q>)$/.test(output));
    }
  });
});
