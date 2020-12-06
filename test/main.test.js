// Valid os.platform values: https://nodejs.org/api/os.html#os_os_platform

const assert = require("assert");
const sinon = require("sinon");

const { escapeShellArgByPlatform, quoteByPlatform } = require("../src/main.js");
const unix = require("../src/unix.js");
const win = require("../src/win.js");

describe("main.js", function () {
  describe("escape", function () {
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

  describe("quote", function () {
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

    it("quotes with double quotes on 'win32'", function () {
      const output = quoteByPlatform("Hello world!", "win32");
      assert(output.startsWith('"'));
      assert(output.endsWith('"'));
    });

    it("quotes with single quotes on 'linux'", function () {
      const output = quoteByPlatform("Hello world!", "linux");
      assert(output.startsWith("'"));
      assert(output.endsWith("'"));
    });
  });
});
