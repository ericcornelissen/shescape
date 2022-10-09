/**
 * @overview Provides fixtures for testing Unix specific functionality.
 * @license MPL-2.0
 */

import { binBash, binDash, binZsh } from "../_constants.cjs";

export const escape = {
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
    "whitespace (\\s)": [
      {
        input: "foo	bar",
        expected: { interpolation: "foo	bar", noInterpolation: "foo	bar" },
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
    ],
    "<backspace> ('\\b')": [
      {
        input: "a\bb",
        expected: { interpolation: "ab", noInterpolation: "ab" },
      },
      {
        input: "a\bb\bc",
        expected: { interpolation: "abc", noInterpolation: "abc" },
      },
      {
        input: "\ba",
        expected: { interpolation: "a", noInterpolation: "a" },
      },
      {
        input: "a\b",
        expected: { interpolation: "a", noInterpolation: "a" },
      },
    ],
    "<end of line> ('\\n')": [
      {
        input: "a\nb",
        expected: { interpolation: "a b", noInterpolation: "a\nb" },
      },
      {
        input: "a\nb\nc",
        expected: { interpolation: "a b c", noInterpolation: "a\nb\nc" },
      },
      {
        input: "a\n",
        expected: { interpolation: "a ", noInterpolation: "a\n" },
      },
      {
        input: "\na",
        expected: { interpolation: " a", noInterpolation: "\na" },
      },
    ],
    "<carriage return> ('\\r')": [
      {
        input: "a\rb",
        expected: { interpolation: "ab", noInterpolation: "ab" },
      },
      {
        input: "a\rb\rc",
        expected: { interpolation: "abc", noInterpolation: "abc" },
      },
      {
        input: "\ra",
        expected: { interpolation: "a", noInterpolation: "a" },
      },
      {
        input: "a\r",
        expected: { interpolation: "a", noInterpolation: "a" },
      },
      {
        input: "a\r\nb",
        expected: { interpolation: "a b", noInterpolation: "a\r\nb" },
      },
    ],
    "<escape> ('\\u001B')": [
      {
        input: "a\u001Bb",
        expected: { interpolation: "ab", noInterpolation: "ab" },
      },
      {
        input: "a\u001Bb\u001Bc",
        expected: { interpolation: "abc", noInterpolation: "abc" },
      },
      {
        input: "\u001Ba",
        expected: { interpolation: "a", noInterpolation: "a" },
      },
      {
        input: "a\u001B",
        expected: { interpolation: "a", noInterpolation: "a" },
      },
    ],
    "<control sequence introducer> ('\\u009B')": [
      {
        input: "a\u009Bb",
        expected: { interpolation: "ab", noInterpolation: "ab" },
      },
      {
        input: "a\u009Bb\u009Bc",
        expected: { interpolation: "abc", noInterpolation: "abc" },
      },
      {
        input: "\u009Ba",
        expected: { interpolation: "a", noInterpolation: "a" },
      },
      {
        input: "a\u009B",
        expected: { interpolation: "a", noInterpolation: "a" },
      },
    ],
    'single quotes ("\'")': [
      {
        input: "a'b",
        expected: {
          interpolation: "a\\'b",
          noInterpolation: "a'b",
          quoted: "a'\\''b",
        },
      },
      {
        input: "a'b'c",
        expected: {
          interpolation: "a\\'b\\'c",
          noInterpolation: "a'b'c",
          quoted: "a'\\''b'\\''c",
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
        input: "a=~:~:~",
        expected: {
          interpolation: "a=\\~:\\~:\\~",
          noInterpolation: "a=~:~:~",
        },
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
        input: "a=:b:~",
        expected: { interpolation: "a=:b:\\~", noInterpolation: "a=:b:~" },
      },
      {
        input: "a=\r:~:",
        expected: { interpolation: "a=:\\~:", noInterpolation: "a=:~:" },
      },
      {
        input: "a=\u2028:~:",
        expected: {
          interpolation: "a=\u2028:\\~:",
          noInterpolation: "a=\u2028:~:",
        },
      },
      {
        input: "a=\u2029:~:",
        expected: {
          interpolation: "a=\u2029:\\~:",
          noInterpolation: "a=\u2029:~:",
        },
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
      {
        input: "a ~b",
        expected: { interpolation: "a \\~b", noInterpolation: "a ~b" },
      },
      {
        input: "a	~b",
        expected: { interpolation: "a	\\~b", noInterpolation: "a	~b" },
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
      {
        input: "a #b",
        expected: { interpolation: "a \\#b", noInterpolation: "a #b" },
      },
      {
        input: "a	#b",
        expected: { interpolation: "a	\\#b", noInterpolation: "a	#b" },
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
      {
        input: "a{\u000Db,c}d",
        expected: {
          interpolation: "a\\{b,c}d",
          noInterpolation: "a{b,c}d",
        },
      },
      {
        input: "a{\u2028b,c}d",
        expected: {
          interpolation: "a\\{\u2028b,c}d",
          noInterpolation: "a{\u2028b,c}d",
        },
      },
      {
        input: "a{\u2029b,c}d",
        expected: {
          interpolation: "a\\{\u2029b,c}d",
          noInterpolation: "a{\u2029b,c}d",
        },
      },
      {
        input: "a{b,c\u000D}d",
        expected: {
          interpolation: "a\\{b,c}d",
          noInterpolation: "a{b,c}d",
        },
      },
      {
        input: "a{b,c\u2028}d",
        expected: {
          interpolation: "a\\{b,c\u2028}d",
          noInterpolation: "a{b,c\u2028}d",
        },
      },
      {
        input: "a{b,c\u2029}d",
        expected: {
          interpolation: "a\\{b,c\u2029}d",
          noInterpolation: "a{b,c\u2029}d",
        },
      },
      {
        input: "a{\u000D0..2}b",
        expected: {
          interpolation: "a\\{0..2}b",
          noInterpolation: "a{0..2}b",
        },
      },
      {
        input: "a{\u20280..2}b",
        expected: {
          interpolation: "a\\{\u20280..2}b",
          noInterpolation: "a{\u20280..2}b",
        },
      },
      {
        input: "a{\u20290..2}b",
        expected: {
          interpolation: "a\\{\u20290..2}b",
          noInterpolation: "a{\u20290..2}b",
        },
      },
      {
        input: "a{0..2\u000D}b",
        expected: {
          interpolation: "a\\{0..2}b",
          noInterpolation: "a{0..2}b",
        },
      },
      {
        input: "a{0..2\u2028}b",
        expected: {
          interpolation: "a\\{0..2\u2028}b",
          noInterpolation: "a{0..2\u2028}b",
        },
      },
      {
        input: "a{0..2\u2029}b",
        expected: {
          interpolation: "a\\{0..2\u2029}b",
          noInterpolation: "a{0..2\u2029}b",
        },
      },
      {
        input: "a{{b,c}",
        expected: { interpolation: "a\\{\\{b,c}", noInterpolation: "a{{b,c}" },
      },
      {
        input: "a{b{c,d}",
        expected: {
          interpolation: "a\\{b\\{c,d}",
          noInterpolation: "a{b{c,d}",
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
    "whitespace (\\s)": [
      {
        input: "foo	bar",
        expected: { interpolation: "foo	bar", noInterpolation: "foo	bar" },
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
    ],
    "<backspace> ('\\b')": [
      {
        input: "a\bb",
        expected: { interpolation: "ab", noInterpolation: "ab" },
      },
      {
        input: "a\bb\bc",
        expected: { interpolation: "abc", noInterpolation: "abc" },
      },
      {
        input: "\ba",
        expected: { interpolation: "a", noInterpolation: "a" },
      },
      {
        input: "a\b",
        expected: { interpolation: "a", noInterpolation: "a" },
      },
    ],
    "<end of line> ('\\n')": [
      {
        input: "a\nb",
        expected: { interpolation: "a b", noInterpolation: "a\nb" },
      },
      {
        input: "a\nb\nc",
        expected: { interpolation: "a b c", noInterpolation: "a\nb\nc" },
      },
      {
        input: "a\n",
        expected: { interpolation: "a ", noInterpolation: "a\n" },
      },
      {
        input: "\na",
        expected: { interpolation: " a", noInterpolation: "\na" },
      },
    ],
    "<carriage return> ('\\r')": [
      {
        input: "a\rb",
        expected: { interpolation: "ab", noInterpolation: "ab" },
      },
      {
        input: "a\rb\rc",
        expected: { interpolation: "abc", noInterpolation: "abc" },
      },
      {
        input: "\ra",
        expected: { interpolation: "a", noInterpolation: "a" },
      },
      {
        input: "a\r",
        expected: { interpolation: "a", noInterpolation: "a" },
      },
      {
        input: "a\r\nb",
        expected: { interpolation: "a b", noInterpolation: "a\r\nb" },
      },
    ],
    "<escape> ('\\u001B')": [
      {
        input: "a\u001Bb",
        expected: { interpolation: "ab", noInterpolation: "ab" },
      },
      {
        input: "a\u001Bb\u001Bc",
        expected: { interpolation: "abc", noInterpolation: "abc" },
      },
      {
        input: "\u001Ba",
        expected: { interpolation: "a", noInterpolation: "a" },
      },
      {
        input: "a\u001B",
        expected: { interpolation: "a", noInterpolation: "a" },
      },
    ],
    "<control sequence introducer> ('\\u009B')": [
      {
        input: "a\u009Bb",
        expected: { interpolation: "ab", noInterpolation: "ab" },
      },
      {
        input: "a\u009Bb\u009Bc",
        expected: { interpolation: "abc", noInterpolation: "abc" },
      },
      {
        input: "\u009Ba",
        expected: { interpolation: "a", noInterpolation: "a" },
      },
      {
        input: "a\u009B",
        expected: { interpolation: "a", noInterpolation: "a" },
      },
    ],
    'single quotes ("\'")': [
      {
        input: "a'b",
        expected: {
          interpolation: "a\\'b",
          noInterpolation: "a'b",
          quoted: "a'\\''b",
        },
      },
      {
        input: "a'b'c",
        expected: {
          interpolation: "a\\'b\\'c",
          noInterpolation: "a'b'c",
          quoted: "a'\\''b'\\''c",
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
        expected: { interpolation: "a=~", noInterpolation: "a=~" },
      },
      {
        input: "a~b=~",
        expected: { interpolation: "a~b=~", noInterpolation: "a~b=~" },
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
        expected: { interpolation: "a=:~", noInterpolation: "a=:~" },
      },
      {
        input: "a=b:~",
        expected: { interpolation: "a=b:~", noInterpolation: "a=b:~" },
      },
      {
        input: "a=~:",
        expected: { interpolation: "a=~:", noInterpolation: "a=~:" },
      },
      {
        input: "a=~:b",
        expected: { interpolation: "a=~:b", noInterpolation: "a=~:b" },
      },
      {
        input: "a=~:~",
        expected: { interpolation: "a=~:~", noInterpolation: "a=~:~" },
      },
      {
        input: "a=:~:",
        expected: { interpolation: "a=:~:", noInterpolation: "a=:~:" },
      },
      {
        input: "a=:~:b",
        expected: { interpolation: "a=:~:b", noInterpolation: "a=:~:b" },
      },
      {
        input: "a=b:~:",
        expected: { interpolation: "a=b:~:", noInterpolation: "a=b:~:" },
      },
      {
        input: "a=b:~:c",
        expected: { interpolation: "a=b:~:c", noInterpolation: "a=b:~:c" },
      },
      {
        input: "a=~=",
        expected: { interpolation: "a=~=", noInterpolation: "a=~=" },
      },
      {
        input: "a=~-",
        expected: { interpolation: "a=~-", noInterpolation: "a=~-" },
      },
      {
        input: "a=~+",
        expected: { interpolation: "a=~+", noInterpolation: "a=~+" },
      },
      {
        input: "a=~/",
        expected: { interpolation: "a=~/", noInterpolation: "a=~/" },
      },
      {
        input: "a=~0",
        expected: { interpolation: "a=~0", noInterpolation: "a=~0" },
      },
      {
        input: "a=~ ",
        expected: { interpolation: "a=~ ", noInterpolation: "a=~ " },
      },
      {
        input: "a ~b",
        expected: { interpolation: "a \\~b", noInterpolation: "a ~b" },
      },
      {
        input: "a	~b",
        expected: { interpolation: "a	\\~b", noInterpolation: "a	~b" },
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
      {
        input: "a #b",
        expected: { interpolation: "a \\#b", noInterpolation: "a #b" },
      },
      {
        input: "a	#b",
        expected: { interpolation: "a	\\#b", noInterpolation: "a	#b" },
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
        expected: { interpolation: "a{b,c}d", noInterpolation: "a{b,c}d" },
      },
      {
        input: "a{,b}c",
        expected: { interpolation: "a{,b}c", noInterpolation: "a{,b}c" },
      },
      {
        input: "a{b,}c",
        expected: { interpolation: "a{b,}c", noInterpolation: "a{b,}c" },
      },
      {
        input: "a{bc,de}f",
        expected: {
          interpolation: "a{bc,de}f",
          noInterpolation: "a{bc,de}f",
        },
      },
      {
        input: "a{b,{c,d},e}f",
        expected: {
          interpolation: "a{b,{c,d},e}f",
          noInterpolation: "a{b,{c,d},e}f",
        },
      },
      {
        input: "a{0..2}b",
        expected: { interpolation: "a{0..2}b", noInterpolation: "a{0..2}b" },
      },
      {
        input: "a{\u000Db,c}d",
        expected: {
          interpolation: "a{b,c}d",
          noInterpolation: "a{b,c}d",
        },
      },
      {
        input: "a{\u2028b,c}d",
        expected: {
          interpolation: "a{\u2028b,c}d",
          noInterpolation: "a{\u2028b,c}d",
        },
      },
      {
        input: "a{\u2029b,c}d",
        expected: {
          interpolation: "a{\u2029b,c}d",
          noInterpolation: "a{\u2029b,c}d",
        },
      },
      {
        input: "a{b,c\u000D}d",
        expected: {
          interpolation: "a{b,c}d",
          noInterpolation: "a{b,c}d",
        },
      },
      {
        input: "a{b,c\u2028}d",
        expected: {
          interpolation: "a{b,c\u2028}d",
          noInterpolation: "a{b,c\u2028}d",
        },
      },
      {
        input: "a{b,c\u2029}d",
        expected: {
          interpolation: "a{b,c\u2029}d",
          noInterpolation: "a{b,c\u2029}d",
        },
      },
      {
        input: "a{\u000D0..2}b",
        expected: {
          interpolation: "a{0..2}b",
          noInterpolation: "a{0..2}b",
        },
      },
      {
        input: "a{\u20280..2}b",
        expected: {
          interpolation: "a{\u20280..2}b",
          noInterpolation: "a{\u20280..2}b",
        },
      },
      {
        input: "a{\u20290..2}b",
        expected: {
          interpolation: "a{\u20290..2}b",
          noInterpolation: "a{\u20290..2}b",
        },
      },
      {
        input: "a{0..2\u000D}b",
        expected: {
          interpolation: "a{0..2}b",
          noInterpolation: "a{0..2}b",
        },
      },
      {
        input: "a{0..2\u2028}b",
        expected: {
          interpolation: "a{0..2\u2028}b",
          noInterpolation: "a{0..2\u2028}b",
        },
      },
      {
        input: "a{0..2\u2029}b",
        expected: {
          interpolation: "a{0..2\u2029}b",
          noInterpolation: "a{0..2\u2029}b",
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
    "whitespace (\\s)": [
      {
        input: "foo	bar",
        expected: { interpolation: "foo	bar", noInterpolation: "foo	bar" },
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
    ],
    "<backspace> ('\\b')": [
      {
        input: "a\bb",
        expected: { interpolation: "ab", noInterpolation: "ab" },
      },
      {
        input: "a\bb\bc",
        expected: { interpolation: "abc", noInterpolation: "abc" },
      },
      {
        input: "\ba",
        expected: { interpolation: "a", noInterpolation: "a" },
      },
      {
        input: "a\b",
        expected: { interpolation: "a", noInterpolation: "a" },
      },
    ],
    "<end of line> ('\\n')": [
      {
        input: "a\nb",
        expected: { interpolation: "a b", noInterpolation: "a\nb" },
      },
      {
        input: "a\nb\nc",
        expected: { interpolation: "a b c", noInterpolation: "a\nb\nc" },
      },
      {
        input: "a\n",
        expected: { interpolation: "a ", noInterpolation: "a\n" },
      },
      {
        input: "\na",
        expected: { interpolation: " a", noInterpolation: "\na" },
      },
    ],
    "<carriage return> ('\\r')": [
      {
        input: "a\rb",
        expected: { interpolation: "ab", noInterpolation: "ab" },
      },
      {
        input: "a\rb\rc",
        expected: { interpolation: "abc", noInterpolation: "abc" },
      },
      {
        input: "\ra",
        expected: { interpolation: "a", noInterpolation: "a" },
      },
      {
        input: "a\r",
        expected: { interpolation: "a", noInterpolation: "a" },
      },
      {
        input: "a\r\nb",
        expected: { interpolation: "a b", noInterpolation: "a\r\nb" },
      },
    ],
    "<escape> ('\\u001B')": [
      {
        input: "a\u001Bb",
        expected: { interpolation: "ab", noInterpolation: "ab" },
      },
      {
        input: "a\u001Bb\u001Bc",
        expected: { interpolation: "abc", noInterpolation: "abc" },
      },
      {
        input: "\u001Ba",
        expected: { interpolation: "a", noInterpolation: "a" },
      },
      {
        input: "a\u001B",
        expected: { interpolation: "a", noInterpolation: "a" },
      },
    ],
    "<control sequence introducer> ('\\u009B')": [
      {
        input: "a\u009Bb",
        expected: { interpolation: "ab", noInterpolation: "ab" },
      },
      {
        input: "a\u009Bb\u009Bc",
        expected: { interpolation: "abc", noInterpolation: "abc" },
      },
      {
        input: "\u009Ba",
        expected: { interpolation: "a", noInterpolation: "a" },
      },
      {
        input: "a\u009B",
        expected: { interpolation: "a", noInterpolation: "a" },
      },
    ],
    'single quotes ("\'")': [
      {
        input: "a'b",
        expected: {
          interpolation: "a\\'b",
          noInterpolation: "a'b",
          quoted: "a'\\''b",
        },
      },
      {
        input: "a'b'c",
        expected: {
          interpolation: "a\\'b\\'c",
          noInterpolation: "a'b'c",
          quoted: "a'\\''b'\\''c",
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
        input: "a ~b",
        expected: { interpolation: "a \\~b", noInterpolation: "a ~b" },
      },
      {
        input: "a	~b",
        expected: { interpolation: "a	\\~b", noInterpolation: "a	~b" },
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
      {
        input: "a #b",
        expected: { interpolation: "a \\#b", noInterpolation: "a #b" },
      },
      {
        input: "a	#b",
        expected: { interpolation: "a	\\#b", noInterpolation: "a	#b" },
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
      {
        input: "a =b",
        expected: { interpolation: "a \\=b", noInterpolation: "a =b" },
      },
      {
        input: "a	=b",
        expected: { interpolation: "a	\\=b", noInterpolation: "a	=b" },
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

export const quote = {
  [binDash]: {
    "sample strings": [
      {
        input: "a",
        expected: { escaped: "'a'", notEscaped: "'a'" },
      },
    ],
  },
  [binBash]: {
    "sample strings": [
      {
        input: "a",
        expected: { escaped: "'a'", notEscaped: "'a'" },
      },
    ],
  },
  [binZsh]: {
    "sample strings": [
      {
        input: "a",
        expected: { escaped: "'a'", notEscaped: "'a'" },
      },
    ],
  },
};
