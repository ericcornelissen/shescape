/**
 * @overview Contains the test suite for `./src/main.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 *
 * Valid os.platform values: https://nodejs.org/api/os.html#os_os_platform
 */

import assert from "assert";

import {
  escapeShellArgByPlatform,
  quoteShellArgByPlatform,
} from "../src/main.js";
import * as unix from "../src/unix.js";
import * as win from "../src/win.js";

describe("main.js", function () {
  const typeError =
    "Shescape requires strings or values that can be converted into a string using .toString()";

  describe("escape", function () {
    it("calls the windows escape function for 'win32'", function () {
      const inputs = ["Hello world!", 'foo "bar"'];

      for (const input of inputs) {
        const expectedOutput = win.escapeShellArg(input);

        const output = escapeShellArgByPlatform(input, "win32");
        assert.strictEqual(output, expectedOutput);
      }
    });

    it("calls the unix escape function for 'linux'", function () {
      const inputs = ["Hello world!", "foo 'bar'"];

      for (const input of inputs) {
        const expectedOutput = unix.escapeShellArg(input);

        const output = escapeShellArgByPlatform(input, "linux");
        assert.strictEqual(output, expectedOutput);
      }
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
      const inputs = ["Hello world!", 'foo "bar"'];

      for (const input of inputs) {
        const expectedOutput = `"${win.escapeShellArg(input)}"`;

        const output = quoteShellArgByPlatform(input, "win32");
        assert.strictEqual(output, expectedOutput);
      }
    });

    it("calls the unix escape function for 'linux'", function () {
      const inputs = ["Hello world!", "foo 'bar'"];

      for (const input of inputs) {
        const expectedOutput = `'${unix.escapeShellArg(input)}'`;

        const output = quoteShellArgByPlatform(input, "linux");
        assert.strictEqual(output, expectedOutput);
      }
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
