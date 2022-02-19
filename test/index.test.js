/**
 * @overview Contains unit tests for `./index.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";
import os from "os";

import * as shescape from "../index.js";
import * as proxy from "../src/index-proxy.js";
import * as main from "../src/main.js";

describe("index.js", function () {
  let platform;

  before(function () {
    platform = os.platform();
  });

  describe("::escape", function () {
    it("calls main for the current OS", function () {
      const input = "Hello world!";
      const expected = proxy.escape({ arg: input, platform, process }, main);

      const output = shescape.escape(input);
      assert.strictEqual(output, expected);
    });
  });

  describe("::escapeAll", function () {
    it("calls main for every value for the current OS", function () {
      const input1 = "foo'";
      const input2 = "'bar";

      const output1 = proxy.escape({ arg: input1, platform, process }, main);
      const output2 = proxy.escape({ arg: input2, platform, process }, main);
      const expected = [output1, output2];

      const inputs = [input1, input2];
      const output = shescape.escapeAll(inputs);
      assert.deepStrictEqual(output, expected);
    });

    it("gracefully handles inputs that are not an array", function () {
      const input = "Hello world!";
      const expected = proxy.escape({ arg: input, platform, process }, main);

      const output = shescape.escapeAll(input);
      assert.deepStrictEqual(output, [expected]);
    });
  });

  describe("::quote", function () {
    it("quote calls main for the current OS", function () {
      const input = "Hello world!";
      const expected = proxy.quote({ arg: input, platform, process }, main);

      const output = shescape.quote(input);
      assert.strictEqual(output, expected);
    });
  });

  describe("::quoteAll", function () {
    it("calls main for every value for the current OS", function () {
      const input1 = "foo";
      const input2 = "bar";

      const output1 = proxy.quote({ arg: input1, platform, process }, main);
      const output2 = proxy.quote({ arg: input2, platform, process }, main);
      const expected = [output1, output2];

      const inputs = [input1, input2];
      const output = shescape.quoteAll(inputs);
      assert.deepStrictEqual(output, expected);
    });

    it("gracefully handles inputs that are not an array", function () {
      const input = "Hello world!";
      const expected = proxy.quote({ arg: input, platform, process }, main);

      const output = shescape.quoteAll(input);
      assert.deepStrictEqual(output, [expected]);
    });
  });
});
