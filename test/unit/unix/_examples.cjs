/**
 * @overview Provides test examples for Unix unit test.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

const { binBash, binDash, binZsh } = require("../../common.cjs");

module.exports.escape = {
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
      {
        input: "a~b=",
        expected: { interpolation: "a~b=", noInterpolation: "a~b=" },
      },
      {
        input: "a=~",
        expected: { interpolation: "a=\\~", noInterpolation: "a=~" },
      },
      {
        input: "a~b=~",
        expected: { interpolation: "a~b=\\~", noInterpolation: "a~b=~" },
      },
      {
        input: "a=b~",
        expected: { interpolation: "a=b~", noInterpolation: "a=b~" },
      },
      {
        input: "a=~b",
        expected: { interpolation: "a=~b", noInterpolation: "a=~b" },
      },
      {
        input: "a=:~",
        expected: { interpolation: "a=:\\~", noInterpolation: "a=:~" },
      },
      {
        input: "a=b:~",
        expected: { interpolation: "a=b:\\~", noInterpolation: "a=b:~" },
      },
      {
        input: "a=~:",
        expected: { interpolation: "a=\\~:", noInterpolation: "a=~:" },
      },
      {
        input: "a=~:b",
        expected: { interpolation: "a=\\~:b", noInterpolation: "a=~:b" },
      },
      {
        input: "a=~:~",
        expected: { interpolation: "a=\\~:\\~", noInterpolation: "a=~:~" },
      },
      {
        input: "a=:~:",
        expected: { interpolation: "a=:\\~:", noInterpolation: "a=:~:" },
      },
      {
        input: "a=:~:b",
        expected: { interpolation: "a=:\\~:b", noInterpolation: "a=:~:b" },
      },
      {
        input: "a=b:~:",
        expected: { interpolation: "a=b:\\~:", noInterpolation: "a=b:~:" },
      },
      {
        input: "a=b:~:c",
        expected: { interpolation: "a=b:\\~:c", noInterpolation: "a=b:~:c" },
      },
      {
        input: "a=~=",
        expected: { interpolation: "a=\\~=", noInterpolation: "a=~=" },
      },
      {
        input: "a=~-",
        expected: { interpolation: "a=\\~-", noInterpolation: "a=~-" },
      },
      {
        input: "a=~+",
        expected: { interpolation: "a=\\~+", noInterpolation: "a=~+" },
      },
      {
        input: "a=~/",
        expected: { interpolation: "a=\\~/", noInterpolation: "a=~/" },
      },
      {
        input: "a=~0",
        expected: { interpolation: "a=\\~0", noInterpolation: "a=~0" },
      },
      {
        input: "a=~ ",
        expected: { interpolation: "a=\\~ ", noInterpolation: "a=~ " },
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
        input: "=a",
        expected: { interpolation: "=a", noInterpolation: "=a" },
      },
      {
        input: "=a=b",
        expected: { interpolation: "=a=b", noInterpolation: "=a=b" },
      },
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
      {
        input: "a{,b}c",
        expected: { interpolation: "a\\{,b}c", noInterpolation: "a{,b}c" },
      },
      {
        input: "a{b,}c",
        expected: { interpolation: "a\\{b,}c", noInterpolation: "a{b,}c" },
      },
      {
        input: "a{bc,de}f",
        expected: {
          interpolation: "a\\{bc,de}f",
          noInterpolation: "a{bc,de}f",
        },
      },
      {
        input: "a{b,{c,d},e}f",
        expected: {
          interpolation: "a\\{b,\\{c,d},e}f",
          noInterpolation: "a{b,{c,d},e}f",
        },
      },
      {
        input: "a{0..2}b",
        expected: { interpolation: "a\\{0..2}b", noInterpolation: "a{0..2}b" },
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
      {
        input: "a~b=",
        expected: { interpolation: "a~b=", noInterpolation: "a~b=" },
      },
      {
        input: "a=~",
        expected: { interpolation: "a=\\~", noInterpolation: "a=~" },
      },
      {
        input: "a~b=~",
        expected: { interpolation: "a~b=\\~", noInterpolation: "a~b=~" },
      },
      {
        input: "a=b~",
        expected: { interpolation: "a=b~", noInterpolation: "a=b~" },
      },
      {
        input: "a=~b",
        expected: { interpolation: "a=~b", noInterpolation: "a=~b" },
      },
      {
        input: "a=:~",
        expected: { interpolation: "a=:\\~", noInterpolation: "a=:~" },
      },
      {
        input: "a=b:~",
        expected: { interpolation: "a=b:\\~", noInterpolation: "a=b:~" },
      },
      {
        input: "a=~:",
        expected: { interpolation: "a=\\~:", noInterpolation: "a=~:" },
      },
      {
        input: "a=~:b",
        expected: { interpolation: "a=\\~:b", noInterpolation: "a=~:b" },
      },
      {
        input: "a=~:~",
        expected: { interpolation: "a=\\~:\\~", noInterpolation: "a=~:~" },
      },
      {
        input: "a=:~:",
        expected: { interpolation: "a=:\\~:", noInterpolation: "a=:~:" },
      },
      {
        input: "a=:~:b",
        expected: { interpolation: "a=:\\~:b", noInterpolation: "a=:~:b" },
      },
      {
        input: "a=b:~:",
        expected: { interpolation: "a=b:\\~:", noInterpolation: "a=b:~:" },
      },
      {
        input: "a=b:~:c",
        expected: { interpolation: "a=b:\\~:c", noInterpolation: "a=b:~:c" },
      },
      {
        input: "a=~=",
        expected: { interpolation: "a=\\~=", noInterpolation: "a=~=" },
      },
      {
        input: "a=~-",
        expected: { interpolation: "a=\\~-", noInterpolation: "a=~-" },
      },
      {
        input: "a=~+",
        expected: { interpolation: "a=\\~+", noInterpolation: "a=~+" },
      },
      {
        input: "a=~/",
        expected: { interpolation: "a=\\~/", noInterpolation: "a=~/" },
      },
      {
        input: "a=~0",
        expected: { interpolation: "a=\\~0", noInterpolation: "a=~0" },
      },
      {
        input: "a=~ ",
        expected: { interpolation: "a=\\~ ", noInterpolation: "a=~ " },
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
        input: "=a",
        expected: { interpolation: "=a", noInterpolation: "=a" },
      },
      {
        input: "=a=b",
        expected: { interpolation: "=a=b", noInterpolation: "=a=b" },
      },
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
      {
        input: "a{,b}c",
        expected: { interpolation: "a\\{,b}c", noInterpolation: "a{,b}c" },
      },
      {
        input: "a{b,}c",
        expected: { interpolation: "a\\{b,}c", noInterpolation: "a{b,}c" },
      },
      {
        input: "a{bc,de}f",
        expected: {
          interpolation: "a\\{bc,de}f",
          noInterpolation: "a{bc,de}f",
        },
      },
      {
        input: "a{b,{c,d},e}f",
        expected: {
          interpolation: "a\\{b,\\{c,d},e}f",
          noInterpolation: "a{b,{c,d},e}f",
        },
      },
      {
        input: "a{0..2}b",
        expected: { interpolation: "a\\{0..2}b", noInterpolation: "a{0..2}b" },
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
  [binZsh]: {
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
        input: "=a",
        expected: { interpolation: "\\=a", noInterpolation: "=a" },
      },
      {
        input: "=a=b",
        expected: { interpolation: "\\=a=b", noInterpolation: "=a=b" },
      },
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
        expected: { interpolation: "a\\[b", noInterpolation: "a[b" },
      },
      {
        input: "a]b",
        expected: { interpolation: "a\\]b", noInterpolation: "a]b" },
      },
      {
        input: "a[b[c",
        expected: { interpolation: "a\\[b\\[c", noInterpolation: "a[b[c" },
      },
      {
        input: "a]b]c",
        expected: { interpolation: "a\\]b\\]c", noInterpolation: "a]b]c" },
      },
      {
        input: "a[b]c",
        expected: { interpolation: "a\\[b\\]c", noInterpolation: "a[b]c" },
      },
      {
        input: "a[b,c]d",
        expected: { interpolation: "a\\[b,c\\]d", noInterpolation: "a[b,c]d" },
      },
    ],
    "curly brackets ('{', '}')": [
      {
        input: "a{b",
        expected: { interpolation: "a\\{b", noInterpolation: "a{b" },
      },
      {
        input: "a}b",
        expected: { interpolation: "a\\}b", noInterpolation: "a}b" },
      },
      {
        input: "a{b{c",
        expected: { interpolation: "a\\{b\\{c", noInterpolation: "a{b{c" },
      },
      {
        input: "a}b}c",
        expected: { interpolation: "a\\}b\\}c", noInterpolation: "a}b}c" },
      },
      {
        input: "a{b}c",
        expected: { interpolation: "a\\{b\\}c", noInterpolation: "a{b}c" },
      },
      {
        input: "a{b,c}d",
        expected: { interpolation: "a\\{b,c\\}d", noInterpolation: "a{b,c}d" },
      },
      {
        input: "a{b,{c,d},e}f",
        expected: {
          interpolation: "a\\{b,\\{c,d\\},e\\}f",
          noInterpolation: "a{b,{c,d},e}f",
        },
      },
      {
        input: "a{0..2}b",
        expected: {
          interpolation: "a\\{0..2\\}b",
          noInterpolation: "a{0..2}b",
        },
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
