// Valid os.platform values: https://nodejs.org/api/os.html#os_os_platform

const assert = require("assert");
const sinon = require("sinon");

const { escapeShellArgByPlatform } = require("../src/main.js");
const unix = require("../src/unix.js");
const win = require("../src/win.js");

describe("main.js", function () {
  it("calls the windows escape function for 'win32'", function () {
    const stubOutput = "foobar";
    sinon.stub(win, "escapeShellArg").returns(stubOutput);

    const output = escapeShellArgByPlatform("Hello world!", "win32");
    assert(win.escapeShellArg.called);
    assert.strictEqual(output, stubOutput);

    win.escapeShellArg.restore();
  });

  it("calls the unix escape function for 'linux'", function () {
    const stubOutput = "Hello world!";
    sinon.stub(unix, "escapeShellArg").returns(stubOutput);

    const output = escapeShellArgByPlatform("foobar", "linux");
    assert(unix.escapeShellArg.called);
    assert.strictEqual(output, stubOutput);

    unix.escapeShellArg.restore();
  });
});
