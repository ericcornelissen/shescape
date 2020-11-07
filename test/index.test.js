const assert = require("assert");
const sinon = require("sinon");
const os = require("os");

const shescape = require("../index.js");
const main = require("../src/main.js");

describe("index.js", function () {
  it("index calls main for current OS", function () {
    const osStubOutput = "MundOS";
    sinon.stub(os, "platform").returns(osStubOutput);
    const mainStubOutput = "foobar";
    sinon.stub(main, "escapeShellArgByPlatform").returns(mainStubOutput);

    const input = "Hello world!";
    const output = shescape(input);
    assert(os.platform.called);
    assert(main.escapeShellArgByPlatform.called);
    assert(main.escapeShellArgByPlatform.calledWith(input, osStubOutput));
    assert.strictEqual(output, mainStubOutput);

    os.platform.restore();
    main.escapeShellArgByPlatform.restore();
  });
});
