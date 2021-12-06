/**
 * @overview Contains unit tests for `./index.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";
import sinon from "sinon";
import os from "os";

import * as shescape from "../index.js";
import * as main from "../src/main.js";

describe("index.js", function () {
  const env = process.env;
  const platform = "MundOS";

  beforeEach(function () {
    sinon.stub(os, "platform").returns(platform);
  });

  it("escape calls main for current OS", function () {
    const input = "Hello world!";
    const expectedOutput = main.escapeShellArgByPlatform(input, platform, env);

    const output = shescape.escape(input);
    assert(os.platform.called);
    assert.strictEqual(output, expectedOutput);
  });

  it("escapeAll calls main for every value", function () {
    const input1 = "foo'";
    const input2 = "'bar";
    const output1 = main.escapeShellArgByPlatform(input1, platform, env);
    const output2 = main.escapeShellArgByPlatform(input2, platform, env);

    const inputs = [input1, input2];
    const output = shescape.escapeAll(inputs);
    assert(os.platform.called);
    assert.deepStrictEqual(output, [output1, output2]);
  });

  it("escapeAll gracefully handles inputs that are not an array", function () {
    const input = "Hello world!";
    const expectedOutput = main.escapeShellArgByPlatform(input, platform, env);

    const output = shescape.escapeAll(input);
    assert(os.platform.called);
    assert.deepStrictEqual(output, [expectedOutput]);
  });

  it("quote calls main for current OS", function () {
    const input = "Hello world!";
    const expectedOutput = main.quoteShellArgByPlatform(input, platform, env);

    const output = shescape.quote(input);
    assert(os.platform.called);
    assert.strictEqual(output, expectedOutput);
  });

  it("quoteAll calls main for every value", function () {
    const input1 = "foo";
    const input2 = "bar";
    const output1 = main.quoteShellArgByPlatform(input1, platform, env);
    const output2 = main.quoteShellArgByPlatform(input2, platform, env);

    const inputs = [input1, input2];
    const output = shescape.quoteAll(inputs);
    assert(os.platform.called);
    assert.deepStrictEqual(output, [output1, output2]);
  });

  it("quoteAll gracefully handles inputs that are not an array", function () {
    const input = "Hello world!";
    const expectedOutput = main.quoteShellArgByPlatform(input, platform, env);

    const output = shescape.quoteAll(input);
    assert(os.platform.called);
    assert.deepStrictEqual(output, [expectedOutput]);
  });

  afterEach(function () {
    os.platform.restore();
  });
});
