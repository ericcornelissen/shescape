/**
 * @overview Contains unit tests for `./src/unix.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";

import { binSh, binZsh, nullChar } from "./common.js";

import { escapeShellArg, getDefaultShell } from "../src/unix.js";

describe("unix.js", function () {
  describe("::escapeShellArg", function () {
    it("throws if no shell is provided", function () {
      const input = `Hello world!`;
      assert.throws(() => escapeShellArg(input));
    });

    describe("/bin/sh", function () {
      const shell = binSh;

      describe("No interpolation", function () {
        const interpolation = false;

        it("returns the input if nothing has to be escaped", function () {
          const input = `Hello world!`;
          const output = escapeShellArg(input, shell, interpolation);
          assert.strictEqual(output, input);
        });

        describe("null characters", function () {
          it("removes one null character", function () {
            const input = `foo ls${nullChar} -al bar`;
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, `foo ls -al bar`);
          });

          it("removes multiple null characters", function () {
            const input = `foo ls${nullChar} -al ${nullChar}bar`;
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, `foo ls -al bar`);
          });
        });

        describe('single quotes ("\'")', function () {
          it("escapes one single quote", function () {
            const input = `' ls -al`;
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, `'\\'' ls -al`);
          });

          it("escapes multiple single quotes", function () {
            const input = `' echo 'Hello world!'`;
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, `'\\'' echo '\\''Hello world!'\\''`);
          });
        });

        describe("double quotes ('\"')", function () {
          it("does nothing to one double quote", function () {
            const input = `" ls -al`;
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple double quotes", function () {
            const input = `" echo "Hello world!"`;
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("backticks ('`')", function () {
          it("does nothing to one backtick", function () {
            const input = "` ls -al";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple backticks", function () {
            const input = "` echo `Hello world!`";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("backslashes ('\\')", function () {
          it("does nothing to one backslash", function () {
            const input = "foo\\bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple backslashes", function () {
            const input = "praise\\the\\sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("tilde ('~')", function () {
          it("does nothing to one tilde", function () {
            const input = "~foobar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple tildes", function () {
            const input = "~foo~bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("hashtags ('#')", function () {
          it("does nothing to one hashtag", function () {
            const input = "#foobar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple hashtags", function () {
            const input = "#foo#bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("dollar signs ('$')", function () {
          it("does nothing to one dollar sign", function () {
            const input = "foo$bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple dollar signs", function () {
            const input = "praise$the$sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("semicolons (';')", function () {
          it("does nothing to one semicolon", function () {
            const input = "foo;bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple semicolons", function () {
            const input = "praise;the;sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("ampersands ('&')", function () {
          it("does nothing to one ampersand", function () {
            const input = "foo&bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple ampersands", function () {
            const input = "praise&the&sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("pipes ('|')", function () {
          it("does nothing to one pipe", function () {
            const input = "foo|bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple pipes", function () {
            const input = "praise|the|sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("asterisks ('*')", function () {
          it("does nothing to one asterisk", function () {
            const input = "foo*bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple asterisks", function () {
            const input = "praise*the*sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("question marks ('?')", function () {
          it("does nothing to one question mark", function () {
            const input = "foo?bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple question marks", function () {
            const input = "praise?the?sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("equals sign ('=')", function () {
          it("does nothing to an equals sign at the start", function () {
            const input = "=foobar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to an equals sign not at the start", function () {
            const input = "foo=bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to escapes the equals sign at the start", function () {
            const input = "=foo=bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("parentheses ('(', ')')", function () {
          it("does nothing to one opening parenthesis", function () {
            const input = "foo(bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple opening parentheses", function () {
            const input = "praise(the(sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to one closing parenthesis", function () {
            const input = "foo(bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple closing parentheses", function () {
            const input = "praise(the(sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to a pair of parentheses", function () {
            const input = "praise(the)sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("square brackets ('[', ']')", function () {
          it("does nothing to one opening square bracket", function () {
            const input = "foo[bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple opening square brackets", function () {
            const input = "praise[the[sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to one closing square bracket", function () {
            const input = "foo]bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple closing square brackets", function () {
            const input = "praise]the]sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to a pair of square brackets", function () {
            const input = "praise[the]sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("curly brackets ('{', '}')", function () {
          it("does nothing to one opening curly bracket", function () {
            const input = "foo{bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple opening curly brackets", function () {
            const input = "praise{the{sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to one closing curly bracket", function () {
            const input = "foo}bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple closing curly brackets", function () {
            const input = "praise}the}sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to a pair of curly brackets", function () {
            const input = "praise{the}sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("angle brackets ('<', '>')", function () {
          it("does nothing to one left-angle bracket", function () {
            const input = "foo<bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple left-angle brackets", function () {
            const input = "praise<the<sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to one right-angle bracket", function () {
            const input = "foo>bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple right-angle brackets", function () {
            const input = "praise>the>sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });
      });

      describe("With interpolation", function () {
        const interpolation = true;

        it("returns the input if nothing has to be escaped", function () {
          const input = `Hello world!`;
          const output = escapeShellArg(input, shell, interpolation);
          assert.strictEqual(output, input);
        });

        describe("null characters", function () {
          it("removes one null character", function () {
            const input = `foo ls${nullChar} -al bar`;
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, `foo ls -al bar`);
          });

          it("removes multiple null characters", function () {
            const input = `foo ls${nullChar} -al ${nullChar}bar`;
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, `foo ls -al bar`);
          });
        });

        describe('single quotes ("\'")', function () {
          it("escapes one single quote", function () {
            const input = `' ls -al`;
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, `\\' ls -al`);
          });

          it("escapes multiple single quotes", function () {
            const input = `' echo 'Hello world!'`;
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, `\\' echo \\'Hello world!\\'`);
          });
        });

        describe("double quotes ('\"')", function () {
          it("escapes one double quote", function () {
            const input = `" ls -al`;
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, `\\" ls -al`);
          });

          it("escapes multiple double quotes", function () {
            const input = `" echo "Hello world!"`;
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, `\\" echo \\"Hello world!\\"`);
          });
        });

        describe("backticks ('`')", function () {
          it("escapes one backtick", function () {
            const input = "` ls -al";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "\\` ls -al");
          });

          it("escapes multiple backticks", function () {
            const input = "` echo `Hello world!`";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "\\` echo \\`Hello world!\\`");
          });
        });

        describe("backslashes ('\\')", function () {
          it("escapes one backslash", function () {
            const input = "foo\\bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foo\\\\bar");
          });

          it("escapes multiple backslashes", function () {
            const input = "praise\\the\\sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\\\the\\\\sun");
          });
        });

        describe("tilde ('~')", function () {
          it("escapes a tilde at the start", function () {
            const input = "~foobar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "\\~foobar");
          });

          it("escapes a tilde after '=' at the end", function () {
            const input = "foobar=~";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foobar=\\~");
          });

          it("does nothing to a tilde in the middle", function () {
            const input = "foo~bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to a tilde after '=' in the middle", function () {
            const input = "foo=~bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("only escapes the tilde at the start", function () {
            const input = "~foo~bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "\\~foo~bar");
          });

          it("only escapes the tilde after '=' at the end", function () {
            const input = "foo~bar=~";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foo~bar=\\~");
          });
        });

        describe("hashtags ('#')", function () {
          it("escapes a hashtag at the start", function () {
            const input = "#foobar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "\\#foobar");
          });

          it("does nothing to a hashtag not at the start", function () {
            const input = "foo#bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("only escapes the hashtag at the start", function () {
            const input = "#foo#bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "\\#foo#bar");
          });
        });

        describe("dollar signs ('$')", function () {
          it("escapes one dollar sign", function () {
            const input = "foo$bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foo\\$bar");
          });

          it("escapes multiple dollar signs", function () {
            const input = "praise$the$sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\$the\\$sun");
          });
        });

        describe("semicolons (';')", function () {
          it("escapes one semicolon", function () {
            const input = "foo;bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foo\\;bar");
          });

          it("escapes multiple semicolons", function () {
            const input = "praise;the;sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\;the\\;sun");
          });
        });

        describe("ampersands ('&')", function () {
          it("escapes one ampersand", function () {
            const input = "foo&bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foo\\&bar");
          });

          it("escapes multiple ampersands", function () {
            const input = "praise&the&sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\&the\\&sun");
          });
        });

        describe("pipes ('|')", function () {
          it("escapes one pipe", function () {
            const input = "foo|bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foo\\|bar");
          });

          it("escapes multiple pipes", function () {
            const input = "praise|the|sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\|the\\|sun");
          });
        });

        describe("asterisks ('*')", function () {
          it("escapes one asterisk", function () {
            const input = "foo*bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foo\\*bar");
          });

          it("escapes multiple asterisks", function () {
            const input = "praise*the*sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\*the\\*sun");
          });
        });

        describe("question marks ('?')", function () {
          it("escapes one question mark", function () {
            const input = "foo?bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foo\\?bar");
          });

          it("escapes multiple question marks", function () {
            const input = "praise?the?sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\?the\\?sun");
          });
        });

        describe("equals sign ('=')", function () {
          it("does nothing to an equals sign at the start", function () {
            const input = "=foobar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to an equals sign not at the start", function () {
            const input = "foo=bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to escapes the equals sign at the start", function () {
            const input = "=foo=bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("parentheses ('(', ')')", function () {
          it("escapes one opening parenthesis", function () {
            const input = "foo(bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foo\\(bar");
          });

          it("escapes multiple opening parentheses", function () {
            const input = "praise(the(sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\(the\\(sun");
          });

          it("escapes one closing parenthesis", function () {
            const input = "foo)bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foo\\)bar");
          });

          it("escapes multiple closing parentheses", function () {
            const input = "praise)the)sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\)the\\)sun");
          });

          it("escapes a pair of parentheses", function () {
            const input = "praise(the)sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\(the\\)sun");
          });
        });

        describe("square brackets ('[', ']')", function () {
          it("does nothing to one opening square bracket", function () {
            const input = "foo[bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple opening square brackets", function () {
            const input = "praise[the[sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to one closing square bracket", function () {
            const input = "foo]bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple closing square brackets", function () {
            const input = "praise]the]sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to a pair of square brackets", function () {
            const input = "praise[the]sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("curly brackets ('{', '}')", function () {
          it("does nothing to one opening curly bracket", function () {
            const input = "foo{bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple opening curly brackets", function () {
            const input = "praise{the{sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to one closing curly bracket", function () {
            const input = "foo}bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple closing curly brackets", function () {
            const input = "praise}the}sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to a pair of curly brackets", function () {
            const input = "praise{the}sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("angle brackets ('<', '>')", function () {
          it("escapes one left-angle bracket", function () {
            const input = "foo<bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foo\\<bar");
          });

          it("escapes multiple left-angle brackets", function () {
            const input = "praise<the<sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\<the\\<sun");
          });

          it("escapes one right-angle bracket", function () {
            const input = "foo>bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foo\\>bar");
          });

          it("escapes multiple right-angle brackets", function () {
            const input = "praise>the>sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\>the\\>sun");
          });
        });
      });
    });

    describe("/bin/zsh", function () {
      const shell = binZsh;

      describe("No interpolation", function () {
        const interpolation = false;

        it("returns the input if nothing has to be escaped", function () {
          const input = `Hello world!`;
          const output = escapeShellArg(input, shell, interpolation);
          assert.strictEqual(output, input);
        });

        describe("null characters", function () {
          it("removes one null character", function () {
            const input = `foo ls${nullChar} -al bar`;
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, `foo ls -al bar`);
          });

          it("removes multiple null characters", function () {
            const input = `foo ls${nullChar} -al ${nullChar}bar`;
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, `foo ls -al bar`);
          });
        });

        describe('single quotes ("\'")', function () {
          it("escapes one single quote", function () {
            const input = `' ls -al`;
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, `'\\'' ls -al`);
          });

          it("escapes multiple single quotes", function () {
            const input = `' echo 'Hello world!'`;
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, `'\\'' echo '\\''Hello world!'\\''`);
          });
        });

        describe("double quotes ('\"')", function () {
          it("does nothing to one double quote", function () {
            const input = `" ls -al`;
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple double quotes", function () {
            const input = `" echo "Hello world!"`;
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("backticks ('`')", function () {
          it("does nothing to one backtick", function () {
            const input = "` ls -al";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple backticks", function () {
            const input = "` echo `Hello world!`";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("backslashes ('\\')", function () {
          it("does nothing to one backslash", function () {
            const input = "foo\\bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple backslashes", function () {
            const input = "praise\\the\\sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("tilde ('~')", function () {
          it("does nothing to one tilde", function () {
            const input = "~foobar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple tildes", function () {
            const input = "~foo~bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("hashtags ('#')", function () {
          it("does nothing to one hashtag", function () {
            const input = "#foobar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple hashtags", function () {
            const input = "#foo#bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("dollar signs ('$')", function () {
          it("does nothing to one dollar sign", function () {
            const input = "foo$bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple dollar signs", function () {
            const input = "praise$the$sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("semicolons (';')", function () {
          it("does nothing to one semicolon", function () {
            const input = "foo;bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple semicolons", function () {
            const input = "praise;the;sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("ampersands ('&')", function () {
          it("does nothing to one ampersand", function () {
            const input = "foo&bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple ampersands", function () {
            const input = "praise&the&sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("pipes ('|')", function () {
          it("does nothing to one pipe", function () {
            const input = "foo|bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple pipes", function () {
            const input = "praise|the|sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("asterisks ('*')", function () {
          it("does nothing to one asterisk", function () {
            const input = "foo*bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple asterisks", function () {
            const input = "praise*the*sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("question marks ('?')", function () {
          it("does nothing to one question mark", function () {
            const input = "foo?bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple question marks", function () {
            const input = "praise?the?sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("equals sign ('=')", function () {
          it("does nothing to an equals sign at the start", function () {
            const input = "=foobar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to an equals sign not at the start", function () {
            const input = "foo=bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to escapes the equals sign at the start", function () {
            const input = "=foo=bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("parentheses ('(', ')')", function () {
          it("does nothing to one opening parenthesis", function () {
            const input = "foo(bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple opening parentheses", function () {
            const input = "praise(the(sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to one closing parenthesis", function () {
            const input = "foo(bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple closing parentheses", function () {
            const input = "praise(the(sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to a pair of parentheses", function () {
            const input = "praise(the)sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("square brackets ('[', ']')", function () {
          it("does nothing to one opening square bracket", function () {
            const input = "foo[bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple opening square brackets", function () {
            const input = "praise[the[sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to one closing square bracket", function () {
            const input = "foo]bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple closing square brackets", function () {
            const input = "praise]the]sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to a pair of square brackets", function () {
            const input = "praise[the]sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("curly brackets ('{', '}')", function () {
          it("does nothing to one opening curly bracket", function () {
            const input = "foo{bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple opening curly brackets", function () {
            const input = "praise{the{sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to one closing curly bracket", function () {
            const input = "foo}bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple closing curly brackets", function () {
            const input = "praise}the}sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to a pair of curly brackets", function () {
            const input = "praise{the}sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("angle brackets ('<', '>')", function () {
          it("does nothing to one left-angle bracket", function () {
            const input = "foo<bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple left-angle brackets", function () {
            const input = "praise<the<sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to one right-angle bracket", function () {
            const input = "foo>bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple right-angle brackets", function () {
            const input = "praise>the>sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });
        });
      });

      describe("With interpolation", function () {
        const interpolation = true;

        it("returns the input if nothing has to be escaped", function () {
          const input = `Hello world!`;
          const output = escapeShellArg(input, shell, interpolation);
          assert.strictEqual(output, input);
        });

        describe("null characters", function () {
          it("removes one null character", function () {
            const input = `foo ls${nullChar} -al bar`;
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, `foo ls -al bar`);
          });

          it("removes multiple null characters", function () {
            const input = `foo ls${nullChar} -al ${nullChar}bar`;
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, `foo ls -al bar`);
          });
        });

        describe('single quotes ("\'")', function () {
          it("escapes one single quote", function () {
            const input = `' ls -al`;
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, `\\' ls -al`);
          });

          it("escapes multiple single quotes", function () {
            const input = `' echo 'Hello world!'`;
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, `\\' echo \\'Hello world!\\'`);
          });
        });

        describe("double quotes ('\"')", function () {
          it("escapes one double quote", function () {
            const input = `" ls -al`;
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, `\\" ls -al`);
          });

          it("escapes multiple double quotes", function () {
            const input = `" echo "Hello world!"`;
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, `\\" echo \\"Hello world!\\"`);
          });
        });

        describe("backticks ('`')", function () {
          it("escapes one backtick", function () {
            const input = "` ls -al";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "\\` ls -al");
          });

          it("escapes multiple backticks", function () {
            const input = "` echo `Hello world!`";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "\\` echo \\`Hello world!\\`");
          });
        });

        describe("backslashes ('\\')", function () {
          it("escapes one backslash", function () {
            const input = "foo\\bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foo\\\\bar");
          });

          it("escapes multiple backslashes", function () {
            const input = "praise\\the\\sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\\\the\\\\sun");
          });
        });

        describe("tilde ('~')", function () {
          it("escapes a tilde at the start", function () {
            const input = "~foobar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "\\~foobar");
          });

          it("does nothing to a tilde not at the start", function () {
            const input = "foo~bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("only escapes the tilde at the start", function () {
            const input = "~foo~bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "\\~foo~bar");
          });
        });

        describe("hashtags ('#')", function () {
          it("escapes a hashtag at the start", function () {
            const input = "#foobar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "\\#foobar");
          });

          it("does nothing to a hashtag not at the start", function () {
            const input = "foo#bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("only escapes the hashtag at the start", function () {
            const input = "#foo#bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "\\#foo#bar");
          });
        });

        describe("dollar signs ('$')", function () {
          it("escapes one dollar sign", function () {
            const input = "foo$bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foo\\$bar");
          });

          it("escapes multiple dollar signs", function () {
            const input = "praise$the$sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\$the\\$sun");
          });
        });

        describe("semicolons (';')", function () {
          it("escapes one semicolon", function () {
            const input = "foo;bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foo\\;bar");
          });

          it("escapes multiple semicolons", function () {
            const input = "praise;the;sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\;the\\;sun");
          });
        });

        describe("ampersands ('&')", function () {
          it("escapes one ampersand", function () {
            const input = "foo&bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foo\\&bar");
          });

          it("escapes multiple ampersands", function () {
            const input = "praise&the&sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\&the\\&sun");
          });
        });

        describe("pipes ('|')", function () {
          it("escapes one pipe", function () {
            const input = "foo|bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foo\\|bar");
          });

          it("escapes multiple pipes", function () {
            const input = "praise|the|sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\|the\\|sun");
          });
        });

        describe("asterisks ('*')", function () {
          it("escapes one asterisk", function () {
            const input = "foo*bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foo\\*bar");
          });

          it("escapes multiple asterisks", function () {
            const input = "praise*the*sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\*the\\*sun");
          });
        });

        describe("question marks ('?')", function () {
          it("escapes one question mark", function () {
            const input = "foo?bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foo\\?bar");
          });

          it("escapes multiple question marks", function () {
            const input = "praise?the?sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\?the\\?sun");
          });
        });

        describe("equals sign ('=')", function () {
          it("escapes an equals sign at the start", function () {
            const input = "=foobar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "\\=foobar");
          });

          it("does nothing to an equals sign not at the start", function () {
            const input = "foo=bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, input);
          });

          it("only escapes the equals sign at the start", function () {
            const input = "=foo=bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "\\=foo=bar");
          });
        });

        describe("parentheses ('(', ')')", function () {
          it("escapes one opening parenthesis", function () {
            const input = "foo(bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foo\\(bar");
          });

          it("escapes multiple opening parentheses", function () {
            const input = "praise(the(sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\(the\\(sun");
          });

          it("escapes one closing parenthesis", function () {
            const input = "foo)bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foo\\)bar");
          });

          it("escapes multiple closing parentheses", function () {
            const input = "praise)the)sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\)the\\)sun");
          });

          it("escapes a pair of parentheses", function () {
            const input = "praise(the)sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\(the\\)sun");
          });
        });

        describe("square brackets ('[', ']')", function () {
          it("escapes one opening square bracket", function () {
            const input = "foo[bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foo\\[bar");
          });

          it("escapes multiple opening square brackets", function () {
            const input = "praise[the[sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\[the\\[sun");
          });

          it("escapes one closing square bracket", function () {
            const input = "foo]bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foo\\]bar");
          });

          it("escapes multiple closing square brackets", function () {
            const input = "praise]the]sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\]the\\]sun");
          });

          it("escapes a pair of square brackets", function () {
            const input = "praise[the]sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\[the\\]sun");
          });
        });

        describe("curly brackets ('{', '}')", function () {
          it("escapes one opening curly bracket", function () {
            const input = "foo{bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foo\\{bar");
          });

          it("escapes multiple opening curly brackets", function () {
            const input = "praise{the{sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\{the\\{sun");
          });

          it("escapes one closing curly bracket", function () {
            const input = "foo}bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foo\\}bar");
          });

          it("escapes multiple closing curly brackets", function () {
            const input = "praise}the}sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\}the\\}sun");
          });

          it("escapes a pair of curly brackets", function () {
            const input = "praise{the}sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\{the\\}sun");
          });
        });

        describe("angle brackets ('<', '>')", function () {
          it("escapes one left-angle bracket", function () {
            const input = "foo<bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foo\\<bar");
          });

          it("escapes multiple left-angle brackets", function () {
            const input = "praise<the<sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\<the\\<sun");
          });

          it("escapes one right-angle bracket", function () {
            const input = "foo>bar";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "foo\\>bar");
          });

          it("escapes multiple right-angle brackets", function () {
            const input = "praise>the>sun";
            const output = escapeShellArg(input, shell, interpolation);
            assert.strictEqual(output, "praise\\>the\\>sun");
          });
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
