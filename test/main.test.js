/**
 * @overview Contains unit tests for `./src/main.js`.
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

const isDefined = (x) => x !== undefined;

describe("main.js", function () {
  const win32 = "win32";
  const linux = "linux";

  const unixEnv = {};
  const winEnv = {
    ComSpec: "C:\\Windows\\System32\\cmd.exe",
  };

  const unixShells = [undefined, "/bin/sh", "/bin/bash"];
  const winShells = [undefined, "cmd.exe", "powershell.exe"];

  const typeError =
    "Shescape requires strings or values that can be converted into a string using .toString()";

  describe("::escapeShellArgByPlatform", function () {
    it("calls the windows escape function for 'win32'", function () {
      const inputs = ["Hello world!", 'foo "bar"', "Lorem`ipsum", "dead$beef"];

      for (const ComSpec of winShells.filter(isDefined)) {
        for (const shell of winShells) {
          for (const input of inputs) {
            const env = { ...winEnv, ComSpec };
            const defaultShell = win.getDefaultShell(env);
            const targetShell = shell || defaultShell;

            const expected = win.escapeShellArg(input, targetShell);

            const output = escapeShellArgByPlatform(input, win32, env, shell);
            assert.strictEqual(output, expected);
          }
        }
      }
    });

    it("calls the unix escape function for 'linux'", function () {
      const inputs = ["Hello world!", "foo 'bar'"];

      for (const shell of unixShells) {
        for (const input of inputs) {
          const env = unixEnv;
          const defaultShell = unix.getDefaultShell(env);
          const targetShell = shell || defaultShell;

          const expected = unix.escapeShellArg(input, targetShell);

          const output = escapeShellArgByPlatform(input, linux, env, shell);
          assert.strictEqual(output, expected);
        }
      }
    });

    it("works for boolean values on 'win32'", function () {
      let outputTrue, outputFalse;
      try {
        outputTrue = escapeShellArgByPlatform(true, win32, winEnv);
        outputFalse = escapeShellArgByPlatform(false, win32, winEnv);
      } catch (_) {
        assert.fail("Should not throw for a boolean");
      }

      assert.strictEqual(outputTrue, "true");
      assert.strictEqual(outputFalse, "false");
    });

    it("works for boolean values on 'linux'", function () {
      let outputTrue, outputFalse;
      try {
        outputTrue = escapeShellArgByPlatform(true, linux, unixEnv);
        outputFalse = escapeShellArgByPlatform(false, linux, unixEnv);
      } catch (_) {
        assert.fail("Should not throw for a boolean");
      }

      assert.strictEqual(outputTrue, "true");
      assert.strictEqual(outputFalse, "false");
    });

    it("works for number values on 'win32'", function () {
      let output;
      try {
        output = escapeShellArgByPlatform(42, win32, winEnv);
      } catch (_) {
        assert.fail("Should not throw for a number");
      }

      assert.strictEqual(output, "42");
    });

    it("works for number values on 'linux'", function () {
      let output;
      try {
        output = escapeShellArgByPlatform(42, linux, unixEnv);
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
          escapeShellArgByPlatform(val, win32, winEnv);
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
          escapeShellArgByPlatform(val, linux, unixEnv);
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
        escapeShellArgByPlatform({ toString: false }, win32, winEnv);
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
        escapeShellArgByPlatform({ toString: false }, linux, unixEnv);
      } catch (error) {
        message = error.message;
        threw = true;
      } finally {
        assert(threw, "Should throw when `toString` is not a function");
        assert.strictEqual(message, typeError);
      }
    });
  });

  describe("::quoteShellArgByPlatform", function () {
    it("calls the windows escape function for 'win32'", function () {
      const inputs = ["Hello world!", 'foo "bar"'];

      for (const ComSpec of winShells.filter(isDefined)) {
        for (const shell of winShells) {
          for (const input of inputs) {
            const env = { ...winEnv, ComSpec };
            const defaultShell = win.getDefaultShell(env);
            const targetShell = shell || defaultShell;

            const expected = `"${win.escapeShellArg(input, targetShell)}"`;

            const output = quoteShellArgByPlatform(input, win32, env, shell);
            assert.strictEqual(output, expected);
          }
        }
      }
    });

    it("calls the unix escape function for 'linux'", function () {
      const inputs = ["Hello world!", "foo 'bar'"];

      for (const shell of unixShells) {
        for (const input of inputs) {
          const env = unixEnv;
          const defaultShell = unix.getDefaultShell(env);
          const targetShell = shell || defaultShell;

          const expected = `'${unix.escapeShellArg(input, targetShell)}'`;

          const output = quoteShellArgByPlatform(input, linux, env, shell);
          assert.strictEqual(output, expected);
        }
      }
    });

    it("quotes with double quotes on 'win32'", function () {
      const output = quoteShellArgByPlatform("Hello world!", win32, winEnv);
      assert(output.startsWith('"'));
      assert(output.endsWith('"'));
    });

    it("quotes with single quotes on 'linux'", function () {
      const output = quoteShellArgByPlatform("Hello world!", linux, unixEnv);
      assert(output.startsWith("'"));
      assert(output.endsWith("'"));
    });

    it("works for boolean values on 'win32'", function () {
      let outputTrue, outputFalse;
      try {
        outputTrue = quoteShellArgByPlatform(true, win32, winEnv);
        outputFalse = quoteShellArgByPlatform(false, win32, winEnv);
      } catch (_) {
        assert.fail("Should not throw for a boolean");
      }

      assert.strictEqual(outputTrue, '"true"');
      assert.strictEqual(outputFalse, '"false"');
    });

    it("works for boolean values on 'linux'", function () {
      let outputTrue, outputFalse;
      try {
        outputTrue = quoteShellArgByPlatform(true, linux, unixEnv);
        outputFalse = quoteShellArgByPlatform(false, linux, unixEnv);
      } catch (_) {
        assert.fail("Should not throw for a boolean");
      }

      assert.strictEqual(outputTrue, "'true'");
      assert.strictEqual(outputFalse, "'false'");
    });

    it("works for number values on 'win32'", function () {
      let output;
      try {
        output = quoteShellArgByPlatform(42, win32, winEnv);
      } catch (_) {
        assert.fail("Should not throw for a number");
      }

      assert.strictEqual(output, '"42"');
    });

    it("works for number values on 'linux'", function () {
      let output;
      try {
        output = quoteShellArgByPlatform(42, linux, unixEnv);
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
          quoteShellArgByPlatform(val, win32, winEnv);
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
          quoteShellArgByPlatform(val, linux, unixEnv);
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
        quoteShellArgByPlatform({ toString: false }, win32, winEnv);
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
        quoteShellArgByPlatform({ toString: false }, linux, unixEnv);
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
