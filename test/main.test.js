/**
 * @overview Contains unit tests for `./src/main.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 *
 * Valid os.platform values: https://nodejs.org/api/os.html#os_os_platform
 */

import assert from "assert";

import {
  unixEnv,
  unixPlatform,
  unixShells,
  winEnv,
  winPlatform,
  winShells,
} from "./common.js";

import { typeError } from "../src/constants.js";
import {
  escapeShellArgByPlatform,
  quoteShellArgByPlatform,
} from "../src/main.js";
import * as unix from "../src/unix.js";
import * as win from "../src/win.js";

const isDefined = (x) => x !== undefined;

describe("main.js", function () {
  describe("::escapeShellArgByPlatform", function () {
    it(`calls the windows escape function for '${winPlatform}'`, function () {
      const inputs = ["Hello world!", 'foo "bar"', "Lorem`ipsum", "dead$beef"];

      for (const ComSpec of winShells.filter(isDefined)) {
        for (const shell of winShells) {
          for (const input of inputs) {
            const env = { ...winEnv, ComSpec };
            const platform = winPlatform;
            const defaultShell = win.getDefaultShell(env);
            const targetShell = shell || defaultShell;

            const expected = win.escapeShellArg(input, targetShell);

            const output = escapeShellArgByPlatform(
              input,
              platform,
              env,
              shell
            );
            assert.strictEqual(output, expected);
          }
        }
      }
    });

    it(`calls the unix escape function for '${unixPlatform}'`, function () {
      const inputs = ["Hello world!", "foo 'bar'"];

      for (const shell of unixShells) {
        for (const input of inputs) {
          const env = unixEnv;
          const platform = unixPlatform;
          const defaultShell = unix.getDefaultShell();
          const targetShell = shell || defaultShell;

          const expected = unix.escapeShellArg(input, targetShell);

          const output = escapeShellArgByPlatform(input, platform, env, shell);
          assert.strictEqual(output, expected);
        }
      }
    });

    it(`works for boolean values on '${winPlatform}'`, function () {
      const env = winEnv;
      const platform = winPlatform;

      let outputTrue, outputFalse;
      try {
        outputTrue = escapeShellArgByPlatform(true, platform, env);
        outputFalse = escapeShellArgByPlatform(false, platform, env);
      } catch (_) {
        assert.fail("Should not throw for a boolean");
      }

      assert.strictEqual(outputTrue, "true");
      assert.strictEqual(outputFalse, "false");
    });

    it(`works for boolean values on '${unixPlatform}'`, function () {
      const env = unixEnv;
      const platform = unixPlatform;

      let outputTrue, outputFalse;
      try {
        outputTrue = escapeShellArgByPlatform(true, platform, env);
        outputFalse = escapeShellArgByPlatform(false, platform, env);
      } catch (_) {
        assert.fail("Should not throw for a boolean");
      }

      assert.strictEqual(outputTrue, "true");
      assert.strictEqual(outputFalse, "false");
    });

    it(`works for number values on '${winPlatform}'`, function () {
      const env = winEnv;
      const platform = winPlatform;

      let output;
      try {
        output = escapeShellArgByPlatform(42, platform, env);
      } catch (_) {
        assert.fail("Should not throw for a number");
      }

      assert.strictEqual(output, "42");
    });

    it(`works for number values on '${unixPlatform}'`, function () {
      const env = unixEnv;
      const platform = unixPlatform;

      let output;
      try {
        output = escapeShellArgByPlatform(42, platform, env);
      } catch (_) {
        assert.fail("Should not throw for a number");
      }

      assert.strictEqual(output, "42");
    });

    it(`fails for undefined values on '${winPlatform}'`, function () {
      const env = winEnv;
      const platform = winPlatform;

      for (const val of [undefined, null]) {
        let message;
        let threw = false;
        try {
          escapeShellArgByPlatform(val, platform, env);
        } catch (error) {
          message = error.message;
          threw = true;
        } finally {
          assert(threw, `Should throw on '${val}'`);
          assert.strictEqual(message, typeError);
        }
      }
    });

    it(`fails for undefined values on '${unixPlatform}'`, function () {
      const env = unixEnv;
      const platform = unixPlatform;

      for (const val of [undefined, null]) {
        let message;
        let threw = false;
        try {
          escapeShellArgByPlatform(val, platform, env);
        } catch (error) {
          message = error.message;
          threw = true;
        } finally {
          assert(threw, `Should throw on '${val}'`);
          assert.strictEqual(message, typeError);
        }
      }
    });

    it(`fails when toString is missing, on '${winPlatform}'`, function () {
      const env = winEnv;
      const platform = winPlatform;

      let message;
      let threw = false;
      try {
        escapeShellArgByPlatform({ toString: false }, platform, env);
      } catch (error) {
        message = error.message;
        threw = true;
      } finally {
        assert(threw, "Should throw when `toString` is not a function");
        assert.strictEqual(message, typeError);
      }
    });

    it(`fails when toString is missing, on '${unixPlatform}'`, function () {
      const env = unixEnv;
      const platform = unixPlatform;

      let message;
      let threw = false;
      try {
        escapeShellArgByPlatform({ toString: false }, platform, env);
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
    it(`calls the windows escape function for '${winPlatform}'`, function () {
      const inputs = ["Hello world!", 'foo "bar"'];

      for (const ComSpec of winShells.filter(isDefined)) {
        for (const shell of winShells) {
          for (const input of inputs) {
            const env = { ...winEnv, ComSpec };
            const platform = winPlatform;
            const defaultShell = win.getDefaultShell(env);
            const targetShell = shell || defaultShell;

            const expected = `"${win.escapeShellArg(input, targetShell)}"`;

            const output = quoteShellArgByPlatform(input, platform, env, shell);
            assert.strictEqual(output, expected);
          }
        }
      }
    });

    it(`calls the unix escape function for '${unixPlatform}'`, function () {
      const inputs = ["Hello world!", "foo 'bar'"];

      for (const shell of unixShells) {
        for (const input of inputs) {
          const env = unixEnv;
          const platform = unixPlatform;
          const defaultShell = unix.getDefaultShell();
          const targetShell = shell || defaultShell;

          const expected = `'${unix.escapeShellArg(input, targetShell)}'`;

          const output = quoteShellArgByPlatform(input, platform, env, shell);
          assert.strictEqual(output, expected);
        }
      }
    });

    it(`quotes with double quotes on '${winPlatform}'`, function () {
      const env = winEnv;
      const platform = winPlatform;

      const output = quoteShellArgByPlatform("Hello world!", platform, env);
      assert(output.startsWith('"'));
      assert(output.endsWith('"'));
    });

    it(`quotes with single quotes on '${unixPlatform}'`, function () {
      const env = unixEnv;
      const platform = unixPlatform;

      const output = quoteShellArgByPlatform("Hello world!", platform, unix);
      assert(output.startsWith("'"));
      assert(output.endsWith("'"));
    });

    it(`works for boolean values on '${winPlatform}'`, function () {
      const env = winEnv;
      const platform = winPlatform;

      let outputTrue, outputFalse;
      try {
        outputTrue = quoteShellArgByPlatform(true, platform, env);
        outputFalse = quoteShellArgByPlatform(false, platform, env);
      } catch (_) {
        assert.fail("Should not throw for a boolean");
      }

      assert.strictEqual(outputTrue, '"true"');
      assert.strictEqual(outputFalse, '"false"');
    });

    it(`works for boolean values on '${unixPlatform}'`, function () {
      const env = unixEnv;
      const platform = unixPlatform;

      let outputTrue, outputFalse;
      try {
        outputTrue = quoteShellArgByPlatform(true, platform, env);
        outputFalse = quoteShellArgByPlatform(false, platform, env);
      } catch (_) {
        assert.fail("Should not throw for a boolean");
      }

      assert.strictEqual(outputTrue, "'true'");
      assert.strictEqual(outputFalse, "'false'");
    });

    it(`works for number values on '${winPlatform}'`, function () {
      const env = winEnv;
      const platform = winPlatform;

      let output;
      try {
        output = quoteShellArgByPlatform(42, platform, env);
      } catch (_) {
        assert.fail("Should not throw for a number");
      }

      assert.strictEqual(output, '"42"');
    });

    it(`works for number values on '${unixPlatform}'`, function () {
      const env = unixEnv;
      const platform = unixPlatform;

      let output;
      try {
        output = quoteShellArgByPlatform(42, platform, env);
      } catch (_) {
        assert.fail("Should not throw for a number");
      }

      assert.strictEqual(output, "'42'");
    });

    it(`fails for undefined values on '${winPlatform}'`, function () {
      const env = winEnv;
      const platform = winPlatform;

      for (const val of [undefined, null]) {
        let message;
        let threw = false;
        try {
          quoteShellArgByPlatform(val, platform, env);
        } catch (error) {
          message = error.message;
          threw = true;
        } finally {
          assert(threw, `Should throw on '${val}'`);
          assert.strictEqual(message, typeError);
        }
      }
    });

    it(`fails for undefined values on '${unixPlatform}'`, function () {
      const env = unixEnv;
      const platform = unixPlatform;

      for (const val of [undefined, null]) {
        let message;
        let threw = false;
        try {
          quoteShellArgByPlatform(val, platform, env);
        } catch (error) {
          message = error.message;
          threw = true;
        } finally {
          assert(threw, `Should throw on '${val}'`);
          assert.strictEqual(message, typeError);
        }
      }
    });

    it(`fails when toString is missing, on '${winPlatform}'`, function () {
      const env = winEnv;
      const platform = winPlatform;

      let message;
      let threw = false;
      try {
        quoteShellArgByPlatform({ toString: false }, platform, env);
      } catch (error) {
        message = error.message;
        threw = true;
      } finally {
        assert(threw, "Should throw when `toString` is not a function");
        assert.strictEqual(message, typeError);
      }
    });

    it(`fails when toString is missing, on '${unixPlatform}'`, function () {
      const env = unixEnv;
      const platform = unixPlatform;

      let message;
      let threw = false;
      try {
        quoteShellArgByPlatform({ toString: false }, platform, env);
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
