/**
 * @overview Provides test examples for Windows unit test.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

const { binCmd, binPowerShell } = require("../../common.cjs");

module.exports.escape = {
  [binCmd]: {
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
        expected: { interpolation: "a'b", noInterpolation: "a'b" },
      },
      {
        input: "a'b'c",
        expected: {
          interpolation: "a'b'c",
          noInterpolation: "a'b'c",
        },
      },
    ],
    "double quotes ('\"')": [
      {
        input: 'a"b',
        expected: { interpolation: 'a^"b', noInterpolation: 'a""b' },
      },
      {
        input: 'a"b"c',
        expected: { interpolation: 'a^"b^"c', noInterpolation: 'a""b""c' },
      },
    ],
    "backticks ('`')": [
      {
        input: "a`b",
        expected: { interpolation: "a`b", noInterpolation: "a`b" },
      },
      {
        input: "a`b`c",
        expected: { interpolation: "a`b`c", noInterpolation: "a`b`c" },
      },
    ],
    "at signs ('@')": [
      {
        input: "@a",
        expected: { interpolation: "@a", noInterpolation: "@a" },
      },
      {
        input: "@a@b",
        expected: { interpolation: "@a@b", noInterpolation: "@a@b" },
      },
      {
        input: "a@b",
        expected: { interpolation: "a@b", noInterpolation: "a@b" },
      },
      {
        input: "a@b@c",
        expected: { interpolation: "a@b@c", noInterpolation: "a@b@c" },
      },
    ],
    "hashtags ('#')": [
      {
        input: "#a",
        expected: { interpolation: "#a", noInterpolation: "#a" },
      },
      {
        input: "#a#b",
        expected: { interpolation: "#a#b", noInterpolation: "#a#b" },
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
    "carets ('^')": [
      {
        input: "a^b",
        expected: { interpolation: "a^^b", noInterpolation: "a^b" },
      },
      {
        input: "a^b^c",
        expected: { interpolation: "a^^b^^c", noInterpolation: "a^b^c" },
      },
    ],
    "dollar signs ('$')": [
      {
        input: "a$b",
        expected: { interpolation: "a$b", noInterpolation: "a$b" },
      },
      {
        input: "a$b$c",
        expected: { interpolation: "a$b$c", noInterpolation: "a$b$c" },
      },
    ],
    "ampersands ('&')": [
      {
        input: "a&b",
        expected: { interpolation: "a^&b", noInterpolation: "a&b" },
      },
      {
        input: "a&b&c",
        expected: { interpolation: "a^&b^&c", noInterpolation: "a&b&c" },
      },
    ],
    "hyphens ('-')": [
      {
        input: "-a",
        expected: { interpolation: "-a", noInterpolation: "-a" },
      },
      {
        input: "-a-b",
        expected: { interpolation: "-a-b", noInterpolation: "-a-b" },
      },
      {
        input: "a-b",
        expected: { interpolation: "a-b", noInterpolation: "a-b" },
      },
      {
        input: "a-b-c",
        expected: { interpolation: "a-b-c", noInterpolation: "a-b-c" },
      },
    ],
    "colons (':')": [
      {
        input: "a:b",
        expected: { interpolation: "a:b", noInterpolation: "a:b" },
      },
      {
        input: "a:b:c",
        expected: { interpolation: "a:b:c", noInterpolation: "a:b:c" },
      },
    ],
    "semicolons (';')": [
      {
        input: "a;b",
        expected: { interpolation: "a;b", noInterpolation: "a;b" },
      },
      {
        input: "a;b;c",
        expected: { interpolation: "a;b;c", noInterpolation: "a;b;c" },
      },
    ],
    "pipes ('|')": [
      {
        input: "a|b",
        expected: { interpolation: "a^|b", noInterpolation: "a|b" },
      },
      {
        input: "a|b|c",
        expected: { interpolation: "a^|b^|c", noInterpolation: "a|b|c" },
      },
    ],
    "comma (',')": [
      {
        input: "a,b",
        expected: { interpolation: "a,b", noInterpolation: "a,b" },
      },
      {
        input: "a,b,c",
        expected: { interpolation: "a,b,c", noInterpolation: "a,b,c" },
      },
    ],
    "parentheses ('(', ')')": [
      {
        input: "a(b",
        expected: { interpolation: "a(b", noInterpolation: "a(b" },
      },
      {
        input: "a)b",
        expected: { interpolation: "a)b", noInterpolation: "a)b" },
      },
      {
        input: "a(b(c",
        expected: { interpolation: "a(b(c", noInterpolation: "a(b(c" },
      },
      {
        input: "a)b)c",
        expected: { interpolation: "a)b)c", noInterpolation: "a)b)c" },
      },
      {
        input: "a(b)c",
        expected: { interpolation: "a(b)c", noInterpolation: "a(b)c" },
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
    ],
    "angle brackets ('<', '>')": [
      {
        input: "a<b",
        expected: { interpolation: "a^<b", noInterpolation: "a<b" },
      },
      {
        input: "a>b",
        expected: { interpolation: "a^>b", noInterpolation: "a>b" },
      },
      {
        input: "a<b<c",
        expected: { interpolation: "a^<b^<c", noInterpolation: "a<b<c" },
      },
      {
        input: "a>b>c",
        expected: { interpolation: "a^>b^>c", noInterpolation: "a>b>c" },
      },
      {
        input: "a<b>c",
        expected: { interpolation: "a^<b^>c", noInterpolation: "a<b>c" },
      },
    ],
    "left double quotation mark ('“')": [
      {
        input: "a“b",
        expected: { interpolation: "a“b", noInterpolation: "a“b" },
      },
      {
        input: "a“b“c",
        expected: {
          interpolation: "a“b“c",
          noInterpolation: "a“b“c",
        },
      },
    ],
    "right double quotation mark ('”')": [
      {
        input: "a”b",
        expected: { interpolation: "a”b", noInterpolation: "a”b" },
      },
      {
        input: "a”b”c",
        expected: {
          interpolation: "a”b”c",
          noInterpolation: "a”b”c",
        },
      },
    ],
    "double low-9 quotation mark ('„')": [
      {
        input: "a„b",
        expected: { interpolation: "a„b", noInterpolation: "a„b" },
      },
      {
        input: "a„b„c",
        expected: {
          interpolation: "a„b„c",
          noInterpolation: "a„b„c",
        },
      },
    ],
    "left single quotation mark ('‘')": [
      {
        input: "a‘b",
        expected: { interpolation: "a‘b", noInterpolation: "a‘b" },
      },
      {
        input: "a‘b‘c",
        expected: {
          interpolation: "a‘b‘c",
          noInterpolation: "a‘b‘c",
        },
      },
    ],
    "right single quotation mark ('’')": [
      {
        input: "a’b",
        expected: { interpolation: "a’b", noInterpolation: "a’b" },
      },
      {
        input: "a’b’c",
        expected: {
          interpolation: "a’b’c",
          noInterpolation: "a’b’c",
        },
      },
    ],
    "single low-9 quotation mark ('‚')": [
      {
        input: "a‚b",
        expected: { interpolation: "a‚b", noInterpolation: "a‚b" },
      },
      {
        input: "a‚b‚c",
        expected: {
          interpolation: "a‚b‚c",
          noInterpolation: "a‚b‚c",
        },
      },
    ],
    "single high-reversed-9 quotation mark ('‛')": [
      {
        input: "a‛b",
        expected: { interpolation: "a‛b", noInterpolation: "a‛b" },
      },
      {
        input: "a‛b‛c",
        expected: {
          interpolation: "a‛b‛c",
          noInterpolation: "a‛b‛c",
        },
      },
    ],
  },
  [binPowerShell]: {
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
        expected: { interpolation: "a`'b", noInterpolation: "a'b" },
      },
      {
        input: "a'b'c",
        expected: {
          interpolation: "a`'b`'c",
          noInterpolation: "a'b'c",
        },
      },
    ],
    "double quotes ('\"')": [
      {
        input: 'a"b',
        expected: { interpolation: 'a`"b', noInterpolation: 'a""b' },
      },
      {
        input: 'a"b"c',
        expected: { interpolation: 'a`"b`"c', noInterpolation: 'a""b""c' },
      },
    ],
    "backticks ('`')": [
      {
        input: "a`b",
        expected: { interpolation: "a``b", noInterpolation: "a``b" },
      },
      {
        input: "a`b`c",
        expected: { interpolation: "a``b``c", noInterpolation: "a``b``c" },
      },
    ],
    "at signs ('@')": [
      {
        input: "@a",
        expected: { interpolation: "`@a", noInterpolation: "@a" },
      },
      {
        input: "@a@b",
        expected: { interpolation: "`@a@b", noInterpolation: "@a@b" },
      },
      {
        input: "a@b",
        expected: { interpolation: "a@b", noInterpolation: "a@b" },
      },
      {
        input: "a@b@c",
        expected: { interpolation: "a@b@c", noInterpolation: "a@b@c" },
      },
    ],
    "hashtags ('#')": [
      {
        input: "#a",
        expected: { interpolation: "`#a", noInterpolation: "#a" },
      },
      {
        input: "#a#b",
        expected: { interpolation: "`#a#b", noInterpolation: "#a#b" },
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
    "carets ('^')": [
      {
        input: "a^b",
        expected: { interpolation: "a^b", noInterpolation: "a^b" },
      },
      {
        input: "a^b^c",
        expected: { interpolation: "a^b^c", noInterpolation: "a^b^c" },
      },
    ],
    "dollar signs ('$')": [
      {
        input: "a$b",
        expected: { interpolation: "a`$b", noInterpolation: "a`$b" },
      },
      {
        input: "a$b$c",
        expected: { interpolation: "a`$b`$c", noInterpolation: "a`$b`$c" },
      },
    ],
    "ampersands ('&')": [
      {
        input: "a&b",
        expected: { interpolation: "a`&b", noInterpolation: "a&b" },
      },
      {
        input: "a&b&c",
        expected: { interpolation: "a`&b`&c", noInterpolation: "a&b&c" },
      },
    ],
    "hyphens ('-')": [
      {
        input: "-a",
        expected: { interpolation: "`-a", noInterpolation: "-a" },
      },
      {
        input: "-a-b",
        expected: { interpolation: "`-a-b", noInterpolation: "-a-b" },
      },
      {
        input: "a-b",
        expected: { interpolation: "a-b", noInterpolation: "a-b" },
      },
      {
        input: "a-b-c",
        expected: { interpolation: "a-b-c", noInterpolation: "a-b-c" },
      },
    ],
    "colons (':')": [
      {
        input: "a:b",
        expected: { interpolation: "a:b", noInterpolation: "a:b" },
      },
      {
        input: "a:b:c",
        expected: { interpolation: "a:b:c", noInterpolation: "a:b:c" },
      },
    ],
    "semicolons (';')": [
      {
        input: "a;b",
        expected: { interpolation: "a`;b", noInterpolation: "a;b" },
      },
      {
        input: "a;b;c",
        expected: { interpolation: "a`;b`;c", noInterpolation: "a;b;c" },
      },
    ],
    "pipes ('|')": [
      {
        input: "a|b",
        expected: { interpolation: "a`|b", noInterpolation: "a|b" },
      },
      {
        input: "a|b|c",
        expected: { interpolation: "a`|b`|c", noInterpolation: "a|b|c" },
      },
    ],
    "comma (',')": [
      {
        input: "a,b",
        expected: { interpolation: "a`,b", noInterpolation: "a,b" },
      },
      {
        input: "a,b,c",
        expected: { interpolation: "a`,b`,c", noInterpolation: "a,b,c" },
      },
    ],
    "parentheses ('(', ')')": [
      {
        input: "a(b",
        expected: { interpolation: "a`(b", noInterpolation: "a(b" },
      },
      {
        input: "a)b",
        expected: { interpolation: "a`)b", noInterpolation: "a)b" },
      },
      {
        input: "a(b(c",
        expected: { interpolation: "a`(b`(c", noInterpolation: "a(b(c" },
      },
      {
        input: "a)b)c",
        expected: { interpolation: "a`)b`)c", noInterpolation: "a)b)c" },
      },
      {
        input: "a(b)c",
        expected: { interpolation: "a`(b`)c", noInterpolation: "a(b)c" },
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
    ],
    "curly brackets ('{', '}')": [
      {
        input: "a{b",
        expected: { interpolation: "a`{b", noInterpolation: "a{b" },
      },
      {
        input: "a}b",
        expected: { interpolation: "a`}b", noInterpolation: "a}b" },
      },
      {
        input: "a{b{c",
        expected: { interpolation: "a`{b`{c", noInterpolation: "a{b{c" },
      },
      {
        input: "a}b}c",
        expected: { interpolation: "a`}b`}c", noInterpolation: "a}b}c" },
      },
      {
        input: "a{b}c",
        expected: { interpolation: "a`{b`}c", noInterpolation: "a{b}c" },
      },
    ],
    "angle brackets ('<', '>')": [
      {
        input: "a<b",
        expected: { interpolation: "a<b", noInterpolation: "a<b" },
      },
      {
        input: "a>b",
        expected: { interpolation: "a>b", noInterpolation: "a>b" },
      },
      {
        input: "a<b<c",
        expected: { interpolation: "a<b<c", noInterpolation: "a<b<c" },
      },
      {
        input: "a>b>c",
        expected: { interpolation: "a>b>c", noInterpolation: "a>b>c" },
      },
      {
        input: "a<b>c",
        expected: { interpolation: "a<b>c", noInterpolation: "a<b>c" },
      },
    ],
    "left double quotation mark ('“')": [
      {
        input: "a“b",
        expected: { interpolation: "a`“b", noInterpolation: "a““b" },
      },
      {
        input: "a“b“c",
        expected: {
          interpolation: "a`“b`“c",
          noInterpolation: "a““b““c",
        },
      },
    ],
    "right double quotation mark ('”')": [
      {
        input: "a”b",
        expected: { interpolation: "a`”b", noInterpolation: "a””b" },
      },
      {
        input: "a”b”c",
        expected: {
          interpolation: "a`”b`”c",
          noInterpolation: "a””b””c",
        },
      },
    ],
    "double low-9 quotation mark ('„')": [
      {
        input: "a„b",
        expected: { interpolation: "a`„b", noInterpolation: "a„„b" },
      },
      {
        input: "a„b„c",
        expected: {
          interpolation: "a`„b`„c",
          noInterpolation: "a„„b„„c",
        },
      },
    ],
    "left single quotation mark ('‘')": [
      {
        input: "a‘b",
        expected: { interpolation: "a`‘b", noInterpolation: "a‘b" },
      },
      {
        input: "a‘b‘c",
        expected: {
          interpolation: "a`‘b`‘c",
          noInterpolation: "a‘b‘c",
        },
      },
    ],
    "right single quotation mark ('’')": [
      {
        input: "a’b",
        expected: { interpolation: "a`’b", noInterpolation: "a’b" },
      },
      {
        input: "a’b’c",
        expected: {
          interpolation: "a`’b`’c",
          noInterpolation: "a’b’c",
        },
      },
    ],
    "single low-9 quotation mark ('‚')": [
      {
        input: "a‚b",
        expected: { interpolation: "a`‚b", noInterpolation: "a‚b" },
      },
      {
        input: "a‚b‚c",
        expected: {
          interpolation: "a`‚b`‚c",
          noInterpolation: "a‚b‚c",
        },
      },
    ],
    "single high-reversed-9 quotation mark ('‛')": [
      {
        input: "a‛b",
        expected: { interpolation: "a`‛b", noInterpolation: "a‛b" },
      },
      {
        input: "a‛b‛c",
        expected: {
          interpolation: "a`‛b`‛c",
          noInterpolation: "a‛b‛c",
        },
      },
    ],
  },
};
