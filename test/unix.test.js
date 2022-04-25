/**
 * @overview Contains unit tests for `./src/unix.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "node:assert";

import sinon from "sinon";

import { binBash, binDash, binZsh, nullChar } from "./common.js";

import * as unix from "../src/unix.js";

describe("unix.js", function () {
  describe("::getDefaultShell", function () {
    it("returns '/bin/sh'", function () {
      const result = unix.getDefaultShell();
      assert.equal(result, "/bin/sh");
    });
  });

  describe("::getEscapeFunction", function () {
    it("returns `null` for unsupported shells", function () {
      const result = unix.getEscapeFunction("foobar");
      assert.strictEqual(result, null);
    });

    for (const shellName of [binBash, binDash]) {
      describe(shellName, function () {
        const escapeShellArg = unix.getEscapeFunction(shellName);

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

          describe('single quotes ("\'")', function () {
            it("escapes one single quote", function () {
              const input = `' ls -al`;
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, `'\\'' ls -al`);
            });

            it("escapes multiple single quotes", function () {
              const input = `' echo 'Hello world!'`;
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, `'\\'' echo '\\''Hello world!'\\''`);
            });
          });

          describe("double quotes ('\"')", function () {
            it("does nothing to one double quote", function () {
              const input = `" ls -al`;
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, input);
            });

            it("does nothing to multiple double quotes", function () {
              const input = `" echo "Hello world!"`;
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, input);
            });
          });

          describe("backticks ('`')", function () {
            it("does nothing to one backtick", function () {
              const input = "` ls -al";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, input);
            });

            it("does nothing to multiple backticks", function () {
              const input = "` echo `Hello world!`";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, input);
            });
          });

          describe("backslashes ('\\')", function () {
            it("does nothing to one backslash", function () {
              const input = "foo\\bar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, input);
            });

            it("does nothing to multiple backslashes", function () {
              const input = "praise\\the\\sun";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, input);
            });
          });

          describe("tilde ('~')", function () {
            it("does nothing to one tilde", function () {
              const input = "~foobar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, input);
            });

            it("does nothing to multiple tildes", function () {
              const input = "~foo~bar";
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

          describe("dollar signs ('$')", function () {
            it("does nothing to one dollar sign", function () {
              const input = "foo$bar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, input);
            });

            it("does nothing to multiple dollar signs", function () {
              const input = "praise$the$sun";
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

          describe("asterisks ('*')", function () {
            it("does nothing to one asterisk", function () {
              const input = "foo*bar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, input);
            });

            it("does nothing to multiple asterisks", function () {
              const input = "praise*the*sun";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, input);
            });
          });

          describe("question marks ('?')", function () {
            it("does nothing to one question mark", function () {
              const input = "foo?bar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, input);
            });

            it("does nothing to multiple question marks", function () {
              const input = "praise?the?sun";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, input);
            });
          });

          describe("equals sign ('=')", function () {
            it("does nothing to an equals sign at the start", function () {
              const input = "=foobar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, input);
            });

            it("does nothing to an equals sign not at the start", function () {
              const input = "foo=bar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, input);
            });

            it("does nothing to escapes the equals sign at the start", function () {
              const input = "=foo=bar";
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

          describe('single quotes ("\'")', function () {
            it("escapes one single quote", function () {
              const input = `' ls -al`;
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, `\\' ls -al`);
            });

            it("escapes multiple single quotes", function () {
              const input = `' echo 'Hello world!'`;
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, `\\' echo \\'Hello world!\\'`);
            });
          });

          describe("double quotes ('\"')", function () {
            it("escapes one double quote", function () {
              const input = `" ls -al`;
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, `\\" ls -al`);
            });

            it("escapes multiple double quotes", function () {
              const input = `" echo "Hello world!"`;
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, `\\" echo \\"Hello world!\\"`);
            });
          });

          describe("backticks ('`')", function () {
            it("escapes one backtick", function () {
              const input = "` ls -al";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "\\` ls -al");
            });

            it("escapes multiple backticks", function () {
              const input = "` echo `Hello world!`";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "\\` echo \\`Hello world!\\`");
            });
          });

          describe("backslashes ('\\')", function () {
            it("escapes one backslash", function () {
              const input = "foo\\bar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "foo\\\\bar");
            });

            it("escapes multiple backslashes", function () {
              const input = "praise\\the\\sun";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "praise\\\\the\\\\sun");
            });
          });

          describe("tilde ('~')", function () {
            it("escapes a tilde at the start", function () {
              const input = "~foobar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "\\~foobar");
            });

            it("does nothing to a tilde in the middle", function () {
              const input = "foo~bar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, input);
            });

            it("only escapes the tilde at the start", function () {
              const input = "~foo~bar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "\\~foo~bar");
            });

            describe("combined with equals ('=')", function () {
              it("escapes a tilde right after '=' at the end", function () {
                const input = "foobar=~";
                const output = escapeShellArg(input, interpolation);
                assert.strictEqual(output, "foobar=\\~");
              });

              it("escapes a tilde after '=' with a colon in between", function () {
                const input = "foobar=:~";
                const output = escapeShellArg(input, interpolation);
                assert.strictEqual(output, "foobar=:\\~");
              });

              it("escapes a tilde after '=' with a colon and text in between", function () {
                const input = "foo=bar:~";
                const output = escapeShellArg(input, interpolation);
                assert.strictEqual(output, "foo=bar:\\~");
              });

              it("escapes a tilde right after '=' with a trailing colon", function () {
                const input = "foobar=~:";
                const output = escapeShellArg(input, interpolation);
                assert.strictEqual(output, "foobar=\\~:");
              });

              it("escapes a tilde right after '=' with a trailing equals", function () {
                const input = "foobar=~=";
                const output = escapeShellArg(input, interpolation);
                assert.strictEqual(output, "foobar=\\~=");
              });

              it("escapes a tilde right after '=' with a trailing plus", function () {
                const input = "foobar=~-";
                const output = escapeShellArg(input, interpolation);
                assert.strictEqual(output, "foobar=\\~-");
              });

              it("escapes a tilde right after '=' with a trailing plus", function () {
                const input = "foobar=~+";
                const output = escapeShellArg(input, interpolation);
                assert.strictEqual(output, "foobar=\\~+");
              });

              it("escapes a tilde right after '=' with a trailing forward slash", function () {
                const input = "foobar=~/";
                const output = escapeShellArg(input, interpolation);
                assert.strictEqual(output, "foobar=\\~/");
              });

              it("escapes a tilde right after '=' with a trailing zero", function () {
                const input = "foobar=~0";
                const output = escapeShellArg(input, interpolation);
                assert.strictEqual(output, "foobar=\\~0");
              });

              it("escapes a tilde right after '=' with a trailing whitespace", function () {
                const input = "foobar=~ ";
                const output = escapeShellArg(input, interpolation);
                assert.strictEqual(output, "foobar=\\~ ");
              });

              it("escapes a tilde right after '=' with a trailing colon and text", function () {
                const input = "foo=~:bar";
                const output = escapeShellArg(input, interpolation);
                assert.strictEqual(output, "foo=\\~:bar");
              });

              it("escapes a tilde right after '=' with a trailing colon and text", function () {
                const input = "foo=~:bar";
                const output = escapeShellArg(input, interpolation);
                assert.strictEqual(output, "foo=\\~:bar");
              });

              it("escapes a tilde after '=' sandwiched between colons", function () {
                const input = "foobar=:~:";
                const output = escapeShellArg(input, interpolation);
                assert.strictEqual(output, "foobar=:\\~:");
              });

              it("escapes a tilde after '=' sandwiched between colons and text before", function () {
                const input = "foo=bar:~:";
                const output = escapeShellArg(input, interpolation);
                assert.strictEqual(output, "foo=bar:\\~:");
              });

              it("escapes a tilde after '=' sandwiched between colons and text after", function () {
                const input = "foo=:~:bar";
                const output = escapeShellArg(input, interpolation);
                assert.strictEqual(output, "foo=:\\~:bar");
              });

              it("escapes a tilde after '=' sandwiched between colons and text", function () {
                const input = "praise=the:~:sun";
                const output = escapeShellArg(input, interpolation);
                assert.strictEqual(output, "praise=the:\\~:sun");
              });

              it("escapes multiple tildes after '=' separated by colons", function () {
                const input = "foobar=~:~";
                const output = escapeShellArg(input, interpolation);
                assert.strictEqual(output, "foobar=\\~:\\~");
              });

              it("does nothing to a tilde with trailing text after '='", function () {
                const input = "foo=~bar";
                const output = escapeShellArg(input, interpolation);
                assert.strictEqual(output, input);
              });

              it("does nothing to a tilde with leading text after '='", function () {
                const input = "foo=bar~";
                const output = escapeShellArg(input, interpolation);
                assert.strictEqual(output, input);
              });

              it("does nothing to a tilde before '='", function () {
                const input = "foo~bar=";
                const output = escapeShellArg(input, interpolation);
                assert.strictEqual(output, "foo~bar=");
              });

              it("only escapes a tilde after the '='", function () {
                const input = "foo~bar=~";
                const output = escapeShellArg(input, interpolation);
                assert.strictEqual(output, "foo~bar=\\~");
              });
            });
          });

          describe("hashtags ('#')", function () {
            it("escapes a hashtag at the start", function () {
              const input = "#foobar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "\\#foobar");
            });

            it("does nothing to a hashtag not at the start", function () {
              const input = "foo#bar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, input);
            });

            it("only escapes the hashtag at the start", function () {
              const input = "#foo#bar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "\\#foo#bar");
            });
          });

          describe("dollar signs ('$')", function () {
            it("escapes one dollar sign", function () {
              const input = "foo$bar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "foo\\$bar");
            });

            it("escapes multiple dollar signs", function () {
              const input = "praise$the$sun";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "praise\\$the\\$sun");
            });
          });

          describe("semicolons (';')", function () {
            it("escapes one semicolon", function () {
              const input = "foo;bar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "foo\\;bar");
            });

            it("escapes multiple semicolons", function () {
              const input = "praise;the;sun";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "praise\\;the\\;sun");
            });
          });

          describe("ampersands ('&')", function () {
            it("escapes one ampersand", function () {
              const input = "foo&bar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "foo\\&bar");
            });

            it("escapes multiple ampersands", function () {
              const input = "praise&the&sun";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "praise\\&the\\&sun");
            });
          });

          describe("pipes ('|')", function () {
            it("escapes one pipe", function () {
              const input = "foo|bar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "foo\\|bar");
            });

            it("escapes multiple pipes", function () {
              const input = "praise|the|sun";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "praise\\|the\\|sun");
            });
          });

          describe("asterisks ('*')", function () {
            it("escapes one asterisk", function () {
              const input = "foo*bar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "foo\\*bar");
            });

            it("escapes multiple asterisks", function () {
              const input = "praise*the*sun";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "praise\\*the\\*sun");
            });
          });

          describe("question marks ('?')", function () {
            it("escapes one question mark", function () {
              const input = "foo?bar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "foo\\?bar");
            });

            it("escapes multiple question marks", function () {
              const input = "praise?the?sun";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "praise\\?the\\?sun");
            });
          });

          describe("equals sign ('=')", function () {
            it("does nothing to an equals sign at the start", function () {
              const input = "=foobar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, input);
            });

            it("does nothing to an equals sign not at the start", function () {
              const input = "foo=bar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, input);
            });

            it("does nothing to escapes the equals sign at the start", function () {
              const input = "=foo=bar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, input);
            });
          });

          describe("parentheses ('(', ')')", function () {
            it("escapes one opening parenthesis", function () {
              const input = "foo(bar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "foo\\(bar");
            });

            it("escapes multiple opening parentheses", function () {
              const input = "praise(the(sun";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "praise\\(the\\(sun");
            });

            it("escapes one closing parenthesis", function () {
              const input = "foo)bar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "foo\\)bar");
            });

            it("escapes multiple closing parentheses", function () {
              const input = "praise)the)sun";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "praise\\)the\\)sun");
            });

            it("escapes a pair of parentheses", function () {
              const input = "praise(the)sun";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "praise\\(the\\)sun");
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

            it("does nothing to a pair of curly brackets with text", function () {
              const input = "praise{the}sun";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, input);
            });

            it("escapes a pair of curly brackets with a period", function () {
              const input = "foo{0..2}bar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "foo\\{0..2}bar");
            });

            it("escapes a pair of curly brackets with a comma", function () {
              const input = "foo{bar,baz}";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "foo\\{bar,baz}");
            });

            it("escapes a pair of nested curly brackets", function () {
              const input = "foo{a,b{c,d},e}bar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "foo\\{a,b\\{c,d},e}bar");
            });
          });

          describe("angle brackets ('<', '>')", function () {
            it("escapes one left-angle bracket", function () {
              const input = "foo<bar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "foo\\<bar");
            });

            it("escapes multiple left-angle brackets", function () {
              const input = "praise<the<sun";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "praise\\<the\\<sun");
            });

            it("escapes one right-angle bracket", function () {
              const input = "foo>bar";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "foo\\>bar");
            });

            it("escapes multiple right-angle brackets", function () {
              const input = "praise>the>sun";
              const output = escapeShellArg(input, interpolation);
              assert.strictEqual(output, "praise\\>the\\>sun");
            });
          });
        });
      });
    }

    describe(binZsh, function () {
      const escapeShellArg = unix.getEscapeFunction(binZsh);

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

        describe('single quotes ("\'")', function () {
          it("escapes one single quote", function () {
            const input = `' ls -al`;
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, `'\\'' ls -al`);
          });

          it("escapes multiple single quotes", function () {
            const input = `' echo 'Hello world!'`;
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, `'\\'' echo '\\''Hello world!'\\''`);
          });
        });

        describe("double quotes ('\"')", function () {
          it("does nothing to one double quote", function () {
            const input = `" ls -al`;
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple double quotes", function () {
            const input = `" echo "Hello world!"`;
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("backticks ('`')", function () {
          it("does nothing to one backtick", function () {
            const input = "` ls -al";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple backticks", function () {
            const input = "` echo `Hello world!`";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("backslashes ('\\')", function () {
          it("does nothing to one backslash", function () {
            const input = "foo\\bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple backslashes", function () {
            const input = "praise\\the\\sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("tilde ('~')", function () {
          it("does nothing to one tilde", function () {
            const input = "~foobar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple tildes", function () {
            const input = "~foo~bar";
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

        describe("dollar signs ('$')", function () {
          it("does nothing to one dollar sign", function () {
            const input = "foo$bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple dollar signs", function () {
            const input = "praise$the$sun";
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

        describe("asterisks ('*')", function () {
          it("does nothing to one asterisk", function () {
            const input = "foo*bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple asterisks", function () {
            const input = "praise*the*sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("question marks ('?')", function () {
          it("does nothing to one question mark", function () {
            const input = "foo?bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to multiple question marks", function () {
            const input = "praise?the?sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });
        });

        describe("equals sign ('=')", function () {
          it("does nothing to an equals sign at the start", function () {
            const input = "=foobar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to an equals sign not at the start", function () {
            const input = "foo=bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("does nothing to escapes the equals sign at the start", function () {
            const input = "=foo=bar";
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

        describe('single quotes ("\'")', function () {
          it("escapes one single quote", function () {
            const input = `' ls -al`;
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, `\\' ls -al`);
          });

          it("escapes multiple single quotes", function () {
            const input = `' echo 'Hello world!'`;
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, `\\' echo \\'Hello world!\\'`);
          });
        });

        describe("double quotes ('\"')", function () {
          it("escapes one double quote", function () {
            const input = `" ls -al`;
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, `\\" ls -al`);
          });

          it("escapes multiple double quotes", function () {
            const input = `" echo "Hello world!"`;
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, `\\" echo \\"Hello world!\\"`);
          });
        });

        describe("backticks ('`')", function () {
          it("escapes one backtick", function () {
            const input = "` ls -al";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "\\` ls -al");
          });

          it("escapes multiple backticks", function () {
            const input = "` echo `Hello world!`";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "\\` echo \\`Hello world!\\`");
          });
        });

        describe("backslashes ('\\')", function () {
          it("escapes one backslash", function () {
            const input = "foo\\bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo\\\\bar");
          });

          it("escapes multiple backslashes", function () {
            const input = "praise\\the\\sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise\\\\the\\\\sun");
          });
        });

        describe("tilde ('~')", function () {
          it("escapes a tilde at the start", function () {
            const input = "~foobar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "\\~foobar");
          });

          it("does nothing to a tilde not at the start", function () {
            const input = "foo~bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("only escapes the tilde at the start", function () {
            const input = "~foo~bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "\\~foo~bar");
          });
        });

        describe("hashtags ('#')", function () {
          it("escapes a hashtag at the start", function () {
            const input = "#foobar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "\\#foobar");
          });

          it("does nothing to a hashtag not at the start", function () {
            const input = "foo#bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("only escapes the hashtag at the start", function () {
            const input = "#foo#bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "\\#foo#bar");
          });
        });

        describe("dollar signs ('$')", function () {
          it("escapes one dollar sign", function () {
            const input = "foo$bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo\\$bar");
          });

          it("escapes multiple dollar signs", function () {
            const input = "praise$the$sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise\\$the\\$sun");
          });
        });

        describe("semicolons (';')", function () {
          it("escapes one semicolon", function () {
            const input = "foo;bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo\\;bar");
          });

          it("escapes multiple semicolons", function () {
            const input = "praise;the;sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise\\;the\\;sun");
          });
        });

        describe("ampersands ('&')", function () {
          it("escapes one ampersand", function () {
            const input = "foo&bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo\\&bar");
          });

          it("escapes multiple ampersands", function () {
            const input = "praise&the&sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise\\&the\\&sun");
          });
        });

        describe("pipes ('|')", function () {
          it("escapes one pipe", function () {
            const input = "foo|bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo\\|bar");
          });

          it("escapes multiple pipes", function () {
            const input = "praise|the|sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise\\|the\\|sun");
          });
        });

        describe("asterisks ('*')", function () {
          it("escapes one asterisk", function () {
            const input = "foo*bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo\\*bar");
          });

          it("escapes multiple asterisks", function () {
            const input = "praise*the*sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise\\*the\\*sun");
          });
        });

        describe("question marks ('?')", function () {
          it("escapes one question mark", function () {
            const input = "foo?bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo\\?bar");
          });

          it("escapes multiple question marks", function () {
            const input = "praise?the?sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise\\?the\\?sun");
          });
        });

        describe("equals sign ('=')", function () {
          it("escapes an equals sign at the start", function () {
            const input = "=foobar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "\\=foobar");
          });

          it("does nothing to an equals sign not at the start", function () {
            const input = "foo=bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, input);
          });

          it("only escapes the equals sign at the start", function () {
            const input = "=foo=bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "\\=foo=bar");
          });
        });

        describe("parentheses ('(', ')')", function () {
          it("escapes one opening parenthesis", function () {
            const input = "foo(bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo\\(bar");
          });

          it("escapes multiple opening parentheses", function () {
            const input = "praise(the(sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise\\(the\\(sun");
          });

          it("escapes one closing parenthesis", function () {
            const input = "foo)bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo\\)bar");
          });

          it("escapes multiple closing parentheses", function () {
            const input = "praise)the)sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise\\)the\\)sun");
          });

          it("escapes a pair of parentheses", function () {
            const input = "praise(the)sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise\\(the\\)sun");
          });
        });

        describe("square brackets ('[', ']')", function () {
          it("escapes one opening square bracket", function () {
            const input = "foo[bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo\\[bar");
          });

          it("escapes multiple opening square brackets", function () {
            const input = "praise[the[sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise\\[the\\[sun");
          });

          it("escapes one closing square bracket", function () {
            const input = "foo]bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo\\]bar");
          });

          it("escapes multiple closing square brackets", function () {
            const input = "praise]the]sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise\\]the\\]sun");
          });

          it("escapes a pair of square brackets", function () {
            const input = "praise[the]sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise\\[the\\]sun");
          });
        });

        describe("curly brackets ('{', '}')", function () {
          it("escapes one opening curly bracket", function () {
            const input = "foo{bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo\\{bar");
          });

          it("escapes multiple opening curly brackets", function () {
            const input = "praise{the{sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise\\{the\\{sun");
          });

          it("escapes one closing curly bracket", function () {
            const input = "foo}bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo\\}bar");
          });

          it("escapes multiple closing curly brackets", function () {
            const input = "praise}the}sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise\\}the\\}sun");
          });

          it("escapes a pair of curly brackets", function () {
            const input = "praise{the}sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise\\{the\\}sun");
          });
        });

        describe("angle brackets ('<', '>')", function () {
          it("escapes one left-angle bracket", function () {
            const input = "foo<bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo\\<bar");
          });

          it("escapes multiple left-angle brackets", function () {
            const input = "praise<the<sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise\\<the\\<sun");
          });

          it("escapes one right-angle bracket", function () {
            const input = "foo>bar";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "foo\\>bar");
          });

          it("escapes multiple right-angle brackets", function () {
            const input = "praise>the>sun";
            const output = escapeShellArg(input, interpolation);
            assert.strictEqual(output, "praise\\>the\\>sun");
          });
        });
      });
    });
  });

  describe("::getQuoteFunction", function () {
    it("returns `null` for unsupported shells", function () {
      const result = unix.getQuoteFunction("foobar");
      assert.strictEqual(result, null);
    });

    for (const shellName of [binBash, binDash, binZsh]) {
      const quoteShellArg = unix.getQuoteFunction(shellName);

      describe(shellName, function () {
        it("puts single quotes around the provided value", function () {
          const input = "foobar";
          const result = quoteShellArg(input);
          assert.strictEqual(result, `'${input}'`);
        });
      });
    }
  });

  describe("::getShellName", function () {
    let resolveExecutable;

    before(function () {
      resolveExecutable = sinon.stub();
    });

    beforeEach(function () {
      sinon.reset();

      resolveExecutable.returns("foobar");
    });

    it("resolves the provided shell", function () {
      for (const shell of [binBash, binDash, binZsh]) {
        unix.getShellName({ shell }, { resolveExecutable });
        assert.ok(
          resolveExecutable.calledWithExactly(
            { executable: shell },
            sinon.match.any
          )
        );
      }
    });

    for (const shell of [binBash, binDash, binZsh]) {
      it(`returns ${shell} when the provided shell resolves to that`, function () {
        resolveExecutable.returns(`/bin/${shell}`);

        const result = unix.getShellName({ shell }, { resolveExecutable });
        assert.equal(result, shell);
      });
    }

    it("falls back to 'bash' if the shell is not supported", function () {
      const shell = "asdf";

      resolveExecutable.returns(`/bin/${shell}`);

      const result = unix.getShellName({ shell }, { resolveExecutable });
      assert.equal(result, "bash");
    });

    it("calls resolveExecutable with the appropriate helpers", function () {
      const shell = "sh";

      unix.getShellName({ shell }, { resolveExecutable });
      assert.ok(
        resolveExecutable.calledWithExactly(sinon.match.any, {
          exists: sinon.match.func,
          readlink: sinon.match.func,
          which: sinon.match.func,
        })
      );
    });
  });
});
