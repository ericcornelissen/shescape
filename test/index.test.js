const assert = require("assert");
const sinon = require("sinon");
const os = require("os");

const shescape = require("../index.js");
const main = require("../src/main.js");

describe("index.js", function () {
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

  it("escapeAll calls main for every value", function () {
    const osStubOutput = "MundOS";
    sinon.stub(os, "platform").returns(osStubOutput);
    const escapeStub = sinon.stub(main, "escapeShellArgByPlatform");

    const input1 = "foo'";
    const input2 = "'bar";
    const output1 = "foo''";
    const output2 = "''bar";

    escapeStub.withArgs(input1).returns(output1);
    escapeStub.withArgs(input2).returns(output2);

    const inputs = [input1, input2];
    const output = shescape.escapeAll(inputs);
    assert(os.platform.called);
    assert(main.escapeShellArgByPlatform.called);
    assert(main.escapeShellArgByPlatform.calledWith(input1, osStubOutput));
    assert(main.escapeShellArgByPlatform.calledWith(input2, osStubOutput));
    assert.deepStrictEqual(output, [output1, output2]);

    os.platform.restore();
    main.escapeShellArgByPlatform.restore();
  });

  it("escapeAll gracefully handles inputs that are not an array", function () {
    const osStubOutput = "MundOS";
    sinon.stub(os, "platform").returns(osStubOutput);
    const mainStubOutput = "foobar";
    sinon.stub(main, "escapeShellArgByPlatform").returns(mainStubOutput);

    const output = shescape.escapeAll("Hello world!");
    assert(os.platform.called);
    assert(main.escapeShellArgByPlatform.called);
    assert.deepStrictEqual(output, [mainStubOutput]);

    os.platform.restore();
    main.escapeShellArgByPlatform.restore();
  });

  it("quote calls main for current OS", function () {
    const osStubOutput = "MundOS";
    sinon.stub(os, "platform").returns(osStubOutput);
    const mainStubOutput = "'foobar'";
    sinon.stub(main, "quoteShellArgByPlatform").returns(mainStubOutput);

    const input = "Hello world!";
    const output = shescape.quote(input);
    assert(os.platform.called);
    assert(main.quoteShellArgByPlatform.called);
    assert(main.quoteShellArgByPlatform.calledWith(input, osStubOutput));
    assert.strictEqual(output, mainStubOutput);

    os.platform.restore();
    main.quoteShellArgByPlatform.restore();
  });

  it("quoteAll calls main for every value", function () {
    const osStubOutput = "MundOS";
    sinon.stub(os, "platform").returns(osStubOutput);
    const quoteStub = sinon.stub(main, "quoteShellArgByPlatform");

    const input1 = "foo";
    const input2 = "bar";
    const output1 = "'foo'";
    const output2 = "'bar'";

    quoteStub.withArgs(input1).returns(output1);
    quoteStub.withArgs(input2).returns(output2);

    const inputs = [input1, input2];
    const output = shescape.quoteAll(inputs);
    assert(os.platform.called);
    assert(main.quoteShellArgByPlatform.called);
    assert(main.quoteShellArgByPlatform.calledWith(input1, osStubOutput));
    assert(main.quoteShellArgByPlatform.calledWith(input2, osStubOutput));
    assert.deepStrictEqual(output, [output1, output2]);

    os.platform.restore();
    main.quoteShellArgByPlatform.restore();
  });

  it("quoteAll gracefully handles inputs that are not an array", function () {
    const osStubOutput = "MundOS";
    sinon.stub(os, "platform").returns(osStubOutput);
    const mainStubOutput = "foobar";
    sinon.stub(main, "quoteShellArgByPlatform").returns(mainStubOutput);

    const output = shescape.quoteAll("Hello world!");
    assert(os.platform.called);
    assert(main.quoteShellArgByPlatform.called);
    assert.deepStrictEqual(output, [mainStubOutput]);

    os.platform.restore();
    main.quoteShellArgByPlatform.restore();
  });
});
