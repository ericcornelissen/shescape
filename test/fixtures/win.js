/**
 * @overview Provides fixtures for testing Windows specific functionality.
 * @license MPL-2.0
 */

import { binCmd, binPowerShell } from "../_constants.js";

export const escape = {
  [null]: {
    "sample strings": [
      {
        input: "foobar",
        expected: "foobar",
      },
    ],
    "<null> (\\0)": [
      {
        input: "a\u0000b",
        expected: "ab",
      },
      {
        input: "a\u0000b\u0000c",
        expected: "abc",
      },
      {
        input: "a\u0000",
        expected: "a",
      },
      {
        input: "\u0000a",
        expected: "a",
      },
    ],
    "<backspace> (\\b)": [
      {
        input: "a\bb",
        expected: "ab",
      },
      {
        input: "a\bb\bc",
        expected: "abc",
      },
      {
        input: "\ba",
        expected: "a",
      },
      {
        input: "a\b",
        expected: "a",
      },
    ],
    "<character tabulation> (\\t)": [
      {
        input: "a\tb",
        expected: "a\tb",
      },
      {
        input: "a\tb\tc",
        expected: "a\tb\tc",
      },
      {
        input: "a\t",
        expected: "a\t",
      },
      {
        input: "\ta",
        expected: "\ta",
      },
    ],
    "<end of line> (\\n)": [
      {
        input: "a\nb",
        expected: "a\nb",
      },
      {
        input: "a\nb\nc",
        expected: "a\nb\nc",
      },
      {
        input: "a\n",
        expected: "a\n",
      },
      {
        input: "\na",
        expected: "\na",
      },
    ],
    "<line tabulation> (\\v)": [
      {
        input: "a\vb",
        expected: "a\vb",
      },
      {
        input: "a\vb\vc",
        expected: "a\vb\vc",
      },
      {
        input: "a\v",
        expected: "a\v",
      },
      {
        input: "\va",
        expected: "\va",
      },
    ],
    "<form feed> (\\f)": [
      {
        input: "a\fb",
        expected: "a\fb",
      },
      {
        input: "a\fb\fc",
        expected: "a\fb\fc",
      },
      {
        input: "a\f",
        expected: "a\f",
      },
      {
        input: "\fa",
        expected: "\fa",
      },
    ],
    "<carriage return> (\\r)": [
      {
        input: "a\rb",
        expected: "ab",
      },
      {
        input: "a\rb\rc",
        expected: "abc",
      },
      {
        input: "\ra",
        expected: "a",
      },
      {
        input: "a\r",
        expected: "a",
      },
    ],
    "<carriage return> (\\r) + <end of line> (\\n)": [
      {
        input: "a\r\nb",
        expected: "a\r\nb",
      },
      {
        input: "a\r\nb\r\nc",
        expected: "a\r\nb\r\nc",
      },
      {
        input: "a\r\n",
        expected: "a\r\n",
      },
      {
        input: "\r\na",
        expected: "\r\na",
      },
    ],
    "<escape> (\\u001B)": [
      {
        input: "a\u001Bb",
        expected: "ab",
      },
      {
        input: "a\u001Bb\u001Bc",
        expected: "abc",
      },
      {
        input: "\u001Ba",
        expected: "a",
      },
      {
        input: "a\u001B",
        expected: "a",
      },
    ],
    "<space> (' ')": [
      {
        input: "a b",
        expected: "a b",
      },
      {
        input: "a b c",
        expected: "a b c",
      },
      {
        input: "a ",
        expected: "a ",
      },
      {
        input: " a",
        expected: " a",
      },
    ],
    "<next line> (\\u0085)": [
      {
        input: "a\u0085b",
        expected: "a\u0085b",
      },
      {
        input: "a\u0085b\u0085c",
        expected: "a\u0085b\u0085c",
      },
      {
        input: "a\u0085",
        expected: "a\u0085",
      },
      {
        input: "\u0085a",
        expected: "\u0085a",
      },
    ],
    "<control sequence introducer> (\\u009B)": [
      {
        input: "a\u009Bb",
        expected: "ab",
      },
      {
        input: "a\u009Bb\u009Bc",
        expected: "abc",
      },
      {
        input: "\u009Ba",
        expected: "a",
      },
      {
        input: "a\u009B",
        expected: "a",
      },
    ],
    "<no break space> (\\u00A0)": [
      {
        input: "a\u00A0b",
        expected: "a\u00A0b",
      },
      {
        input: "a\u00A0b\u00A0c",
        expected: "a\u00A0b\u00A0c",
      },
      {
        input: "a\u00A0",
        expected: "a\u00A0",
      },
      {
        input: "\u00A0a",
        expected: "\u00A0a",
      },
    ],
    "<en quad> (\\u2000)": [
      {
        input: "a\u2000b",
        expected: "a\u2000b",
      },
      {
        input: "a\u2000b\u2000c",
        expected: "a\u2000b\u2000c",
      },
      {
        input: "a\u2000",
        expected: "a\u2000",
      },
      {
        input: "\u2000a",
        expected: "\u2000a",
      },
    ],
    "<em quad> (\\u2001)": [
      {
        input: "a\u2001b",
        expected: "a\u2001b",
      },
      {
        input: "a\u2001b\u2001c",
        expected: "a\u2001b\u2001c",
      },
      {
        input: "a\u2001",
        expected: "a\u2001",
      },
      {
        input: "\u2001a",
        expected: "\u2001a",
      },
    ],
    "<en space> (\\u2002)": [
      {
        input: "a\u2002b",
        expected: "a\u2002b",
      },
      {
        input: "a\u2002b\u2002c",
        expected: "a\u2002b\u2002c",
      },
      {
        input: "a\u2002",
        expected: "a\u2002",
      },
      {
        input: "\u2002a",
        expected: "\u2002a",
      },
    ],
    "<em space> (\\u2003)": [
      {
        input: "a\u2003b",
        expected: "a\u2003b",
      },
      {
        input: "a\u2003b\u2003c",
        expected: "a\u2003b\u2003c",
      },
      {
        input: "a\u2003",
        expected: "a\u2003",
      },
      {
        input: "\u2003a",
        expected: "\u2003a",
      },
    ],
    "<three-per-em space> (\\u2004)": [
      {
        input: "a\u2004b",
        expected: "a\u2004b",
      },
      {
        input: "a\u2004b\u2004c",
        expected: "a\u2004b\u2004c",
      },
      {
        input: "a\u2004",
        expected: "a\u2004",
      },
      {
        input: "\u2004a",
        expected: "\u2004a",
      },
    ],
    "<four-per-em space> (\\u2005)": [
      {
        input: "a\u2005b",
        expected: "a\u2005b",
      },
      {
        input: "a\u2005b\u2005c",
        expected: "a\u2005b\u2005c",
      },
      {
        input: "a\u2005",
        expected: "a\u2005",
      },
      {
        input: "\u2005a",
        expected: "\u2005a",
      },
    ],
    "<six-per-em space> (\\u2006)": [
      {
        input: "a\u2006b",
        expected: "a\u2006b",
      },
      {
        input: "a\u2006b\u2006c",
        expected: "a\u2006b\u2006c",
      },
      {
        input: "a\u2006",
        expected: "a\u2006",
      },
      {
        input: "\u2006a",
        expected: "\u2006a",
      },
    ],
    "<figure space> (\\u2007)": [
      {
        input: "a\u2007b",
        expected: "a\u2007b",
      },
      {
        input: "a\u2007b\u2007c",
        expected: "a\u2007b\u2007c",
      },
      {
        input: "a\u2007",
        expected: "a\u2007",
      },
      {
        input: "\u2007a",
        expected: "\u2007a",
      },
    ],
    "<punctuation space> (\\u2008)": [
      {
        input: "a\u2008b",
        expected: "a\u2008b",
      },
      {
        input: "a\u2008b\u2008c",
        expected: "a\u2008b\u2008c",
      },
      {
        input: "a\u2008",
        expected: "a\u2008",
      },
      {
        input: "\u2008a",
        expected: "\u2008a",
      },
    ],
    "<thin space> (\\u2009)": [
      {
        input: "a\u2009b",
        expected: "a\u2009b",
      },
      {
        input: "a\u2009b\u2009c",
        expected: "a\u2009b\u2009c",
      },
      {
        input: "a\u2009",
        expected: "a\u2009",
      },
      {
        input: "\u2009a",
        expected: "\u2009a",
      },
    ],
    "<hair space> (\\u200A)": [
      {
        input: "a\u200Ab",
        expected: "a\u200Ab",
      },
      {
        input: "a\u200Ab\u200Ac",
        expected: "a\u200Ab\u200Ac",
      },
      {
        input: "a\u200A",
        expected: "a\u200A",
      },
      {
        input: "\u200Aa",
        expected: "\u200Aa",
      },
    ],
    "<line separator> (\\u2028)": [
      {
        input: "a\u2028b",
        expected: "a\u2028b",
      },
      {
        input: "a\u2028b\u2028c",
        expected: "a\u2028b\u2028c",
      },
      {
        input: "a\u2028",
        expected: "a\u2028",
      },
      {
        input: "\u2028a",
        expected: "\u2028a",
      },
    ],
    "<paragraph separator> (\\u2029)": [
      {
        input: "a\u2029b",
        expected: "a\u2029b",
      },
      {
        input: "a\u2029b\u2029c",
        expected: "a\u2029b\u2029c",
      },
      {
        input: "a\u2029",
        expected: "a\u2029",
      },
      {
        input: "\u2029a",
        expected: "\u2029a",
      },
    ],
    "<narrow no-break space> (\\u202F)": [
      {
        input: "a\u202Fb",
        expected: "a\u202Fb",
      },
      {
        input: "a\u202Fb\u202Fc",
        expected: "a\u202Fb\u202Fc",
      },
      {
        input: "a\u202F",
        expected: "a\u202F",
      },
      {
        input: "\u202Fa",
        expected: "\u202Fa",
      },
    ],
    "<medium mathematical space> (\\u205F)": [
      {
        input: "a\u205Fb",
        expected: "a\u205Fb",
      },
      {
        input: "a\u205Fb\u205Fc",
        expected: "a\u205Fb\u205Fc",
      },
      {
        input: "a\u205F",
        expected: "a\u205F",
      },
      {
        input: "\u205Fa",
        expected: "\u205Fa",
      },
    ],
    "<ideographic space> (\\u3000)": [
      {
        input: "a\u3000b",
        expected: "a\u3000b",
      },
      {
        input: "a\u3000b\u3000c",
        expected: "a\u3000b\u3000c",
      },
      {
        input: "a\u3000",
        expected: "a\u3000",
      },
      {
        input: "\u3000a",
        expected: "\u3000a",
      },
    ],
    "<zero width no-break space> (\\uFEFF)": [
      {
        input: "a\uFEFFb",
        expected: "a\uFEFFb",
      },
      {
        input: "a\uFEFFb\uFEFFc",
        expected: "a\uFEFFb\uFEFFc",
      },
      {
        input: "a\uFEFF",
        expected: "a\uFEFF",
      },
      {
        input: "\uFEFFa",
        expected: "\uFEFFa",
      },
    ],
    'single quotes ("\'")': [
      {
        input: "a'b",
        expected: "a'b",
      },
      {
        input: "a'b'c",
        expected: "a'b'c",
      },
      {
        input: "a'",
        expected: "a'",
      },
      {
        input: "'a",
        expected: "'a",
      },
    ],
    "double quotes ('\"')": [
      {
        input: 'a"b',
        expected: 'a"b',
      },
      {
        input: 'a"b"c',
        expected: 'a"b"c',
      },
      {
        input: 'a"',
        expected: 'a"',
      },
      {
        input: '"a',
        expected: '"a',
      },
    ],
    "backticks ('`')": [
      {
        input: "a`b",
        expected: "a`b",
      },
      {
        input: "a`b`c",
        expected: "a`b`c",
      },
      {
        input: "a`",
        expected: "a`",
      },
      {
        input: "`a",
        expected: "`a",
      },
    ],
    "at signs ('@')": [
      {
        input: "a@b",
        expected: "a@b",
      },
      {
        input: "a@b@c",
        expected: "a@b@c",
      },
      {
        input: "a@",
        expected: "a@",
      },
      {
        input: "@a",
        expected: "@a",
      },
    ],
    "hashtags ('#')": [
      {
        input: "a#b",
        expected: "a#b",
      },
      {
        input: "a#b#c",
        expected: "a#b#c",
      },
      {
        input: "a#",
        expected: "a#",
      },
      {
        input: "#a",
        expected: "#a",
      },
    ],
    "carets ('^')": [
      {
        input: "a^b",
        expected: "a^b",
      },
      {
        input: "a^b^c",
        expected: "a^b^c",
      },
      {
        input: "a^",
        expected: "a^",
      },
      {
        input: "^a",
        expected: "^a",
      },
    ],
    "carets ('^') + double quotes ('\"')": [
      {
        input: 'a"b^c',
        expected: 'a"b^c',
      },
      {
        input: 'a"b"c^d',
        expected: 'a"b"c^d',
      },
      {
        input: 'a^b"c',
        expected: 'a^b"c',
      },
    ],
    "dollar signs ('$')": [
      {
        input: "a$b",
        expected: "a$b",
      },
      {
        input: "a$b$c",
        expected: "a$b$c",
      },
      {
        input: "a$",
        expected: "a$",
      },
      {
        input: "$a",
        expected: "$a",
      },
    ],
    "percentage signs ('%')": [
      {
        input: "a%b",
        expected: "a%b",
      },
      {
        input: "a%b%c",
        expected: "a%b%c",
      },
      {
        input: "a%",
        expected: "a%",
      },
      {
        input: "%a",
        expected: "%a",
      },
    ],
    "percentage signs ('%') + double quotes ('\"')": [
      {
        input: 'a"b%c',
        expected: 'a"b%c',
      },
      {
        input: 'a"b"c%d',
        expected: 'a"b"c%d',
      },
      {
        input: 'a%b"c',
        expected: 'a%b"c',
      },
    ],
    "ampersands ('&')": [
      {
        input: "a&b",
        expected: "a&b",
      },
      {
        input: "a&b&c",
        expected: "a&b&c",
      },
      {
        input: "a&",
        expected: "a&",
      },
      {
        input: "&a",
        expected: "&a",
      },
    ],
    "ampersands ('&') + double quotes ('\"')": [
      {
        input: 'a"b&c',
        expected: 'a"b&c',
      },
      {
        input: 'a"b"c&d',
        expected: 'a"b"c&d',
      },
      {
        input: 'a&b"c',
        expected: 'a&b"c',
      },
    ],
    "hyphens ('-')": [
      {
        input: "a-b",
        expected: "a-b",
      },
      {
        input: "a-b-c",
        expected: "a-b-c",
      },
      {
        input: "a-",
        expected: "a-",
      },
      {
        input: "-a",
        expected: "-a",
      },
    ],
    "backslashes ('\\')": [
      {
        input: "a\\b",
        expected: "a\\b",
      },
      {
        input: "a\\b\\c",
        expected: "a\\b\\c",
      },
      {
        input: "a\\",
        expected: "a\\",
      },
      {
        input: "\\a",
        expected: "\\a",
      },
    ],
    "colons (':')": [
      {
        input: "a:b",
        expected: "a:b",
      },
      {
        input: "a:b:c",
        expected: "a:b:c",
      },
      {
        input: "a:",
        expected: "a:",
      },
      {
        input: ":a",
        expected: ":a",
      },
    ],
    "semicolons (';')": [
      {
        input: "a;b",
        expected: "a;b",
      },
      {
        input: "a;b;c",
        expected: "a;b;c",
      },
      {
        input: "a;",
        expected: "a;",
      },
      {
        input: ";a",
        expected: ";a",
      },
    ],
    "pipes ('|')": [
      {
        input: "a|b",
        expected: "a|b",
      },
      {
        input: "a|b|c",
        expected: "a|b|c",
      },
      {
        input: "a|",
        expected: "a|",
      },
      {
        input: "|a",
        expected: "|a",
      },
    ],
    "pipes ('|') + double quotes ('\"')": [
      {
        input: 'a"b|c',
        expected: 'a"b|c',
      },
      {
        input: 'a"b"c|d',
        expected: 'a"b"c|d',
      },
      {
        input: 'a|b"c',
        expected: 'a|b"c',
      },
    ],
    "comma (',')": [
      {
        input: "a,b",
        expected: "a,b",
      },
      {
        input: "a,b,c",
        expected: "a,b,c",
      },
      {
        input: "a,",
        expected: "a,",
      },
      {
        input: ",a",
        expected: ",a",
      },
    ],
    "parentheses ('(', ')')": [
      {
        input: "a(b",
        expected: "a(b",
      },
      {
        input: "a(b(c",
        expected: "a(b(c",
      },
      {
        input: "a(",
        expected: "a(",
      },
      {
        input: "(a",
        expected: "(a",
      },
      {
        input: "a)b",
        expected: "a)b",
      },
      {
        input: "a)b)c",
        expected: "a)b)c",
      },
      {
        input: "a)",
        expected: "a)",
      },
      {
        input: ")a",
        expected: ")a",
      },
      {
        input: "a(b)c",
        expected: "a(b)c",
      },
    ],
    "square brackets ('[', ']')": [
      {
        input: "a[b",
        expected: "a[b",
      },
      {
        input: "a[b[c",
        expected: "a[b[c",
      },
      {
        input: "a[",
        expected: "a[",
      },
      {
        input: "[a",
        expected: "[a",
      },
      {
        input: "a]b",
        expected: "a]b",
      },
      {
        input: "a]b]c",
        expected: "a]b]c",
      },
      {
        input: "a]",
        expected: "a]",
      },
      {
        input: "]a",
        expected: "]a",
      },
      {
        input: "a[b]c",
        expected: "a[b]c",
      },
    ],
    "curly brackets ('{', '}')": [
      {
        input: "a{b",
        expected: "a{b",
      },
      {
        input: "a{b{c",
        expected: "a{b{c",
      },
      {
        input: "a{",
        expected: "a{",
      },
      {
        input: "{a",
        expected: "{a",
      },
      {
        input: "a}b",
        expected: "a}b",
      },
      {
        input: "a}b}c",
        expected: "a}b}c",
      },
      {
        input: "a}",
        expected: "a}",
      },
      {
        input: "}a",
        expected: "}a",
      },
      {
        input: "a{b}c",
        expected: "a{b}c",
      },
    ],
    "angle brackets ('<', '>')": [
      {
        input: "a<b",
        expected: "a<b",
      },
      {
        input: "a<b<c",
        expected: "a<b<c",
      },
      {
        input: "a<",
        expected: "a<",
      },
      {
        input: "<a",
        expected: "<a",
      },
      {
        input: "a>b",
        expected: "a>b",
      },
      {
        input: "a>b>c",
        expected: "a>b>c",
      },
      {
        input: "a>",
        expected: "a>",
      },
      {
        input: ">a",
        expected: ">a",
      },
      {
        input: "a<b>c",
        expected: "a<b>c",
      },
    ],
    "angle brackets ('<', '>') + double quotes ('\"')": [
      {
        input: 'a"b>c',
        expected: 'a"b>c',
      },
      {
        input: 'a"b<c',
        expected: 'a"b<c',
      },
      {
        input: 'a"b"c>d',
        expected: 'a"b"c>d',
      },
      {
        input: 'a"b"c<d',
        expected: 'a"b"c<d',
      },
      {
        input: 'a>b"c',
        expected: 'a>b"c',
      },
      {
        input: 'a<b"c',
        expected: 'a<b"c',
      },
    ],
    "left double quotation mark ('“')": [
      {
        input: "a“b",
        expected: "a“b",
      },
      {
        input: "a“b“c",
        expected: "a“b“c",
      },
      {
        input: "a“",
        expected: "a“",
      },
      {
        input: "“a",
        expected: "“a",
      },
    ],
    "right double quotation mark ('”')": [
      {
        input: "a”b",
        expected: "a”b",
      },
      {
        input: "a”b”c",
        expected: "a”b”c",
      },
      {
        input: "a”",
        expected: "a”",
      },
      {
        input: "”a",
        expected: "”a",
      },
    ],
    "double low-9 quotation mark ('„')": [
      {
        input: "a„b",
        expected: "a„b",
      },
      {
        input: "a„b„c",
        expected: "a„b„c",
      },
      {
        input: "a„",
        expected: "a„",
      },
      {
        input: "„a",
        expected: "„a",
      },
    ],
    "left single quotation mark ('‘')": [
      {
        input: "a‘b",
        expected: "a‘b",
      },
      {
        input: "a‘b‘c",
        expected: "a‘b‘c",
      },
      {
        input: "a‘",
        expected: "a‘",
      },
      {
        input: "‘a",
        expected: "‘a",
      },
    ],
    "right single quotation mark ('’')": [
      {
        input: "a’b",
        expected: "a’b",
      },
      {
        input: "a’b’c",
        expected: "a’b’c",
      },
      {
        input: "a’",
        expected: "a’",
      },
      {
        input: "’a",
        expected: "’a",
      },
    ],
    "single low-9 quotation mark ('‚')": [
      {
        input: "a‚b",
        expected: "a‚b",
      },
      {
        input: "a‚b‚c",
        expected: "a‚b‚c",
      },
      {
        input: "a‚",
        expected: "a‚",
      },
      {
        input: "‚a",
        expected: "‚a",
      },
    ],
    "single high-reversed-9 quotation mark ('‛')": [
      {
        input: "a‛b",
        expected: "a‛b",
      },
      {
        input: "a‛b‛c",
        expected: "a‛b‛c",
      },
      {
        input: "a‛",
        expected: "a‛",
      },
      {
        input: "‛a",
        expected: "‛a",
      },
    ],
  },
  [binCmd]: {
    "sample strings": [
      {
        input: "foobar",
        expected: "foobar",
      },
    ],
    "<null> (\\0)": [
      {
        input: "a\u0000b",
        expected: "ab",
      },
      {
        input: "a\u0000b\u0000c",
        expected: "abc",
      },
      {
        input: "a\u0000",
        expected: "a",
      },
      {
        input: "\u0000a",
        expected: "a",
      },
    ],
    "<backspace> (\\b)": [
      {
        input: "a\bb",
        expected: "ab",
      },
      {
        input: "a\bb\bc",
        expected: "abc",
      },
      {
        input: "\ba",
        expected: "a",
      },
      {
        input: "a\b",
        expected: "a",
      },
    ],
    "<character tabulation> (\\t)": [
      {
        input: "a\tb",
        expected: "a\tb",
      },
      {
        input: "a\tb\tc",
        expected: "a\tb\tc",
      },
      {
        input: "a\t",
        expected: "a\t",
      },
      {
        input: "\ta",
        expected: "\ta",
      },
    ],
    "<end of line> (\\n)": [
      {
        input: "a\nb",
        expected: "a b",
      },
      {
        input: "a\nb\nc",
        expected: "a b c",
      },
      {
        input: "a\n",
        expected: "a ",
      },
      {
        input: "\na",
        expected: " a",
      },
    ],
    "<line tabulation> (\\v)": [
      {
        input: "a\vb",
        expected: "a\vb",
      },
      {
        input: "a\vb\vc",
        expected: "a\vb\vc",
      },
      {
        input: "a\v",
        expected: "a\v",
      },
      {
        input: "\va",
        expected: "\va",
      },
    ],
    "<form feed> (\\f)": [
      {
        input: "a\fb",
        expected: "a\fb",
      },
      {
        input: "a\fb\fc",
        expected: "a\fb\fc",
      },
      {
        input: "a\f",
        expected: "a\f",
      },
      {
        input: "\fa",
        expected: "\fa",
      },
    ],
    "<carriage return> (\\r)": [
      {
        input: "a\rb",
        expected: "ab",
      },
      {
        input: "a\rb\rc",
        expected: "abc",
      },
      {
        input: "\ra",
        expected: "a",
      },
      {
        input: "a\r",
        expected: "a",
      },
    ],
    "<carriage return> (\\r) + <end of line> (\\n)": [
      {
        input: "a\r\nb",
        expected: "a b",
      },
      {
        input: "a\r\nb\r\nc",
        expected: "a b c",
      },
      {
        input: "a\r\n",
        expected: "a ",
      },
      {
        input: "\r\na",
        expected: " a",
      },
    ],
    "<escape> (\\u001B)": [
      {
        input: "a\u001Bb",
        expected: "ab",
      },
      {
        input: "a\u001Bb\u001Bc",
        expected: "abc",
      },
      {
        input: "\u001Ba",
        expected: "a",
      },
      {
        input: "a\u001B",
        expected: "a",
      },
    ],
    "<space> (' ')": [
      {
        input: "a b",
        expected: "a b",
      },
      {
        input: "a b c",
        expected: "a b c",
      },
      {
        input: "a ",
        expected: "a ",
      },
      {
        input: " a",
        expected: " a",
      },
    ],
    "<next line> (\\u0085)": [
      {
        input: "a\u0085b",
        expected: "a\u0085b",
      },
      {
        input: "a\u0085b\u0085c",
        expected: "a\u0085b\u0085c",
      },
      {
        input: "a\u0085",
        expected: "a\u0085",
      },
      {
        input: "\u0085a",
        expected: "\u0085a",
      },
    ],
    "<control sequence introducer> (\\u009B)": [
      {
        input: "a\u009Bb",
        expected: "ab",
      },
      {
        input: "a\u009Bb\u009Bc",
        expected: "abc",
      },
      {
        input: "\u009Ba",
        expected: "a",
      },
      {
        input: "a\u009B",
        expected: "a",
      },
    ],
    "<no break space> (\\u00A0)": [
      {
        input: "a\u00A0b",
        expected: "a\u00A0b",
      },
      {
        input: "a\u00A0b\u00A0c",
        expected: "a\u00A0b\u00A0c",
      },
      {
        input: "a\u00A0",
        expected: "a\u00A0",
      },
      {
        input: "\u00A0a",
        expected: "\u00A0a",
      },
    ],
    "<en quad> (\\u2000)": [
      {
        input: "a\u2000b",
        expected: "a\u2000b",
      },
      {
        input: "a\u2000b\u2000c",
        expected: "a\u2000b\u2000c",
      },
      {
        input: "a\u2000",
        expected: "a\u2000",
      },
      {
        input: "\u2000a",
        expected: "\u2000a",
      },
    ],
    "<em quad> (\\u2001)": [
      {
        input: "a\u2001b",
        expected: "a\u2001b",
      },
      {
        input: "a\u2001b\u2001c",
        expected: "a\u2001b\u2001c",
      },
      {
        input: "a\u2001",
        expected: "a\u2001",
      },
      {
        input: "\u2001a",
        expected: "\u2001a",
      },
    ],
    "<en space> (\\u2002)": [
      {
        input: "a\u2002b",
        expected: "a\u2002b",
      },
      {
        input: "a\u2002b\u2002c",
        expected: "a\u2002b\u2002c",
      },
      {
        input: "a\u2002",
        expected: "a\u2002",
      },
      {
        input: "\u2002a",
        expected: "\u2002a",
      },
    ],
    "<em space> (\\u2003)": [
      {
        input: "a\u2003b",
        expected: "a\u2003b",
      },
      {
        input: "a\u2003b\u2003c",
        expected: "a\u2003b\u2003c",
      },
      {
        input: "a\u2003",
        expected: "a\u2003",
      },
      {
        input: "\u2003a",
        expected: "\u2003a",
      },
    ],
    "<three-per-em space> (\\u2004)": [
      {
        input: "a\u2004b",
        expected: "a\u2004b",
      },
      {
        input: "a\u2004b\u2004c",
        expected: "a\u2004b\u2004c",
      },
      {
        input: "a\u2004",
        expected: "a\u2004",
      },
      {
        input: "\u2004a",
        expected: "\u2004a",
      },
    ],
    "<four-per-em space> (\\u2005)": [
      {
        input: "a\u2005b",
        expected: "a\u2005b",
      },
      {
        input: "a\u2005b\u2005c",
        expected: "a\u2005b\u2005c",
      },
      {
        input: "a\u2005",
        expected: "a\u2005",
      },
      {
        input: "\u2005a",
        expected: "\u2005a",
      },
    ],
    "<six-per-em space> (\\u2006)": [
      {
        input: "a\u2006b",
        expected: "a\u2006b",
      },
      {
        input: "a\u2006b\u2006c",
        expected: "a\u2006b\u2006c",
      },
      {
        input: "a\u2006",
        expected: "a\u2006",
      },
      {
        input: "\u2006a",
        expected: "\u2006a",
      },
    ],
    "<figure space> (\\u2007)": [
      {
        input: "a\u2007b",
        expected: "a\u2007b",
      },
      {
        input: "a\u2007b\u2007c",
        expected: "a\u2007b\u2007c",
      },
      {
        input: "a\u2007",
        expected: "a\u2007",
      },
      {
        input: "\u2007a",
        expected: "\u2007a",
      },
    ],
    "<punctuation space> (\\u2008)": [
      {
        input: "a\u2008b",
        expected: "a\u2008b",
      },
      {
        input: "a\u2008b\u2008c",
        expected: "a\u2008b\u2008c",
      },
      {
        input: "a\u2008",
        expected: "a\u2008",
      },
      {
        input: "\u2008a",
        expected: "\u2008a",
      },
    ],
    "<thin space> (\\u2009)": [
      {
        input: "a\u2009b",
        expected: "a\u2009b",
      },
      {
        input: "a\u2009b\u2009c",
        expected: "a\u2009b\u2009c",
      },
      {
        input: "a\u2009",
        expected: "a\u2009",
      },
      {
        input: "\u2009a",
        expected: "\u2009a",
      },
    ],
    "<hair space> (\\u200A)": [
      {
        input: "a\u200Ab",
        expected: "a\u200Ab",
      },
      {
        input: "a\u200Ab\u200Ac",
        expected: "a\u200Ab\u200Ac",
      },
      {
        input: "a\u200A",
        expected: "a\u200A",
      },
      {
        input: "\u200Aa",
        expected: "\u200Aa",
      },
    ],
    "<line separator> (\\u2028)": [
      {
        input: "a\u2028b",
        expected: "a\u2028b",
      },
      {
        input: "a\u2028b\u2028c",
        expected: "a\u2028b\u2028c",
      },
      {
        input: "a\u2028",
        expected: "a\u2028",
      },
      {
        input: "\u2028a",
        expected: "\u2028a",
      },
    ],
    "<paragraph separator> (\\u2029)": [
      {
        input: "a\u2029b",
        expected: "a\u2029b",
      },
      {
        input: "a\u2029b\u2029c",
        expected: "a\u2029b\u2029c",
      },
      {
        input: "a\u2029",
        expected: "a\u2029",
      },
      {
        input: "\u2029a",
        expected: "\u2029a",
      },
    ],
    "<narrow no-break space> (\\u202F)": [
      {
        input: "a\u202Fb",
        expected: "a\u202Fb",
      },
      {
        input: "a\u202Fb\u202Fc",
        expected: "a\u202Fb\u202Fc",
      },
      {
        input: "a\u202F",
        expected: "a\u202F",
      },
      {
        input: "\u202Fa",
        expected: "\u202Fa",
      },
    ],
    "<medium mathematical space> (\\u205F)": [
      {
        input: "a\u205Fb",
        expected: "a\u205Fb",
      },
      {
        input: "a\u205Fb\u205Fc",
        expected: "a\u205Fb\u205Fc",
      },
      {
        input: "a\u205F",
        expected: "a\u205F",
      },
      {
        input: "\u205Fa",
        expected: "\u205Fa",
      },
    ],
    "<ideographic space> (\\u3000)": [
      {
        input: "a\u3000b",
        expected: "a\u3000b",
      },
      {
        input: "a\u3000b\u3000c",
        expected: "a\u3000b\u3000c",
      },
      {
        input: "a\u3000",
        expected: "a\u3000",
      },
      {
        input: "\u3000a",
        expected: "\u3000a",
      },
    ],
    "<zero width no-break space> (\\uFEFF)": [
      {
        input: "a\uFEFFb",
        expected: "a\uFEFFb",
      },
      {
        input: "a\uFEFFb\uFEFFc",
        expected: "a\uFEFFb\uFEFFc",
      },
      {
        input: "a\uFEFF",
        expected: "a\uFEFF",
      },
      {
        input: "\uFEFFa",
        expected: "\uFEFFa",
      },
    ],
    'single quotes ("\'")': [
      {
        input: "a'b",
        expected: "a'b",
      },
      {
        input: "a'b'c",
        expected: "a'b'c",
      },
      {
        input: "a'",
        expected: "a'",
      },
      {
        input: "'a",
        expected: "'a",
      },
    ],
    "double quotes ('\"')": [
      {
        input: 'a"b',
        expected: 'a\\^"b',
      },
      {
        input: 'a"b"c',
        expected: 'a\\^"b\\^"c',
      },
      {
        input: 'a"',
        expected: 'a\\^"',
      },
      {
        input: '"a',
        expected: '\\^"a',
      },
    ],
    "backticks ('`')": [
      {
        input: "a`b",
        expected: "a`b",
      },
      {
        input: "a`b`c",
        expected: "a`b`c",
      },
      {
        input: "a`",
        expected: "a`",
      },
      {
        input: "`a",
        expected: "`a",
      },
    ],
    "at signs ('@')": [
      {
        input: "a@b",
        expected: "a@b",
      },
      {
        input: "a@b@c",
        expected: "a@b@c",
      },
      {
        input: "a@",
        expected: "a@",
      },
      {
        input: "@a",
        expected: "@a",
      },
    ],
    "hashtags ('#')": [
      {
        input: "a#b",
        expected: "a#b",
      },
      {
        input: "a#b#c",
        expected: "a#b#c",
      },
      {
        input: "a#",
        expected: "a#",
      },
      {
        input: "#a",
        expected: "#a",
      },
    ],
    "carets ('^')": [
      {
        input: "a^b",
        expected: "a^^b",
      },
      {
        input: "a^b^c",
        expected: "a^^b^^c",
      },
      {
        input: "a^",
        expected: "a^^",
      },
      {
        input: "^a",
        expected: "^^a",
      },
    ],
    "carets ('^') + double quotes ('\"')": [
      {
        input: 'a"b^c',
        expected: 'a\\^"b^^c',
      },
      {
        input: 'a"b"c^d',
        expected: 'a\\^"b\\^"c^^d',
      },
      {
        input: 'a^b"c',
        expected: 'a^^b\\^"c',
      },
    ],
    "dollar signs ('$')": [
      {
        input: "a$b",
        expected: "a$b",
      },
      {
        input: "a$b$c",
        expected: "a$b$c",
      },
      {
        input: "a$",
        expected: "a$",
      },
      {
        input: "$a",
        expected: "$a",
      },
    ],
    "percentage signs ('%')": [
      {
        input: "a%b",
        expected: "a^%b",
      },
      {
        input: "a%b%c",
        expected: "a^%b^%c",
      },
      {
        input: "a%",
        expected: "a^%",
      },
      {
        input: "%a",
        expected: "^%a",
      },
    ],
    "percentage signs ('%') + double quotes ('\"')": [
      {
        input: 'a"b%c',
        expected: 'a\\^"b^%c',
      },
      {
        input: 'a"b"c%d',
        expected: 'a\\^"b\\^"c^%d',
      },
      {
        input: 'a%b"c',
        expected: 'a^%b\\^"c',
      },
    ],
    "ampersands ('&')": [
      {
        input: "a&b",
        expected: "a^&b",
      },
      {
        input: "a&b&c",
        expected: "a^&b^&c",
      },
      {
        input: "a&",
        expected: "a^&",
      },
      {
        input: "&a",
        expected: "^&a",
      },
    ],
    "ampersands ('&') + double quotes ('\"')": [
      {
        input: 'a"b&c',
        expected: 'a\\^"b^&c',
      },
      {
        input: 'a"b"c&d',
        expected: 'a\\^"b\\^"c^&d',
      },
      {
        input: 'a&b"c',
        expected: 'a^&b\\^"c',
      },
    ],
    "hyphens ('-')": [
      {
        input: "a-b",
        expected: "a-b",
      },
      {
        input: "a-b-c",
        expected: "a-b-c",
      },
      {
        input: "a-",
        expected: "a-",
      },
      {
        input: "-a",
        expected: "-a",
      },
    ],
    "backslashes ('\\')": [
      {
        input: "a\\b",
        expected: "a\\b",
      },
      {
        input: "a\\b\\c",
        expected: "a\\b\\c",
      },
      {
        input: "a\\",
        expected: "a\\",
      },
      {
        input: "\\a",
        expected: "\\a",
      },
    ],
    "colons (':')": [
      {
        input: "a:b",
        expected: "a:b",
      },
      {
        input: "a:b:c",
        expected: "a:b:c",
      },
      {
        input: "a:",
        expected: "a:",
      },
      {
        input: ":a",
        expected: ":a",
      },
    ],
    "semicolons (';')": [
      {
        input: "a;b",
        expected: "a;b",
      },
      {
        input: "a;b;c",
        expected: "a;b;c",
      },
      {
        input: "a;",
        expected: "a;",
      },
      {
        input: ";a",
        expected: ";a",
      },
    ],
    "pipes ('|')": [
      {
        input: "a|b",
        expected: "a^|b",
      },
      {
        input: "a|b|c",
        expected: "a^|b^|c",
      },
      {
        input: "a|",
        expected: "a^|",
      },
      {
        input: "|a",
        expected: "^|a",
      },
    ],
    "pipes ('|') + double quotes ('\"')": [
      {
        input: 'a"b|c',
        expected: 'a\\^"b^|c',
      },
      {
        input: 'a"b"c|d',
        expected: 'a\\^"b\\^"c^|d',
      },
      {
        input: 'a|b"c',
        expected: 'a^|b\\^"c',
      },
    ],
    "comma (',')": [
      {
        input: "a,b",
        expected: "a,b",
      },
      {
        input: "a,b,c",
        expected: "a,b,c",
      },
      {
        input: "a,",
        expected: "a,",
      },
      {
        input: ",a",
        expected: ",a",
      },
    ],
    "parentheses ('(', ')')": [
      {
        input: "a(b",
        expected: "a(b",
      },
      {
        input: "a(b(c",
        expected: "a(b(c",
      },
      {
        input: "a(",
        expected: "a(",
      },
      {
        input: "(a",
        expected: "(a",
      },
      {
        input: "a)b",
        expected: "a)b",
      },
      {
        input: "a)b)c",
        expected: "a)b)c",
      },
      {
        input: "a)",
        expected: "a)",
      },
      {
        input: ")a",
        expected: ")a",
      },
      {
        input: "a(b)c",
        expected: "a(b)c",
      },
    ],
    "square brackets ('[', ']')": [
      {
        input: "a[b",
        expected: "a[b",
      },
      {
        input: "a[b[c",
        expected: "a[b[c",
      },
      {
        input: "a[",
        expected: "a[",
      },
      {
        input: "[a",
        expected: "[a",
      },
      {
        input: "a]b",
        expected: "a]b",
      },
      {
        input: "a]b]c",
        expected: "a]b]c",
      },
      {
        input: "a]",
        expected: "a]",
      },
      {
        input: "]a",
        expected: "]a",
      },
      {
        input: "a[b]c",
        expected: "a[b]c",
      },
    ],
    "curly brackets ('{', '}')": [
      {
        input: "a{b",
        expected: "a{b",
      },
      {
        input: "a{b{c",
        expected: "a{b{c",
      },
      {
        input: "a{",
        expected: "a{",
      },
      {
        input: "{a",
        expected: "{a",
      },
      {
        input: "a}b",
        expected: "a}b",
      },
      {
        input: "a}b}c",
        expected: "a}b}c",
      },
      {
        input: "a}",
        expected: "a}",
      },
      {
        input: "}a",
        expected: "}a",
      },
      {
        input: "a{b}c",
        expected: "a{b}c",
      },
    ],
    "angle brackets ('<', '>')": [
      {
        input: "a<b",
        expected: "a^<b",
      },
      {
        input: "a<b<c",
        expected: "a^<b^<c",
      },
      {
        input: "a<",
        expected: "a^<",
      },
      {
        input: "<a",
        expected: "^<a",
      },
      {
        input: "a>b",
        expected: "a^>b",
      },
      {
        input: "a>b>c",
        expected: "a^>b^>c",
      },
      {
        input: "a>",
        expected: "a^>",
      },
      {
        input: ">a",
        expected: "^>a",
      },
      {
        input: "a<b>c",
        expected: "a^<b^>c",
      },
    ],
    "angle brackets ('<', '>') + double quotes ('\"')": [
      {
        input: 'a"b>c',
        expected: 'a\\^"b^>c',
      },
      {
        input: 'a"b<c',
        expected: 'a\\^"b^<c',
      },
      {
        input: 'a"b"c>d',
        expected: 'a\\^"b\\^"c^>d',
      },
      {
        input: 'a"b"c<d',
        expected: 'a\\^"b\\^"c^<d',
      },
      {
        input: 'a>b"c',
        expected: 'a^>b\\^"c',
      },
      {
        input: 'a<b"c',
        expected: 'a^<b\\^"c',
      },
    ],
    "left double quotation mark ('“')": [
      {
        input: "a“b",
        expected: "a“b",
      },
      {
        input: "a“b“c",
        expected: "a“b“c",
      },
      {
        input: "a“",
        expected: "a“",
      },
      {
        input: "“a",
        expected: "“a",
      },
    ],
    "right double quotation mark ('”')": [
      {
        input: "a”b",
        expected: "a”b",
      },
      {
        input: "a”b”c",
        expected: "a”b”c",
      },
      {
        input: "a”",
        expected: "a”",
      },
      {
        input: "”a",
        expected: "”a",
      },
    ],
    "double low-9 quotation mark ('„')": [
      {
        input: "a„b",
        expected: "a„b",
      },
      {
        input: "a„b„c",
        expected: "a„b„c",
      },
      {
        input: "a„",
        expected: "a„",
      },
      {
        input: "„a",
        expected: "„a",
      },
    ],
    "left single quotation mark ('‘')": [
      {
        input: "a‘b",
        expected: "a‘b",
      },
      {
        input: "a‘b‘c",
        expected: "a‘b‘c",
      },
      {
        input: "a‘",
        expected: "a‘",
      },
      {
        input: "‘a",
        expected: "‘a",
      },
    ],
    "right single quotation mark ('’')": [
      {
        input: "a’b",
        expected: "a’b",
      },
      {
        input: "a’b’c",
        expected: "a’b’c",
      },
      {
        input: "a’",
        expected: "a’",
      },
      {
        input: "’a",
        expected: "’a",
      },
    ],
    "single low-9 quotation mark ('‚')": [
      {
        input: "a‚b",
        expected: "a‚b",
      },
      {
        input: "a‚b‚c",
        expected: "a‚b‚c",
      },
      {
        input: "a‚",
        expected: "a‚",
      },
      {
        input: "‚a",
        expected: "‚a",
      },
    ],
    "single high-reversed-9 quotation mark ('‛')": [
      {
        input: "a‛b",
        expected: "a‛b",
      },
      {
        input: "a‛b‛c",
        expected: "a‛b‛c",
      },
      {
        input: "a‛",
        expected: "a‛",
      },
      {
        input: "‛a",
        expected: "‛a",
      },
    ],
  },
  [binPowerShell]: {
    "sample strings": [
      {
        input: "foobar",
        expected: "foobar",
      },
    ],
    "<null> (\\0)": [
      {
        input: "a\u0000b",
        expected: "ab",
      },
      {
        input: "a\u0000b\u0000c",
        expected: "abc",
      },
      {
        input: "a\u0000",
        expected: "a",
      },
      {
        input: "\u0000a",
        expected: "a",
      },
    ],
    "<backspace> (\\b)": [
      {
        input: "a\bb",
        expected: "ab",
      },
      {
        input: "a\bb\bc",
        expected: "abc",
      },
      {
        input: "\ba",
        expected: "a",
      },
      {
        input: "a\b",
        expected: "a",
      },
    ],
    "<character tabulation> (\\t)": [
      {
        input: "a\tb",
        expected: "a`\tb",
      },
      {
        input: "a\tb\tc",
        expected: "a`\tb`\tc",
      },
      {
        input: "a\t",
        expected: "a`\t",
      },
      {
        input: "\ta",
        expected: "`\ta",
      },
    ],
    "<end of line> (\\n)": [
      {
        input: "a\nb",
        expected: "a` b",
      },
      {
        input: "a\nb\nc",
        expected: "a` b` c",
      },
      {
        input: "a\n",
        expected: "a` ",
      },
      {
        input: "\na",
        expected: "` a",
      },
    ],
    "<line tabulation> (\\v)": [
      {
        input: "a\vb",
        expected: "a`\vb",
      },
      {
        input: "a\vb\vc",
        expected: "a`\vb`\vc",
      },
      {
        input: "a\v",
        expected: "a`\v",
      },
      {
        input: "\va",
        expected: "`\va",
      },
    ],
    "<form feed> (\\f)": [
      {
        input: "a\fb",
        expected: "a`\fb",
      },
      {
        input: "a\fb\fc",
        expected: "a`\fb`\fc",
      },
      {
        input: "a\f",
        expected: "a`\f",
      },
      {
        input: "\fa",
        expected: "`\fa",
      },
    ],
    "<carriage return> (\\r)": [
      {
        input: "a\rb",
        expected: "ab",
      },
      {
        input: "a\rb\rc",
        expected: "abc",
      },
      {
        input: "\ra",
        expected: "a",
      },
      {
        input: "a\r",
        expected: "a",
      },
    ],
    "<carriage return> (\\r) + <end of line> (\\n)": [
      {
        input: "a\r\nb",
        expected: "a` b",
      },
      {
        input: "a\r\nb\r\nc",
        expected: "a` b` c",
      },
      {
        input: "a\r\n",
        expected: "a` ",
      },
      {
        input: "\r\na",
        expected: "` a",
      },
    ],
    "<escape> (\\u001B)": [
      {
        input: "a\u001Bb",
        expected: "ab",
      },
      {
        input: "a\u001Bb\u001Bc",
        expected: "abc",
      },
      {
        input: "\u001Ba",
        expected: "a",
      },
      {
        input: "a\u001B",
        expected: "a",
      },
    ],
    "<space> (' ')": [
      {
        input: "a b",
        expected: "a` b",
      },
      {
        input: "a b c",
        expected: "a` b` c",
      },
      {
        input: "a ",
        expected: "a` ",
      },
      {
        input: " a",
        expected: "` a",
      },
    ],
    "<next line> (\\u0085)": [
      {
        input: "a\u0085b",
        expected: "a`\u0085b",
      },
      {
        input: "a\u0085b\u0085c",
        expected: "a`\u0085b`\u0085c",
      },
      {
        input: "a\u0085",
        expected: "a`\u0085",
      },
      {
        input: "\u0085a",
        expected: "`\u0085a",
      },
    ],
    "<control sequence introducer> (\\u009B)": [
      {
        input: "a\u009Bb",
        expected: "ab",
      },
      {
        input: "a\u009Bb\u009Bc",
        expected: "abc",
      },
      {
        input: "\u009Ba",
        expected: "a",
      },
      {
        input: "a\u009B",
        expected: "a",
      },
    ],
    "<no break space> (\\u00A0)": [
      {
        input: "a\u00A0b",
        expected: "a`\u00A0b",
      },
      {
        input: "a\u00A0b\u00A0c",
        expected: "a`\u00A0b`\u00A0c",
      },
      {
        input: "a\u00A0",
        expected: "a`\u00A0",
      },
      {
        input: "\u00A0a",
        expected: "`\u00A0a",
      },
    ],
    "<ogham space mark> (\\u1680)": [
      {
        input: "a\u1680b",
        expected: "a`\u1680b",
      },
      {
        input: "a\u1680b\u1680c",
        expected: "a`\u1680b`\u1680c",
      },
      {
        input: "a\u1680",
        expected: "a`\u1680",
      },
      {
        input: "\u1680a",
        expected: "`\u1680a",
      },
    ],
    "<en quad> (\\u2000)": [
      {
        input: "a\u2000b",
        expected: "a`\u2000b",
      },
      {
        input: "a\u2000b\u2000c",
        expected: "a`\u2000b`\u2000c",
      },
      {
        input: "a\u2000",
        expected: "a`\u2000",
      },
      {
        input: "\u2000a",
        expected: "`\u2000a",
      },
    ],
    "<em quad> (\\u2001)": [
      {
        input: "a\u2001b",
        expected: "a`\u2001b",
      },
      {
        input: "a\u2001b\u2001c",
        expected: "a`\u2001b`\u2001c",
      },
      {
        input: "a\u2001",
        expected: "a`\u2001",
      },
      {
        input: "\u2001a",
        expected: "`\u2001a",
      },
    ],
    "<en space> (\\u2002)": [
      {
        input: "a\u2002b",
        expected: "a`\u2002b",
      },
      {
        input: "a\u2002b\u2002c",
        expected: "a`\u2002b`\u2002c",
      },
      {
        input: "a\u2002",
        expected: "a`\u2002",
      },
      {
        input: "\u2002a",
        expected: "`\u2002a",
      },
    ],
    "<em space> (\\u2003)": [
      {
        input: "a\u2003b",
        expected: "a`\u2003b",
      },
      {
        input: "a\u2003b\u2003c",
        expected: "a`\u2003b`\u2003c",
      },
      {
        input: "a\u2003",
        expected: "a`\u2003",
      },
      {
        input: "\u2003a",
        expected: "`\u2003a",
      },
    ],
    "<three-per-em space> (\\u2004)": [
      {
        input: "a\u2004b",
        expected: "a`\u2004b",
      },
      {
        input: "a\u2004b\u2004c",
        expected: "a`\u2004b`\u2004c",
      },
      {
        input: "a\u2004",
        expected: "a`\u2004",
      },
      {
        input: "\u2004a",
        expected: "`\u2004a",
      },
    ],
    "<four-per-em space> (\\u2005)": [
      {
        input: "a\u2005b",
        expected: "a`\u2005b",
      },
      {
        input: "a\u2005b\u2005c",
        expected: "a`\u2005b`\u2005c",
      },
      {
        input: "a\u2005",
        expected: "a`\u2005",
      },
      {
        input: "\u2005a",
        expected: "`\u2005a",
      },
    ],
    "<six-per-em space> (\\u2006)": [
      {
        input: "a\u2006b",
        expected: "a`\u2006b",
      },
      {
        input: "a\u2006b\u2006c",
        expected: "a`\u2006b`\u2006c",
      },
      {
        input: "a\u2006",
        expected: "a`\u2006",
      },
      {
        input: "\u2006a",
        expected: "`\u2006a",
      },
    ],
    "<figure space> (\\u2007)": [
      {
        input: "a\u2007b",
        expected: "a`\u2007b",
      },
      {
        input: "a\u2007b\u2007c",
        expected: "a`\u2007b`\u2007c",
      },
      {
        input: "a\u2007",
        expected: "a`\u2007",
      },
      {
        input: "\u2007a",
        expected: "`\u2007a",
      },
    ],
    "<punctuation space> (\\u2008)": [
      {
        input: "a\u2008b",
        expected: "a`\u2008b",
      },
      {
        input: "a\u2008b\u2008c",
        expected: "a`\u2008b`\u2008c",
      },
      {
        input: "a\u2008",
        expected: "a`\u2008",
      },
      {
        input: "\u2008a",
        expected: "`\u2008a",
      },
    ],
    "<thin space> (\\u2009)": [
      {
        input: "a\u2009b",
        expected: "a`\u2009b",
      },
      {
        input: "a\u2009b\u2009c",
        expected: "a`\u2009b`\u2009c",
      },
      {
        input: "a\u2009",
        expected: "a`\u2009",
      },
      {
        input: "\u2009a",
        expected: "`\u2009a",
      },
    ],
    "<hair space> (\\u200A)": [
      {
        input: "a\u200Ab",
        expected: "a`\u200Ab",
      },
      {
        input: "a\u200Ab\u200Ac",
        expected: "a`\u200Ab`\u200Ac",
      },
      {
        input: "a\u200A",
        expected: "a`\u200A",
      },
      {
        input: "\u200Aa",
        expected: "`\u200Aa",
      },
    ],
    "<line separator> (\\u2028)": [
      {
        input: "a\u2028b",
        expected: "a`\u2028b",
      },
      {
        input: "a\u2028b\u2028c",
        expected: "a`\u2028b`\u2028c",
      },
      {
        input: "a\u2028",
        expected: "a`\u2028",
      },
      {
        input: "\u2028a",
        expected: "`\u2028a",
      },
    ],
    "<paragraph separator> (\\u2029)": [
      {
        input: "a\u2029b",
        expected: "a`\u2029b",
      },
      {
        input: "a\u2029b\u2029c",
        expected: "a`\u2029b`\u2029c",
      },
      {
        input: "a\u2029",
        expected: "a`\u2029",
      },
      {
        input: "\u2029a",
        expected: "`\u2029a",
      },
    ],
    "<narrow no-break space> (\\u202F)": [
      {
        input: "a\u202Fb",
        expected: "a`\u202Fb",
      },
      {
        input: "a\u202Fb\u202Fc",
        expected: "a`\u202Fb`\u202Fc",
      },
      {
        input: "a\u202F",
        expected: "a`\u202F",
      },
      {
        input: "\u202Fa",
        expected: "`\u202Fa",
      },
    ],
    "<medium mathematical space> (\\u205F)": [
      {
        input: "a\u205Fb",
        expected: "a`\u205Fb",
      },
      {
        input: "a\u205Fb\u205Fc",
        expected: "a`\u205Fb`\u205Fc",
      },
      {
        input: "a\u205F",
        expected: "a`\u205F",
      },
      {
        input: "\u205Fa",
        expected: "`\u205Fa",
      },
    ],
    "<ideographic space> (\\u3000)": [
      {
        input: "a\u3000b",
        expected: "a`\u3000b",
      },
      {
        input: "a\u3000b\u3000c",
        expected: "a`\u3000b`\u3000c",
      },
      {
        input: "a\u3000",
        expected: "a`\u3000",
      },
      {
        input: "\u3000a",
        expected: "`\u3000a",
      },
    ],
    "<zero width no-break space> (\\uFEFF)": [
      {
        input: "a\uFEFFb",
        expected: "a`\uFEFFb",
      },
      {
        input: "a\uFEFFb\uFEFFc",
        expected: "a`\uFEFFb`\uFEFFc",
      },
      {
        input: "a\uFEFF",
        expected: "a`\uFEFF",
      },
      {
        input: "\uFEFFa",
        expected: "`\uFEFFa",
      },
    ],
    'single quotes ("\'")': [
      {
        input: "a'b",
        expected: "a`'b",
      },
      {
        input: "a'b'c",
        expected: "a`'b`'c",
      },
      {
        input: "a'",
        expected: "a`'",
      },
      {
        input: "'a",
        expected: "`'a",
      },
    ],
    "double quotes ('\"')": [
      {
        input: 'a"b',
        expected: 'a\\`"b',
      },
      {
        input: 'a"b"c',
        expected: 'a\\`"b\\`"c',
      },
      {
        input: 'a"',
        expected: 'a\\`"',
      },
      {
        input: '"a',
        expected: '\\`"a',
      },
    ],
    "double quotes ('\"') + backslashes ('\\')": [
      {
        input: 'a\\"b',
        expected: 'a\\\\\\`"b',
      },
      {
        input: 'a\\\\"b',
        expected: 'a\\\\\\\\\\`"b',
      },
    ],
    "double quotes ('\"') + whitespace": [
      {
        input: 'a "b',
        expected: 'a` `"`"b',
      },
      {
        input: 'a "b "c',
        expected: 'a` `"`"b` `"`"c',
      },
      {
        input: 'a "',
        expected: 'a` `"`"',
      },
      {
        input: ' "a',
        expected: '` \\`"a',
      },
    ],
    "backticks ('`')": [
      {
        input: "a`b",
        expected: "a``b",
      },
      {
        input: "a`b`c",
        expected: "a``b``c",
      },
      {
        input: "a`",
        expected: "a``",
      },
      {
        input: "`a",
        expected: "``a",
      },
    ],
    "at signs ('@')": [
      {
        input: "a@b",
        expected: "a@b",
      },
      {
        input: "a@b@c",
        expected: "a@b@c",
      },
      {
        input: "a@",
        expected: "a@",
      },
      {
        input: "@a",
        expected: "`@a",
      },
      {
        input: "@a@b",
        expected: "`@a@b",
      },
    ],
    "at signs ('@') + whitespace": [
      {
        input: "a @b",
        expected: "a` `@b",
      },
      {
        input: "a\t@b",
        expected: "a`\t`@b",
      },
      {
        input: "a\u0085@b",
        expected: "a`\u0085`@b",
      },
    ],
    "hashtags ('#')": [
      {
        input: "a#b",
        expected: "a#b",
      },
      {
        input: "a#b#c",
        expected: "a#b#c",
      },
      {
        input: "a#",
        expected: "a#",
      },
      {
        input: "#a",
        expected: "`#a",
      },
      {
        input: "#a#b",
        expected: "`#a#b",
      },
    ],
    "hashtags ('#') + whitespace": [
      {
        input: "a #b",
        expected: "a` `#b",
      },
      {
        input: "a\t#b",
        expected: "a`\t`#b",
      },
      {
        input: "a\u0085#b",
        expected: "a`\u0085`#b",
      },
    ],
    "carets ('^')": [
      {
        input: "a^b",
        expected: "a^b",
      },
      {
        input: "a^b^c",
        expected: "a^b^c",
      },
      {
        input: "a^",
        expected: "a^",
      },
      {
        input: "^a",
        expected: "^a",
      },
    ],
    "dollar signs ('$')": [
      {
        input: "a$b",
        expected: "a`$b",
      },
      {
        input: "a$b$c",
        expected: "a`$b`$c",
      },
      {
        input: "a$",
        expected: "a`$",
      },
      {
        input: "$a",
        expected: "`$a",
      },
    ],
    "percentage signs ('%')": [
      {
        input: "a%b",
        expected: "a%b",
      },
      {
        input: "a%b%c",
        expected: "a%b%c",
      },
      {
        input: "a%",
        expected: "a%",
      },
      {
        input: "%a",
        expected: "%a",
      },
    ],
    "ampersands ('&')": [
      {
        input: "a&b",
        expected: "a`&b",
      },
      {
        input: "a&b&c",
        expected: "a`&b`&c",
      },
      {
        input: "a&",
        expected: "a`&",
      },
      {
        input: "&a",
        expected: "`&a",
      },
    ],
    "hyphens ('-')": [
      {
        input: "a-b",
        expected: "a-b",
      },
      {
        input: "a-b-c",
        expected: "a-b-c",
      },
      {
        input: "a-",
        expected: "a-",
      },
      {
        input: "-a",
        expected: "`-a",
      },
      {
        input: "-a-b",
        expected: "`-a-b",
      },
    ],
    "hyphens ('-') + whitespace": [
      {
        input: "a -b",
        expected: "a` `-b",
      },
      {
        input: "a\t-b",
        expected: "a`\t`-b",
      },
      {
        input: "a\u0085-b",
        expected: "a`\u0085`-b",
      },
    ],
    "backslashes ('\\')": [
      {
        input: "a\\b",
        expected: "a\\b",
      },
      {
        input: "a\\b\\c",
        expected: "a\\b\\c",
      },
      {
        input: "\\a",
        expected: "\\a",
      },
      {
        input: "a\\",
        expected: "a\\",
      },
    ],
    "backslashes ('\\') + whitespace": [
      {
        input: "a b\\c",
        expected: "a` b\\c",
      },
      {
        input: "a\\b c",
        expected: "a\\b` c",
      },
      {
        input: "a b\\",
        expected: "a` b\\\\",
      },
      {
        input: "a b\\\\",
        expected: "a` b\\\\\\\\",
      },
      {
        input: "\\a b",
        expected: "\\a` b",
      },
      {
        input: " a\\",
        expected: "` a\\",
      },
      {
        input: "  a\\",
        expected: "` ` a\\",
      },
      {
        input: " a b\\",
        expected: "` a` b\\\\",
      },
      {
        input: "  a b\\",
        expected: "` ` a` b\\\\",
      },
    ],
    "colons (':')": [
      {
        input: "a:b",
        expected: "a:b",
      },
      {
        input: "a:b:c",
        expected: "a:b:c",
      },
      {
        input: "a:",
        expected: "a:",
      },
      {
        input: ":a",
        expected: "`:a",
      },
      {
        input: ":a:b",
        expected: "`:a:b",
      },
    ],
    "colons (':') + whitespace": [
      {
        input: "a :b",
        expected: "a` `:b",
      },
      {
        input: "a\t:b",
        expected: "a`\t`:b",
      },
      {
        input: "a\u0085:b",
        expected: "a`\u0085`:b",
      },
    ],
    "semicolons (';')": [
      {
        input: "a;b",
        expected: "a`;b",
      },
      {
        input: "a;b;c",
        expected: "a`;b`;c",
      },
      {
        input: "a;",
        expected: "a`;",
      },
      {
        input: ";a",
        expected: "`;a",
      },
    ],
    "pipes ('|')": [
      {
        input: "a|b",
        expected: "a`|b",
      },
      {
        input: "a|b|c",
        expected: "a`|b`|c",
      },
      {
        input: "a|",
        expected: "a`|",
      },
      {
        input: "|a",
        expected: "`|a",
      },
    ],
    "comma (',')": [
      {
        input: "a,b",
        expected: "a`,b",
      },
      {
        input: "a,b,c",
        expected: "a`,b`,c",
      },
      {
        input: "a,",
        expected: "a`,",
      },
      {
        input: ",a",
        expected: "`,a",
      },
    ],
    "parentheses ('(', ')')": [
      {
        input: "a(b",
        expected: "a`(b",
      },
      {
        input: "a(b(c",
        expected: "a`(b`(c",
      },
      {
        input: "a(",
        expected: "a`(",
      },
      {
        input: "(a",
        expected: "`(a",
      },
      {
        input: "a)b",
        expected: "a`)b",
      },
      {
        input: "a)b)c",
        expected: "a`)b`)c",
      },
      {
        input: "a)",
        expected: "a`)",
      },
      {
        input: ")a",
        expected: "`)a",
      },
      {
        input: "a(b)c",
        expected: "a`(b`)c",
      },
    ],
    "square brackets ('[', ']')": [
      {
        input: "a[b",
        expected: "a[b",
      },
      {
        input: "a[b[c",
        expected: "a[b[c",
      },
      {
        input: "a[",
        expected: "a[",
      },
      {
        input: "[a",
        expected: "[a",
      },
      {
        input: "a]b",
        expected: "a]b",
      },
      {
        input: "a]b]c",
        expected: "a]b]c",
      },
      {
        input: "a]",
        expected: "a]",
      },
      {
        input: "]a",
        expected: "`]a",
      },
      {
        input: "a[b]c",
        expected: "a[b]c",
      },
    ],
    "square brackets ('[', ']') + whitespace": [
      {
        input: "a [b",
        expected: "a` [b",
      },
      {
        input: "a\t[b",
        expected: "a`\t[b",
      },
      {
        input: "a\u0085[b",
        expected: "a`\u0085[b",
      },
      {
        input: "a ]b",
        expected: "a` `]b",
      },
      {
        input: "a\t]b",
        expected: "a`\t`]b",
      },
      {
        input: "a\u0085]b",
        expected: "a`\u0085`]b",
      },
    ],
    "curly brackets ('{', '}')": [
      {
        input: "a{b",
        expected: "a`{b",
      },
      {
        input: "a{b{c",
        expected: "a`{b`{c",
      },
      {
        input: "a{",
        expected: "a`{",
      },
      {
        input: "{a",
        expected: "`{a",
      },
      {
        input: "a}b",
        expected: "a`}b",
      },
      {
        input: "a}b}c",
        expected: "a`}b`}c",
      },
      {
        input: "a}",
        expected: "a`}",
      },
      {
        input: "}a",
        expected: "`}a",
      },
      {
        input: "a{b}c",
        expected: "a`{b`}c",
      },
    ],
    "angle brackets ('<', '>')": [
      {
        input: "a<b",
        expected: "a<b",
      },
      {
        input: "a<b<c",
        expected: "a<b<c",
      },
      {
        input: "a<",
        expected: "a<",
      },
      {
        input: "<a",
        expected: "`<a",
      },
      {
        input: "a>b",
        expected: "a>b",
      },
      {
        input: "a>b>c",
        expected: "a>b>c",
      },
      {
        input: "a>",
        expected: "a>",
      },
      {
        input: ">a",
        expected: "`>a",
      },
      {
        input: "a<b>c",
        expected: "a<b>c",
      },
    ],
    "angle brackets ('<', '>') + whitespace": [
      {
        input: "a <b",
        expected: "a` `<b",
      },
      {
        input: "a >b",
        expected: "a` `>b",
      },
      {
        input: "a\t<b",
        expected: "a`\t`<b",
      },
      {
        input: "a\t>b",
        expected: "a`\t`>b",
      },
      {
        input: "a\u0085<b",
        expected: "a`\u0085`<b",
      },
      {
        input: "a\u0085>b",
        expected: "a`\u0085`>b",
      },
    ],
    "right angle brackets ('>') + digits (/[0-9]/)": [
      {
        input: "1>a",
        expected: "1`>a",
      },
      {
        input: "2>a",
        expected: "2`>a",
      },
      {
        input: "3>a",
        expected: "3`>a",
      },
      {
        input: "4>a",
        expected: "4`>a",
      },
      {
        input: "5>a",
        expected: "5`>a",
      },
      {
        input: "6>a",
        expected: "6`>a",
      },
      {
        input: "7>a",
        expected: "7>a",
      },
      {
        input: "8>a",
        expected: "8>a",
      },
      {
        input: "9>a",
        expected: "9>a",
      },
      {
        input: "0>a",
        expected: "0>a",
      },
      {
        input: "a 1>b",
        expected: "a` 1`>b",
      },
      {
        input: "a 2>b",
        expected: "a` 2`>b",
      },
      {
        input: "a 3>b",
        expected: "a` 3`>b",
      },
      {
        input: "a 4>b",
        expected: "a` 4`>b",
      },
      {
        input: "a 5>b",
        expected: "a` 5`>b",
      },
      {
        input: "a 6>b",
        expected: "a` 6`>b",
      },
      {
        input: "a 7>b",
        expected: "a` 7>b",
      },
      {
        input: "a 8>b",
        expected: "a` 8>b",
      },
      {
        input: "a 9>b",
        expected: "a` 9>b",
      },
      {
        input: "a 0>b",
        expected: "a` 0>b",
      },
      {
        input: "a\t1>b",
        expected: "a`\t1`>b",
      },
      {
        input: "a\t2>b",
        expected: "a`\t2`>b",
      },
      {
        input: "a\t3>b",
        expected: "a`\t3`>b",
      },
      {
        input: "a\t4>b",
        expected: "a`\t4`>b",
      },
      {
        input: "a\t5>b",
        expected: "a`\t5`>b",
      },
      {
        input: "a\t6>b",
        expected: "a`\t6`>b",
      },
      {
        input: "a\t7>b",
        expected: "a`\t7>b",
      },
      {
        input: "a\t8>b",
        expected: "a`\t8>b",
      },
      {
        input: "a\t9>b",
        expected: "a`\t9>b",
      },
      {
        input: "a\t0>b",
        expected: "a`\t0>b",
      },
      {
        input: "a\u00851>b",
        expected: "a`\u00851`>b",
      },
      {
        input: "a\u00852>b",
        expected: "a`\u00852`>b",
      },
      {
        input: "a\u00853>b",
        expected: "a`\u00853`>b",
      },
      {
        input: "a\u00854>b",
        expected: "a`\u00854`>b",
      },
      {
        input: "a\u00855>b",
        expected: "a`\u00855`>b",
      },
      {
        input: "a\u00856>b",
        expected: "a`\u00856`>b",
      },
      {
        input: "a\u00857>b",
        expected: "a`\u00857>b",
      },
      {
        input: "a\u00858>b",
        expected: "a`\u00858>b",
      },
      {
        input: "a\u00859>b",
        expected: "a`\u00859>b",
      },
      {
        input: "a\u00850>b",
        expected: "a`\u00850>b",
      },
    ],
    "right angle brackets ('>') + asterisks ('*')": [
      {
        input: "*>a",
        expected: "*`>a",
      },
      {
        input: "a *>b",
        expected: "a` *`>b",
      },
      {
        input: "a\t*>b",
        expected: "a`\t*`>b",
      },
      {
        input: "a\u0085*>b",
        expected: "a`\u0085*`>b",
      },
    ],
    "left double quotation mark ('“')": [
      {
        input: "a“b",
        expected: "a`“b",
      },
      {
        input: "a“b“c",
        expected: "a`“b`“c",
      },
      {
        input: "a“",
        expected: "a`“",
      },
      {
        input: "“a",
        expected: "`“a",
      },
    ],
    "right double quotation mark ('”')": [
      {
        input: "a”b",
        expected: "a`”b",
      },
      {
        input: "a”b”c",
        expected: "a`”b`”c",
      },
      {
        input: "a”",
        expected: "a`”",
      },
      {
        input: "”a",
        expected: "`”a",
      },
    ],
    "double low-9 quotation mark ('„')": [
      {
        input: "a„b",
        expected: "a`„b",
      },
      {
        input: "a„b„c",
        expected: "a`„b`„c",
      },
      {
        input: "a„",
        expected: "a`„",
      },
      {
        input: "„a",
        expected: "`„a",
      },
    ],
    "left single quotation mark ('‘')": [
      {
        input: "a‘b",
        expected: "a`‘b",
      },
      {
        input: "a‘b‘c",
        expected: "a`‘b`‘c",
      },
      {
        input: "a‘",
        expected: "a`‘",
      },
      {
        input: "‘a",
        expected: "`‘a",
      },
    ],
    "right single quotation mark ('’')": [
      {
        input: "a’b",
        expected: "a`’b",
      },
      {
        input: "a’b’c",
        expected: "a`’b`’c",
      },
      {
        input: "a’",
        expected: "a`’",
      },
      {
        input: "’a",
        expected: "`’a",
      },
    ],
    "single low-9 quotation mark ('‚')": [
      {
        input: "a‚b",
        expected: "a`‚b",
      },
      {
        input: "a‚b‚c",
        expected: "a`‚b`‚c",
      },
      {
        input: "a‚",
        expected: "a`‚",
      },
      {
        input: "‚a",
        expected: "`‚a",
      },
    ],
    "single high-reversed-9 quotation mark ('‛')": [
      {
        input: "a‛b",
        expected: "a`‛b",
      },
      {
        input: "a‛b‛c",
        expected: "a`‛b`‛c",
      },
      {
        input: "a‛",
        expected: "a`‛",
      },
      {
        input: "‛a",
        expected: "`‛a",
      },
    ],
  },
};

export const flag = {
  [null]: {
    "sample strings": [
      {
        input: "foobar",
        expected: { unquoted: "foobar", quoted: "foobar" },
      },
    ],
    "single hyphen (-)": [
      {
        input: "-a",
        expected: { unquoted: "a", quoted: "a" },
      },
      {
        input: "a-",
        expected: { unquoted: "a-", quoted: "a-" },
      },
      {
        input: "-a-",
        expected: { unquoted: "a-", quoted: "a-" },
      },
      {
        input: "-ab",
        expected: { unquoted: "ab", quoted: "ab" },
      },
      {
        input: "a-b",
        expected: { unquoted: "a-b", quoted: "a-b" },
      },
      {
        input: "-a-b",
        expected: { unquoted: "a-b", quoted: "a-b" },
      },
      {
        input: "-a=b",
        expected: { unquoted: "a=b", quoted: "a=b" },
      },
    ],
    "double hyphen (--)": [
      {
        input: "--a",
        expected: { unquoted: "a", quoted: "a" },
      },
      {
        input: "a--",
        expected: { unquoted: "a--", quoted: "a--" },
      },
      {
        input: "--a--",
        expected: { unquoted: "a--", quoted: "a--" },
      },
      {
        input: "--ab",
        expected: { unquoted: "ab", quoted: "ab" },
      },
      {
        input: "a--b",
        expected: { unquoted: "a--b", quoted: "a--b" },
      },
      {
        input: "--a--b",
        expected: { unquoted: "a--b", quoted: "a--b" },
      },
      {
        input: "--a=b",
        expected: { unquoted: "a=b", quoted: "a=b" },
      },
    ],
    "many hyphens (/-{3,}/)": [
      {
        input: "---a",
        expected: { unquoted: "a", quoted: "a" },
      },
      {
        input: "---ab",
        expected: { unquoted: "ab", quoted: "ab" },
      },
      {
        input: "---a=b",
        expected: { unquoted: "a=b", quoted: "a=b" },
      },
    ],
    "forward slash (/)": [
      {
        input: "/a",
        expected: { unquoted: "a", quoted: "a" },
      },
      {
        input: "a/",
        expected: { unquoted: "a/", quoted: "a/" },
      },
      {
        input: "/a/",
        expected: { unquoted: "a/", quoted: "a/" },
      },
      {
        input: "/ab",
        expected: { unquoted: "ab", quoted: "ab" },
      },
      {
        input: "a/b",
        expected: { unquoted: "a/b", quoted: "a/b" },
      },
      {
        input: "/a/b",
        expected: { unquoted: "a/b", quoted: "a/b" },
      },
    ],
    "multiple forward slashes (//{2,}/)": [
      {
        input: "//a",
        expected: { unquoted: "a", quoted: "a" },
      },
      {
        input: "a//",
        expected: { unquoted: "a//", quoted: "a//" },
      },
      {
        input: "//a//",
        expected: { unquoted: "a//", quoted: "a//" },
      },
      {
        input: "//ab",
        expected: { unquoted: "ab", quoted: "ab" },
      },
      {
        input: "a//b",
        expected: { unquoted: "a//b", quoted: "a//b" },
      },
      {
        input: "//a//b",
        expected: { unquoted: "a//b", quoted: "a//b" },
      },
    ],
  },
  [binCmd]: {
    "sample strings": [
      {
        input: "foobar",
        expected: { unquoted: "foobar", quoted: "foobar" },
      },
    ],
    "single hyphen (-)": [
      {
        input: "-a",
        expected: { unquoted: "a", quoted: "a" },
      },
      {
        input: "a-",
        expected: { unquoted: "a-", quoted: "a-" },
      },
      {
        input: "-a-",
        expected: { unquoted: "a-", quoted: "a-" },
      },
      {
        input: "-ab",
        expected: { unquoted: "ab", quoted: "ab" },
      },
      {
        input: "a-b",
        expected: { unquoted: "a-b", quoted: "a-b" },
      },
      {
        input: "-a-b",
        expected: { unquoted: "a-b", quoted: "a-b" },
      },
      {
        input: "-a=b",
        expected: { unquoted: "a=b", quoted: "a=b" },
      },
    ],
    "double hyphen (--)": [
      {
        input: "--a",
        expected: { unquoted: "a", quoted: "a" },
      },
      {
        input: "a--",
        expected: { unquoted: "a--", quoted: "a--" },
      },
      {
        input: "--a--",
        expected: { unquoted: "a--", quoted: "a--" },
      },
      {
        input: "--ab",
        expected: { unquoted: "ab", quoted: "ab" },
      },
      {
        input: "a--b",
        expected: { unquoted: "a--b", quoted: "a--b" },
      },
      {
        input: "--a--b",
        expected: { unquoted: "a--b", quoted: "a--b" },
      },
      {
        input: "--a=b",
        expected: { unquoted: "a=b", quoted: "a=b" },
      },
    ],
    "many hyphens (/-{3,}/)": [
      {
        input: "---a",
        expected: { unquoted: "a", quoted: "a" },
      },
      {
        input: "---ab",
        expected: { unquoted: "ab", quoted: "ab" },
      },
      {
        input: "---a=b",
        expected: { unquoted: "a=b", quoted: "a=b" },
      },
    ],
    "forward slash (/)": [
      {
        input: "/a",
        expected: { unquoted: "a", quoted: "a" },
      },
      {
        input: "a/",
        expected: { unquoted: "a/", quoted: "a/" },
      },
      {
        input: "/a/",
        expected: { unquoted: "a/", quoted: "a/" },
      },
      {
        input: "/ab",
        expected: { unquoted: "ab", quoted: "ab" },
      },
      {
        input: "a/b",
        expected: { unquoted: "a/b", quoted: "a/b" },
      },
      {
        input: "/a/b",
        expected: { unquoted: "a/b", quoted: "a/b" },
      },
    ],
    "multiple forward slashes (//{2,}/)": [
      {
        input: "//a",
        expected: { unquoted: "a", quoted: "a" },
      },
      {
        input: "a//",
        expected: { unquoted: "a//", quoted: "a//" },
      },
      {
        input: "//a//",
        expected: { unquoted: "a//", quoted: "a//" },
      },
      {
        input: "//ab",
        expected: { unquoted: "ab", quoted: "ab" },
      },
      {
        input: "a//b",
        expected: { unquoted: "a//b", quoted: "a//b" },
      },
      {
        input: "//a//b",
        expected: { unquoted: "a//b", quoted: "a//b" },
      },
    ],
  },
  [binPowerShell]: {
    "sample strings": [
      {
        input: "foobar",
        expected: { unquoted: "foobar", quoted: "'foobar'" },
      },
    ],
    "single hyphen (-)": [
      {
        input: "-a",
        expected: { unquoted: "a", quoted: "'a'" },
      },
      {
        input: "a-",
        expected: { unquoted: "a-", quoted: "'a-'" },
      },
      {
        input: "-a-",
        expected: { unquoted: "a-", quoted: "'a-'" },
      },
      {
        input: "-ab",
        expected: { unquoted: "ab", quoted: "'ab'" },
      },
      {
        input: "a-b",
        expected: { unquoted: "a-b", quoted: "'a-b'" },
      },
      {
        input: "-a-b",
        expected: { unquoted: "a-b", quoted: "'a-b'" },
      },
      {
        input: "-a=b",
        expected: { unquoted: "a=b", quoted: "'a=b'" },
      },
    ],
    "double hyphen (--)": [
      {
        input: "--a",
        expected: { unquoted: "a", quoted: "'a'" },
      },
      {
        input: "a--",
        expected: { unquoted: "a--", quoted: "'a--'" },
      },
      {
        input: "--a--",
        expected: { unquoted: "a--", quoted: "'a--'" },
      },
      {
        input: "--ab",
        expected: { unquoted: "ab", quoted: "'ab'" },
      },
      {
        input: "a--b",
        expected: { unquoted: "a--b", quoted: "'a--b'" },
      },
      {
        input: "--a--b",
        expected: { unquoted: "a--b", quoted: "'a--b'" },
      },
      {
        input: "--a=b",
        expected: { unquoted: "a=b", quoted: "'a=b'" },
      },
    ],
    "many hyphens (/-{3,}/)": [
      {
        input: "---a",
        expected: { unquoted: "a", quoted: "'a'" },
      },
      {
        input: "---ab",
        expected: { unquoted: "ab", quoted: "'ab'" },
      },
      {
        input: "---a=b",
        expected: { unquoted: "a=b", quoted: "'a=b'" },
      },
    ],
    "forward slash (/)": [
      {
        input: "/a",
        expected: { unquoted: "a", quoted: "'a'" },
      },
      {
        input: "a/",
        expected: { unquoted: "a/", quoted: "'a/'" },
      },
      {
        input: "/a/",
        expected: { unquoted: "a/", quoted: "'a/'" },
      },
      {
        input: "/ab",
        expected: { unquoted: "ab", quoted: "'ab'" },
      },
      {
        input: "a/b",
        expected: { unquoted: "a/b", quoted: "'a/b'" },
      },
      {
        input: "/a/b",
        expected: { unquoted: "a/b", quoted: "'a/b'" },
      },
    ],
    "multiple forward slashes (//{2,}/)": [
      {
        input: "//a",
        expected: { unquoted: "a", quoted: "'a'" },
      },
      {
        input: "a//",
        expected: { unquoted: "a//", quoted: "'a//'" },
      },
      {
        input: "//a//",
        expected: { unquoted: "a//", quoted: "'a//'" },
      },
      {
        input: "//ab",
        expected: { unquoted: "ab", quoted: "'ab'" },
      },
      {
        input: "a//b",
        expected: { unquoted: "a//b", quoted: "'a//b'" },
      },
      {
        input: "//a//b",
        expected: { unquoted: "a//b", quoted: "'a//b'" },
      },
    ],
  },
};

export const quote = {
  [null]: {
    "sample strings": [
      {
        input: "foobar",
        expected: "foobar",
      },
    ],
  },
  [binCmd]: {
    "sample strings": [
      {
        input: "foobar",
        expected: "foobar",
      },
    ],
    "<null> (\\0)": [
      {
        input: "a\u0000b",
        expected: "ab",
      },
      {
        input: "a\u0000b\u0000c",
        expected: "abc",
      },
      {
        input: "a\u0000",
        expected: "a",
      },
      {
        input: "\u0000a",
        expected: "a",
      },
    ],
    "<backspace> (\\b)": [
      {
        input: "a\bb",
        expected: "ab",
      },
      {
        input: "a\bb\bc",
        expected: "abc",
      },
      {
        input: "a\b",
        expected: "a",
      },
      {
        input: "\ba",
        expected: "a",
      },
    ],
    "<character tabulation> (\\t)": [
      {
        input: "a\tb",
        expected: 'a"\t"b',
      },
      {
        input: "a\tb\tc",
        expected: 'a"\t"b"\t"c',
      },
      {
        input: "a\t",
        expected: 'a"\t"',
      },
      {
        input: "\ta",
        expected: '"\t"a',
      },
      {
        input: "a\t\tb",
        expected: 'a"\t\t"b',
      },
    ],
    "<character tabulation> (\\t) + space (' ')": [
      {
        input: "a\t b",
        expected: 'a"\t "b',
      },
      {
        input: "a \tb",
        expected: 'a" \t"b',
      },
    ],
    "<character tabulation> (\\t) + backslashes ('\\')": [
      {
        input: "a\\\tb",
        expected: 'a\\\\"\t"b',
      },
      {
        input: "a\\\\\tb",
        expected: 'a\\\\\\\\"\t"b',
      },
    ],
    "<end of line> (\\n)": [
      {
        input: "a\nb",
        expected: 'a" "b',
      },
      {
        input: "a\nb\nc",
        expected: 'a" "b" "c',
      },
      {
        input: "a\n",
        expected: 'a" "',
      },
      {
        input: "\na",
        expected: '" "a',
      },
    ],
    "<carriage return> (\\r)": [
      {
        input: "a\rb",
        expected: "ab",
      },
      {
        input: "a\rb\rc",
        expected: "abc",
      },
      {
        input: "\ra",
        expected: "a",
      },
      {
        input: "a\r",
        expected: "a",
      },
    ],
    "<carriage return> (\\r) + <end of line> (\\n)": [
      {
        input: "a\r\nb",
        expected: 'a" "b',
      },
      {
        input: "a\r\nb\r\nc",
        expected: 'a" "b" "c',
      },
      {
        input: "a\r\n",
        expected: 'a" "',
      },
      {
        input: "\r\na",
        expected: '" "a',
      },
    ],
    "<escape> (\\u001B)": [
      {
        input: "a\u001Bb",
        expected: "ab",
      },
      {
        input: "a\u001Bb\u001Bc",
        expected: "abc",
      },
      {
        input: "a\u001B",
        expected: "a",
      },
      {
        input: "\u001Ba",
        expected: "a",
      },
    ],
    "<space> (' ')": [
      {
        input: "a b",
        expected: 'a" "b',
      },
      {
        input: "a b c",
        expected: 'a" "b" "c',
      },
      {
        input: "a ",
        expected: 'a" "',
      },
      {
        input: " a",
        expected: '" "a',
      },
      {
        input: "a  b",
        expected: 'a"  "b',
      },
    ],
    "<space> (' ') + backslashes ('\\')": [
      {
        input: "a\\ b",
        expected: 'a\\\\" "b',
      },
      {
        input: "a\\\\ b",
        expected: 'a\\\\\\\\" "b',
      },
    ],
    "<control sequence introducer> (\\u009B)": [
      {
        input: "a\u009Bb",
        expected: "ab",
      },
      {
        input: "a\u009Bb\u009Bc",
        expected: "abc",
      },
      {
        input: "a\u009B",
        expected: "a",
      },
      {
        input: "\u009Ba",
        expected: "a",
      },
    ],
    'single quotes ("\'")': [
      {
        input: "a'b",
        expected: "a'b",
      },
      {
        input: "a'b'c",
        expected: "a'b'c",
      },
      {
        input: "a'",
        expected: "a'",
      },
      {
        input: "'a",
        expected: "'a",
      },
    ],
    "double quotes ('\"')": [
      {
        input: 'a"b',
        expected: 'a\\^"b',
      },
      {
        input: 'a"b"c',
        expected: 'a\\^"b\\^"c',
      },
      {
        input: 'a"',
        expected: 'a\\^"',
      },
      {
        input: '"a',
        expected: '\\^"a',
      },
      {
        input: 'a""b',
        expected: 'a\\^"\\^"b',
      },
    ],
    "double quotes ('\"') + whitespace": [
      {
        input: 'a "b',
        expected: 'a" "\\^"b',
      },
      {
        input: 'a" b',
        expected: 'a\\^"" "b',
      },
      {
        input: 'a " b',
        expected: 'a" "\\^"" "b',
      },
    ],
    "double quotes ('\"') + backslashes ('\\')": [
      {
        input: 'a\\"b',
        expected: 'a\\\\\\^"b',
      },
      {
        input: 'a\\\\"b',
        expected: 'a\\\\\\\\\\^"b',
      },
    ],
    "backticks ('`')": [
      {
        input: "a`b",
        expected: "a`b",
      },
      {
        input: "a`b`c",
        expected: "a`b`c",
      },
      {
        input: "a`",
        expected: "a`",
      },
      {
        input: "`a",
        expected: "`a",
      },
    ],
    "carets ('^')": [
      {
        input: "a^b",
        expected: "a^^b",
      },
      {
        input: "a^b^c",
        expected: "a^^b^^c",
      },
      {
        input: "a^",
        expected: "a^^",
      },
      {
        input: "^a",
        expected: "^^a",
      },
    ],
    "carets ('^') + double quotes ('\"')": [
      {
        input: 'a"b^c',
        expected: 'a\\^"b^^c',
      },
      {
        input: 'a"b"c^d',
        expected: 'a\\^"b\\^"c^^d',
      },
      {
        input: 'a^b"c',
        expected: 'a^^b\\^"c',
      },
    ],
    "dollar signs ('$')": [
      {
        input: "a$b",
        expected: "a$b",
      },
      {
        input: "a$b$c",
        expected: "a$b$c",
      },
      {
        input: "a$",
        expected: "a$",
      },
      {
        input: "$a",
        expected: "$a",
      },
    ],
    "percentage signs ('%')": [
      {
        input: "a%b",
        expected: "a^%b",
      },
      {
        input: "a%b%c",
        expected: "a^%b^%c",
      },
      {
        input: "a%",
        expected: "a^%",
      },
      {
        input: "%a",
        expected: "^%a",
      },
    ],
    "percentage signs ('%') + double quotes ('\"')": [
      {
        input: 'a"b%c',
        expected: 'a\\^"b^%c',
      },
      {
        input: 'a"b"c%d',
        expected: 'a\\^"b\\^"c^%d',
      },
      {
        input: 'a%b"c',
        expected: 'a^%b\\^"c',
      },
    ],
    "ampersands ('&')": [
      {
        input: "a&b",
        expected: "a^&b",
      },
      {
        input: "a&b&c",
        expected: "a^&b^&c",
      },
      {
        input: "a&",
        expected: "a^&",
      },
      {
        input: "&a",
        expected: "^&a",
      },
    ],
    "ampersands ('&') + double quotes ('\"')": [
      {
        input: 'a"b&c',
        expected: 'a\\^"b^&c',
      },
      {
        input: 'a"b"c&d',
        expected: 'a\\^"b\\^"c^&d',
      },
      {
        input: 'a&b"c',
        expected: 'a^&b\\^"c',
      },
    ],
    "hyphens ('-')": [
      {
        input: "a-b",
        expected: "a-b",
      },
      {
        input: "a-b-c",
        expected: "a-b-c",
      },
      {
        input: "a-",
        expected: "a-",
      },
      {
        input: "-a",
        expected: "-a",
      },
    ],
    "backslashes ('\\')": [
      {
        input: "a\\b",
        expected: "a\\b",
      },
      {
        input: "a\\b\\c",
        expected: "a\\b\\c",
      },
      {
        input: "a\\",
        expected: "a\\",
      },
      {
        input: "\\a",
        expected: "\\a",
      },
    ],
    "pipes ('|')": [
      {
        input: "a|b",
        expected: "a^|b",
      },
      {
        input: "a|b|c",
        expected: "a^|b^|c",
      },
      {
        input: "a|",
        expected: "a^|",
      },
      {
        input: "|a",
        expected: "^|a",
      },
    ],
    "pipes ('|') + double quotes ('\"')": [
      {
        input: 'a"b|c',
        expected: 'a\\^"b^|c',
      },
      {
        input: 'a"b"c|d',
        expected: 'a\\^"b\\^"c^|d',
      },
      {
        input: 'a|b"c',
        expected: 'a^|b\\^"c',
      },
    ],
    "angle brackets ('<', '>')": [
      {
        input: "a<b",
        expected: "a^<b",
      },
      {
        input: "a<b<c",
        expected: "a^<b^<c",
      },
      {
        input: "a<",
        expected: "a^<",
      },
      {
        input: "<a",
        expected: "^<a",
      },
      {
        input: "a>b",
        expected: "a^>b",
      },
      {
        input: "a>b>c",
        expected: "a^>b^>c",
      },
      {
        input: "a>",
        expected: "a^>",
      },
      {
        input: ">a",
        expected: "^>a",
      },
      {
        input: "a<b>c",
        expected: "a^<b^>c",
      },
    ],
    "angle brackets ('<', '>') + double quotes ('\"')": [
      {
        input: 'a"b>c',
        expected: 'a\\^"b^>c',
      },
      {
        input: 'a"b<c',
        expected: 'a\\^"b^<c',
      },
      {
        input: 'a"b"c>d',
        expected: 'a\\^"b\\^"c^>d',
      },
      {
        input: 'a"b"c<d',
        expected: 'a\\^"b\\^"c^<d',
      },
      {
        input: 'a>b"c',
        expected: 'a^>b\\^"c',
      },
      {
        input: 'a<b"c',
        expected: 'a^<b\\^"c',
      },
    ],
    "left double quotation mark ('“')": [
      {
        input: "a“b",
        expected: "a“b",
      },
      {
        input: "a“b“c",
        expected: "a“b“c",
      },
      {
        input: "a“",
        expected: "a“",
      },
      {
        input: "“a",
        expected: "“a",
      },
    ],
    "right double quotation mark ('”')": [
      {
        input: "a”b",
        expected: "a”b",
      },
      {
        input: "a”b”c",
        expected: "a”b”c",
      },
      {
        input: "a”",
        expected: "a”",
      },
      {
        input: "”a",
        expected: "”a",
      },
    ],
    "double low-9 quotation mark ('„')": [
      {
        input: "a„b",
        expected: "a„b",
      },
      {
        input: "a„b„c",
        expected: "a„b„c",
      },
      {
        input: "a„",
        expected: "a„",
      },
      {
        input: "„a",
        expected: "„a",
      },
    ],
    "left single quotation mark ('‘')": [
      {
        input: "a‘b",
        expected: "a‘b",
      },
      {
        input: "a‘b‘c",
        expected: "a‘b‘c",
      },
      {
        input: "a‘",
        expected: "a‘",
      },
      {
        input: "‘a",
        expected: "‘a",
      },
    ],
    "right single quotation mark ('’')": [
      {
        input: "a’b",
        expected: "a’b",
      },
      {
        input: "a’b’c",
        expected: "a’b’c",
      },
      {
        input: "a’",
        expected: "a’",
      },
      {
        input: "’a",
        expected: "’a",
      },
    ],
    "single low-9 quotation mark ('‚')": [
      {
        input: "a‚b",
        expected: "a‚b",
      },
      {
        input: "a‚b‚c",
        expected: "a‚b‚c",
      },
      {
        input: "a‚",
        expected: "a‚",
      },
      {
        input: "‚a",
        expected: "‚a",
      },
    ],
    "single high-reversed-9 quotation mark ('‛')": [
      {
        input: "a‛b",
        expected: "a‛b",
      },
      {
        input: "a‛b‛c",
        expected: "a‛b‛c",
      },
      {
        input: "a‛",
        expected: "a‛",
      },
      {
        input: "‛a",
        expected: "‛a",
      },
    ],
  },
  [binPowerShell]: {
    "sample strings": [
      {
        input: "foobar",
        expected: "'foobar'",
      },
    ],
    "<null> (\\0)": [
      {
        input: "a\u0000b",
        expected: "'ab'",
      },
      {
        input: "a\u0000b\u0000c",
        expected: "'abc'",
      },
      {
        input: "a\u0000",
        expected: "'a'",
      },
      {
        input: "\u0000a",
        expected: "'a'",
      },
    ],
    "<backspace> (\\b)": [
      {
        input: "a\bb",
        expected: "'ab'",
      },
      {
        input: "a\bb\bc",
        expected: "'abc'",
      },
      {
        input: "a\b",
        expected: "'a'",
      },
      {
        input: "\ba",
        expected: "'a'",
      },
    ],
    "<character tabulation> (\\t)": [
      {
        input: "a\tb",
        expected: "'a\tb'",
      },
      {
        input: "a\tb\tc",
        expected: "'a\tb\tc'",
      },
      {
        input: "a\t",
        expected: "'a\t'",
      },
      {
        input: "\ta",
        expected: "'\ta'",
      },
    ],
    "<end of line> (\\n)": [
      {
        input: "a\nb",
        expected: "'a\nb'",
      },
      {
        input: "a\nb\nc",
        expected: "'a\nb\nc'",
      },
      {
        input: "a\n",
        expected: "'a\n'",
      },
      {
        input: "\na",
        expected: "'\na'",
      },
    ],
    "<carriage return> (\\r)": [
      {
        input: "a\rb",
        expected: "'ab'",
      },
      {
        input: "a\rb\rc",
        expected: "'abc'",
      },
      {
        input: "\ra",
        expected: "'a'",
      },
      {
        input: "a\r",
        expected: "'a'",
      },
    ],
    "<carriage return> (\\r) + <end of line> (\\n)": [
      {
        input: "a\r\nb",
        expected: "'a\r\nb'",
      },
      {
        input: "a\r\nb\r\nc",
        expected: "'a\r\nb\r\nc'",
      },
      {
        input: "a\r\n",
        expected: "'a\r\n'",
      },
      {
        input: "\r\na",
        expected: "'\r\na'",
      },
    ],
    "<escape> (\\u001B)": [
      {
        input: "a\u001Bb",
        expected: "'ab'",
      },
      {
        input: "a\u001Bb\u001Bc",
        expected: "'abc'",
      },
      {
        input: "a\u001B",
        expected: "'a'",
      },
      {
        input: "\u001Ba",
        expected: "'a'",
      },
    ],
    "<space> (' ')": [
      {
        input: "a b",
        expected: "'a b'",
      },
      {
        input: "a b c",
        expected: "'a b c'",
      },
      {
        input: "a ",
        expected: "'a '",
      },
      {
        input: " a",
        expected: "' a'",
      },
    ],
    "<control sequence introducer> (\\u009B)": [
      {
        input: "a\u009Bb",
        expected: "'ab'",
      },
      {
        input: "a\u009Bb\u009Bc",
        expected: "'abc'",
      },
      {
        input: "a\u009B",
        expected: "'a'",
      },
      {
        input: "\u009Ba",
        expected: "'a'",
      },
    ],
    'single quotes ("\'")': [
      {
        input: "a'b",
        expected: "'a''b'",
      },
      {
        input: "a'b'c",
        expected: "'a''b''c'",
      },
      {
        input: "a'",
        expected: "'a'''",
      },
      {
        input: "'a",
        expected: "'''a'",
      },
    ],
    "double quotes ('\"')": [
      {
        input: 'a"b',
        expected: "'a\\\"b'",
      },
      {
        input: 'a"b"c',
        expected: "'a\\\"b\\\"c'",
      },
      {
        input: 'a"',
        expected: "'a\\\"'",
      },
      {
        input: '"a',
        expected: "'\\\"a'",
      },
    ],
    "double quotes ('\"') + backslashes ('\\')": [
      {
        input: 'a\\"b',
        expected: "'a\\\\\\\"b'",
      },
      {
        input: 'a\\\\"b',
        expected: "'a\\\\\\\\\\\"b'",
      },
    ],
    "double quotes ('\"') + whitespace": [
      {
        input: 'a "b',
        expected: "'a \"\"b'",
      },
      {
        input: 'a "b "c',
        expected: '\'a ""b ""c\'',
      },
      {
        input: 'a "',
        expected: "'a \"\"'",
      },
      {
        input: ' "a',
        expected: "' \"\"a'",
      },
    ],
    "backticks ('`')": [
      {
        input: "a`b",
        expected: "'a`b'",
      },
      {
        input: "a`b`c",
        expected: "'a`b`c'",
      },
      {
        input: "a`",
        expected: "'a`'",
      },
      {
        input: "`a",
        expected: "'`a'",
      },
    ],
    "carets ('^')": [
      {
        input: "a^b",
        expected: "'a^b'",
      },
      {
        input: "a^b^c",
        expected: "'a^b^c'",
      },
      {
        input: "a^",
        expected: "'a^'",
      },
      {
        input: "^a",
        expected: "'^a'",
      },
    ],
    "dollar signs ('$')": [
      {
        input: "a$b",
        expected: "'a$b'",
      },
      {
        input: "a$b$c",
        expected: "'a$b$c'",
      },
      {
        input: "a$",
        expected: "'a$'",
      },
      {
        input: "$a",
        expected: "'$a'",
      },
    ],
    "percentage signs ('%')": [
      {
        input: "a%b",
        expected: "'a%b'",
      },
      {
        input: "a%b%c",
        expected: "'a%b%c'",
      },
      {
        input: "a%",
        expected: "'a%'",
      },
      {
        input: "%a",
        expected: "'%a'",
      },
    ],
    "ampersands ('&')": [
      {
        input: "a&b",
        expected: "'a&b'",
      },
      {
        input: "a&b&c",
        expected: "'a&b&c'",
      },
      {
        input: "a&",
        expected: "'a&'",
      },
      {
        input: "&a",
        expected: "'&a'",
      },
    ],
    "hyphens ('-')": [
      {
        input: "a-b",
        expected: "'a-b'",
      },
      {
        input: "a-b-c",
        expected: "'a-b-c'",
      },
      {
        input: "a-",
        expected: "'a-'",
      },
      {
        input: "-a",
        expected: "'-a'",
      },
    ],
    "backslashes ('\\')": [
      {
        input: "a\\b",
        expected: "'a\\b'",
      },
      {
        input: "a\\b\\c",
        expected: "'a\\b\\c'",
      },
      {
        input: "a\\",
        expected: "'a\\'",
      },
      {
        input: "\\a",
        expected: "'\\a'",
      },
    ],
    "backslashes ('\\') + whitespace": [
      {
        input: "a b\\c",
        expected: "'a b\\c'",
      },
      {
        input: "a\\b c",
        expected: "'a\\b c'",
      },
      {
        input: "a b\\",
        expected: "'a b\\\\'",
      },
      {
        input: "a b\\\\",
        expected: "'a b\\\\\\\\'",
      },
      {
        input: "\\a b",
        expected: "'\\a b'",
      },
    ],
    "pipes ('|')": [
      {
        input: "a|b",
        expected: "'a|b'",
      },
      {
        input: "a|b|c",
        expected: "'a|b|c'",
      },
      {
        input: "a|",
        expected: "'a|'",
      },
      {
        input: "|a",
        expected: "'|a'",
      },
    ],
    "angle brackets ('<', '>')": [
      {
        input: "a<b",
        expected: "'a<b'",
      },
      {
        input: "a<b<c",
        expected: "'a<b<c'",
      },
      {
        input: "a<",
        expected: "'a<'",
      },
      {
        input: "<a",
        expected: "'<a'",
      },
      {
        input: "a>b",
        expected: "'a>b'",
      },
      {
        input: "a>b>c",
        expected: "'a>b>c'",
      },
      {
        input: "a>",
        expected: "'a>'",
      },
      {
        input: ">a",
        expected: "'>a'",
      },
      {
        input: "a<b>c",
        expected: "'a<b>c'",
      },
    ],
    "left double quotation mark ('“')": [
      {
        input: "a“b",
        expected: "'a“b'",
      },
      {
        input: "a“b“c",
        expected: "'a“b“c'",
      },
      {
        input: "a“",
        expected: "'a“'",
      },
      {
        input: "“a",
        expected: "'“a'",
      },
    ],
    "right double quotation mark ('”')": [
      {
        input: "a”b",
        expected: "'a”b'",
      },
      {
        input: "a”b”c",
        expected: "'a”b”c'",
      },
      {
        input: "a”",
        expected: "'a”'",
      },
      {
        input: "”a",
        expected: "'”a'",
      },
    ],
    "double low-9 quotation mark ('„')": [
      {
        input: "a„b",
        expected: "'a„b'",
      },
      {
        input: "a„b„c",
        expected: "'a„b„c'",
      },
      {
        input: "a„",
        expected: "'a„'",
      },
      {
        input: "„a",
        expected: "'„a'",
      },
    ],
    "left single quotation mark ('‘')": [
      {
        input: "a‘b",
        expected: "'a‘‘b'",
      },
      {
        input: "a‘b‘c",
        expected: "'a‘‘b‘‘c'",
      },
      {
        input: "a‘",
        expected: "'a‘‘'",
      },
      {
        input: "‘a",
        expected: "'‘‘a'",
      },
    ],
    "right single quotation mark ('’')": [
      {
        input: "a’b",
        expected: "'a’’b'",
      },
      {
        input: "a’b’c",
        expected: "'a’’b’’c'",
      },
      {
        input: "a’",
        expected: "'a’’'",
      },
      {
        input: "’a",
        expected: "'’’a'",
      },
    ],
    "single low-9 quotation mark ('‚')": [
      {
        input: "a‚b",
        expected: "'a‚‚b'",
      },
      {
        input: "a‚b‚c",
        expected: "'a‚‚b‚‚c'",
      },
      {
        input: "a‚",
        expected: "'a‚‚'",
      },
      {
        input: "‚a",
        expected: "'‚‚a'",
      },
    ],
    "single high-reversed-9 quotation mark ('‛')": [
      {
        input: "a‛b",
        expected: "'a‛‛b'",
      },
      {
        input: "a‛b‛c",
        expected: "'a‛‛b‛‛c'",
      },
      {
        input: "a‛",
        expected: "'a‛‛'",
      },
      {
        input: "‛a",
        expected: "'‛‛a'",
      },
    ],
  },
};
