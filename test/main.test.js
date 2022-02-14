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
  const booleanInputs = [true, false];
  const noToStringObject = { toString: null };
  const numericInputs = [42, 3.14];
  const stringInputs = [
    "Hello world!",
    'foo "bar"',
    "foo 'bar'",
    "Lorem`ipsum",
    "dead$beef",
  ];
  const undefinedValues = [undefined, null];

  const allValidValues = [...stringInputs, ...booleanInputs, ...numericInputs];

  describe("::escapeShellArgByPlatform", function () {
    describe("unix", function () {
      const env = unixEnv;
      const platform = unixPlatform;
      const defaultShell = unix.getDefaultShell();

      it(`calls the unix escape function, with interpolation`, function () {
        this.timeout(5000);

        for (const shell of unixShells) {
          for (const input of stringInputs) {
            const targetShell = shell || defaultShell;

            const expected = unix.escapeShellArg(input, targetShell, true);

            const output = escapeShellArgByPlatform(
              input,
              platform,
              env,
              shell,
              true
            );
            assert.strictEqual(output, expected);
          }
        }
      });

      it(`calls the unix escape function, without interpolation`, function () {
        this.timeout(5000);

        for (const shell of unixShells) {
          for (const input of stringInputs) {
            const targetShell = shell || defaultShell;

            const expected = unix.escapeShellArg(input, targetShell, false);

            const output = escapeShellArgByPlatform(
              input,
              platform,
              env,
              shell,
              false
            );
            assert.strictEqual(output, expected);
          }
        }

        // Test the default value of `interpolation`
        for (const shell of unixShells) {
          for (const input of stringInputs) {
            const targetShell = shell || defaultShell;

            const expected = unix.escapeShellArg(input, targetShell, false);

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
        for (const input of booleanInputs) {
          const outputTrue = escapeShellArgByPlatform(input, platform, env);
          assert.strictEqual(outputTrue, `${input}`);
        }
      });

      it(`works for numeric values`, function () {
        for (const input of numericInputs) {
          const output = escapeShellArgByPlatform(input, platform, env);
          assert.strictEqual(output, `${input}`);
        }
      });

      it(`fails for undefined values`, function () {
        for (const input of undefinedValues) {
          assert.throws(() => escapeShellArgByPlatform(input, platform, env), {
            name: "TypeError",
            message: typeError,
          });
        }
      });

      it(`fails when toString is missing`, function () {
        assert.throws(
          () => escapeShellArgByPlatform(noToStringObject, platform, env),
          {
            name: "TypeError",
            message: typeError,
          }
        );
      });
    });

    describe("win32", function () {
      const env = winEnv;
      const platform = winPlatform;

      it(`calls the windows escape function, with interpolation`, function () {
        this.timeout(5000);

        for (const ComSpec of winShells.filter(isDefined)) {
          for (const shell of winShells) {
            for (const input of stringInputs) {
              const customEnv = { ...env, ComSpec };
              const defaultShell = win.getDefaultShell(customEnv);
              const targetShell = shell || defaultShell;

              const expected = win.escapeShellArg(input, targetShell, true);

              const output = escapeShellArgByPlatform(
                input,
                platform,
                customEnv,
                shell,
                true
              );
              assert.strictEqual(output, expected);
            }
          }
        }
      });

      it(`calls the windows escape function, no interpolation`, function () {
        this.timeout(5000);

        for (const ComSpec of winShells.filter(isDefined)) {
          for (const shell of winShells) {
            for (const input of stringInputs) {
              const customEnv = { ...env, ComSpec };
              const defaultShell = win.getDefaultShell(customEnv);
              const targetShell = shell || defaultShell;

              const expected = win.escapeShellArg(input, targetShell, false);

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

        // Test the default value of `interpolation`
        for (const ComSpec of winShells.filter(isDefined)) {
          for (const shell of winShells) {
            for (const input of stringInputs) {
              const customEnv = { ...env, ComSpec };
              const defaultShell = win.getDefaultShell(customEnv);
              const targetShell = shell || defaultShell;

              const expected = win.escapeShellArg(input, targetShell, false);

              const output = escapeShellArgByPlatform(
                input,
                platform,
                customEnv,
                shell,
                false
              );
              assert.strictEqual(output, expected);
            }
          }
        }
      });

      it(`works for boolean values`, function () {
        for (const input of booleanInputs) {
          const outputTrue = escapeShellArgByPlatform(input, platform, env);
          assert.strictEqual(outputTrue, `${input}`);
        }
      });

      it(`works for numeric values`, function () {
        for (const input of numericInputs) {
          const output = escapeShellArgByPlatform(input, platform, env);
          assert.strictEqual(output, `${input}`);
        }
      });

      it(`fails for undefined values`, function () {
        for (const input of undefinedValues) {
          assert.throws(() => escapeShellArgByPlatform(input, platform, env), {
            name: "TypeError",
            message: typeError,
          });
        }
      });

      it(`fails when toString is missing`, function () {
        assert.throws(
          () => escapeShellArgByPlatform(noToStringObject, platform, env),
          {
            name: "TypeError",
            message: typeError,
          }
        );
      });
    });
  });

  describe("::quoteShellArgByPlatform", function () {
    describe("unix", function () {
      const env = unixEnv;
      const platform = unixPlatform;
      const defaultShell = unix.getDefaultShell();

      it(`calls the unix escape function`, function () {
        this.timeout(5000);

        for (const shell of unixShells) {
          for (const input of stringInputs) {
            const targetShell = shell || defaultShell;

            const expected = unix.escapeShellArg(input, targetShell);

            const output = quoteShellArgByPlatform(input, platform, env, shell);
            assert.strictEqual(output.slice(1, -1), expected);
          }
        }
      });

      it(`quotes with single quotes`, function () {
        for (const input of allValidValues) {
          const output = quoteShellArgByPlatform(input, platform, env);
          assert(output.startsWith("'"));
          assert(output.endsWith("'"));
        }
      });

      it(`works for boolean values`, function () {
        for (const input of booleanInputs) {
          const outputTrue = quoteShellArgByPlatform(input, platform, env);
          assert.strictEqual(outputTrue.slice(1, -1), `${input}`);
        }
      });

      it(`works for numeric values`, function () {
        for (const input of numericInputs) {
          const output = quoteShellArgByPlatform(input, platform, env);
          assert.strictEqual(output.slice(1, -1), `${input}`);
        }
      });

      it(`fails for undefined values`, function () {
        for (const input of undefinedValues) {
          assert.throws(() => quoteShellArgByPlatform(input, platform, env), {
            name: "TypeError",
            message: typeError,
          });
        }
      });

      it(`fails when toString is missing`, function () {
        assert.throws(
          () => quoteShellArgByPlatform(noToStringObject, platform, env),
          {
            name: "TypeError",
            message: typeError,
          }
        );
      });
    });

    describe("win32", function () {
      const env = winEnv;
      const platform = winPlatform;

      it(`calls the windows escape function`, function () {
        this.timeout(5000);

        for (const ComSpec of winShells.filter(isDefined)) {
          for (const shell of winShells) {
            for (const input of stringInputs) {
              const customEnv = { ...env, ComSpec };
              const defaultShell = win.getDefaultShell(customEnv);
              const targetShell = shell || defaultShell;

              const expected = win.escapeShellArg(input, targetShell);

              const output = quoteShellArgByPlatform(
                input,
                platform,
                customEnv,
                shell
              );
              assert.strictEqual(output.slice(1, -1), expected);
            }
          }
        }
      });

      it(`quotes with double quotes`, function () {
        for (const input of allValidValues) {
          const output = quoteShellArgByPlatform(input, platform, env);
          assert(output.startsWith('"'));
          assert(output.endsWith('"'));
        }
      });

      it(`works for boolean values`, function () {
        for (const input of booleanInputs) {
          const outputTrue = quoteShellArgByPlatform(input, platform, env);
          assert.strictEqual(outputTrue.slice(1, -1), `${input}`);
        }
      });

      it(`works for numeric values`, function () {
        for (const input of numericInputs) {
          const output = quoteShellArgByPlatform(input, platform, env);
          assert.strictEqual(output.slice(1, -1), `${input}`);
        }
      });

      it(`fails for undefined values`, function () {
        for (const input of undefinedValues) {
          assert.throws(() => quoteShellArgByPlatform(input, platform, env), {
            name: "TypeError",
            message: typeError,
          });
        }
      });

      it(`fails when toString is missing`, function () {
        assert.throws(
          () => quoteShellArgByPlatform(noToStringObject, platform, env),
          {
            name: "TypeError",
            message: typeError,
          }
        );
      });
    });
  });
});
