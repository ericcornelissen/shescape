/**
 * @overview Contains unit tests for `./index.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";
import os from "os";
import process from "process";

import * as shescape from "../index.js";
import * as main from "../src/main.js";
import { getHelpersByPlatform } from "../src/platforms.js";

describe("index.js", function () {
  let options;
  let platform;

  before(function () {
    options = {};
    platform = os.platform();
  });

  describe("::escape", function () {
    it("calls main for the current OS", function () {
      const input = "Hello world!";
      const expected = main.escapeShellArg(
        { arg: input, options, process },
        getHelpersByPlatform(platform)
      );

      const output = shescape.escape(input);
      assert.strictEqual(output, expected);
    });
  });

  describe("::escapeAll", function () {
    it("calls main for every value for the current OS", function () {
      const input1 = "foo'";
      const input2 = "'bar";

      const output1 = main.escapeShellArg(
        { arg: input1, options, process },
        getHelpersByPlatform(platform)
      );
      const output2 = main.escapeShellArg(
        { arg: input2, options, process },
        getHelpersByPlatform(platform)
      );
      const expected = [output1, output2];

      const inputs = [input1, input2];
      const output = shescape.escapeAll(inputs);
      assert.deepStrictEqual(output, expected);
    });

    it("gracefully handles inputs that are not an array", function () {
      const input = "Hello world!";
      const expected = main.escapeShellArg(
        { arg: input, options, platform, process },
        getHelpersByPlatform(platform)
      );

      const output = shescape.escapeAll(input);
      assert.deepStrictEqual(output, [expected]);
    });
  });

  describe("::quote", function () {
    it("quote calls main for the current OS", function () {
      const input = "Hello world!";
      const expected = main.quoteShellArg(
        { arg: input, options, platform, process },
        getHelpersByPlatform(platform)
      );

      const output = shescape.quote(input);
      assert.strictEqual(output, expected);
    });
  });

  describe("::quoteAll", function () {
    it("calls main for every value for the current OS", function () {
      const input1 = "foo";
      const input2 = "bar";

      const output1 = main.quoteShellArg(
        { arg: input1, options, platform, process },
        getHelpersByPlatform(platform)
      );
      const output2 = main.quoteShellArg(
        { arg: input2, options, platform, process },
        getHelpersByPlatform(platform)
      );
      const expected = [output1, output2];

      const inputs = [input1, input2];
      const output = shescape.quoteAll(inputs);
      assert.deepStrictEqual(output, expected);
    });

    it("gracefully handles inputs that are not an array", function () {
      const input = "Hello world!";
      const expected = main.quoteShellArg(
        { arg: input, options, platform, process },
        getHelpersByPlatform(platform)
      );

      const output = shescape.quoteAll(input);
      assert.deepStrictEqual(output, [expected]);
    });
  });
});
