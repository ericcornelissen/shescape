/**
 * @overview Contains unit tests for `./index.cjs`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

const assert = require("assert");

const shescape = require("../index.cjs");

describe("index.cjs", function () {
  it("has an `escape` function", function () {
    const hasEscapeProperty = shescape.hasOwnProperty("escape");
    assert.ok(hasEscapeProperty);

    const escapeIsFunction = typeof shescape.escape === "function";
    assert.ok(escapeIsFunction);

    const input = "Hello world!";
    const result = shescape.escape(input);
    assert.notStrictEqual(result, "");
    assert.doesNotMatch(result, /(?<q>"|').*?(\k<q>)/);
  });

  it("has an `escapeAll` function", function () {
    const hasEscapeAllProperty = shescape.hasOwnProperty("escapeAll");
    assert.ok(hasEscapeAllProperty);

    const escapeAllIsFunction = typeof shescape.escapeAll === "function";
    assert.ok(escapeAllIsFunction);

    const inputs = ["foo", "bar"];
    const result = shescape.escapeAll(inputs);
    for (const output of result) {
      assert.notStrictEqual(output, "");
      assert.doesNotMatch(output, /(?<q>"|').*?(\k<q>)/);
    }
  });

  it("has an `quote` function", function () {
    const hasQuoteProperty = shescape.hasOwnProperty("quote");
    assert.ok(hasQuoteProperty);

    const quoteIsFunction = typeof shescape.quote === "function";
    assert.ok(quoteIsFunction);

    const input = "Hello world!";
    const result = shescape.quote(input);
    assert.notStrictEqual(result, "");
    assert.match(result, /(?<q>"|').*?(\k<q>)/);
  });

  it("has an `quoteAll` function", function () {
    const hasQuoteAllProperty = shescape.hasOwnProperty("quoteAll");
    assert.ok(hasQuoteAllProperty);

    const quoteAllIsFunction = typeof shescape.quoteAll === "function";
    assert.ok(quoteAllIsFunction);

    const inputs = ["foo", "bar"];
    const result = shescape.quoteAll(inputs);
    for (const output of result) {
      assert.notStrictEqual(output, "");
      assert.match(output, /(?<q>"|').*?(\k<q>)/);
    }
  });
});
