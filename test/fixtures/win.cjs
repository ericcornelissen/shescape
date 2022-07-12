/**
 * @overview Provides fixtures for testing Windows specific functionality.
 * @license MPL-2.0
 */

const { binCmd, binPowerShell } = require("../_constants.cjs");

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
        expected: {
          interpolation: 'a^"b',
          noInterpolation: 'a"b',
          quoted: 'a""b',
        },
      },
      {
        input: 'a"b"c',
        expected: {
          interpolation: 'a^"b^"c',
          noInterpolation: 'a"b"c',
          quoted: 'a""b""c',
        },
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
    "whitespace (\\s)": [
      {
        input: "foo bar",
        expected: { interpolation: "foo bar", noInterpolation: "foo bar" },
      },
      {
        input: "foo\nbar",
        expected: { interpolation: "foo bar", noInterpolation: "foo\nbar" },
      },
      {
        input: "foo\rbar",
        expected: { interpolation: "foo bar", noInterpolation: "foo\rbar" },
      },
      {
        input: "foo\n\rbar",
        expected: {
          interpolation: "foo  bar",
          noInterpolation: "foo\n\rbar",
        },
      },
      {
        input: "foo	bar",
        expected: { interpolation: "foo bar", noInterpolation: "foo	bar" },
      },
      {
        input: "foo\vbar",
        expected: { interpolation: "foo bar", noInterpolation: "foo\vbar" },
      },
      {
        input: "foo\fbar",
        expected: { interpolation: "foo bar", noInterpolation: "foo\fbar" },
      },
      {
        input: "foo\u0085bar",
        expected: {
          interpolation: "foo bar",
          noInterpolation: "foo\u0085bar",
        },
      },
      {
        input: "foo\u00A0bar",
        expected: {
          interpolation: "foo bar",
          noInterpolation: "foo\u00A0bar",
        },
      },
      {
        input: "foo\u2000bar",
        expected: {
          interpolation: "foo bar",
          noInterpolation: "foo\u2000bar",
        },
      },
      {
        input: "foo\u2008bar",
        expected: {
          interpolation: "foo bar",
          noInterpolation: "foo\u2008bar",
        },
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
        expected: {
          interpolation: 'a`"b',
          noInterpolation: 'a"b',
          quoted: 'a""b',
        },
      },
      {
        input: 'a"b"c',
        expected: {
          interpolation: 'a`"b`"c',
          noInterpolation: 'a"b"c',
          quoted: 'a""b""c',
        },
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
      {
        input: "a @b",
        expected: { interpolation: "a `@b", noInterpolation: "a @b" },
      },
      {
        input: "a	@b",
        expected: { interpolation: "a `@b", noInterpolation: "a	@b" },
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
      {
        input: "a #b",
        expected: { interpolation: "a `#b", noInterpolation: "a #b" },
      },
      {
        input: "a	#b",
        expected: { interpolation: "a `#b", noInterpolation: "a	#b" },
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
      {
        input: "a -b",
        expected: { interpolation: "a `-b", noInterpolation: "a -b" },
      },
      {
        input: "a	-b",
        expected: { interpolation: "a `-b", noInterpolation: "a	-b" },
      },
    ],
    "colons (':')": [
      {
        input: ":a",
        expected: { interpolation: "`:a", noInterpolation: ":a" },
      },
      {
        input: "a:b",
        expected: { interpolation: "a:b", noInterpolation: "a:b" },
      },
      {
        input: "a:b:c",
        expected: { interpolation: "a:b:c", noInterpolation: "a:b:c" },
      },
      {
        input: "a :b",
        expected: { interpolation: "a `:b", noInterpolation: "a :b" },
      },
      {
        input: "a	:b",
        expected: { interpolation: "a `:b", noInterpolation: "a	:b" },
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
        input: "[a",
        expected: { interpolation: "[a", noInterpolation: "[a" },
      },
      {
        input: "]a",
        expected: { interpolation: "`]a", noInterpolation: "]a" },
      },
      {
        input: "[a]",
        expected: { interpolation: "[a]", noInterpolation: "[a]" },
      },
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
        input: "a [b",
        expected: { interpolation: "a [b", noInterpolation: "a [b" },
      },
      {
        input: "a ]b",
        expected: { interpolation: "a `]b", noInterpolation: "a ]b" },
      },
      {
        input: "a [b]",
        expected: { interpolation: "a [b]", noInterpolation: "a [b]" },
      },
      {
        input: "a	[b",
        expected: { interpolation: "a [b", noInterpolation: "a	[b" },
      },
      {
        input: "a	]b",
        expected: { interpolation: "a `]b", noInterpolation: "a	]b" },
      },
      {
        input: "a	[b]",
        expected: { interpolation: "a [b]", noInterpolation: "a	[b]" },
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
        input: "<a",
        expected: { interpolation: "`<a", noInterpolation: "<a" },
      },
      {
        input: ">a",
        expected: { interpolation: "`>a", noInterpolation: ">a" },
      },
      {
        input: "a<b",
        expected: { interpolation: "a<b", noInterpolation: "a<b" },
      },
      {
        input: "a>b",
        expected: { interpolation: "a>b", noInterpolation: "a>b" },
      },
      {
        input: "1>a",
        expected: { interpolation: "1`>a", noInterpolation: "1>a" },
      },
      {
        input: "2>a",
        expected: { interpolation: "2`>a", noInterpolation: "2>a" },
      },
      {
        input: "3>a",
        expected: { interpolation: "3`>a", noInterpolation: "3>a" },
      },
      {
        input: "4>a",
        expected: { interpolation: "4`>a", noInterpolation: "4>a" },
      },
      {
        input: "5>a",
        expected: { interpolation: "5`>a", noInterpolation: "5>a" },
      },
      {
        input: "6>a",
        expected: { interpolation: "6`>a", noInterpolation: "6>a" },
      },
      {
        input: "*>a",
        expected: { interpolation: "*`>a", noInterpolation: "*>a" },
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
      {
        input: "a <b",
        expected: { interpolation: "a `<b", noInterpolation: "a <b" },
      },
      {
        input: "a >b",
        expected: { interpolation: "a `>b", noInterpolation: "a >b" },
      },
      {
        input: "a 1>b",
        expected: { interpolation: "a 1`>b", noInterpolation: "a 1>b" },
      },
      {
        input: "a 2>b",
        expected: { interpolation: "a 2`>b", noInterpolation: "a 2>b" },
      },
      {
        input: "a 3>b",
        expected: { interpolation: "a 3`>b", noInterpolation: "a 3>b" },
      },
      {
        input: "a 4>b",
        expected: { interpolation: "a 4`>b", noInterpolation: "a 4>b" },
      },
      {
        input: "a 5>b",
        expected: { interpolation: "a 5`>b", noInterpolation: "a 5>b" },
      },
      {
        input: "a 6>b",
        expected: { interpolation: "a 6`>b", noInterpolation: "a 6>b" },
      },
      {
        input: "a *>b",
        expected: { interpolation: "a *`>b", noInterpolation: "a *>b" },
      },
      {
        input: "a	<b",
        expected: { interpolation: "a `<b", noInterpolation: "a	<b" },
      },
      {
        input: "a	>b",
        expected: { interpolation: "a `>b", noInterpolation: "a	>b" },
      },
      {
        input: "a	1>b",
        expected: { interpolation: "a 1`>b", noInterpolation: "a	1>b" },
      },
      {
        input: "a	2>b",
        expected: { interpolation: "a 2`>b", noInterpolation: "a	2>b" },
      },
      {
        input: "a	3>b",
        expected: { interpolation: "a 3`>b", noInterpolation: "a	3>b" },
      },
      {
        input: "a	4>b",
        expected: { interpolation: "a 4`>b", noInterpolation: "a	4>b" },
      },
      {
        input: "a	5>b",
        expected: { interpolation: "a 5`>b", noInterpolation: "a	5>b" },
      },
      {
        input: "a	6>b",
        expected: { interpolation: "a 6`>b", noInterpolation: "a	6>b" },
      },
      {
        input: "a	*>b",
        expected: { interpolation: "a *`>b", noInterpolation: "a	*>b" },
      },
    ],
    "left double quotation mark ('“')": [
      {
        input: "a“b",
        expected: {
          interpolation: "a`“b",
          noInterpolation: "a“b",
          quoted: "a““b",
        },
      },
      {
        input: "a“b“c",
        expected: {
          interpolation: "a`“b`“c",
          noInterpolation: "a“b“c",
          quoted: "a““b““c",
        },
      },
    ],
    "right double quotation mark ('”')": [
      {
        input: "a”b",
        expected: {
          interpolation: "a`”b",
          noInterpolation: "a”b",
          quoted: "a””b",
        },
      },
      {
        input: "a”b”c",
        expected: {
          interpolation: "a`”b`”c",
          noInterpolation: "a”b”c",
          quoted: "a””b””c",
        },
      },
    ],
    "double low-9 quotation mark ('„')": [
      {
        input: "a„b",
        expected: {
          interpolation: "a`„b",
          noInterpolation: "a„b",
          quoted: "a„„b",
        },
      },
      {
        input: "a„b„c",
        expected: {
          interpolation: "a`„b`„c",
          noInterpolation: "a„b„c",
          quoted: "a„„b„„c",
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

module.exports.quote = {
  [binCmd]: {
    "sample strings": [
      {
        input: "a",
        expected: { escaped: '"a"', notEscaped: '"a"' },
      },
    ],
  },
  [binPowerShell]: {
    "sample strings": [
      {
        input: "a",
        expected: { escaped: '"a"', notEscaped: '"a"' },
      },
    ],
  },
};
