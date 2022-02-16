/**
 * @overview Contains unit tests for `./src/win.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";

import { ComSpec, nullChar } from "./common.js";

import { getBasename, getDefaultShell, getEscapeFunction } from "../src/win.js";

describe("win.js", function () {
  describe("::getEscapeFunction", function () {
    describe("cmd.exe", function () {
      const escapeShellArg = getEscapeFunction("cmd.exe");

      describe("No interpolation", function () {
        const interpolation = false;

        it("should return the input if nothing has to be escaped", function () {
          const input = `Hello world!`;
          const output = escapeShellArg(input, interpolation);
          assert.strictEqual(output, input);
        });

        describe("null characters", function () {
          it("removes one null character", function () {
            const input = `foo ls${nullChar} -al bar`;
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, `foo ls -al bar`);
          });

          it("removes multiple null characters", function () {
            const input = `foo ls${nullChar} -al ${nullChar}bar`;
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, `foo ls -al bar`);
          });
        });

        describe("double quotes ('\"')", function () {
          it("escapes one double quote", function () {
            const input = `" ls -al`;
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, `"" ls -al`);
          });

          it("escapes multiple double quotes", function () {
            const input = `" echo "Hello world!`;
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, `"" echo ""Hello world!`);
          });
        });

        describe("backticks ('`')", function () {
          it("does nothing to one backtick", function () {
            const input = "foo`bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo`bar");
          });

          it("does nothing to multiple backticks", function () {
            const input = "Praise`the`sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise`the`sun");
          });
        });

        describe("comma (',')", function () {
          it("does nothing to one comma", function () {
            const input = "foo,bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple commas", function () {
            const input = "Praise,the,sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("hashtags ('#')", function () {
          it("does nothing to one hashtag", function () {
            const input = "#foobar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple hashtags", function () {
            const input = "#foo#bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("at-signs ('@')", function () {
          it("does nothing to one at-sign", function () {
            const input = "foo@bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple at-signs", function () {
            const input = "@foo@bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("hyphens ('-')", function () {
          it("does nothing to one hyphen", function () {
            const input = "-foobar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple hyphens", function () {
            const input = "-foo-bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("carets ('^')", function () {
          it("does nothing to one caret", function () {
            const input = "foo^bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple carets", function () {
            const input = "Praise^the^sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("dollar signs ('$')", function () {
          it("does nothing to one dollar sign", function () {
            const input = "foo$bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo$bar");
          });

          it("does nothing to multiple dollar signs", function () {
            const input = "Praise$the$sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise$the$sun");
          });
        });

        describe("colons (':')", function () {
          it("does nothing to one colon", function () {
            const input = "foo:bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple colons", function () {
            const input = "praise:the:sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("semicolons (';')", function () {
          it("does nothing to one semicolon", function () {
            const input = "foo;bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple semicolons", function () {
            const input = "praise;the;sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("ampersands ('&')", function () {
          it("does nothing to one ampersand", function () {
            const input = "foo&bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple ampersands", function () {
            const input = "praise&the&sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("pipes ('|')", function () {
          it("does nothing to one pipe", function () {
            const input = "foo|bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple pipes", function () {
            const input = "praise|the|sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("parentheses ('(', ')')", function () {
          it("does nothing to one opening parenthesis", function () {
            const input = "foo(bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple opening parentheses", function () {
            const input = "praise(the(sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to one closing parenthesis", function () {
            const input = "foo(bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple closing parentheses", function () {
            const input = "praise(the(sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to a pair of parentheses", function () {
            const input = "praise(the)sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("square brackets ('[', ']')", function () {
          it("does nothing to one opening square bracket", function () {
            const input = "foo[bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple opening square brackets", function () {
            const input = "praise[the[sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to one closing square bracket", function () {
            const input = "foo]bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple closing square brackets", function () {
            const input = "praise]the]sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to a pair of square brackets", function () {
            const input = "praise[the]sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("curly brackets ('{', '}')", function () {
          it("does nothing to one opening curly bracket", function () {
            const input = "foo{bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple opening curly brackets", function () {
            const input = "praise{the{sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to one closing curly bracket", function () {
            const input = "foo}bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple closing curly brackets", function () {
            const input = "praise}the}sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to a pair of curly brackets", function () {
            const input = "praise{the}sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("angle brackets ('<', '>')", function () {
          it("does nothing to one left-angle bracket", function () {
            const input = "foo<bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple left-angle brackets", function () {
            const input = "Praise<the<sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to one right-angle bracket", function () {
            const input = "foo>bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple right-angle brackets", function () {
            const input = "Praise>the>sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("left double quotation mark ('“')", function () {
          it("does nothing to one", function () {
            const input = "foo“bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo“bar");
          });

          it("does nothing to multiple", function () {
            const input = "Praise“the“sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise“the“sun");
          });
        });

        describe("right double quotation mark ('”')", function () {
          it("does nothing to one", function () {
            const input = "foo”bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo”bar");
          });

          it("does nothing to multiple", function () {
            const input = "Praise”the”sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise”the”sun");
          });
        });

        describe("double low-9 quotation mark ('„')", function () {
          it("does nothing to one", function () {
            const input = "foo„bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo„bar");
          });

          it("does nothing to multiple", function () {
            const input = "Praise„the„sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise„the„sun");
          });
        });

        describe("left single quotation mark ('‘')", function () {
          it("does nothing to one", function () {
            const input = "foo‘bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple", function () {
            const input = "Praise‘the‘sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("right single quotation mark ('’')", function () {
          it("does nothing to one", function () {
            const input = "foo’bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple", function () {
            const input = "Praise’the’sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("single low-9 quotation mark ('‚')", function () {
          it("does nothing to one", function () {
            const input = "foo‚bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple", function () {
            const input = "Praise‚the‚sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("single high-reversed-9 quotation mark ('‛')", function () {
          it("does nothing to one", function () {
            const input = "foo‛bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple", function () {
            const input = "Praise‛the‛sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });
      });

      describe("With interpolation", function () {
        const interpolation = true;

        it("should return the input if nothing has to be escaped", function () {
          const input = `Hello world!`;
          const output = escapeShellArg(input, interpolation);
          assert.strictEqual(output, input);
        });

        describe("null characters", function () {
          it("removes one null character", function () {
            const input = `foo ls${nullChar} -al bar`;
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, `foo ls -al bar`);
          });

          it("removes multiple null characters", function () {
            const input = `foo ls${nullChar} -al ${nullChar}bar`;
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, `foo ls -al bar`);
          });
        });

        describe("double quotes ('\"')", function () {
          it("escapes one double quote", function () {
            const input = `" ls -al`;
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, `^" ls -al`);
          });

          it("escapes multiple double quotes", function () {
            const input = `" echo "Hello world!`;
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, `^" echo ^"Hello world!`);
          });
        });

        describe("backticks ('`')", function () {
          it("does nothing to one backtick", function () {
            const input = "foo`bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo`bar");
          });

          it("does nothing to multiple backticks", function () {
            const input = "Praise`the`sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise`the`sun");
          });
        });

        describe("comma (',')", function () {
          it("does nothing to one comma", function () {
            const input = "foo,bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple commas", function () {
            const input = "Praise,the,sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("hashtags ('#')", function () {
          it("does nothing to one hashtag", function () {
            const input = "#foobar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple hashtags", function () {
            const input = "#foo#bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("at-signs ('@')", function () {
          it("does nothing to one at-sign", function () {
            const input = "foo@bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple at-signs", function () {
            const input = "@foo@bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("hyphens ('-')", function () {
          it("does nothing to one hyphen", function () {
            const input = "-foobar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple hyphens", function () {
            const input = "-foo-bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("carets ('^')", function () {
          it("escapes one caret", function () {
            const input = "foo^bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo^^bar");
          });

          it("escapes multiple carets", function () {
            const input = "Praise^the^sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise^^the^^sun");
          });
        });

        describe("dollar signs ('$')", function () {
          it("does nothing to one dollar sign", function () {
            const input = "foo$bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo$bar");
          });

          it("does nothing to multiple dollar signs", function () {
            const input = "Praise$the$sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise$the$sun");
          });
        });

        describe("colons (':')", function () {
          it("does nothing to one colon", function () {
            const input = "foo:bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple colons", function () {
            const input = "praise:the:sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("semicolons (';')", function () {
          it("does nothing to one semicolon", function () {
            const input = "foo;bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple semicolons", function () {
            const input = "praise;the;sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("ampersands ('&')", function () {
          it("escapes one ampersand", function () {
            const input = "foo&bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo^&bar");
          });

          it("escapes multiple ampersands", function () {
            const input = "praise&the&sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise^&the^&sun");
          });
        });

        describe("pipes ('|')", function () {
          it("escapes one pipe", function () {
            const input = "foo|bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo^|bar");
          });

          it("escapes multiple pipes", function () {
            const input = "praise|the|sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise^|the^|sun");
          });
        });

        describe("parentheses ('(', ')')", function () {
          it("does nothing to one opening parenthesis", function () {
            const input = "foo(bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple opening parentheses", function () {
            const input = "praise(the(sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to one closing parenthesis", function () {
            const input = "foo(bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple closing parentheses", function () {
            const input = "praise(the(sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to a pair of parentheses", function () {
            const input = "praise(the)sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("square brackets ('[', ']')", function () {
          it("does nothing to one opening square bracket", function () {
            const input = "foo[bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple opening square brackets", function () {
            const input = "praise[the[sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to one closing square bracket", function () {
            const input = "foo]bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple closing square brackets", function () {
            const input = "praise]the]sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to a pair of square brackets", function () {
            const input = "praise[the]sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("curly brackets ('{', '}')", function () {
          it("does nothing to one opening curly bracket", function () {
            const input = "foo{bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple opening curly brackets", function () {
            const input = "praise{the{sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to one closing curly bracket", function () {
            const input = "foo}bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple closing curly brackets", function () {
            const input = "praise}the}sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to a pair of curly brackets", function () {
            const input = "praise{the}sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("angle brackets ('<', '>')", function () {
          it("escapes one left-angle bracket", function () {
            const input = "foo<bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo^<bar");
          });

          it("escapes multiple left-angle brackets", function () {
            const input = "Praise<the<sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise^<the^<sun");
          });

          it("does nothing to one right-angle bracket", function () {
            const input = "foo>bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo^>bar");
          });

          it("does nothing to multiple right-angle brackets", function () {
            const input = "Praise>the>sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise^>the^>sun");
          });
        });

        describe("left double quotation mark ('“')", function () {
          it("does nothing to one", function () {
            const input = "foo“bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo“bar");
          });

          it("does nothing to multiple", function () {
            const input = "Praise“the“sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise“the“sun");
          });
        });

        describe("right double quotation mark ('”')", function () {
          it("does nothing to one", function () {
            const input = "foo”bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo”bar");
          });

          it("does nothing to multiple", function () {
            const input = "Praise”the”sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise”the”sun");
          });
        });

        describe("double low-9 quotation mark ('„')", function () {
          it("does nothing to one", function () {
            const input = "foo„bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo„bar");
          });

          it("does nothing to multiple", function () {
            const input = "Praise„the„sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise„the„sun");
          });
        });

        describe("left single quotation mark ('‘')", function () {
          it("does nothing to one", function () {
            const input = "foo‘bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple", function () {
            const input = "Praise‘the‘sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("right single quotation mark ('’')", function () {
          it("does nothing to one", function () {
            const input = "foo’bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple", function () {
            const input = "Praise’the’sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("single low-9 quotation mark ('‚')", function () {
          it("does nothing to one", function () {
            const input = "foo‚bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple", function () {
            const input = "Praise‚the‚sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("single high-reversed-9 quotation mark ('‛')", function () {
          it("does nothing to one", function () {
            const input = "foo‛bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple", function () {
            const input = "Praise‛the‛sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });
      });
    });

    describe("powershell.exe", function () {
      const escapeShellArg = getEscapeFunction("powershell.exe");

      describe("No interpolation", function () {
        const interpolation = false;

        it("returns the input if nothing has to be escaped", function () {
          const input = `Hello world!`;
          const output = escapeShellArg(input, interpolation);
          assert.strictEqual(output, input);
        });

        describe("null characters", function () {
          it("removes one null character", function () {
            const input = `foo ls${nullChar} -al bar`;
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, `foo ls -al bar`);
          });

          it("removes multiple null characters", function () {
            const input = `foo ls${nullChar} -al ${nullChar}bar`;
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, `foo ls -al bar`);
          });
        });

        describe("double quotes ('\"')", function () {
          it("escapes one double quote", function () {
            const input = `" ls -al`;
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, `"" ls -al`);
          });

          it("escapes multiple double quotes", function () {
            const input = `" echo "Hello world!`;
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, `"" echo ""Hello world!`);
          });
        });

        describe("backticks ('`')", function () {
          it("escapes one backtick", function () {
            const input = "foo`bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo``bar");
          });

          it("escapes multiple backticks", function () {
            const input = "Praise`the`sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise``the``sun");
          });
        });

        describe("comma (',')", function () {
          it("does nothing to one comma", function () {
            const input = "foo,bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple commas", function () {
            const input = "Praise,the,sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("hashtags ('#')", function () {
          it("does nothing to one hashtag", function () {
            const input = "#foobar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple hashtags", function () {
            const input = "#foo#bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("at-signs ('@')", function () {
          it("does nothing to one at-sign", function () {
            const input = "foo@bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple at-signs", function () {
            const input = "@foo@bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("hyphens ('-')", function () {
          it("does nothing to one hyphen", function () {
            const input = "-foobar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple hyphens", function () {
            const input = "-foo-bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("carets ('^')", function () {
          it("does nothing to one caret", function () {
            const input = "foo^bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple carets", function () {
            const input = "Praise^the^sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("dollar signs ('$')", function () {
          it("escapes one dollar sign", function () {
            const input = "foo$bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo`$bar");
          });

          it("escapes multiple dollar signs", function () {
            const input = "Praise$the$sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise`$the`$sun");
          });
        });

        describe("colons (':')", function () {
          it("does nothing to one colon", function () {
            const input = "foo:bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple colons", function () {
            const input = "praise:the:sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("semicolons (';')", function () {
          it("does nothing to one semicolon", function () {
            const input = "foo;bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple semicolons", function () {
            const input = "praise;the;sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("ampersands ('&')", function () {
          it("does nothing to one ampersand", function () {
            const input = "foo&bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple ampersands", function () {
            const input = "praise&the&sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("pipes ('|')", function () {
          it("does nothing to one pipe", function () {
            const input = "foo|bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple pipes", function () {
            const input = "praise|the|sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("parentheses ('(', ')')", function () {
          it("does nothing to one opening parenthesis", function () {
            const input = "foo(bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple opening parentheses", function () {
            const input = "praise(the(sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to one closing parenthesis", function () {
            const input = "foo(bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple closing parentheses", function () {
            const input = "praise(the(sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to a pair of parentheses", function () {
            const input = "praise(the)sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("square brackets ('[', ']')", function () {
          it("does nothing to one opening square bracket", function () {
            const input = "foo[bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple opening square brackets", function () {
            const input = "praise[the[sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to one closing square bracket", function () {
            const input = "foo]bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple closing square brackets", function () {
            const input = "praise]the]sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to a pair of square brackets", function () {
            const input = "praise[the]sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("curly brackets ('{', '}')", function () {
          it("does nothing to one opening curly bracket", function () {
            const input = "foo{bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple opening curly brackets", function () {
            const input = "praise{the{sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to one closing curly bracket", function () {
            const input = "foo}bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple closing curly brackets", function () {
            const input = "praise}the}sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to a pair of curly brackets", function () {
            const input = "praise{the}sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("angle brackets ('<', '>')", function () {
          it("does nothing to one left-angle bracket", function () {
            const input = "foo<bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple left-angle brackets", function () {
            const input = "<foo<bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to one right-angle bracket", function () {
            const input = "foo>bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple right-angle brackets", function () {
            const input = ">foo>bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("left double quotation mark ('“')", function () {
          it("escapes one", function () {
            const input = "foo“bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo““bar");
          });

          it("escapes multiple", function () {
            const input = "Praise“the“sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise““the““sun");
          });
        });

        describe("right double quotation mark ('”')", function () {
          it("escapes one", function () {
            const input = "foo”bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo””bar");
          });

          it("escapes multiple", function () {
            const input = "Praise”the”sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise””the””sun");
          });
        });

        describe("double low-9 quotation mark ('„')", function () {
          it("escapes one", function () {
            const input = "foo„bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo„„bar");
          });

          it("escapes multiple", function () {
            const input = "Praise„the„sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise„„the„„sun");
          });
        });

        describe("left single quotation mark ('‘')", function () {
          it("does nothing to one", function () {
            const input = "foo‘bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple", function () {
            const input = "Praise‘the‘sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("right single quotation mark ('’')", function () {
          it("does nothing to one", function () {
            const input = "foo’bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple", function () {
            const input = "Praise’the’sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("single low-9 quotation mark ('‚')", function () {
          it("does nothing to one", function () {
            const input = "foo‚bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple", function () {
            const input = "Praise‚the‚sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("single high-reversed-9 quotation mark ('‛')", function () {
          it("does nothing to one", function () {
            const input = "foo‛bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple", function () {
            const input = "Praise‛the‛sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });
      });

      describe("With interpolation", function () {
        const interpolation = true;

        it("returns the input if nothing has to be escaped", function () {
          const input = `Hello world!`;
          const output = escapeShellArg(input, interpolation);
          assert.strictEqual(output, input);
        });

        describe("null characters", function () {
          it("removes one null character", function () {
            const input = `foo ls${nullChar} -al bar`;
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, `foo ls -al bar`);
          });

          it("removes multiple null characters", function () {
            const input = `foo ls${nullChar} -al ${nullChar}bar`;
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, `foo ls -al bar`);
          });
        });

        describe("double quotes ('\"')", function () {
          it("escapes one double quote", function () {
            const input = `" ls -al`;
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, '`" ls -al');
          });

          it("escapes multiple double quotes", function () {
            const input = `" echo "Hello world!`;
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, '`" echo `"Hello world!');
          });
        });

        describe("backticks ('`')", function () {
          it("escapes one backtick", function () {
            const input = "foo`bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo``bar");
          });

          it("escapes multiple backticks", function () {
            const input = "Praise`the`sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise``the``sun");
          });
        });

        describe("comma (',')", function () {
          it("escapes one comma", function () {
            const input = "foo,bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo`,bar");
          });

          it("escapes multiple commas", function () {
            const input = "Praise,the,sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise`,the`,sun");
          });
        });

        describe("hashtags ('#')", function () {
          it("escapes a hashtag at the start", function () {
            const input = "#foobar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "`#foobar");
          });

          it("does nothing to a hashtag not at the start", function () {
            const input = "foo#bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("only escapes the hashtag at the start", function () {
            const input = "#foo#bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "`#foo#bar");
          });
        });

        describe("at-signs ('@')", function () {
          it("escapes an at-sign at the start", function () {
            const input = "@foobar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "`@foobar");
          });

          it("does nothing to an at-sign not at the start", function () {
            const input = "foo@bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("only escapes the at-sign at the start", function () {
            const input = "@foo@bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "`@foo@bar");
          });
        });

        describe("hyphens ('-')", function () {
          it("escapes a hyphen at the start", function () {
            const input = "-foobar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "`-foobar");
          });

          it("does nothing to a hyphen not at the start", function () {
            const input = "foo-bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("only escapes the hyphen at the start", function () {
            const input = "-foo-bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "`-foo-bar");
          });
        });

        describe("carets ('^')", function () {
          it("does nothing to one caret", function () {
            const input = "foo^bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple carets", function () {
            const input = "Praise^the^sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("dollar signs ('$')", function () {
          it("escapes one dollar sign", function () {
            const input = "foo$bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo`$bar");
          });

          it("escapes multiple dollar signs", function () {
            const input = "Praise$the$sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise`$the`$sun");
          });
        });

        describe("colons (':')", function () {
          it("escapes a colon at the start", function () {
            const input = ":foobar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "`:foobar");
          });

          it("does nothing to a colon not at the start", function () {
            const input = "foo:bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("only escapes the colon at the start", function () {
            const input = ":foo:bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "`:foo:bar");
          });
        });

        describe("semicolons (';')", function () {
          it("escapes one semicolon", function () {
            const input = "foo;bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo`;bar");
          });

          it("escapes multiple semicolons", function () {
            const input = "praise;the;sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise`;the`;sun");
          });
        });

        describe("ampersands ('&')", function () {
          it("escapes one ampersand", function () {
            const input = "foo&bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo`&bar");
          });

          it("escapes multiple ampersands", function () {
            const input = "praise&the&sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise`&the`&sun");
          });
        });

        describe("pipes ('|')", function () {
          it("escapes one pipe", function () {
            const input = "foo|bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo`|bar");
          });

          it("escapes multiple pipes", function () {
            const input = "praise|the|sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise`|the`|sun");
          });
        });

        describe("parentheses ('(', ')')", function () {
          it("escapes one opening parenthesis", function () {
            const input = "foo(bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo`(bar");
          });

          it("escapes multiple opening parentheses", function () {
            const input = "praise(the(sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise`(the`(sun");
          });

          it("escapes one closing parenthesis", function () {
            const input = "foo)bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo`)bar");
          });

          it("escapes multiple closing parentheses", function () {
            const input = "praise)the)sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise`)the`)sun");
          });

          it("escapes a pair of parentheses", function () {
            const input = "praise(the)sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise`(the`)sun");
          });
        });

        describe("square brackets ('[', ']')", function () {
          it("does nothing to one opening square bracket", function () {
            const input = "foo[bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple opening square brackets", function () {
            const input = "praise[the[sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("escapes a leading closing square bracket", function () {
            const input = "]foobar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "`]foobar");
          });

          it("does nothing to one closing square bracket", function () {
            const input = "foo]bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple closing square brackets", function () {
            const input = "praise]the]sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to a pair of square brackets", function () {
            const input = "praise[the]sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("curly brackets ('{', '}')", function () {
          it("escapes one opening parenthesis", function () {
            const input = "foo{bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo`{bar");
          });

          it("escapes multiple opening parentheses", function () {
            const input = "praise{the{sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise`{the`{sun");
          });

          it("escapes one closing parenthesis", function () {
            const input = "foo}bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo`}bar");
          });

          it("escapes multiple closing parentheses", function () {
            const input = "praise}the}sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise`}the`}sun");
          });

          it("escapes a pair of parentheses", function () {
            const input = "praise{the}sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise`{the`}sun");
          });
        });

        describe("angle brackets ('<', '>')", function () {
          it("escapes a leading left-angle angle bracket", function () {
            const input = "<foobar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "`<foobar");
          });

          it("escapes a leading right-angle angle bracket", function () {
            const input = ">foobar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "`>foobar");
          });

          it("escapes a right-angle angle bracket prefixed with 1", function () {
            const input = "1>foobar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "1`>foobar");
          });

          it("escapes a right-angle angle bracket prefixed with 2", function () {
            const input = "2>foobar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "2`>foobar");
          });

          it("escapes a right-angle angle bracket prefixed with 3", function () {
            const input = "3>foobar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "3`>foobar");
          });

          it("escapes a right-angle angle bracket prefixed with 4", function () {
            const input = "4>foobar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "4`>foobar");
          });

          it("escapes a right-angle angle bracket prefixed with 5", function () {
            const input = "5>foobar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "5`>foobar");
          });

          it("escapes a right-angle angle bracket prefixed with 6", function () {
            const input = "6>foobar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "6`>foobar");
          });

          it("escapes a right-angle angle bracket prefixed with *", function () {
            const input = "*>foobar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "*`>foobar");
          });

          it("does nothing to one left-angle bracket", function () {
            const input = "foo<bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple left-angle brackets", function () {
            const input = "praise<the<sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to one right-angle bracket", function () {
            const input = "foo>bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple right-angle brackets", function () {
            const input = "praise>the>sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("left double quotation mark ('“')", function () {
          it("escapes one", function () {
            const input = "foo“bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo`“bar");
          });

          it("escapes multiple", function () {
            const input = "Praise“the“sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise`“the`“sun");
          });
        });

        describe("right double quotation mark ('”')", function () {
          it("escapes one", function () {
            const input = "foo”bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo`”bar");
          });

          it("escapes multiple", function () {
            const input = "Praise”the”sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise`”the`”sun");
          });
        });

        describe("double low-9 quotation mark ('„')", function () {
          it("escapes one", function () {
            const input = "foo„bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo`„bar");
          });

          it("escapes multiple", function () {
            const input = "Praise„the„sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise`„the`„sun");
          });
        });

        describe("left single quotation mark ('‘')", function () {
          it("escapes one", function () {
            const input = "foo‘bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo`‘bar");
          });

          it("escapes multiple", function () {
            const input = "Praise‘the‘sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise`‘the`‘sun");
          });
        });

        describe("right single quotation mark ('’')", function () {
          it("escapes one", function () {
            const input = "foo’bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo`’bar");
          });

          it("escapes multiple", function () {
            const input = "Praise’the’sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise`’the`’sun");
          });
        });

        describe("single low-9 quotation mark ('‚')", function () {
          it("escapes one", function () {
            const input = "foo‚bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo`‚bar");
          });

          it("escapes multiple", function () {
            const input = "Praise‚the‚sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise`‚the`‚sun");
          });
        });

        describe("single high-reversed-9 quotation mark ('‛')", function () {
          it("escapes one", function () {
            const input = "foo‛bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo`‛bar");
          });

          it("escapes multiple", function () {
            const input = "Praise‛the‛sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "Praise`‛the`‛sun");
          });
        });
      });
    });
  });

  describe("::getBasename", function () {
    it("is a full path", function () {
      const basename = "cmd.exe";
      const path = `C:\\Windows\\System32\\${basename}`;

      const result = getBasename(path);
      assert.strictEqual(result, basename);
    });

    it("is a relative path (parent directory)", function () {
      const basename = "powershell.exe";
      const path = `..\\Windows\\System32\\${basename}`;

      const result = getBasename(path);
      assert.strictEqual(result, basename);
    });

    it("is a relative path (current directory)", function () {
      const basename = "cmd.exe";
      const path = `.\\System32\\${basename}`;

      const result = getBasename(path);
      assert.strictEqual(result, basename);
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
