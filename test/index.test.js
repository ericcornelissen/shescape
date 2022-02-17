/**
 * @overview Contains unit tests for `./index.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";
import os from "os";

import * as shescape from "../index.js";
import { resolveExecutable } from "../src/executables.js";
import * as main from "../src/main.js";
import * as unix from "../src/unix.js";
import * as win from "../src/win.js";

describe("index.js", function () {
  let env;
  let platform;
  let deps;

  before(function () {
    env = process.env;
    platform = os.platform();

    switch (platform) {
      case "win32":
        deps = { ...win, resolveExecutable };
        break;
      default:
        deps = { ...unix, resolveExecutable };
        break;
    }
  });

  describe("::escape", function () {
    it("calls main for the current OS", function () {
      const input = "Hello world!";
      const expected = main.escapeShellArg({ arg: input, env, platform }, deps);

      const output = shescape.escape(input);
      assert.strictEqual(output, expected);
    });
  });

  describe("::escapeAll", function () {
    it("calls main for every value for the current OS", function () {
      const input1 = "foo'";
      const input2 = "'bar";

      const output1 = main.escapeShellArg({ arg: input1, env, platform }, deps);
      const output2 = main.escapeShellArg({ arg: input2, env, platform }, deps);
      const expected = [output1, output2];

      const inputs = [input1, input2];
      const output = shescape.escapeAll(inputs);
      assert.deepStrictEqual(output, expected);
    });

    it("gracefully handles inputs that are not an array", function () {
      const input = "Hello world!";
      const expected = main.escapeShellArg({ arg: input, env, platform }, deps);

      const output = shescape.escapeAll(input);
      assert.deepStrictEqual(output, [expected]);
    });
  });

  describe("::quote", function () {
    it("quote calls main for the current OS", function () {
      const input = "Hello world!";
      const expected = main.quoteShellArg({ arg: input, env, platform }, deps);

      const output = shescape.quote(input);
      assert.strictEqual(output, expected);
    });
  });

  describe("::quoteAll", function () {
    it("calls main for every value for the current OS", function () {
      const input1 = "foo";
      const input2 = "bar";

      const output1 = main.quoteShellArg({ arg: input1, env, platform }, deps);
      const output2 = main.quoteShellArg({ arg: input2, env, platform }, deps);
      const expected = [output1, output2];

      const inputs = [input1, input2];
      const output = shescape.quoteAll(inputs);
      assert.deepStrictEqual(output, expected);
    });

    it("gracefully handles inputs that are not an array", function () {
      const input = "Hello world!";
      const expected = main.quoteShellArg({ arg: input, env, platform }, deps);

      const output = shescape.quoteAll(input);
      assert.deepStrictEqual(output, [expected]);
    });
  });
});
