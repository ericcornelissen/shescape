/**
 * @overview Provides fixtures for testing Windows specific functionality.
 * @license MPL-2.0
 */

import { binCmd, binPowerShell } from "../_constants.cjs";

export const escape = {
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
    "whitespace (\\s)": [
      {
        input: "foo	bar",
        expected: { interpolation: "foo	bar", noInterpolation: "foo	bar" },
      },
      {
        input: "foo\nbar",
        expected: { interpolation: "foo bar", noInterpolation: "foo bar" },
      },
      {
        input: "foo\vbar",
        expected: { interpolation: "foo\vbar", noInterpolation: "foo\vbar" },
      },
      {
        input: "foo\fbar",
        expected: { interpolation: "foo\fbar", noInterpolation: "foo\fbar" },
      },
      {
        input: "foo\rbar",
        expected: { interpolation: "foo bar", noInterpolation: "foo bar" },
      },
      {
        input: "foo bar",
        expected: { interpolation: "foo bar", noInterpolation: "foo bar" },
      },
      {
        input: "foo\u0085bar",
        expected: {
          interpolation: "foo\u0085bar",
          noInterpolation: "foo\u0085bar",
        },
      },
      {
        input: "foo\u00A0bar",
        expected: {
          interpolation: "foo\u00A0bar",
          noInterpolation: "foo\u00A0bar",
        },
      },
      {
        input: "foo\u1680bar",
        expected: {
          interpolation: "foo\u1680bar",
          noInterpolation: "foo\u1680bar",
        },
      },
      {
        input: "foo\u2000bar",
        expected: {
          interpolation: "foo\u2000bar",
          noInterpolation: "foo\u2000bar",
        },
      },
      {
        input: "foo\u2001bar",
        expected: {
          interpolation: "foo\u2001bar",
          noInterpolation: "foo\u2001bar",
        },
      },
      {
        input: "foo\u2002bar",
        expected: {
          interpolation: "foo\u2002bar",
          noInterpolation: "foo\u2002bar",
        },
      },
      {
        input: "foo\u2003bar",
        expected: {
          interpolation: "foo\u2003bar",
          noInterpolation: "foo\u2003bar",
        },
      },
      {
        input: "foo\u2004bar",
        expected: {
          interpolation: "foo\u2004bar",
          noInterpolation: "foo\u2004bar",
        },
      },
      {
        input: "foo\u2005bar",
        expected: {
          interpolation: "foo\u2005bar",
          noInterpolation: "foo\u2005bar",
        },
      },
      {
        input: "foo\u2006bar",
        expected: {
          interpolation: "foo\u2006bar",
          noInterpolation: "foo\u2006bar",
        },
      },
      {
        input: "foo\u2007bar",
        expected: {
          interpolation: "foo\u2007bar",
          noInterpolation: "foo\u2007bar",
        },
      },
      {
        input: "foo\u2008bar",
        expected: {
          interpolation: "foo\u2008bar",
          noInterpolation: "foo\u2008bar",
        },
      },
      {
        input: "foo\u2009bar",
        expected: {
          interpolation: "foo\u2009bar",
          noInterpolation: "foo\u2009bar",
        },
      },
      {
        input: "foo\u200Abar",
        expected: {
          interpolation: "foo\u200Abar",
          noInterpolation: "foo\u200Abar",
        },
      },
      {
        input: "foo\u2028bar",
        expected: {
          interpolation: "foo\u2028bar",
          noInterpolation: "foo\u2028bar",
        },
      },
      {
        input: "foo\u2029bar",
        expected: {
          interpolation: "foo\u2029bar",
          noInterpolation: "foo\u2029bar",
        },
      },
      {
        input: "foo\u202Fbar",
        expected: {
          interpolation: "foo\u202Fbar",
          noInterpolation: "foo\u202Fbar",
        },
      },
      {
        input: "foo\u205Fbar",
        expected: {
          interpolation: "foo\u205Fbar",
          noInterpolation: "foo\u205Fbar",
        },
      },
      {
        input: "foo\u3000bar",
        expected: {
          interpolation: "foo\u3000bar",
          noInterpolation: "foo\u3000bar",
        },
      },
      {
        input: "foo\uFEFFbar",
        expected: {
          interpolation: "foo\uFEFFbar",
          noInterpolation: "foo\uFEFFbar",
        },
      },
      {
        input: "foo\n\rbar",
        expected: {
          interpolation: "foo bar",
          noInterpolation: "foo bar",
        },
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
        input: "foo	bar",
        expected: { interpolation: "foo	bar", noInterpolation: "foo	bar" },
      },
      {
        input: "foo\nbar",
        expected: { interpolation: "foo bar", noInterpolation: "foo\nbar" },
      },
      {
        input: "foo\vbar",
        expected: { interpolation: "foo\vbar", noInterpolation: "foo\vbar" },
      },
      {
        input: "foo\fbar",
        expected: { interpolation: "foo\fbar", noInterpolation: "foo\fbar" },
      },
      {
        input: "foo\rbar",
        expected: { interpolation: "foo bar", noInterpolation: "foo\rbar" },
      },
      {
        input: "foo bar",
        expected: { interpolation: "foo bar", noInterpolation: "foo bar" },
      },
      {
        input: "foo\u0085bar",
        expected: {
          interpolation: "foo\u0085bar",
          noInterpolation: "foo\u0085bar",
        },
      },
      {
        input: "foo\u00A0bar",
        expected: {
          interpolation: "foo\u00A0bar",
          noInterpolation: "foo\u00A0bar",
        },
      },
      {
        input: "foo\u1680bar",
        expected: {
          interpolation: "foo\u1680bar",
          noInterpolation: "foo\u1680bar",
        },
      },
      {
        input: "foo\u2000bar",
        expected: {
          interpolation: "foo\u2000bar",
          noInterpolation: "foo\u2000bar",
        },
      },
      {
        input: "foo\u2001bar",
        expected: {
          interpolation: "foo\u2001bar",
          noInterpolation: "foo\u2001bar",
        },
      },
      {
        input: "foo\u2002bar",
        expected: {
          interpolation: "foo\u2002bar",
          noInterpolation: "foo\u2002bar",
        },
      },
      {
        input: "foo\u2003bar",
        expected: {
          interpolation: "foo\u2003bar",
          noInterpolation: "foo\u2003bar",
        },
      },
      {
        input: "foo\u2004bar",
        expected: {
          interpolation: "foo\u2004bar",
          noInterpolation: "foo\u2004bar",
        },
      },
      {
        input: "foo\u2005bar",
        expected: {
          interpolation: "foo\u2005bar",
          noInterpolation: "foo\u2005bar",
        },
      },
      {
        input: "foo\u2006bar",
        expected: {
          interpolation: "foo\u2006bar",
          noInterpolation: "foo\u2006bar",
        },
      },
      {
        input: "foo\u2007bar",
        expected: {
          interpolation: "foo\u2007bar",
          noInterpolation: "foo\u2007bar",
        },
      },
      {
        input: "foo\u2008bar",
        expected: {
          interpolation: "foo\u2008bar",
          noInterpolation: "foo\u2008bar",
        },
      },
      {
        input: "foo\u2009bar",
        expected: {
          interpolation: "foo\u2009bar",
          noInterpolation: "foo\u2009bar",
        },
      },
      {
        input: "foo\u200Abar",
        expected: {
          interpolation: "foo\u200Abar",
          noInterpolation: "foo\u200Abar",
        },
      },
      {
        input: "foo\u2028bar",
        expected: {
          interpolation: "foo\u2028bar",
          noInterpolation: "foo\u2028bar",
        },
      },
      {
        input: "foo\u2029bar",
        expected: {
          interpolation: "foo\u2029bar",
          noInterpolation: "foo\u2029bar",
        },
      },
      {
        input: "foo\u202Fbar",
        expected: {
          interpolation: "foo\u202Fbar",
          noInterpolation: "foo\u202Fbar",
        },
      },
      {
        input: "foo\u205Fbar",
        expected: {
          interpolation: "foo\u205Fbar",
          noInterpolation: "foo\u205Fbar",
        },
      },
      {
        input: "foo\u3000bar",
        expected: {
          interpolation: "foo\u3000bar",
          noInterpolation: "foo\u3000bar",
        },
      },
      {
        input: "foo\uFEFFbar",
        expected: {
          interpolation: "foo\uFEFFbar",
          noInterpolation: "foo\uFEFFbar",
        },
      },
      {
        input: "foo\n\rbar",
        expected: {
          interpolation: "foo bar",
          noInterpolation: "foo\n\rbar",
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
        expected: { interpolation: "a	`@b", noInterpolation: "a	@b" },
      },
      {
        input: "a\u0085@b",
        expected: { interpolation: "a\u0085`@b", noInterpolation: "a\u0085@b" },
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
        expected: { interpolation: "a	`#b", noInterpolation: "a	#b" },
      },
      {
        input: "a\u0085#b",
        expected: { interpolation: "a\u0085`#b", noInterpolation: "a\u0085#b" },
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
        expected: { interpolation: "a	`-b", noInterpolation: "a	-b" },
      },
      {
        input: "a\u0085-b",
        expected: { interpolation: "a\u0085`-b", noInterpolation: "a\u0085-b" },
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
        expected: { interpolation: "a	`:b", noInterpolation: "a	:b" },
      },
      {
        input: "a\u0085:b",
        expected: { interpolation: "a\u0085`:b", noInterpolation: "a\u0085:b" },
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
        expected: { interpolation: "a	[b", noInterpolation: "a	[b" },
      },
      {
        input: "a	]b",
        expected: { interpolation: "a	`]b", noInterpolation: "a	]b" },
      },
      {
        input: "a	[b]",
        expected: { interpolation: "a	[b]", noInterpolation: "a	[b]" },
      },
      {
        input: "a\u0085[b",
        expected: { interpolation: "a\u0085[b", noInterpolation: "a\u0085[b" },
      },
      {
        input: "a\u0085]b",
        expected: { interpolation: "a\u0085`]b", noInterpolation: "a\u0085]b" },
      },
      {
        input: "a\u0085[b]",
        expected: {
          interpolation: "a\u0085[b]",
          noInterpolation: "a\u0085[b]",
        },
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
        expected: { interpolation: "a	`<b", noInterpolation: "a	<b" },
      },
      {
        input: "a	>b",
        expected: { interpolation: "a	`>b", noInterpolation: "a	>b" },
      },
      {
        input: "a	1>b",
        expected: { interpolation: "a	1`>b", noInterpolation: "a	1>b" },
      },
      {
        input: "a	2>b",
        expected: { interpolation: "a	2`>b", noInterpolation: "a	2>b" },
      },
      {
        input: "a	3>b",
        expected: { interpolation: "a	3`>b", noInterpolation: "a	3>b" },
      },
      {
        input: "a	4>b",
        expected: { interpolation: "a	4`>b", noInterpolation: "a	4>b" },
      },
      {
        input: "a	5>b",
        expected: { interpolation: "a	5`>b", noInterpolation: "a	5>b" },
      },
      {
        input: "a	6>b",
        expected: { interpolation: "a	6`>b", noInterpolation: "a	6>b" },
      },
      {
        input: "a	*>b",
        expected: { interpolation: "a	*`>b", noInterpolation: "a	*>b" },
      },
      {
        input: "a\u0085<b",
        expected: { interpolation: "a\u0085`<b", noInterpolation: "a\u0085<b" },
      },
      {
        input: "a\u0085>b",
        expected: { interpolation: "a\u0085`>b", noInterpolation: "a\u0085>b" },
      },
      {
        input: "a\u00851>b",
        expected: {
          interpolation: "a\u00851`>b",
          noInterpolation: "a\u00851>b",
        },
      },
      {
        input: "a\u00852>b",
        expected: {
          interpolation: "a\u00852`>b",
          noInterpolation: "a\u00852>b",
        },
      },
      {
        input: "a\u00853>b",
        expected: {
          interpolation: "a\u00853`>b",
          noInterpolation: "a\u00853>b",
        },
      },
      {
        input: "a\u00854>b",
        expected: {
          interpolation: "a\u00854`>b",
          noInterpolation: "a\u00854>b",
        },
      },
      {
        input: "a\u00855>b",
        expected: {
          interpolation: "a\u00855`>b",
          noInterpolation: "a\u00855>b",
        },
      },
      {
        input: "a\u00856>b",
        expected: {
          interpolation: "a\u00856`>b",
          noInterpolation: "a\u00856>b",
        },
      },
      {
        input: "a\u0085*>b",
        expected: {
          interpolation: "a\u0085*`>b",
          noInterpolation: "a\u0085*>b",
        },
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

export const quote = {
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
