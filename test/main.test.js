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

    it("works for boolean values on 'win32'", function () {
      let outputTrue, outputFalse;
      try {
        outputTrue = escapeShellArgByPlatform(true, "win32");
        outputFalse = escapeShellArgByPlatform(false, "win32");
      } catch (_) {
        assert(false, "Should not throw for a boolean");
      }

      assert.strictEqual(outputTrue, "true");
      assert.strictEqual(outputFalse, "false");
    });

    it("works for boolean values on 'linux'", function () {
      let outputTrue, outputFalse;
      try {
        outputTrue = escapeShellArgByPlatform(true, "linux");
        outputFalse = escapeShellArgByPlatform(false, "linux");
      } catch (_) {
        assert(false, "Should not throw for a boolean");
      }

      assert.strictEqual(outputTrue, "true");
      assert.strictEqual(outputFalse, "false");
    });

    it("works for number values on 'win32'", function () {
      let output;
      try {
        output = escapeShellArgByPlatform(42, "win32");
      } catch (_) {
        assert(false, "Should not throw for a number");
      }

      assert.strictEqual(output, "42");
    });

    it("works for number values on 'linux'", function () {
      let output;
      try {
        output = escapeShellArgByPlatform(42, "linux");
      } catch (_) {
        assert(false, "Should not throw for a number");
      }

      assert.strictEqual(output, "42");
    });

    it("fails for undefined values on 'win32'", function () {
      for (const val of [undefined, null]) {
        let threw = false;
        try {
          escapeShellArgByPlatform(val, "win32");
        } catch (_) {
          threw = true;
        } finally {
          assert(threw, `Should throw on '${val}'`);
        }
      }
    });

    it("fails for undefined values on 'linux'", function () {
      for (const val of [undefined, null]) {
        let threw = false;
        try {
          escapeShellArgByPlatform(val, "linux");
        } catch (_) {
          threw = true;
        } finally {
          assert(threw, `Should throw on '${val}'`);
        }
      }
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

    it("works for boolean values on 'win32'", function () {
      let outputTrue, outputFalse;
      try {
        outputTrue = quoteByPlatform(true, "win32");
        outputFalse = quoteByPlatform(false, "win32");
      } catch (_) {
        assert(false, "Should not throw for a boolean");
      }

      assert.strictEqual(outputTrue, '"true"');
      assert.strictEqual(outputFalse, '"false"');
    });

    it("works for boolean values on 'linux'", function () {
      let outputTrue, outputFalse;
      try {
        outputTrue = quoteByPlatform(true, "linux");
        outputFalse = quoteByPlatform(false, "linux");
      } catch (_) {
        assert(false, "Should not throw for a boolean");
      }

      assert.strictEqual(outputTrue, "'true'");
      assert.strictEqual(outputFalse, "'false'");
    });

    it("works for number values on 'win32'", function () {
      let output;
      try {
        output = quoteByPlatform(42, "win32");
      } catch (_) {
        assert(false, "Should not throw for a number");
      }

      assert.strictEqual(output, '"42"');
    });

    it("works for number values on 'linux'", function () {
      let output;
      try {
        output = quoteByPlatform(42, "linux");
      } catch (_) {
        assert(false, "Should not throw for a number");
      }

      assert.strictEqual(output, "'42'");
    });

    it("fails for undefined values on 'win32'", function () {
      for (const val of [undefined, null]) {
        let threw = false;
        try {
          quoteByPlatform(val, "win32");
        } catch (_) {
          threw = true;
        } finally {
          assert(threw, `Should throw on '${val}'`);
        }
      }
    });

    it("fails for undefined values on 'linux'", function () {
      for (const val of [undefined, null]) {
        let threw = false;
        try {
          quoteByPlatform(val, "linux");
        } catch (_) {
          threw = true;
        } finally {
          assert(threw, `Should throw on '${val}'`);
        }
      }
    });
  });
});
