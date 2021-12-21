/**
 * @overview Contains unit tests for `./src/unix.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";

import { binSh, nullChar } from "./common.js";

import { escapeShellArg, getDefaultShell } from "../src/unix.js";

describe("unix.js", function () {
  describe("::escapeShellArg", function () {
    it("throws if no shell is provided", function () {
      const input = `Hello world!`;
      assert.throws(() => escapeShellArg(input));
    });

    describe("/bin/sh", function () {
      const shell = binSh;

      it("returns the input if nothing has to be escaped", function () {
        const input = `Hello world!`;
        const output = escapeShellArg(input, shell);
        assert.strictEqual(output, input);
      });

      describe("escape single quotes", function () {
        it("escapes one single quote", function () {
          const input = `' & ls -al`;
          const output = escapeShellArg(input, shell);
          assert.strictEqual(output, `'\\'' & ls -al`);
        });

        it("escapes two single quotes", function () {
          const input = `' & echo 'Hello world!'`;
          const output = escapeShellArg(input, shell);
          assert.strictEqual(output, `'\\'' & echo '\\''Hello world!'\\''`);
        });
      });

      describe("null characters", function () {
        it("removes one null character", function () {
          const input = `foo' && ls${nullChar} -al ; echo 'bar`;
          const output = escapeShellArg(input, shell);
          assert.strictEqual(output, `foo'\\'' && ls -al ; echo '\\''bar`);
        });

        it("removes multiple null characters", function () {
          const input = `foo'${nullChar}&&ls -al${nullChar};echo 'bar`;
          const output = escapeShellArg(input, shell);
          assert.strictEqual(output, `foo'\\''&&ls -al;echo '\\''bar`);
        });
      });
    });
  });

  describe("::getDefaultShell", function () {
    it("is '/bin/sh'", function () {
      const result = getDefaultShell();
      assert.strictEqual(result, "/bin/sh");
    });
  });
});
