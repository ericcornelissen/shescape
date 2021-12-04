/**
 * @overview Contains unit tests for `./src/win.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";

import { escapeShellArg } from "../src/win.js";

describe("win.js", function () {
  it("should return the input if nothing has to be escaped", function () {
    const input = `Hello world!`;
    const output = escapeShellArg(input);
    assert.strictEqual(output, input);
  });

  describe("default shell", function () {
    describe("double quotes", function () {
      it("escapes one double quote", function () {
        const input = `" & ls -al`;
        const output = escapeShellArg(input);
        assert.strictEqual(output, `"" & ls -al`);
      });

      it("escapes multiple double quotes", function () {
        const input = `" & echo "Hello world!`;
        const output = escapeShellArg(input);
        assert.strictEqual(output, `"" & echo ""Hello world!`);
      });
    });

    describe("backticks", function () {
      it("escapes one backtick", function () {
        const input = "foo`bar";
        const output = escapeShellArg(input);
        assert.strictEqual(output, "foo`bar");
      });

      it("escapes multiple backticks", function () {
        const input = "Praise`the`sun";
        const output = escapeShellArg(input);
        assert.strictEqual(output, "Praise`the`sun");
      });
    });

    describe("null characters", function () {
      const nullChar = String.fromCharCode(0);

      it("removes one null character", function () {
        const input = `foo" && ls${nullChar} -al ; echo "bar`;
        const output = escapeShellArg(input);
        assert.strictEqual(output, `foo"" && ls -al ; echo ""bar`);
      });

      it("removes multiple null characters", function () {
        const input = `foo"${nullChar}&&ls -al${nullChar};echo "bar`;
        const output = escapeShellArg(input);
        assert.strictEqual(output, `foo""&&ls -al;echo ""bar`);
      });
    });

    describe("dollar signs", function () {
      it("does nothing to one dollar sign", function () {
        const input = "foo$bar";
        const output = escapeShellArg(input);
        assert.strictEqual(output, "foo$bar");
      });

      it("does nothing to multiple dollar signs", function () {
        const input = "Praise$the$sun";
        const output = escapeShellArg(input);
        assert.strictEqual(output, "Praise$the$sun");
      });
    });
  });

  describe("cmd.exe", function () {
    const shell = "cmd.exe";

    describe("double quotes", function () {
      it("escapes one double quote", function () {
        const input = `" & ls -al`;
        const output = escapeShellArg(input, shell);
        assert.strictEqual(output, `"" & ls -al`);
      });

      it("escapes multiple double quotes", function () {
        const input = `" & echo "Hello world!`;
        const output = escapeShellArg(input, shell);
        assert.strictEqual(output, `"" & echo ""Hello world!`);
      });
    });

    describe("backticks", function () {
      it("escapes one backtick", function () {
        const input = "foo`bar";
        const output = escapeShellArg(input, shell);
        assert.strictEqual(output, "foo`bar");
      });

      it("escapes multiple backticks", function () {
        const input = "Praise`the`sun";
        const output = escapeShellArg(input, shell);
        assert.strictEqual(output, "Praise`the`sun");
      });
    });

    describe("null characters", function () {
      const nullChar = String.fromCharCode(0);

      it("removes one null character", function () {
        const input = `foo" && ls${nullChar} -al ; echo "bar`;
        const output = escapeShellArg(input, shell);
        assert.strictEqual(output, `foo"" && ls -al ; echo ""bar`);
      });

      it("removes multiple null characters", function () {
        const input = `foo"${nullChar}&&ls -al${nullChar};echo "bar`;
        const output = escapeShellArg(input, shell);
        assert.strictEqual(output, `foo""&&ls -al;echo ""bar`);
      });
    });

    describe("dollar signs", function () {
      it("does nothing to one dollar sign", function () {
        const input = "foo$bar";
        const output = escapeShellArg(input, shell);
        assert.strictEqual(output, "foo$bar");
      });

      it("does nothing to multiple dollar signs", function () {
        const input = "Praise$the$sun";
        const output = escapeShellArg(input, shell);
        assert.strictEqual(output, "Praise$the$sun");
      });
    });
  });

  describe("powershell.exe", function () {
    const shell = "powershell.exe";

    describe("double quotes", function () {
      it("escapes one double quote", function () {
        const input = `" & ls -al`;
        const output = escapeShellArg(input, shell);
        assert.strictEqual(output, `"" & ls -al`);
      });

      it("escapes multiple double quotes", function () {
        const input = `" & echo "Hello world!`;
        const output = escapeShellArg(input, shell);
        assert.strictEqual(output, `"" & echo ""Hello world!`);
      });
    });

    describe("backticks", function () {
      it("escapes one backtick", function () {
        const input = "foo`bar";
        const output = escapeShellArg(input, shell);
        assert.strictEqual(output, "foo``bar");
      });

      it("escapes multiple backticks", function () {
        const input = "Praise`the`sun";
        const output = escapeShellArg(input, shell);
        assert.strictEqual(output, "Praise``the``sun");
      });
    });

    describe("null characters", function () {
      const nullChar = String.fromCharCode(0);

      it("removes one null character", function () {
        const input = `foo" && ls${nullChar} -al ; echo "bar`;
        const output = escapeShellArg(input, shell);
        assert.strictEqual(output, `foo"" && ls -al ; echo ""bar`);
      });

      it("removes multiple null characters", function () {
        const input = `foo"${nullChar}&&ls -al${nullChar};echo "bar`;
        const output = escapeShellArg(input, shell);
        assert.strictEqual(output, `foo""&&ls -al;echo ""bar`);
      });
    });

    describe("dollar signs", function () {
      it("escapes one dollar sign", function () {
        const input = "foo$bar";
        const output = escapeShellArg(input, shell);
        assert.strictEqual(output, "foo`$bar");
      });

      it("escapes multiple dollar signs", function () {
        const input = "Praise$the$sun";
        const output = escapeShellArg(input, shell);
        assert.strictEqual(output, "Praise`$the`$sun");
      });
    });
  });
});
