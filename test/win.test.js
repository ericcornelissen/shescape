/**
 * @overview Contains unit tests for `./src/win.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";

import { cmdExe, ComSpec, nullChar, powershellExe } from "./common.js";

import { escapeShellArg, getDefaultShell } from "../src/win.js";

describe("win.js", function () {
  describe("::escapeShellArgs", function () {
    it("throws if no shell is provided", function () {
      const input = `Hello world!`;
      assert.throws(() => escapeShellArg(input));
    });

    describe("cmd.exe", function () {
      const shell = cmdExe;

      it("should return the input if nothing has to be escaped", function () {
        const input = `Hello world!`;
        const output = escapeShellArg(input, shell);
        assert.strictEqual(output, input);
      });

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
        it("does nothing to one backtick", function () {
          const input = "foo`bar";
          const output = escapeShellArg(input, shell);
          assert.strictEqual(output, "foo`bar");
        });

        it("does nothing to multiple backticks", function () {
          const input = "Praise`the`sun";
          const output = escapeShellArg(input, shell);
          assert.strictEqual(output, "Praise`the`sun");
        });
      });

      describe("null characters", function () {
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

      describe("left double quotation mark", function () {
        it("does nothing to one", function () {
          const input = "foo“bar";
          const output = escapeShellArg(input, shell);
          assert.strictEqual(output, "foo“bar");
        });

        it("does nothing to multiple", function () {
          const input = "Praise“the“sun";
          const output = escapeShellArg(input, shell);
          assert.strictEqual(output, "Praise“the“sun");
        });
      });

      describe("right double quotation mark", function () {
        it("does nothing to one", function () {
          const input = "foo”bar";
          const output = escapeShellArg(input, shell);
          assert.strictEqual(output, "foo”bar");
        });

        it("does nothing to multiple", function () {
          const input = "Praise”the”sun";
          const output = escapeShellArg(input, shell);
          assert.strictEqual(output, "Praise”the”sun");
        });
      });

      describe("double low-9 quotation mark", function () {
        it("does nothing to one", function () {
          const input = "foo„bar";
          const output = escapeShellArg(input, shell);
          assert.strictEqual(output, "foo„bar");
        });

        it("does nothing to multiple", function () {
          const input = "Praise„the„sun";
          const output = escapeShellArg(input, shell);
          assert.strictEqual(output, "Praise„the„sun");
        });
      });
    });

    describe("powershell.exe", function () {
      const shell = powershellExe;

      it("returns the input if nothing has to be escaped", function () {
        const input = `Hello world!`;
        const output = escapeShellArg(input, shell);
        assert.strictEqual(output, input);
      });

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

      describe("left double quotation mark", function () {
        it("escapes one", function () {
          const input = "foo“bar";
          const output = escapeShellArg(input, shell);
          assert.strictEqual(output, "foo““bar");
        });

        it("escapes multiple", function () {
          const input = "Praise“the“sun";
          const output = escapeShellArg(input, shell);
          assert.strictEqual(output, "Praise““the““sun");
        });
      });

      describe("right double quotation mark", function () {
        it("escapes one", function () {
          const input = "foo”bar";
          const output = escapeShellArg(input, shell);
          assert.strictEqual(output, "foo””bar");
        });

        it("escapes multiple", function () {
          const input = "Praise”the”sun";
          const output = escapeShellArg(input, shell);
          assert.strictEqual(output, "Praise””the””sun");
        });
      });

      describe("double low-9 quotation mark", function () {
        it("escapes one", function () {
          const input = "foo„bar";
          const output = escapeShellArg(input, shell);
          assert.strictEqual(output, "foo„„bar");
        });

        it("escapes multiple", function () {
          const input = "Praise„the„sun";
          const output = escapeShellArg(input, shell);
          assert.strictEqual(output, "Praise„„the„„sun");
        });
      });
    });
  });

  describe("::getDefaultShell", function () {
    it("returns the value of ComSpec", function () {
      const env = { ComSpec };
      const result = getDefaultShell(env);
      assert.strictEqual(result, ComSpec);
    });
  });
});
