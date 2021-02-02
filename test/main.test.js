// Valid os.platform values: https://nodejs.org/api/os.html#os_os_platform

const assert = require("assert");
const sinon = require("sinon");

const { typeError } = require("../src/constants.js");
const {
  escapeShellArgByPlatform,
  quoteShellArgByPlatform,
} = require("../src/main.js");
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
        assert.fail("Should not throw for a boolean");
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
        assert.fail("Should not throw for a boolean");
      }

      assert.strictEqual(outputTrue, "true");
      assert.strictEqual(outputFalse, "false");
    });

    it("works for number values on 'win32'", function () {
      let output;
      try {
        output = escapeShellArgByPlatform(42, "win32");
      } catch (_) {
        assert.fail("Should not throw for a number");
      }

      assert.strictEqual(output, "42");
    });

    it("works for number values on 'linux'", function () {
      let output;
      try {
        output = escapeShellArgByPlatform(42, "linux");
      } catch (_) {
        assert.fail("Should not throw for a number");
      }

      assert.strictEqual(output, "42");
    });

    it("fails for undefined values on 'win32'", function () {
      for (const val of [undefined, null]) {
        let message;
        let threw = false;
        try {
          escapeShellArgByPlatform(val, "win32");
        } catch (error) {
          message = error.message;
          threw = true;
        } finally {
          assert(threw, `Should throw on '${val}'`);
          assert.strictEqual(message, typeError);
        }
      }
    });

    it("fails for undefined values on 'linux'", function () {
      for (const val of [undefined, null]) {
        let message;
        let threw = false;
        try {
          escapeShellArgByPlatform(val, "linux");
        } catch (error) {
          message = error.message;
          threw = true;
        } finally {
          assert(threw, `Should throw on '${val}'`);
          assert.strictEqual(message, typeError);
        }
      }
    });

    it("fails when `toString` is not a function on 'win32'", function () {
      let message;
      let threw = false;
      try {
        escapeShellArgByPlatform({ toString: false }, "win32");
      } catch (error) {
        message = error.message;
        threw = true;
      } finally {
        assert(threw, "Should throw when `toString` is not a function");
        assert.strictEqual(message, typeError);
      }
    });

    it("fails when `toString` is not a function on 'linux'", function () {
      let message;
      let threw = false;
      try {
        escapeShellArgByPlatform({ toString: false }, "linux");
      } catch (error) {
        message = error.message;
        threw = true;
      } finally {
        assert(threw, "Should throw when `toString` is not a function");
        assert.strictEqual(message, typeError);
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
      const output = quoteShellArgByPlatform("Hello world!", "win32");
      assert(output.startsWith('"'));
      assert(output.endsWith('"'));
    });

    it("quotes with single quotes on 'linux'", function () {
      const output = quoteShellArgByPlatform("Hello world!", "linux");
      assert(output.startsWith("'"));
      assert(output.endsWith("'"));
    });

    it("works for boolean values on 'win32'", function () {
      let outputTrue, outputFalse;
      try {
        outputTrue = quoteShellArgByPlatform(true, "win32");
        outputFalse = quoteShellArgByPlatform(false, "win32");
      } catch (_) {
        assert.fail("Should not throw for a boolean");
      }

      assert.strictEqual(outputTrue, '"true"');
      assert.strictEqual(outputFalse, '"false"');
    });

    it("works for boolean values on 'linux'", function () {
      let outputTrue, outputFalse;
      try {
        outputTrue = quoteShellArgByPlatform(true, "linux");
        outputFalse = quoteShellArgByPlatform(false, "linux");
      } catch (_) {
        assert.fail("Should not throw for a boolean");
      }

      assert.strictEqual(outputTrue, "'true'");
      assert.strictEqual(outputFalse, "'false'");
    });

    it("works for number values on 'win32'", function () {
      let output;
      try {
        output = quoteShellArgByPlatform(42, "win32");
      } catch (_) {
        assert.fail("Should not throw for a number");
      }

      assert.strictEqual(output, '"42"');
    });

    it("works for number values on 'linux'", function () {
      let output;
      try {
        output = quoteShellArgByPlatform(42, "linux");
      } catch (_) {
        assert.fail("Should not throw for a number");
      }

      assert.strictEqual(output, "'42'");
    });

    it("fails for undefined values on 'win32'", function () {
      for (const val of [undefined, null]) {
        let message;
        let threw = false;
        try {
          quoteShellArgByPlatform(val, "win32");
        } catch (error) {
          message = error.message;
          threw = true;
        } finally {
          assert(threw, `Should throw on '${val}'`);
          assert.strictEqual(message, typeError);
        }
      }
    });

    it("fails for undefined values on 'linux'", function () {
      for (const val of [undefined, null]) {
        let message;
        let threw = false;
        try {
          quoteShellArgByPlatform(val, "linux");
        } catch (error) {
          message = error.message;
          threw = true;
        } finally {
          assert(threw, `Should throw on '${val}'`);
          assert.strictEqual(message, typeError);
        }
      }
    });

    it("fails when `toString` is not a function on 'win32'", function () {
      let message;
      let threw = false;
      try {
        quoteShellArgByPlatform({ toString: false }, "win32");
      } catch (error) {
        message = error.message;
        threw = true;
      } finally {
        assert(threw, "Should throw when `toString` is not a function");
        assert.strictEqual(message, typeError);
      }
    });

    it("fails when `toString` is not a function on 'linux'", function () {
      let message;
      let threw = false;
      try {
        quoteShellArgByPlatform({ toString: false }, "linux");
      } catch (error) {
        message = error.message;
        threw = true;
      } finally {
        assert(threw, "Should throw when `toString` is not a function");
        assert.strictEqual(message, typeError);
      }
    });
  });
});
