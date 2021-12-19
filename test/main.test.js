/**
 * @overview Contains unit tests for `./src/main.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";

import {
  isDefined,
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

describe("main.js", function () {
  describe("::escapeShellArgByPlatform", function () {
    describe("unix", function () {
      const env = unixEnv;
      const platform = unixPlatform;
      const defaultShell = unix.getDefaultShell();

      it(`calls the unix escape function`, function () {
        const inputs = ["Hello world!", "foo 'bar'"];

        for (const shell of unixShells) {
          for (const input of inputs) {
            const targetShell = shell || defaultShell;

            const expected = unix.escapeShellArg(input, targetShell);

            const output = escapeShellArgByPlatform(
              input,
              platform,
              env,
              shell
            );
            assert.strictEqual(output, expected);
          }
        }
      });

      it(`works for boolean values`, function () {
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

      it(`works for numeric values`, function () {
        let output;
        try {
          output = escapeShellArgByPlatform(42, platform, env);
        } catch (_) {
          assert.fail("Should not throw for a number");
        }

        assert.strictEqual(output, "42");
      });

      it(`fails for undefined values`, function () {
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

      it(`fails when toString is missing`, function () {
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

    describe("win32", function () {
      const env = winEnv;
      const platform = winPlatform;

      it(`calls the windows escape function`, function () {
        const inputs = [
          "Hello world!",
          'foo "bar"',
          "Lorem`ipsum",
          "dead$beef",
        ];

        for (const ComSpec of winShells.filter(isDefined)) {
          for (const shell of winShells) {
            for (const input of inputs) {
              const customEnv = { ...env, ComSpec };
              const defaultShell = win.getDefaultShell(customEnv);
              const targetShell = shell || defaultShell;

              const expected = win.escapeShellArg(input, targetShell);

              const output = escapeShellArgByPlatform(
                input,
                platform,
                customEnv,
                shell
              );
              assert.strictEqual(output, expected);
            }
          }
        }
      });

      it(`works for boolean values`, function () {
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

      it(`works for numeric values`, function () {
        let output;
        try {
          output = escapeShellArgByPlatform(42, platform, env);
        } catch (_) {
          assert.fail("Should not throw for a number");
        }

        assert.strictEqual(output, "42");
      });

      it(`fails for undefined values`, function () {
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

      it(`fails when toString is missing`, function () {
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
  });

  describe("::quoteShellArgByPlatform", function () {
    describe("unix", function () {
      const env = unixEnv;
      const platform = unixPlatform;
      const defaultShell = unix.getDefaultShell();

      it(`calls the unix escape function`, function () {
        const inputs = ["Hello world!", "foo 'bar'"];

        for (const shell of unixShells) {
          for (const input of inputs) {
            const targetShell = shell || defaultShell;

            const expected = `'${unix.escapeShellArg(input, targetShell)}'`;

            const output = quoteShellArgByPlatform(input, platform, env, shell);
            assert.strictEqual(output, expected);
          }
        }
      });

      it(`quotes with single quotes`, function () {
        const output = quoteShellArgByPlatform("Hello world!", platform, env);
        assert(output.startsWith("'"));
        assert(output.endsWith("'"));
      });

      it(`works for boolean values`, function () {
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

      it(`works for numeric values`, function () {
        let output;
        try {
          output = quoteShellArgByPlatform(42, platform, env);
        } catch (_) {
          assert.fail("Should not throw for a number");
        }

        assert.strictEqual(output, "'42'");
      });

      it(`fails for undefined values`, function () {
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

      it(`fails when toString is missing`, function () {
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

    describe("win32", function () {
      const env = winEnv;
      const platform = winPlatform;

      it(`calls the windows escape function`, function () {
        const inputs = ["Hello world!", 'foo "bar"'];

        for (const ComSpec of winShells.filter(isDefined)) {
          for (const shell of winShells) {
            for (const input of inputs) {
              const customEnv = { ...env, ComSpec };
              const defaultShell = win.getDefaultShell(customEnv);
              const targetShell = shell || defaultShell;

              const expected = `"${win.escapeShellArg(input, targetShell)}"`;

              const output = quoteShellArgByPlatform(
                input,
                platform,
                customEnv,
                shell
              );
              assert.strictEqual(output, expected);
            }
          }
        }
      });

      it(`quotes with double quotes`, function () {
        const output = quoteShellArgByPlatform("Hello world!", platform, env);
        assert(output.startsWith('"'));
        assert(output.endsWith('"'));
      });

      it(`works for boolean values`, function () {
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

      it(`works for numeric values`, function () {
        let output;
        try {
          output = quoteShellArgByPlatform(42, platform, env);
        } catch (_) {
          assert.fail("Should not throw for a number");
        }

        assert.strictEqual(output, '"42"');
      });

      it(`fails for undefined values`, function () {
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

      it(`fails when toString is missing`, function () {
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
});
