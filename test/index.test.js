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

  it("informs about deprecation of calling shescape directly", function () {
    sinon.spy(console, "warn");

    shescape("foobar");
    assert(console.warn.called);

    console.warn.restore();
  });

  it("escape calls main for current OS", function () {
    const osStubOutput = "MundOS";
    sinon.stub(os, "platform").returns(osStubOutput);
    const mainStubOutput = "foobar";
    sinon.stub(main, "escapeShellArgByPlatform").returns(mainStubOutput);

    const input = "Hello world!";
    const output = shescape.escape(input);
    assert(os.platform.called);
    assert(main.escapeShellArgByPlatform.called);
    assert(main.escapeShellArgByPlatform.calledWith(input, osStubOutput));
    assert.strictEqual(output, mainStubOutput);

    os.platform.restore();
    main.escapeShellArgByPlatform.restore();
  });

  it("quote calls main for current OS", function () {
    const osStubOutput = "MundOS";
    sinon.stub(os, "platform").returns(osStubOutput);
    const mainStubOutput = "'foobar'";
    sinon.stub(main, "quoteByPlatform").returns(mainStubOutput);

    const input = "Hello world!";
    const output = shescape.quote(input);
    assert(os.platform.called);
    assert(main.quoteByPlatform.called);
    assert(main.quoteByPlatform.calledWith(input, osStubOutput));
    assert.strictEqual(output, mainStubOutput);

    os.platform.restore();
    main.quoteByPlatform.restore();
  });

  it("quoteAll calls main for every value", function () {
    const osStubOutput = "MundOS";
    sinon.stub(os, "platform").returns(osStubOutput);
    const quoteStub = sinon.stub(main, "quoteByPlatform");

    const input1 = "foo";
    const input2 = "bar";
    const output1 = "'foo'";
    const output2 = "'bar'";

    quoteStub.withArgs(input1).returns(output1);
    quoteStub.withArgs(input2).returns(output2);

    const inputs = [input1, input2];
    const output = shescape.quoteAll(inputs);
    assert(os.platform.called);
    assert(main.quoteByPlatform.called);
    assert(main.quoteByPlatform.calledWith(input1, osStubOutput));
    assert(main.quoteByPlatform.calledWith(input2, osStubOutput));
    assert.deepStrictEqual(output, [output1, output2]);

    os.platform.restore();
    main.quoteByPlatform.restore();
  });

  it("quoteAll gracefully handles inputs that are not an array", function () {
    const osStubOutput = "MundOS";
    sinon.stub(os, "platform").returns(osStubOutput);
    const mainStubOutput = "foobar";
    sinon.stub(main, "quoteByPlatform").returns(mainStubOutput);

    const output = shescape.quoteAll("Hello world!");
    assert(os.platform.called);
    assert(main.quoteByPlatform.called);
    assert.deepStrictEqual(output, [mainStubOutput]);

    os.platform.restore();
    main.quoteByPlatform.restore();
  });
});
