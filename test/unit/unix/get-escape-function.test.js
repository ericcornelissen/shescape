/**
 * @overview Contains unit tests for the `getEscapeFunction` function in
 * `./src/unix.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import test from "ava";

import { binBash, binDash } from "../../common.js";
import * as macros from "../macros.js";

import * as unix from "../../../src/unix.js";

const tests = {
  [binBash]: {
    "sample strings": [
      {
        input: "foobar",
        expected: { interpolation: "foobar", noInterpolation: "foobar" },
      },
      {
        input: "Hello world",
        expected: {
          interpolation: "Hello world",
          noInterpolation: "Hello world",
        },
      },
    ],
    "null characters (\x00)": [
      {
        input: "a\x00b",
        expected: { interpolation: "ab", noInterpolation: "ab" },
      },
      {
        input: "a\x00b\x00c",
        expected: { interpolation: "abc", noInterpolation: "abc" },
      },
    ],
    'single quotes ("\'")': [
      {
        input: "a'b",
        expected: { interpolation: "a\\'b", noInterpolation: "a'\\''b" },
      },
      {
        input: "a'b'c",
        expected: {
          interpolation: "a\\'b\\'c",
          noInterpolation: "a'\\''b'\\''c",
        },
      },
    ],
    "double quotes ('\"')": [
      {
        input: 'a"b',
        expected: { interpolation: 'a\\"b', noInterpolation: 'a"b' },
      },
      {
        input: 'a"b"c',
        expected: { interpolation: 'a\\"b\\"c', noInterpolation: 'a"b"c' },
      },
    ],
    "backticks (')": [
      {
        input: "a`b",
        expected: { interpolation: "a\\`b", noInterpolation: "a`b" },
      },
      {
        input: "a`b`c",
        expected: { interpolation: "a\\`b\\`c", noInterpolation: "a`b`c" },
      },
    ],
    "tildes ('~')": [
      {
        input: "~a",
        expected: { interpolation: "\\~a", noInterpolation: "~a" },
      },
      {
        input: "~a~b",
        expected: { interpolation: "\\~a~b", noInterpolation: "~a~b" },
      },
      {
        input: "a~b",
        expected: { interpolation: "a~b", noInterpolation: "a~b" },
      },
      {
        input: "a~b~c",
        expected: { interpolation: "a~b~c", noInterpolation: "a~b~c" },
      },
    ],
    "hashtags ('#')": [
      {
        input: "#a",
        expected: { interpolation: "\\#a", noInterpolation: "#a" },
      },
      {
        input: "#a#b",
        expected: { interpolation: "\\#a#b", noInterpolation: "#a#b" },
      },
      {
        input: "a#b",
        expected: { interpolation: "a#b", noInterpolation: "a#b" },
      },
      {
        input: "a#b#c",
        expected: { interpolation: "a#b#c", noInterpolation: "a#b#c" },
      },
    ],
    "dollar signs ('$')": [
      {
        input: "$a",
        expected: { interpolation: "\\$a", noInterpolation: "$a" },
      },
      {
        input: "$a$b",
        expected: { interpolation: "\\$a\\$b", noInterpolation: "$a$b" },
      },
      {
        input: "a$b",
        expected: { interpolation: "a\\$b", noInterpolation: "a$b" },
      },
      {
        input: "a$b$c",
        expected: { interpolation: "a\\$b\\$c", noInterpolation: "a$b$c" },
      },
    ],
    "ampersands ('&')": [
      {
        input: "&a",
        expected: { interpolation: "\\&a", noInterpolation: "&a" },
      },
      {
        input: "&a&b",
        expected: { interpolation: "\\&a\\&b", noInterpolation: "&a&b" },
      },
      {
        input: "a&b",
        expected: { interpolation: "a\\&b", noInterpolation: "a&b" },
      },
      {
        input: "a&b&c",
        expected: { interpolation: "a\\&b\\&c", noInterpolation: "a&b&c" },
      },
    ],
    "asterisks ('*')": [
      {
        input: "a*b",
        expected: { interpolation: "a\\*b", noInterpolation: "a*b" },
      },
      {
        input: "a*b*c",
        expected: { interpolation: "a\\*b\\*c", noInterpolation: "a*b*c" },
      },
    ],
    "equals ('=')": [
      {
        input: "a=b",
        expected: { interpolation: "a=b", noInterpolation: "a=b" },
      },
      {
        input: "a=b=c",
        expected: { interpolation: "a=b=c", noInterpolation: "a=b=c" },
      },
    ],
    "backslashes ('\\')": [
      {
        input: "a\\b",
        expected: { interpolation: "a\\\\b", noInterpolation: "a\\b" },
      },
      {
        input: "a\\b\\c",
        expected: { interpolation: "a\\\\b\\\\c", noInterpolation: "a\\b\\c" },
      },
    ],
    "pipes ('|')": [
      {
        input: "a|b",
        expected: { interpolation: "a\\|b", noInterpolation: "a|b" },
      },
      {
        input: "a|b|c",
        expected: { interpolation: "a\\|b\\|c", noInterpolation: "a|b|c" },
      },
    ],
    "semicolons (';')": [
      {
        input: "a;b",
        expected: { interpolation: "a\\;b", noInterpolation: "a;b" },
      },
      {
        input: "a;b;c",
        expected: { interpolation: "a\\;b\\;c", noInterpolation: "a;b;c" },
      },
    ],
    "question marks ('?')": [
      {
        input: "a?b",
        expected: { interpolation: "a\\?b", noInterpolation: "a?b" },
      },
      {
        input: "a?b?c",
        expected: { interpolation: "a\\?b\\?c", noInterpolation: "a?b?c" },
      },
    ],
    "parentheses ('(', ')')": [
      {
        input: "a(b",
        expected: { interpolation: "a\\(b", noInterpolation: "a(b" },
      },
      {
        input: "a)b",
        expected: { interpolation: "a\\)b", noInterpolation: "a)b" },
      },
      {
        input: "a(b(c",
        expected: { interpolation: "a\\(b\\(c", noInterpolation: "a(b(c" },
      },
      {
        input: "a)b)c",
        expected: { interpolation: "a\\)b\\)c", noInterpolation: "a)b)c" },
      },
      {
        input: "a(b)c",
        expected: { interpolation: "a\\(b\\)c", noInterpolation: "a(b)c" },
      },
      {
        input: "a(b,c)d",
        expected: { interpolation: "a\\(b,c\\)d", noInterpolation: "a(b,c)d" },
      },
    ],
    "square brackets ('[', ']')": [
      {
        input: "a[b",
        expected: { interpolation: "a[b", noInterpolation: "a[b" },
      },
      {
        input: "a]b",
        expected: { interpolation: "a]b", noInterpolation: "a]b" },
      },
      {
        input: "a[b[c",
        expected: { interpolation: "a[b[c", noInterpolation: "a[b[c" },
      },
      {
        input: "a]b]c",
        expected: { interpolation: "a]b]c", noInterpolation: "a]b]c" },
      },
      {
        input: "a[b]c",
        expected: { interpolation: "a[b]c", noInterpolation: "a[b]c" },
      },
      {
        input: "a[b,c]d",
        expected: { interpolation: "a[b,c]d", noInterpolation: "a[b,c]d" },
      },
    ],
    "curly brackets ('{', '}')": [
      {
        input: "a{b",
        expected: { interpolation: "a{b", noInterpolation: "a{b" },
      },
      {
        input: "a}b",
        expected: { interpolation: "a}b", noInterpolation: "a}b" },
      },
      {
        input: "a{b{c",
        expected: { interpolation: "a{b{c", noInterpolation: "a{b{c" },
      },
      {
        input: "a}b}c",
        expected: { interpolation: "a}b}c", noInterpolation: "a}b}c" },
      },
      {
        input: "a{b}c",
        expected: { interpolation: "a{b}c", noInterpolation: "a{b}c" },
      },
      {
        input: "a{b,c}d",
        expected: { interpolation: "a\\{b,c}d", noInterpolation: "a{b,c}d" },
      },
    ],
    "angle brackets ('<', '>')": [
      {
        input: "a<b",
        expected: { interpolation: "a\\<b", noInterpolation: "a<b" },
      },
      {
        input: "a>b",
        expected: { interpolation: "a\\>b", noInterpolation: "a>b" },
      },
      {
        input: "a<b<c",
        expected: { interpolation: "a\\<b\\<c", noInterpolation: "a<b<c" },
      },
      {
        input: "a>b>c",
        expected: { interpolation: "a\\>b\\>c", noInterpolation: "a>b>c" },
      },
      {
        input: "a<b>c",
        expected: { interpolation: "a\\<b\\>c", noInterpolation: "a<b>c" },
      },
    ],
  },
  [binDash]: {
    "sample strings": [
      {
        input: "foobar",
        expected: { interpolation: "foobar", noInterpolation: "foobar" },
      },
      {
        input: "Hello world",
        expected: {
          interpolation: "Hello world",
          noInterpolation: "Hello world",
        },
      },
    ],
    "null characters (\x00)": [
      {
        input: "a\x00b",
        expected: { interpolation: "ab", noInterpolation: "ab" },
      },
      {
        input: "a\x00b\x00c",
        expected: { interpolation: "abc", noInterpolation: "abc" },
      },
    ],
    'single quotes ("\'")': [
      {
        input: "a'b",
        expected: { interpolation: "a\\'b", noInterpolation: "a'\\''b" },
      },
      {
        input: "a'b'c",
        expected: {
          interpolation: "a\\'b\\'c",
          noInterpolation: "a'\\''b'\\''c",
        },
      },
    ],
    "double quotes ('\"')": [
      {
        input: 'a"b',
        expected: { interpolation: 'a\\"b', noInterpolation: 'a"b' },
      },
      {
        input: 'a"b"c',
        expected: { interpolation: 'a\\"b\\"c', noInterpolation: 'a"b"c' },
      },
    ],
    "backticks (')": [
      {
        input: "a`b",
        expected: { interpolation: "a\\`b", noInterpolation: "a`b" },
      },
      {
        input: "a`b`c",
        expected: { interpolation: "a\\`b\\`c", noInterpolation: "a`b`c" },
      },
    ],
    "tildes ('~')": [
      {
        input: "~a",
        expected: { interpolation: "\\~a", noInterpolation: "~a" },
      },
      {
        input: "~a~b",
        expected: { interpolation: "\\~a~b", noInterpolation: "~a~b" },
      },
      {
        input: "a~b",
        expected: { interpolation: "a~b", noInterpolation: "a~b" },
      },
      {
        input: "a~b~c",
        expected: { interpolation: "a~b~c", noInterpolation: "a~b~c" },
      },
    ],
    "hashtags ('#')": [
      {
        input: "#a",
        expected: { interpolation: "\\#a", noInterpolation: "#a" },
      },
      {
        input: "#a#b",
        expected: { interpolation: "\\#a#b", noInterpolation: "#a#b" },
      },
      {
        input: "a#b",
        expected: { interpolation: "a#b", noInterpolation: "a#b" },
      },
      {
        input: "a#b#c",
        expected: { interpolation: "a#b#c", noInterpolation: "a#b#c" },
      },
    ],
    "dollar signs ('$')": [
      {
        input: "$a",
        expected: { interpolation: "\\$a", noInterpolation: "$a" },
      },
      {
        input: "$a$b",
        expected: { interpolation: "\\$a\\$b", noInterpolation: "$a$b" },
      },
      {
        input: "a$b",
        expected: { interpolation: "a\\$b", noInterpolation: "a$b" },
      },
      {
        input: "a$b$c",
        expected: { interpolation: "a\\$b\\$c", noInterpolation: "a$b$c" },
      },
    ],
    "ampersands ('&')": [
      {
        input: "&a",
        expected: { interpolation: "\\&a", noInterpolation: "&a" },
      },
      {
        input: "&a&b",
        expected: { interpolation: "\\&a\\&b", noInterpolation: "&a&b" },
      },
      {
        input: "a&b",
        expected: { interpolation: "a\\&b", noInterpolation: "a&b" },
      },
      {
        input: "a&b&c",
        expected: { interpolation: "a\\&b\\&c", noInterpolation: "a&b&c" },
      },
    ],
    "asterisks ('*')": [
      {
        input: "a*b",
        expected: { interpolation: "a\\*b", noInterpolation: "a*b" },
      },
      {
        input: "a*b*c",
        expected: { interpolation: "a\\*b\\*c", noInterpolation: "a*b*c" },
      },
    ],
    "equals ('=')": [
      {
        input: "a=b",
        expected: { interpolation: "a=b", noInterpolation: "a=b" },
      },
      {
        input: "a=b=c",
        expected: { interpolation: "a=b=c", noInterpolation: "a=b=c" },
      },
    ],
    "backslashes ('\\')": [
      {
        input: "a\\b",
        expected: { interpolation: "a\\\\b", noInterpolation: "a\\b" },
      },
      {
        input: "a\\b\\c",
        expected: { interpolation: "a\\\\b\\\\c", noInterpolation: "a\\b\\c" },
      },
    ],
    "pipes ('|')": [
      {
        input: "a|b",
        expected: { interpolation: "a\\|b", noInterpolation: "a|b" },
      },
      {
        input: "a|b|c",
        expected: { interpolation: "a\\|b\\|c", noInterpolation: "a|b|c" },
      },
    ],
    "semicolons (';')": [
      {
        input: "a;b",
        expected: { interpolation: "a\\;b", noInterpolation: "a;b" },
      },
      {
        input: "a;b;c",
        expected: { interpolation: "a\\;b\\;c", noInterpolation: "a;b;c" },
      },
    ],
    "question marks ('?')": [
      {
        input: "a?b",
        expected: { interpolation: "a\\?b", noInterpolation: "a?b" },
      },
      {
        input: "a?b?c",
        expected: { interpolation: "a\\?b\\?c", noInterpolation: "a?b?c" },
      },
    ],
    "parentheses ('(', ')')": [
      {
        input: "a(b",
        expected: { interpolation: "a\\(b", noInterpolation: "a(b" },
      },
      {
        input: "a)b",
        expected: { interpolation: "a\\)b", noInterpolation: "a)b" },
      },
      {
        input: "a(b(c",
        expected: { interpolation: "a\\(b\\(c", noInterpolation: "a(b(c" },
      },
      {
        input: "a)b)c",
        expected: { interpolation: "a\\)b\\)c", noInterpolation: "a)b)c" },
      },
      {
        input: "a(b)c",
        expected: { interpolation: "a\\(b\\)c", noInterpolation: "a(b)c" },
      },
      {
        input: "a(b,c)d",
        expected: { interpolation: "a\\(b,c\\)d", noInterpolation: "a(b,c)d" },
      },
    ],
    "square brackets ('[', ']')": [
      {
        input: "a[b",
        expected: { interpolation: "a[b", noInterpolation: "a[b" },
      },
      {
        input: "a]b",
        expected: { interpolation: "a]b", noInterpolation: "a]b" },
      },
      {
        input: "a[b[c",
        expected: { interpolation: "a[b[c", noInterpolation: "a[b[c" },
      },
      {
        input: "a]b]c",
        expected: { interpolation: "a]b]c", noInterpolation: "a]b]c" },
      },
      {
        input: "a[b]c",
        expected: { interpolation: "a[b]c", noInterpolation: "a[b]c" },
      },
      {
        input: "a[b,c]d",
        expected: { interpolation: "a[b,c]d", noInterpolation: "a[b,c]d" },
      },
    ],
    "curly brackets ('{', '}')": [
      {
        input: "a{b",
        expected: { interpolation: "a{b", noInterpolation: "a{b" },
      },
      {
        input: "a}b",
        expected: { interpolation: "a}b", noInterpolation: "a}b" },
      },
      {
        input: "a{b{c",
        expected: { interpolation: "a{b{c", noInterpolation: "a{b{c" },
      },
      {
        input: "a}b}c",
        expected: { interpolation: "a}b}c", noInterpolation: "a}b}c" },
      },
      {
        input: "a{b}c",
        expected: { interpolation: "a{b}c", noInterpolation: "a{b}c" },
      },
      {
        input: "a{b,c}d",
        expected: { interpolation: "a\\{b,c}d", noInterpolation: "a{b,c}d" },
      },
    ],
    "angle brackets ('<', '>')": [
      {
        input: "a<b",
        expected: { interpolation: "a\\<b", noInterpolation: "a<b" },
      },
      {
        input: "a>b",
        expected: { interpolation: "a\\>b", noInterpolation: "a>b" },
      },
      {
        input: "a<b<c",
        expected: { interpolation: "a\\<b\\<c", noInterpolation: "a<b<c" },
      },
      {
        input: "a>b>c",
        expected: { interpolation: "a\\>b\\>c", noInterpolation: "a>b>c" },
      },
      {
        input: "a<b>c",
        expected: { interpolation: "a\\<b\\>c", noInterpolation: "a<b>c" },
      },
    ],
  },
};

Object.entries(tests).forEach(([shell, scenarios]) => {
  const escape = unix.getEscapeFunction(shell);
  const cases = Object.values(scenarios).flat();

  cases.forEach(({ input, expected }) => {
    test(macros.escape, {
      input,
      interpolation: false,
      shell,

      actual: escape(input, false),
      expected: expected.noInterpolation,
    });
  });

  cases.forEach(({ input, expected }) => {
    test(macros.escape, {
      input,
      interpolation: true,
      shell,

      actual: escape(input, true),
      expected: expected.interpolation,
    });
  });
});
