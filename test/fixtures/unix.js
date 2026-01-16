/**
 * @overview Provides fixtures for testing Unix specific functionality.
 * @license MPL-2.0
 */

import { binBash, binBusyBox, binCsh, binDash, binZsh } from "../_constants.js";

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
        input: "\r\na",
        expected: "\r\na",
      },
      {
        input: "a\r\n",
        expected: "a\r\n",
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
    "tildes ('~')": [
      {
        input: "a~b",
        expected: "a~b",
      },
      {
        input: "a~b~c",
        expected: "a~b~c",
      },
      {
        input: "a~",
        expected: "a~",
      },
      {
        input: "~a",
        expected: "~a",
      },
      {
        input: "~a~b",
        expected: "~a~b",
      },
    ],
    "tildes (`~`) + whitespace": [
      {
        input: "a ~b",
        expected: "a ~b",
      },
      {
        input: "a\t~b",
        expected: "a\t~b",
      },
    ],
    "tildes (`~`) + equals ('=')": [
      {
        input: "a~b=",
        expected: "a~b=",
      },
      {
        input: "a=~",
        expected: "a=~",
      },
      {
        input: "a~b=~",
        expected: "a~b=~",
      },
      {
        input: "a=b~",
        expected: "a=b~",
      },
      {
        input: "a=~b",
        expected: "a=~b",
      },
      {
        input: "a=:~",
        expected: "a=:~",
      },
      {
        input: "a=b:~",
        expected: "a=b:~",
      },
      {
        input: "a=~:",
        expected: "a=~:",
      },
      {
        input: "a=~:b",
        expected: "a=~:b",
      },
      {
        input: "a=~:~",
        expected: "a=~:~",
      },
      {
        input: "a=~:~:~",
        expected: "a=~:~:~",
      },
      {
        input: "a=:~:",
        expected: "a=:~:",
      },
      {
        input: "a=:~:b",
        expected: "a=:~:b",
      },
      {
        input: "a=b:~:",
        expected: "a=b:~:",
      },
      {
        input: "a=:b:~",
        expected: "a=:b:~",
      },
      {
        input: "a=\r:~:",
        expected: "a=:~:",
      },
      {
        input: "a=\u2028:~:",
        expected: "a=\u2028:~:",
      },
      {
        input: "a=\u2029:~:",
        expected: "a=\u2029:~:",
      },
      {
        input: "a=b:~:c",
        expected: "a=b:~:c",
      },
      {
        input: "a=~=",
        expected: "a=~=",
      },
      {
        input: "a=~-",
        expected: "a=~-",
      },
      {
        input: "a=~+",
        expected: "a=~+",
      },
      {
        input: "a=~/",
        expected: "a=~/",
      },
      {
        input: "a=~0",
        expected: "a=~0",
      },
      {
        input: "a=~ ",
        expected: "a=~ ",
      },
    ],
    "exclamation marks ('!')": [
      {
        input: "a!b",
        expected: "a!b",
      },
      {
        input: "a!b!c",
        expected: "a!b!c",
      },
      {
        input: "a!",
        expected: "a!",
      },
      {
        input: "!a",
        expected: "!a",
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
      {
        input: "#a#b",
        expected: "#a#b",
      },
    ],
    "hashtags ('#') + whitespace": [
      {
        input: "a #b",
        expected: "a #b",
      },
      {
        input: "a\t#b",
        expected: "a\t#b",
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
    "asterisks ('*')": [
      {
        input: "a*b",
        expected: "a*b",
      },
      {
        input: "a*b*c",
        expected: "a*b*c",
      },
      {
        input: "a*",
        expected: "a*",
      },
      {
        input: "*a",
        expected: "*a",
      },
    ],
    "hyphen ('-')": [
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
    "equals ('=')": [
      {
        input: "a=b",
        expected: "a=b",
      },
      {
        input: "a=b=c",
        expected: "a=b=c",
      },
      {
        input: "a=",
        expected: "a=",
      },
      {
        input: "=a",
        expected: "=a",
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
    "question marks ('?')": [
      {
        input: "a?b",
        expected: "a?b",
      },
      {
        input: "a?b?c",
        expected: "a?b?c",
      },
      {
        input: "a?",
        expected: "a?",
      },
      {
        input: "?a",
        expected: "?a",
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
    "parentheses ('(', ')') + commas (',')": [
      {
        input: "a(b,c)d",
        expected: "a(b,c)d",
      },
      {
        input: "a(,b)c",
        expected: "a(,b)c",
      },
      {
        input: "a(b,)c",
        expected: "a(b,)c",
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
    "square brackets ('[', ']') + commas (',')": [
      {
        input: "a[b,c]d",
        expected: "a[b,c]d",
      },
      {
        input: "a[,b]c",
        expected: "a[,b]c",
      },
      {
        input: "a[b,]c",
        expected: "a[b,]c",
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
    "curly brackets ('{', '}') + commas (',')": [
      {
        input: "a{b,c}d",
        expected: "a{b,c}d",
      },
      {
        input: "a{,b}c",
        expected: "a{,b}c",
      },
      {
        input: "a{b,}c",
        expected: "a{b,}c",
      },
      {
        input: "a{bc,de}f",
        expected: "a{bc,de}f",
      },
      {
        input: "a{b,{c,d},e}f",
        expected: "a{b,{c,d},e}f",
      },
      {
        input: "a{\u000Db,c}d",
        expected: "a{b,c}d",
      },
      {
        input: "a{\u2028b,c}d",
        expected: "a{\u2028b,c}d",
      },
      {
        input: "a{\u2029b,c}d",
        expected: "a{\u2029b,c}d",
      },
      {
        input: "a{b,c\u000D}d",
        expected: "a{b,c}d",
      },
      {
        input: "a{b,c\u2028}d",
        expected: "a{b,c\u2028}d",
      },
      {
        input: "a{b,c\u2029}d",
        expected: "a{b,c\u2029}d",
      },
      {
        input: "a{{b,c}",
        expected: "a{{b,c}",
      },
      {
        input: "a{b{c,d}",
        expected: "a{b{c,d}",
      },
    ],
    "curly brackets ('{', '}') + periods ('.')": [
      {
        input: "a{0..2}b",
        expected: "a{0..2}b",
      },
      {
        input: "a{\u000D0..2}b",
        expected: "a{0..2}b",
      },
      {
        input: "a{\u20280..2}b",
        expected: "a{\u20280..2}b",
      },
      {
        input: "a{\u20290..2}b",
        expected: "a{\u20290..2}b",
      },
      {
        input: "a{0..2\u000D}b",
        expected: "a{0..2}b",
      },
      {
        input: "a{0..2\u2028}b",
        expected: "a{0..2\u2028}b",
      },
      {
        input: "a{0..2\u2029}b",
        expected: "a{0..2\u2029}b",
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
  },
  [binBash]: {
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
        expected: "a\\\tb",
      },
      {
        input: "a\tb\tc",
        expected: "a\\\tb\\\tc",
      },
      {
        input: "a\t",
        expected: "a\\\t",
      },
      {
        input: "\ta",
        expected: "\\\ta",
      },
    ],
    "<end of line> (\\n)": [
      {
        input: "a\nb",
        expected: "a\\ b",
      },
      {
        input: "a\nb\nc",
        expected: "a\\ b\\ c",
      },
      {
        input: "a\n",
        expected: "a\\ ",
      },
      {
        input: "\na",
        expected: "\\ a",
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
        expected: "a\\ b",
      },
      {
        input: "a\r\nb\r\nc",
        expected: "a\\ b\\ c",
      },
      {
        input: "\r\na",
        expected: "\\ a",
      },
      {
        input: "a\r\n",
        expected: "a\\ ",
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
        expected: "a\\ b",
      },
      {
        input: "a b c",
        expected: "a\\ b\\ c",
      },
      {
        input: "a ",
        expected: "a\\ ",
      },
      {
        input: " a",
        expected: "\\ a",
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
        expected: "a\\'b",
      },
      {
        input: "a'b'c",
        expected: "a\\'b\\'c",
      },
      {
        input: "a'",
        expected: "a\\'",
      },
      {
        input: "'a",
        expected: "\\'a",
      },
    ],
    "double quotes ('\"')": [
      {
        input: 'a"b',
        expected: 'a\\"b',
      },
      {
        input: 'a"b"c',
        expected: 'a\\"b\\"c',
      },
      {
        input: 'a"',
        expected: 'a\\"',
      },
      {
        input: '"a',
        expected: '\\"a',
      },
    ],
    "backticks ('`')": [
      {
        input: "a`b",
        expected: "a\\`b",
      },
      {
        input: "a`b`c",
        expected: "a\\`b\\`c",
      },
      {
        input: "a`",
        expected: "a\\`",
      },
      {
        input: "`a",
        expected: "\\`a",
      },
    ],
    "tildes ('~')": [
      {
        input: "a~b",
        expected: "a~b",
      },
      {
        input: "a~b~c",
        expected: "a~b~c",
      },
      {
        input: "a~",
        expected: "a~",
      },
      {
        input: "~a",
        expected: "\\~a",
      },
      {
        input: "~a~b",
        expected: "\\~a~b",
      },
    ],
    "tildes (`~`) + whitespace": [
      {
        input: "a ~b",
        expected: "a\\ \\~b",
      },
      {
        input: "a\t~b",
        expected: "a\\\t\\~b",
      },
    ],
    "tildes (`~`) + equals ('=')": [
      {
        input: "a~b=",
        expected: "a~b=",
      },
      {
        input: "a=~",
        expected: "a=\\~",
      },
      {
        input: "a~b=~",
        expected: "a~b=\\~",
      },
      {
        input: "a=b~",
        expected: "a=b~",
      },
      {
        input: "a=~b",
        expected: "a=~b",
      },
      {
        input: "a=:~",
        expected: "a=:\\~",
      },
      {
        input: "a=b:~",
        expected: "a=b:\\~",
      },
      {
        input: "a=~:",
        expected: "a=\\~:",
      },
      {
        input: "a=~:b",
        expected: "a=\\~:b",
      },
      {
        input: "a=~:~",
        expected: "a=\\~:\\~",
      },
      {
        input: "a=~:~:~",
        expected: "a=\\~:\\~:\\~",
      },
      {
        input: "a=:~:",
        expected: "a=:\\~:",
      },
      {
        input: "a=:~:b",
        expected: "a=:\\~:b",
      },
      {
        input: "a=b:~:",
        expected: "a=b:\\~:",
      },
      {
        input: "a=:b:~",
        expected: "a=:b:\\~",
      },
      {
        input: "a=\r:~:",
        expected: "a=:\\~:",
      },
      {
        input: "a=\u2028:~:",
        expected: "a=\u2028:\\~:",
      },
      {
        input: "a=\u2029:~:",
        expected: "a=\u2029:\\~:",
      },
      {
        input: "a=b:~:c",
        expected: "a=b:\\~:c",
      },
      {
        input: "a=~=",
        expected: "a=\\~=",
      },
      {
        input: "a=~-",
        expected: "a=\\~-",
      },
      {
        input: "a=~+",
        expected: "a=\\~+",
      },
      {
        input: "a=~/",
        expected: "a=\\~/",
      },
      {
        input: "a=~0",
        expected: "a=\\~0",
      },
      {
        input: "a=~ ",
        expected: "a=\\~\\ ",
      },
    ],
    "exclamation marks ('!')": [
      {
        input: "a!b",
        expected: "a!b",
      },
      {
        input: "a!b!c",
        expected: "a!b!c",
      },
      {
        input: "a!",
        expected: "a!",
      },
      {
        input: "!a",
        expected: "!a",
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
        expected: "\\#a",
      },
      {
        input: "#a#b",
        expected: "\\#a#b",
      },
    ],
    "hashtags ('#') + whitespace": [
      {
        input: "a #b",
        expected: "a\\ \\#b",
      },
      {
        input: "a\t#b",
        expected: "a\\\t\\#b",
      },
    ],
    "dollar signs ('$')": [
      {
        input: "a$b",
        expected: "a\\$b",
      },
      {
        input: "a$b$c",
        expected: "a\\$b\\$c",
      },
      {
        input: "a$",
        expected: "a\\$",
      },
      {
        input: "$a",
        expected: "\\$a",
      },
    ],
    "ampersands ('&')": [
      {
        input: "a&b",
        expected: "a\\&b",
      },
      {
        input: "a&b&c",
        expected: "a\\&b\\&c",
      },
      {
        input: "a&",
        expected: "a\\&",
      },
      {
        input: "&a",
        expected: "\\&a",
      },
    ],
    "asterisks ('*')": [
      {
        input: "a*b",
        expected: "a\\*b",
      },
      {
        input: "a*b*c",
        expected: "a\\*b\\*c",
      },
      {
        input: "a*",
        expected: "a\\*",
      },
      {
        input: "*a",
        expected: "\\*a",
      },
    ],
    "hyphen ('-')": [
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
    "equals ('=')": [
      {
        input: "a=b",
        expected: "a=b",
      },
      {
        input: "a=b=c",
        expected: "a=b=c",
      },
      {
        input: "a=",
        expected: "a=",
      },
      {
        input: "=a",
        expected: "=a",
      },
    ],
    "backslashes ('\\')": [
      {
        input: "a\\b",
        expected: "a\\\\b",
      },
      {
        input: "a\\b\\c",
        expected: "a\\\\b\\\\c",
      },
      {
        input: "a\\",
        expected: "a\\\\",
      },
      {
        input: "\\a",
        expected: "\\\\a",
      },
    ],
    "pipes ('|')": [
      {
        input: "a|b",
        expected: "a\\|b",
      },
      {
        input: "a|b|c",
        expected: "a\\|b\\|c",
      },
      {
        input: "a|",
        expected: "a\\|",
      },
      {
        input: "|a",
        expected: "\\|a",
      },
    ],
    "semicolons (';')": [
      {
        input: "a;b",
        expected: "a\\;b",
      },
      {
        input: "a;b;c",
        expected: "a\\;b\\;c",
      },
      {
        input: "a;",
        expected: "a\\;",
      },
      {
        input: ";a",
        expected: "\\;a",
      },
    ],
    "question marks ('?')": [
      {
        input: "a?b",
        expected: "a\\?b",
      },
      {
        input: "a?b?c",
        expected: "a\\?b\\?c",
      },
      {
        input: "a?",
        expected: "a\\?",
      },
      {
        input: "?a",
        expected: "\\?a",
      },
    ],
    "parentheses ('(', ')')": [
      {
        input: "a(b",
        expected: "a\\(b",
      },
      {
        input: "a(b(c",
        expected: "a\\(b\\(c",
      },
      {
        input: "a(",
        expected: "a\\(",
      },
      {
        input: "(a",
        expected: "\\(a",
      },
      {
        input: "a)b",
        expected: "a\\)b",
      },
      {
        input: "a)b)c",
        expected: "a\\)b\\)c",
      },
      {
        input: "a)",
        expected: "a\\)",
      },
      {
        input: ")a",
        expected: "\\)a",
      },
      {
        input: "a(b)c",
        expected: "a\\(b\\)c",
      },
    ],
    "parentheses ('(', ')') + commas (',')": [
      {
        input: "a(b,c)d",
        expected: "a\\(b,c\\)d",
      },
      {
        input: "a(,b)c",
        expected: "a\\(,b\\)c",
      },
      {
        input: "a(b,)c",
        expected: "a\\(b,\\)c",
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
    "square brackets ('[', ']') + commas (',')": [
      {
        input: "a[b,c]d",
        expected: "a[b,c]d",
      },
      {
        input: "a[,b]c",
        expected: "a[,b]c",
      },
      {
        input: "a[b,]c",
        expected: "a[b,]c",
      },
    ],
    "curly brackets ('{', '}')": [
      {
        input: "a{b",
        expected: "a\\{b",
      },
      {
        input: "a{b{c",
        expected: "a\\{b\\{c",
      },
      {
        input: "a{",
        expected: "a\\{",
      },
      {
        input: "{a",
        expected: "\\{a",
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
        expected: "a\\{b}c",
      },
    ],
    "curly brackets ('{', '}') + commas (',')": [
      {
        input: "a{b,c}d",
        expected: "a\\{b,c}d",
      },
      {
        input: "a{,b}c",
        expected: "a\\{,b}c",
      },
      {
        input: "a{b,}c",
        expected: "a\\{b,}c",
      },
      {
        input: "a{bc,de}f",
        expected: "a\\{bc,de}f",
      },
      {
        input: "a{b,{c,d},e}f",
        expected: "a\\{b,\\{c,d},e}f",
      },
      {
        input: "a{\u000Db,c}d",
        expected: "a\\{b,c}d",
      },
      {
        input: "a{\u2028b,c}d",
        expected: "a\\{\u2028b,c}d",
      },
      {
        input: "a{\u2029b,c}d",
        expected: "a\\{\u2029b,c}d",
      },
      {
        input: "a{b,c\u000D}d",
        expected: "a\\{b,c}d",
      },
      {
        input: "a{b,c\u2028}d",
        expected: "a\\{b,c\u2028}d",
      },
      {
        input: "a{b,c\u2029}d",
        expected: "a\\{b,c\u2029}d",
      },
      {
        input: "a{{b,c}",
        expected: "a\\{\\{b,c}",
      },
      {
        input: "a{b{c,d}",
        expected: "a\\{b\\{c,d}",
      },
    ],
    "curly brackets ('{', '}') + periods ('.')": [
      {
        input: "a{0..2}b",
        expected: "a\\{0..2}b",
      },
      {
        input: "a{\u000D0..2}b",
        expected: "a\\{0..2}b",
      },
      {
        input: "a{\u20280..2}b",
        expected: "a\\{\u20280..2}b",
      },
      {
        input: "a{\u20290..2}b",
        expected: "a\\{\u20290..2}b",
      },
      {
        input: "a{0..2\u000D}b",
        expected: "a\\{0..2}b",
      },
      {
        input: "a{0..2\u2028}b",
        expected: "a\\{0..2\u2028}b",
      },
      {
        input: "a{0..2\u2029}b",
        expected: "a\\{0..2\u2029}b",
      },
    ],
    "angle brackets ('<', '>')": [
      {
        input: "a<b",
        expected: "a\\<b",
      },
      {
        input: "a<b<c",
        expected: "a\\<b\\<c",
      },
      {
        input: "a<",
        expected: "a\\<",
      },
      {
        input: "<a",
        expected: "\\<a",
      },
      {
        input: "a>b",
        expected: "a\\>b",
      },
      {
        input: "a>b>c",
        expected: "a\\>b\\>c",
      },
      {
        input: "a>",
        expected: "a\\>",
      },
      {
        input: ">a",
        expected: "\\>a",
      },
      {
        input: "a<b>c",
        expected: "a\\<b\\>c",
      },
    ],
  },
  [binBusyBox]: {
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
        expected: "a\\\tb",
      },
      {
        input: "a\tb\tc",
        expected: "a\\\tb\\\tc",
      },
      {
        input: "a\t",
        expected: "a\\\t",
      },
      {
        input: "\ta",
        expected: "\\\ta",
      },
    ],
    "<end of line> (\\n)": [
      {
        input: "a\nb",
        expected: "a\\ b",
      },
      {
        input: "a\nb\nc",
        expected: "a\\ b\\ c",
      },
      {
        input: "a\n",
        expected: "a\\ ",
      },
      {
        input: "\na",
        expected: "\\ a",
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
        expected: "a\\ b",
      },
      {
        input: "a\r\nb\r\nc",
        expected: "a\\ b\\ c",
      },
      {
        input: "\r\na",
        expected: "\\ a",
      },
      {
        input: "a\r\n",
        expected: "a\\ ",
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
        expected: "a\\ b",
      },
      {
        input: "a b c",
        expected: "a\\ b\\ c",
      },
      {
        input: "a ",
        expected: "a\\ ",
      },
      {
        input: " a",
        expected: "\\ a",
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
        expected: "a\\'b",
      },
      {
        input: "a'b'c",
        expected: "a\\'b\\'c",
      },
      {
        input: "a'",
        expected: "a\\'",
      },
      {
        input: "'a",
        expected: "\\'a",
      },
    ],
    "double quotes ('\"')": [
      {
        input: 'a"b',
        expected: 'a\\"b',
      },
      {
        input: 'a"b"c',
        expected: 'a\\"b\\"c',
      },
      {
        input: 'a"',
        expected: 'a\\"',
      },
      {
        input: '"a',
        expected: '\\"a',
      },
    ],
    "backticks ('`')": [
      {
        input: "a`b",
        expected: "a\\`b",
      },
      {
        input: "a`b`c",
        expected: "a\\`b\\`c",
      },
      {
        input: "a`",
        expected: "a\\`",
      },
      {
        input: "`a",
        expected: "\\`a",
      },
    ],
    "tildes ('~')": [
      {
        input: "a~b",
        expected: "a~b",
      },
      {
        input: "a~b~c",
        expected: "a~b~c",
      },
      {
        input: "a~",
        expected: "a~",
      },
      {
        input: "~a",
        expected: "\\~a",
      },
      {
        input: "~a~b",
        expected: "\\~a~b",
      },
    ],
    "tildes (`~`) + whitespace": [
      {
        input: "a ~b",
        expected: "a\\ \\~b",
      },
      {
        input: "a\t~b",
        expected: "a\\\t\\~b",
      },
      {
        input: "a~ b",
        expected: "a~\\ b",
      },
      {
        input: "a~\tb",
        expected: "a~\\\tb",
      },
      {
        input: "a ~b ~c",
        expected: "a\\ \\~b\\ \\~c",
      },
      {
        input: "a\t~b ~c",
        expected: "a\\\t\\~b\\ \\~c",
      },
      {
        input: "a ~b\t~c",
        expected: "a\\ \\~b\\\t\\~c",
      },
      {
        input: "a\t~b\t~c",
        expected: "a\\\t\\~b\\\t\\~c",
      },
    ],
    "tildes (`~`) + equals ('=')": [
      {
        input: "a~b=",
        expected: "a~b=",
      },
      {
        input: "a=~",
        expected: "a=~",
      },
      {
        input: "a~b=~",
        expected: "a~b=~",
      },
      {
        input: "a=b~",
        expected: "a=b~",
      },
      {
        input: "a=~b",
        expected: "a=~b",
      },
      {
        input: "a=:~",
        expected: "a=:~",
      },
      {
        input: "a=b:~",
        expected: "a=b:~",
      },
      {
        input: "a=~:",
        expected: "a=~:",
      },
      {
        input: "a=~:b",
        expected: "a=~:b",
      },
      {
        input: "a=~:~",
        expected: "a=~:~",
      },
      {
        input: "a=~:~:~",
        expected: "a=~:~:~",
      },
      {
        input: "a=:~:",
        expected: "a=:~:",
      },
      {
        input: "a=:~:b",
        expected: "a=:~:b",
      },
      {
        input: "a=b:~:",
        expected: "a=b:~:",
      },
      {
        input: "a=:b:~",
        expected: "a=:b:~",
      },
      {
        input: "a=\r:~:",
        expected: "a=:~:",
      },
      {
        input: "a=\u2028:~:",
        expected: "a=\u2028:~:",
      },
      {
        input: "a=\u2029:~:",
        expected: "a=\u2029:~:",
      },
      {
        input: "a=b:~:c",
        expected: "a=b:~:c",
      },
      {
        input: "a=~=",
        expected: "a=~=",
      },
      {
        input: "a=~-",
        expected: "a=~-",
      },
      {
        input: "a=~+",
        expected: "a=~+",
      },
      {
        input: "a=~/",
        expected: "a=~/",
      },
      {
        input: "a=~0",
        expected: "a=~0",
      },
      {
        input: "a=~ ",
        expected: "a=~\\ ",
      },
    ],
    "exclamation marks ('!')": [
      {
        input: "a!b",
        expected: "a!b",
      },
      {
        input: "a!b!c",
        expected: "a!b!c",
      },
      {
        input: "a!",
        expected: "a!",
      },
      {
        input: "!a",
        expected: "!a",
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
        expected: "\\#a",
      },
      {
        input: "#a#b",
        expected: "\\#a#b",
      },
    ],
    "hashtags ('#') + whitespace": [
      {
        input: "a #b",
        expected: "a\\ \\#b",
      },
      {
        input: "a\t#b",
        expected: "a\\\t\\#b",
      },
      {
        input: "a# b",
        expected: "a#\\ b",
      },
      {
        input: "a#\tb",
        expected: "a#\\\tb",
      },
      {
        input: "a #b #c",
        expected: "a\\ \\#b\\ \\#c",
      },
      {
        input: "a\t#b #c",
        expected: "a\\\t\\#b\\ \\#c",
      },
      {
        input: "a #b\t#c",
        expected: "a\\ \\#b\\\t\\#c",
      },
      {
        input: "a\t#b\t#c",
        expected: "a\\\t\\#b\\\t\\#c",
      },
    ],
    "dollar signs ('$')": [
      {
        input: "a$b",
        expected: "a\\$b",
      },
      {
        input: "a$b$c",
        expected: "a\\$b\\$c",
      },
      {
        input: "a$",
        expected: "a\\$",
      },
      {
        input: "$a",
        expected: "\\$a",
      },
    ],
    "ampersands ('&')": [
      {
        input: "a&b",
        expected: "a\\&b",
      },
      {
        input: "a&b&c",
        expected: "a\\&b\\&c",
      },
      {
        input: "a&",
        expected: "a\\&",
      },
      {
        input: "&a",
        expected: "\\&a",
      },
    ],
    "asterisks ('*')": [
      {
        input: "a*b",
        expected: "a\\*b",
      },
      {
        input: "a*b*c",
        expected: "a\\*b\\*c",
      },
      {
        input: "a*",
        expected: "a\\*",
      },
      {
        input: "*a",
        expected: "\\*a",
      },
    ],
    "hyphen ('-')": [
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
    "equals ('=')": [
      {
        input: "a=b",
        expected: "a=b",
      },
      {
        input: "a=b=c",
        expected: "a=b=c",
      },
      {
        input: "a=",
        expected: "a=",
      },
      {
        input: "=a",
        expected: "=a",
      },
    ],
    "backslashes ('\\')": [
      {
        input: "a\\b",
        expected: "a\\\\b",
      },
      {
        input: "a\\b\\c",
        expected: "a\\\\b\\\\c",
      },
      {
        input: "a\\",
        expected: "a\\\\",
      },
      {
        input: "\\a",
        expected: "\\\\a",
      },
    ],
    "pipes ('|')": [
      {
        input: "a|b",
        expected: "a\\|b",
      },
      {
        input: "a|b|c",
        expected: "a\\|b\\|c",
      },
      {
        input: "a|",
        expected: "a\\|",
      },
      {
        input: "|a",
        expected: "\\|a",
      },
    ],
    "semicolons (';')": [
      {
        input: "a;b",
        expected: "a\\;b",
      },
      {
        input: "a;b;c",
        expected: "a\\;b\\;c",
      },
      {
        input: "a;",
        expected: "a\\;",
      },
      {
        input: ";a",
        expected: "\\;a",
      },
    ],
    "question marks ('?')": [
      {
        input: "a?b",
        expected: "a\\?b",
      },
      {
        input: "a?b?c",
        expected: "a\\?b\\?c",
      },
      {
        input: "a?",
        expected: "a\\?",
      },
      {
        input: "?a",
        expected: "\\?a",
      },
    ],
    "parentheses ('(', ')')": [
      {
        input: "a(b",
        expected: "a\\(b",
      },
      {
        input: "a(b(c",
        expected: "a\\(b\\(c",
      },
      {
        input: "a(",
        expected: "a\\(",
      },
      {
        input: "(a",
        expected: "\\(a",
      },
      {
        input: "a)b",
        expected: "a\\)b",
      },
      {
        input: "a)b)c",
        expected: "a\\)b\\)c",
      },
      {
        input: "a)",
        expected: "a\\)",
      },
      {
        input: ")a",
        expected: "\\)a",
      },
      {
        input: "a(b)c",
        expected: "a\\(b\\)c",
      },
    ],
    "parentheses ('(', ')') + commas (',')": [
      {
        input: "a(b,c)d",
        expected: "a\\(b,c\\)d",
      },
      {
        input: "a(,b)c",
        expected: "a\\(,b\\)c",
      },
      {
        input: "a(b,)c",
        expected: "a\\(b,\\)c",
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
    "square brackets ('[', ']') + commas (',')": [
      {
        input: "a[b,c]d",
        expected: "a[b,c]d",
      },
      {
        input: "a[,b]c",
        expected: "a[,b]c",
      },
      {
        input: "a[b,]c",
        expected: "a[b,]c",
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
    "curly brackets ('{', '}') + commas (',')": [
      {
        input: "a{b,c}d",
        expected: "a{b,c}d",
      },
      {
        input: "a{,b}c",
        expected: "a{,b}c",
      },
      {
        input: "a{b,}c",
        expected: "a{b,}c",
      },
      {
        input: "a{bc,de}f",
        expected: "a{bc,de}f",
      },
      {
        input: "a{b,{c,d},e}f",
        expected: "a{b,{c,d},e}f",
      },
      {
        input: "a{\u000Db,c}d",
        expected: "a{b,c}d",
      },
      {
        input: "a{\u2028b,c}d",
        expected: "a{\u2028b,c}d",
      },
      {
        input: "a{\u2029b,c}d",
        expected: "a{\u2029b,c}d",
      },
      {
        input: "a{b,c\u000D}d",
        expected: "a{b,c}d",
      },
      {
        input: "a{b,c\u2028}d",
        expected: "a{b,c\u2028}d",
      },
      {
        input: "a{b,c\u2029}d",
        expected: "a{b,c\u2029}d",
      },
      {
        input: "a{{b,c}",
        expected: "a{{b,c}",
      },
      {
        input: "a{b{c,d}",
        expected: "a{b{c,d}",
      },
    ],
    "curly brackets ('{', '}') + periods ('.')": [
      {
        input: "a{0..2}b",
        expected: "a{0..2}b",
      },
      {
        input: "a{\u000D0..2}b",
        expected: "a{0..2}b",
      },
      {
        input: "a{\u20280..2}b",
        expected: "a{\u20280..2}b",
      },
      {
        input: "a{\u20290..2}b",
        expected: "a{\u20290..2}b",
      },
      {
        input: "a{0..2\u000D}b",
        expected: "a{0..2}b",
      },
      {
        input: "a{0..2\u2028}b",
        expected: "a{0..2\u2028}b",
      },
      {
        input: "a{0..2\u2029}b",
        expected: "a{0..2\u2029}b",
      },
    ],
    "angle brackets ('<', '>')": [
      {
        input: "a<b",
        expected: "a\\<b",
      },
      {
        input: "a<b<c",
        expected: "a\\<b\\<c",
      },
      {
        input: "a<",
        expected: "a\\<",
      },
      {
        input: "<a",
        expected: "\\<a",
      },
      {
        input: "a>b",
        expected: "a\\>b",
      },
      {
        input: "a>b>c",
        expected: "a\\>b\\>c",
      },
      {
        input: "a>",
        expected: "a\\>",
      },
      {
        input: ">a",
        expected: "\\>a",
      },
      {
        input: "a<b>c",
        expected: "a\\<b\\>c",
      },
    ],
  },
  [binCsh]: {
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
        expected: "a\\\tb",
      },
      {
        input: "a\tb\tc",
        expected: "a\\\tb\\\tc",
      },
      {
        input: "a\t",
        expected: "a\\\t",
      },
      {
        input: "\ta",
        expected: "\\\ta",
      },
    ],
    "<end of line> (\\n)": [
      {
        input: "a\nb",
        expected: "a\\ b",
      },
      {
        input: "a\nb\nc",
        expected: "a\\ b\\ c",
      },
      {
        input: "a\n",
        expected: "a\\ ",
      },
      {
        input: "\na",
        expected: "\\ a",
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
        expected: "a\\ b",
      },
      {
        input: "a\r\nb\r\nc",
        expected: "a\\ b\\ c",
      },
      {
        input: "\r\na",
        expected: "\\ a",
      },
      {
        input: "a\r\n",
        expected: "a\\ ",
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
        expected: "a\\ b",
      },
      {
        input: "a b c",
        expected: "a\\ b\\ c",
      },
      {
        input: "a ",
        expected: "a\\ ",
      },
      {
        input: " a",
        expected: "\\ a",
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
        expected: "a'\u00A0'b",
      },
      {
        input: "a\u00A0b\u00A0c",
        expected: "a'\u00A0'b'\u00A0'c",
      },
      {
        input: "a\u00A0",
        expected: "a'\u00A0'",
      },
      {
        input: "\u00A0a",
        expected: "'\u00A0'a",
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
        expected: "a\\'b",
      },
      {
        input: "a'b'c",
        expected: "a\\'b\\'c",
      },
      {
        input: "a'",
        expected: "a\\'",
      },
      {
        input: "'a",
        expected: "\\'a",
      },
    ],
    "double quotes ('\"')": [
      {
        input: 'a"b',
        expected: 'a\\"b',
      },
      {
        input: 'a"b"c',
        expected: 'a\\"b\\"c',
      },
      {
        input: 'a"',
        expected: 'a\\"',
      },
      {
        input: '"a',
        expected: '\\"a',
      },
    ],
    "backticks ('`')": [
      {
        input: "a`b",
        expected: "a\\`b",
      },
      {
        input: "a`b`c",
        expected: "a\\`b\\`c",
      },
      {
        input: "a`",
        expected: "a\\`",
      },
      {
        input: "`a",
        expected: "\\`a",
      },
    ],
    "tildes ('~')": [
      {
        input: "a~b",
        expected: "a~b",
      },
      {
        input: "a~b~c",
        expected: "a~b~c",
      },
      {
        input: "a~",
        expected: "a~",
      },
      {
        input: "~a",
        expected: "\\~a",
      },
      {
        input: "~a~b",
        expected: "\\~a~b",
      },
    ],
    "tildes (`~`) + whitespace": [
      {
        input: "a ~b",
        expected: "a\\ \\~b",
      },
      {
        input: "a\t~b",
        expected: "a\\\t\\~b",
      },
    ],
    "exclamation marks ('!')": [
      {
        input: "a!b",
        expected: "a\\!b",
      },
      {
        input: "a!b!c",
        expected: "a\\!b\\!c",
      },
      {
        input: "escaping_at_the_end_is_not_necessary_but_easier!",
        expected: "escaping_at_the_end_is_not_necessary_but_easier\\!",
      },
      {
        input: "!a",
        expected: "\\!a",
      },
      {
        input: "!a!",
        expected: "\\!a\\!",
      },
      {
        input: "a!b!",
        expected: "a\\!b\\!",
      },
      {
        input: "a!!b",
        expected: "a\\!\\!b",
      },
      {
        input: "a!!!b",
        expected: "a\\!\\!\\!b",
      },
    ],
    "exclamation marks ('!') + backslashes ('\\')": [
      {
        input: "a\\!",
        expected: "a\\\\\\!",
      },
      {
        input: "\\!a",
        expected: "\\\\\\!a",
      },
      {
        input: "a\\!b",
        expected: "a\\\\\\!b",
      },
    ],
    "hashtags ('#')": [
      {
        input: "a#b",
        expected: "a\\#b",
      },
      {
        input: "a#b#c",
        expected: "a\\#b\\#c",
      },
      {
        input: "#a",
        expected: "\\#a",
      },
      {
        input: "a#",
        expected: "a\\#",
      },
    ],
    "hashtags ('#') + whitespace": [
      {
        input: "a #b",
        expected: "a\\ \\#b",
      },
      {
        input: "a\t#b",
        expected: "a\\\t\\#b",
      },
    ],
    "dollar signs ('$')": [
      {
        input: "a$b",
        expected: "a\\$b",
      },
      {
        input: "a$b$c",
        expected: "a\\$b\\$c",
      },
      {
        input: "a$",
        expected: "a\\$",
      },
      {
        input: "$a",
        expected: "\\$a",
      },
    ],
    "ampersands ('&')": [
      {
        input: "a&b",
        expected: "a\\&b",
      },
      {
        input: "a&b&c",
        expected: "a\\&b\\&c",
      },
      {
        input: "a&",
        expected: "a\\&",
      },
      {
        input: "&a",
        expected: "\\&a",
      },
    ],
    "asterisks ('*')": [
      {
        input: "a*b",
        expected: "a\\*b",
      },
      {
        input: "a*b*c",
        expected: "a\\*b\\*c",
      },
      {
        input: "a*",
        expected: "a\\*",
      },
      {
        input: "*a",
        expected: "\\*a",
      },
    ],
    "hyphen ('-')": [
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
    "equals ('=')": [
      {
        input: "a=b",
        expected: "a=b",
      },
      {
        input: "a=b=c",
        expected: "a=b=c",
      },
      {
        input: "a=",
        expected: "a=",
      },
      {
        input: "=a",
        expected: "=a",
      },
    ],
    "backslashes ('\\')": [
      {
        input: "a\\b",
        expected: "a\\\\b",
      },
      {
        input: "a\\b\\c",
        expected: "a\\\\b\\\\c",
      },
      {
        input: "a\\",
        expected: "a\\\\",
      },
      {
        input: "\\a",
        expected: "\\\\a",
      },
    ],
    "pipes ('|')": [
      {
        input: "a|b",
        expected: "a\\|b",
      },
      {
        input: "a|b|c",
        expected: "a\\|b\\|c",
      },
      {
        input: "a|",
        expected: "a\\|",
      },
      {
        input: "|a",
        expected: "\\|a",
      },
    ],
    "semicolons (';')": [
      {
        input: "a;b",
        expected: "a\\;b",
      },
      {
        input: "a;b;c",
        expected: "a\\;b\\;c",
      },
      {
        input: "a;",
        expected: "a\\;",
      },
      {
        input: ";a",
        expected: "\\;a",
      },
    ],
    "question marks ('?')": [
      {
        input: "a?b",
        expected: "a\\?b",
      },
      {
        input: "a?b?c",
        expected: "a\\?b\\?c",
      },
      {
        input: "a?",
        expected: "a\\?",
      },
      {
        input: "?a",
        expected: "\\?a",
      },
    ],
    "parentheses ('(', ')')": [
      {
        input: "a(b",
        expected: "a\\(b",
      },
      {
        input: "a(b(c",
        expected: "a\\(b\\(c",
      },
      {
        input: "a(",
        expected: "a\\(",
      },
      {
        input: "(a",
        expected: "\\(a",
      },
      {
        input: "a)b",
        expected: "a\\)b",
      },
      {
        input: "a)b)c",
        expected: "a\\)b\\)c",
      },
      {
        input: "a)",
        expected: "a\\)",
      },
      {
        input: ")a",
        expected: "\\)a",
      },
      {
        input: "a(b)c",
        expected: "a\\(b\\)c",
      },
    ],
    "parentheses ('(', ')') + commas (',')": [
      {
        input: "a(b,c)d",
        expected: "a\\(b,c\\)d",
      },
      {
        input: "a(b,)c",
        expected: "a\\(b,\\)c",
      },
      {
        input: "a(,b)c",
        expected: "a\\(,b\\)c",
      },
    ],
    "square brackets ('[', ']')": [
      {
        input: "a[b",
        expected: "a\\[b",
      },
      {
        input: "a[b[c",
        expected: "a\\[b\\[c",
      },
      {
        input: "a[",
        expected: "a\\[",
      },
      {
        input: "[a",
        expected: "\\[a",
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
        expected: "a\\[b]c",
      },
    ],
    "square brackets ('[', ']') + commas (',')": [
      {
        input: "a[b,c]d",
        expected: "a\\[b,c]d",
      },
      {
        input: "a[b,]c",
        expected: "a\\[b,]c",
      },
      {
        input: "a[,b]c",
        expected: "a\\[,b]c",
      },
    ],
    "curly brackets ('{', '}')": [
      {
        input: "a{b",
        expected: "a\\{b",
      },
      {
        input: "a{b{c",
        expected: "a\\{b\\{c",
      },
      {
        input: "a{",
        expected: "a\\{",
      },
      {
        input: "{a",
        expected: "\\{a",
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
        expected: "a\\{b}c",
      },
    ],
    "curly brackets ('{', '}') + commas (',')": [
      {
        input: "a{b,c}d",
        expected: "a\\{b,c}d",
      },
      {
        input: "a{,b}c",
        expected: "a\\{,b}c",
      },
      {
        input: "a{b,}c",
        expected: "a\\{b,}c",
      },
      {
        input: "a{bc,de}f",
        expected: "a\\{bc,de}f",
      },
      {
        input: "a{b,{c,d},e}f",
        expected: "a\\{b,\\{c,d},e}f",
      },
      {
        input: "a{\u000Db,c}d",
        expected: "a\\{b,c}d",
      },
      {
        input: "a{\u2028b,c}d",
        expected: "a\\{\u2028b,c}d",
      },
      {
        input: "a{\u2029b,c}d",
        expected: "a\\{\u2029b,c}d",
      },
      {
        input: "a{b,c\u000D}d",
        expected: "a\\{b,c}d",
      },
      {
        input: "a{b,c\u2028}d",
        expected: "a\\{b,c\u2028}d",
      },
      {
        input: "a{b,c\u2029}d",
        expected: "a\\{b,c\u2029}d",
      },
      {
        input: "a{{b,c}",
        expected: "a\\{\\{b,c}",
      },
      {
        input: "a{b{c,d}",
        expected: "a\\{b\\{c,d}",
      },
    ],
    "curly brackets ('{', '}') + periods ('.')": [
      {
        input: "a{0..2}b",
        expected: "a\\{0..2}b",
      },
      {
        input: "a{\u000D0..2}b",
        expected: "a\\{0..2}b",
      },
      {
        input: "a{\u20280..2}b",
        expected: "a\\{\u20280..2}b",
      },
      {
        input: "a{\u20290..2}b",
        expected: "a\\{\u20290..2}b",
      },
      {
        input: "a{0..2\u000D}b",
        expected: "a\\{0..2}b",
      },
      {
        input: "a{0..2\u2028}b",
        expected: "a\\{0..2\u2028}b",
      },
      {
        input: "a{0..2\u2029}b",
        expected: "a\\{0..2\u2029}b",
      },
    ],
    "angle brackets ('<', '>')": [
      {
        input: "a<b",
        expected: "a\\<b",
      },
      {
        input: "a<b<c",
        expected: "a\\<b\\<c",
      },
      {
        input: "a<",
        expected: "a\\<",
      },
      {
        input: "<a",
        expected: "\\<a",
      },
      {
        input: "a>b",
        expected: "a\\>b",
      },
      {
        input: "a>b>c",
        expected: "a\\>b\\>c",
      },
      {
        input: "a>",
        expected: "a\\>",
      },
      {
        input: ">a",
        expected: "\\>a",
      },
      {
        input: "a<b>c",
        expected: "a\\<b\\>c",
      },
    ],
  },
  [binDash]: {
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
        expected: "a\\\tb",
      },
      {
        input: "a\tb\tc",
        expected: "a\\\tb\\\tc",
      },
      {
        input: "a\t",
        expected: "a\\\t",
      },
      {
        input: "\ta",
        expected: "\\\ta",
      },
    ],
    "<end of line> (\\n)": [
      {
        input: "a\nb",
        expected: "a\\ b",
      },
      {
        input: "a\nb\nc",
        expected: "a\\ b\\ c",
      },
      {
        input: "a\n",
        expected: "a\\ ",
      },
      {
        input: "\na",
        expected: "\\ a",
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
        expected: "a\\ b",
      },
      {
        input: "a\r\nb\r\nc",
        expected: "a\\ b\\ c",
      },
      {
        input: "\r\na",
        expected: "\\ a",
      },
      {
        input: "a\r\n",
        expected: "a\\ ",
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
        expected: "a\\ b",
      },
      {
        input: "a b c",
        expected: "a\\ b\\ c",
      },
      {
        input: "a ",
        expected: "a\\ ",
      },
      {
        input: " a",
        expected: "\\ a",
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
        expected: "a\\'b",
      },
      {
        input: "a'b'c",
        expected: "a\\'b\\'c",
      },
      {
        input: "a'",
        expected: "a\\'",
      },
      {
        input: "'a",
        expected: "\\'a",
      },
    ],
    "double quotes ('\"')": [
      {
        input: 'a"b',
        expected: 'a\\"b',
      },
      {
        input: 'a"b"c',
        expected: 'a\\"b\\"c',
      },
      {
        input: 'a"',
        expected: 'a\\"',
      },
      {
        input: '"a',
        expected: '\\"a',
      },
    ],
    "backticks ('`')": [
      {
        input: "a`b",
        expected: "a\\`b",
      },
      {
        input: "a`b`c",
        expected: "a\\`b\\`c",
      },
      {
        input: "a`",
        expected: "a\\`",
      },
      {
        input: "`a",
        expected: "\\`a",
      },
    ],
    "tildes ('~')": [
      {
        input: "a~b",
        expected: "a~b",
      },
      {
        input: "a~b~c",
        expected: "a~b~c",
      },
      {
        input: "a~",
        expected: "a~",
      },
      {
        input: "~a",
        expected: "\\~a",
      },
      {
        input: "~a~b",
        expected: "\\~a~b",
      },
    ],
    "tildes (`~`) + whitespace": [
      {
        input: "a ~b",
        expected: "a\\ \\~b",
      },
      {
        input: "a\t~b",
        expected: "a\\\t\\~b",
      },
    ],
    "exclamation marks ('!')": [
      {
        input: "a!b",
        expected: "a!b",
      },
      {
        input: "a!b!c",
        expected: "a!b!c",
      },
      {
        input: "a!",
        expected: "a!",
      },
      {
        input: "!a",
        expected: "!a",
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
        expected: "\\#a",
      },
    ],
    "hashtags ('#') + whitespace": [
      {
        input: "a #b",
        expected: "a\\ \\#b",
      },
      {
        input: "a\t#b",
        expected: "a\\\t\\#b",
      },
    ],
    "dollar signs ('$')": [
      {
        input: "a$b",
        expected: "a\\$b",
      },
      {
        input: "a$b$c",
        expected: "a\\$b\\$c",
      },
      {
        input: "a$",
        expected: "a\\$",
      },
      {
        input: "$a",
        expected: "\\$a",
      },
    ],
    "ampersands ('&')": [
      {
        input: "a&b",
        expected: "a\\&b",
      },
      {
        input: "a&b&c",
        expected: "a\\&b\\&c",
      },
      {
        input: "a&",
        expected: "a\\&",
      },
      {
        input: "&a",
        expected: "\\&a",
      },
    ],
    "asterisks ('*')": [
      {
        input: "a*b",
        expected: "a\\*b",
      },
      {
        input: "a*b*c",
        expected: "a\\*b\\*c",
      },
      {
        input: "a*",
        expected: "a\\*",
      },
      {
        input: "*a",
        expected: "\\*a",
      },
    ],
    "hyphen ('-')": [
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
    "equals ('=')": [
      {
        input: "a=b",
        expected: "a=b",
      },
      {
        input: "a=b=c",
        expected: "a=b=c",
      },
      {
        input: "a=",
        expected: "a=",
      },
      {
        input: "=a",
        expected: "=a",
      },
    ],
    "backslashes ('\\')": [
      {
        input: "a\\b",
        expected: "a\\\\b",
      },
      {
        input: "a\\b\\c",
        expected: "a\\\\b\\\\c",
      },
      {
        input: "a\\",
        expected: "a\\\\",
      },
      {
        input: "\\a",
        expected: "\\\\a",
      },
    ],
    "pipes ('|')": [
      {
        input: "a|b",
        expected: "a\\|b",
      },
      {
        input: "a|b|c",
        expected: "a\\|b\\|c",
      },
      {
        input: "a|",
        expected: "a\\|",
      },
      {
        input: "|a",
        expected: "\\|a",
      },
    ],
    "semicolons (';')": [
      {
        input: "a;b",
        expected: "a\\;b",
      },
      {
        input: "a;b;c",
        expected: "a\\;b\\;c",
      },
      {
        input: "a;",
        expected: "a\\;",
      },
      {
        input: ";a",
        expected: "\\;a",
      },
    ],
    "question marks ('?')": [
      {
        input: "a?b",
        expected: "a\\?b",
      },
      {
        input: "a?b?c",
        expected: "a\\?b\\?c",
      },
      {
        input: "a?",
        expected: "a\\?",
      },
      {
        input: "?a",
        expected: "\\?a",
      },
    ],
    "parentheses ('(', ')')": [
      {
        input: "a(b",
        expected: "a\\(b",
      },
      {
        input: "a(b(c",
        expected: "a\\(b\\(c",
      },
      {
        input: "a(",
        expected: "a\\(",
      },
      {
        input: "(a",
        expected: "\\(a",
      },
      {
        input: "a)b",
        expected: "a\\)b",
      },
      {
        input: "a)b)c",
        expected: "a\\)b\\)c",
      },
      {
        input: "a)",
        expected: "a\\)",
      },
      {
        input: ")a",
        expected: "\\)a",
      },
      {
        input: "a(b)c",
        expected: "a\\(b\\)c",
      },
    ],
    "parentheses ('(', ')') + commas (',')": [
      {
        input: "a(b,c)d",
        expected: "a\\(b,c\\)d",
      },
      {
        input: "a(b,)c",
        expected: "a\\(b,\\)c",
      },
      {
        input: "a(,b)c",
        expected: "a\\(,b\\)c",
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
    "square brackets ('[', ']') + commas (',')": [
      {
        input: "a[b,c]d",
        expected: "a[b,c]d",
      },
      {
        input: "a[b,]c",
        expected: "a[b,]c",
      },
      {
        input: "a[,b]c",
        expected: "a[,b]c",
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
    "curly brackets ('{', '}') + commas (',')": [
      {
        input: "a{b,c}d",
        expected: "a{b,c}d",
      },
      {
        input: "a{,b}c",
        expected: "a{,b}c",
      },
      {
        input: "a{b,}c",
        expected: "a{b,}c",
      },
      {
        input: "a{bc,de}f",
        expected: "a{bc,de}f",
      },
      {
        input: "a{b,{c,d},e}f",
        expected: "a{b,{c,d},e}f",
      },
      {
        input: "a{\u000Db,c}d",
        expected: "a{b,c}d",
      },
      {
        input: "a{\u2028b,c}d",
        expected: "a{\u2028b,c}d",
      },
      {
        input: "a{\u2029b,c}d",
        expected: "a{\u2029b,c}d",
      },
      {
        input: "a{b,c\u000D}d",
        expected: "a{b,c}d",
      },
      {
        input: "a{b,c\u2028}d",
        expected: "a{b,c\u2028}d",
      },
      {
        input: "a{b,c\u2029}d",
        expected: "a{b,c\u2029}d",
      },
    ],
    "curly brackets ('{', '}') + periods ('.')": [
      {
        input: "a{0..2}b",
        expected: "a{0..2}b",
      },
      {
        input: "a{\u000D0..2}b",
        expected: "a{0..2}b",
      },
      {
        input: "a{\u20280..2}b",
        expected: "a{\u20280..2}b",
      },
      {
        input: "a{\u20290..2}b",
        expected: "a{\u20290..2}b",
      },
      {
        input: "a{0..2\u000D}b",
        expected: "a{0..2}b",
      },
      {
        input: "a{0..2\u2028}b",
        expected: "a{0..2\u2028}b",
      },
      {
        input: "a{0..2\u2029}b",
        expected: "a{0..2\u2029}b",
      },
    ],
    "angle brackets ('<', '>')": [
      {
        input: "a<b",
        expected: "a\\<b",
      },
      {
        input: "a<b<c",
        expected: "a\\<b\\<c",
      },
      {
        input: "a<",
        expected: "a\\<",
      },
      {
        input: "<a",
        expected: "\\<a",
      },
      {
        input: "a>b",
        expected: "a\\>b",
      },
      {
        input: "a>b>c",
        expected: "a\\>b\\>c",
      },
      {
        input: "a>",
        expected: "a\\>",
      },
      {
        input: ">a",
        expected: "\\>a",
      },
      {
        input: "a<b>c",
        expected: "a\\<b\\>c",
      },
    ],
  },
  [binZsh]: {
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
        expected: "a\\\tb",
      },
      {
        input: "a\tb\tc",
        expected: "a\\\tb\\\tc",
      },
      {
        input: "a\t",
        expected: "a\\\t",
      },
      {
        input: "\ta",
        expected: "\\\ta",
      },
    ],
    "<end of line> (\\n)": [
      {
        input: "a\nb",
        expected: "a\\ b",
      },
      {
        input: "a\nb\nc",
        expected: "a\\ b\\ c",
      },
      {
        input: "a\n",
        expected: "a\\ ",
      },
      {
        input: "\na",
        expected: "\\ a",
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
        expected: "a\\ b",
      },
      {
        input: "a\r\nb\r\nc",
        expected: "a\\ b\\ c",
      },
      {
        input: "a\r\n",
        expected: "a\\ ",
      },
      {
        input: "\r\na",
        expected: "\\ a",
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
        expected: "a\\ b",
      },
      {
        input: "a b c",
        expected: "a\\ b\\ c",
      },
      {
        input: "a ",
        expected: "a\\ ",
      },
      {
        input: " a",
        expected: "\\ a",
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
        expected: "a\\'b",
      },
      {
        input: "a'b'c",
        expected: "a\\'b\\'c",
      },
      {
        input: "a'",
        expected: "a\\'",
      },
      {
        input: "'a",
        expected: "\\'a",
      },
    ],
    "double quotes ('\"')": [
      {
        input: 'a"b',
        expected: 'a\\"b',
      },
      {
        input: 'a"b"c',
        expected: 'a\\"b\\"c',
      },
      {
        input: 'a"',
        expected: 'a\\"',
      },
      {
        input: '"a',
        expected: '\\"a',
      },
    ],
    "backticks ('`')": [
      {
        input: "a`b",
        expected: "a\\`b",
      },
      {
        input: "a`b`c",
        expected: "a\\`b\\`c",
      },
      {
        input: "a`",
        expected: "a\\`",
      },
      {
        input: "`a",
        expected: "\\`a",
      },
    ],
    "tildes ('~')": [
      {
        input: "a~b",
        expected: "a~b",
      },
      {
        input: "a~b~c",
        expected: "a~b~c",
      },
      {
        input: "a~",
        expected: "a~",
      },
      {
        input: "~a",
        expected: "\\~a",
      },
      {
        input: "~a~b",
        expected: "\\~a~b",
      },
    ],
    "tildes (`~`) + whitespace": [
      {
        input: "a ~b",
        expected: "a\\ \\~b",
      },
      {
        input: "a\t~b",
        expected: "a\\\t\\~b",
      },
    ],
    "exclamation marks ('!')": [
      {
        input: "a!b",
        expected: "a!b",
      },
      {
        input: "a!b!c",
        expected: "a!b!c",
      },
      {
        input: "a!",
        expected: "a!",
      },
      {
        input: "!a",
        expected: "!a",
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
        expected: "\\#a",
      },
    ],
    "hashtags ('#') + whitespace": [
      {
        input: "a #b",
        expected: "a\\ \\#b",
      },
      {
        input: "a\t#b",
        expected: "a\\\t\\#b",
      },
    ],
    "dollar signs ('$')": [
      {
        input: "a$b",
        expected: "a\\$b",
      },
      {
        input: "a$b$c",
        expected: "a\\$b\\$c",
      },
      {
        input: "a$",
        expected: "a\\$",
      },
      {
        input: "$a",
        expected: "\\$a",
      },
    ],
    "ampersands ('&')": [
      {
        input: "a&b",
        expected: "a\\&b",
      },
      {
        input: "a&b&c",
        expected: "a\\&b\\&c",
      },
      {
        input: "a&",
        expected: "a\\&",
      },
      {
        input: "&a",
        expected: "\\&a",
      },
    ],
    "asterisks ('*')": [
      {
        input: "a*b",
        expected: "a\\*b",
      },
      {
        input: "a*b*c",
        expected: "a\\*b\\*c",
      },
      {
        input: "a*",
        expected: "a\\*",
      },
      {
        input: "*a",
        expected: "\\*a",
      },
    ],
    "hyphen ('-')": [
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
    "equals ('=')": [
      {
        input: "a=b",
        expected: "a=b",
      },
      {
        input: "a=b=c",
        expected: "a=b=c",
      },
      {
        input: "a=",
        expected: "a=",
      },
      {
        input: "=a",
        expected: "\\=a",
      },
      {
        input: "=a=b",
        expected: "\\=a=b",
      },
    ],
    "equals ('=') + whitespace": [
      {
        input: "a =b",
        expected: "a\\ \\=b",
      },
      {
        input: "a\t=b",
        expected: "a\\\t\\=b",
      },
    ],
    "backslashes ('\\')": [
      {
        input: "a\\b",
        expected: "a\\\\b",
      },
      {
        input: "a\\b\\c",
        expected: "a\\\\b\\\\c",
      },
      {
        input: "a\\",
        expected: "a\\\\",
      },
      {
        input: "\\a",
        expected: "\\\\a",
      },
    ],
    "pipes ('|')": [
      {
        input: "a|b",
        expected: "a\\|b",
      },
      {
        input: "a|b|c",
        expected: "a\\|b\\|c",
      },
      {
        input: "a|",
        expected: "a\\|",
      },
      {
        input: "|a",
        expected: "\\|a",
      },
    ],
    "semicolons (';')": [
      {
        input: "a;b",
        expected: "a\\;b",
      },
      {
        input: "a;b;c",
        expected: "a\\;b\\;c",
      },
      {
        input: "a;",
        expected: "a\\;",
      },
      {
        input: ";a",
        expected: "\\;a",
      },
    ],
    "question marks ('?')": [
      {
        input: "a?b",
        expected: "a\\?b",
      },
      {
        input: "a?b?c",
        expected: "a\\?b\\?c",
      },
      {
        input: "a?",
        expected: "a\\?",
      },
      {
        input: "?a",
        expected: "\\?a",
      },
    ],
    "parentheses ('(', ')')": [
      {
        input: "a(b",
        expected: "a\\(b",
      },
      {
        input: "a(b(c",
        expected: "a\\(b\\(c",
      },
      {
        input: "a(",
        expected: "a\\(",
      },
      {
        input: "(a",
        expected: "\\(a",
      },
      {
        input: "a)b",
        expected: "a\\)b",
      },
      {
        input: "a)b)c",
        expected: "a\\)b\\)c",
      },
      {
        input: "a)",
        expected: "a\\)",
      },
      {
        input: ")a",
        expected: "\\)a",
      },
      {
        input: "a(b)c",
        expected: "a\\(b\\)c",
      },
    ],
    "parentheses ('(', ')') + whitespace": [
      {
        input: "a(b,c)d",
        expected: "a\\(b,c\\)d",
      },
      {
        input: "a(b,)c",
        expected: "a\\(b,\\)c",
      },
      {
        input: "a(,b)c",
        expected: "a\\(,b\\)c",
      },
    ],
    "square brackets ('[', ']')": [
      {
        input: "a[b",
        expected: "a\\[b",
      },
      {
        input: "a[b[c",
        expected: "a\\[b\\[c",
      },
      {
        input: "a[",
        expected: "a\\[",
      },
      {
        input: "[a",
        expected: "\\[a",
      },
      {
        input: "a]b",
        expected: "a\\]b",
      },
      {
        input: "a]b]c",
        expected: "a\\]b\\]c",
      },
      {
        input: "a]",
        expected: "a\\]",
      },
      {
        input: "]a",
        expected: "\\]a",
      },
      {
        input: "a[b]c",
        expected: "a\\[b\\]c",
      },
    ],
    "square brackets ('[', ']') + commas (',')": [
      {
        input: "a[b,c]d",
        expected: "a\\[b,c\\]d",
      },
      {
        input: "a[b,]c",
        expected: "a\\[b,\\]c",
      },
      {
        input: "a[,b]c",
        expected: "a\\[,b\\]c",
      },
    ],
    "curly brackets ('{', '}')": [
      {
        input: "a{b",
        expected: "a\\{b",
      },
      {
        input: "a{b{c",
        expected: "a\\{b\\{c",
      },
      {
        input: "a{",
        expected: "a\\{",
      },
      {
        input: "{a",
        expected: "\\{a",
      },
      {
        input: "a}b",
        expected: "a\\}b",
      },
      {
        input: "a}b}c",
        expected: "a\\}b\\}c",
      },
      {
        input: "a}",
        expected: "a\\}",
      },
      {
        input: "}a",
        expected: "\\}a",
      },
      {
        input: "a{b}c",
        expected: "a\\{b\\}c",
      },
    ],
    "curly brackets ('{', '}') + commas (',')": [
      {
        input: "a{b,c}d",
        expected: "a\\{b,c\\}d",
      },
      {
        input: "a{b,{c,d},e}f",
        expected: "a\\{b,\\{c,d\\},e\\}f",
      },
    ],
    "curly brackets ('{', '}') + periods ('.')": [
      {
        input: "a{0..2}b",
        expected: "a\\{0..2\\}b",
      },
    ],
    "angle brackets ('<', '>')": [
      {
        input: "a<b",
        expected: "a\\<b",
      },
      {
        input: "a<b<c",
        expected: "a\\<b\\<c",
      },
      {
        input: "a<",
        expected: "a\\<",
      },
      {
        input: "<a",
        expected: "\\<a",
      },
      {
        input: "a>b",
        expected: "a\\>b",
      },
      {
        input: "a>b>c",
        expected: "a\\>b\\>c",
      },
      {
        input: "a>",
        expected: "a\\>",
      },
      {
        input: ">a",
        expected: "\\>a",
      },
      {
        input: "a<b>c",
        expected: "a\\<b\\>c",
      },
    ],
  },
};

export const flag = {
  [null]: {
    "sample strings": [
      {
        input: "foobar",
        expected: { unquoted: "foobar" },
      },
    ],
    "single hyphen (-)": [
      {
        input: "-a",
        expected: { unquoted: "a" },
      },
      {
        input: "a-",
        expected: { unquoted: "a-" },
      },
      {
        input: "-a-",
        expected: { unquoted: "a-" },
      },
      {
        input: "-ab",
        expected: { unquoted: "ab" },
      },
      {
        input: "a-b",
        expected: { unquoted: "a-b" },
      },
      {
        input: "-a-b",
        expected: { unquoted: "a-b" },
      },
      {
        input: "-a=b",
        expected: { unquoted: "a=b" },
      },
    ],
    "double hyphen (--)": [
      {
        input: "--a",
        expected: { unquoted: "a" },
      },
      {
        input: "a--",
        expected: { unquoted: "a--" },
      },
      {
        input: "--a--",
        expected: { unquoted: "a--" },
      },
      {
        input: "--ab",
        expected: { unquoted: "ab" },
      },
      {
        input: "a--b",
        expected: { unquoted: "a--b" },
      },
      {
        input: "--a--b",
        expected: { unquoted: "a--b" },
      },
      {
        input: "--a=b",
        expected: { unquoted: "a=b" },
      },
    ],
    "many hyphens (/-{3,}/)": [
      {
        input: "---a",
        expected: { unquoted: "a" },
      },
      {
        input: "---ab",
        expected: { unquoted: "ab" },
      },
      {
        input: "---a=b",
        expected: { unquoted: "a=b" },
      },
      {
        input: "----a",
        expected: { unquoted: "a" },
      },
      {
        input: "----ab",
        expected: { unquoted: "ab" },
      },
      {
        input: "----a=b",
        expected: { unquoted: "a=b" },
      },
    ],
  },
  [binBash]: {
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
      {
        input: "----a",
        expected: { unquoted: "a", quoted: "'a'" },
      },
      {
        input: "----ab",
        expected: { unquoted: "ab", quoted: "'ab'" },
      },
      {
        input: "----a=b",
        expected: { unquoted: "a=b", quoted: "'a=b'" },
      },
    ],
  },
  [binBusyBox]: {
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
      {
        input: "----a",
        expected: { unquoted: "a", quoted: "'a'" },
      },
      {
        input: "----ab",
        expected: { unquoted: "ab", quoted: "'ab'" },
      },
      {
        input: "----a=b",
        expected: { unquoted: "a=b", quoted: "'a=b'" },
      },
    ],
  },
  [binCsh]: {
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
      {
        input: "----a",
        expected: { unquoted: "a", quoted: "'a'" },
      },
      {
        input: "----ab",
        expected: { unquoted: "ab", quoted: "'ab'" },
      },
      {
        input: "----a=b",
        expected: { unquoted: "a=b", quoted: "'a=b'" },
      },
    ],
  },
  [binDash]: {
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
      {
        input: "----a",
        expected: { unquoted: "a", quoted: "'a'" },
      },
      {
        input: "----ab",
        expected: { unquoted: "ab", quoted: "'ab'" },
      },
      {
        input: "----a=b",
        expected: { unquoted: "a=b", quoted: "'a=b'" },
      },
    ],
  },
  [binZsh]: {
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
      {
        input: "----a",
        expected: { unquoted: "a", quoted: "'a'" },
      },
      {
        input: "----ab",
        expected: { unquoted: "ab", quoted: "'ab'" },
      },
      {
        input: "----a=b",
        expected: { unquoted: "a=b", quoted: "'a=b'" },
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
  [binBash]: {
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
        expected: "'a'\\''b'",
      },
      {
        input: "a'b'c",
        expected: "'a'\\''b'\\''c'",
      },
      {
        input: "a'",
        expected: "'a'\\'''",
      },
      {
        input: "'a",
        expected: "''\\''a'",
      },
    ],
    "exclamation marks ('!')": [
      {
        input: "a!b",
        expected: "'a!b'",
      },
      {
        input: "a!b!c",
        expected: "'a!b!c'",
      },
      {
        input: "a!",
        expected: "'a!'",
      },
      {
        input: "!a",
        expected: "'!a'",
      },
    ],
    "hyphen ('-')": [
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
  },
  [binBusyBox]: {
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
        expected: "'a'\\''b'",
      },
      {
        input: "a'b'c",
        expected: "'a'\\''b'\\''c'",
      },
      {
        input: "a'",
        expected: "'a'\\'''",
      },
      {
        input: "'a",
        expected: "''\\''a'",
      },
    ],
    "exclamation marks ('!')": [
      {
        input: "a!b",
        expected: "'a!b'",
      },
      {
        input: "a!b!c",
        expected: "'a!b!c'",
      },
      {
        input: "a!",
        expected: "'a!'",
      },
      {
        input: "!a",
        expected: "'!a'",
      },
    ],
    "hyphen ('-')": [
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
  },
  [binCsh]: {
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
    "<end of line> (\\n)": [
      {
        input: "a\nb",
        expected: "'a b'",
      },
      {
        input: "a\nb\nc",
        expected: "'a b c'",
      },
      {
        input: "a\n",
        expected: "'a '",
      },
      {
        input: "\na",
        expected: "' a'",
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
        expected: "'a b'",
      },
      {
        input: "a\r\nb\r\nc",
        expected: "'a b c'",
      },
      {
        input: "a\r\n",
        expected: "'a '",
      },
      {
        input: "\r\na",
        expected: "' a'",
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
        expected: "'a'\\''b'",
      },
      {
        input: "a'b'c",
        expected: "'a'\\''b'\\''c'",
      },
      {
        input: "a'",
        expected: "'a'\\'''",
      },
      {
        input: "'a",
        expected: "''\\''a'",
      },
    ],
    "exclamation marks ('!')": [
      {
        input: "a!b",
        expected: "'a\\!b'",
      },
      {
        input: "a!b!c",
        expected: "'a\\!b\\!c'",
      },
      {
        input: "escaping_at_the_end_is_not_necessary_but_easier!",
        expected: "'escaping_at_the_end_is_not_necessary_but_easier\\!'",
      },
      {
        input: "!a",
        expected: "'\\!a'",
      },
      {
        input: "!a!",
        expected: "'\\!a\\!'",
      },
    ],
    "exclamation marks ('!') + backslashes ('\\')": [
      {
        input: "a\\!",
        expected: "'a\\\\!'",
      },
      {
        input: "\\!a",
        expected: "'\\\\!a'",
      },
      {
        input: "a\\!b",
        expected: "'a\\\\!b'",
      },
    ],
    "hyphen ('-')": [
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
  },
  [binDash]: {
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
        expected: "'a'\\''b'",
      },
      {
        input: "a'b'c",
        expected: "'a'\\''b'\\''c'",
      },
      {
        input: "a'",
        expected: "'a'\\'''",
      },
      {
        input: "'a",
        expected: "''\\''a'",
      },
    ],
    "exclamation marks ('!')": [
      {
        input: "a!b",
        expected: "'a!b'",
      },
      {
        input: "a!b!c",
        expected: "'a!b!c'",
      },
      {
        input: "a!",
        expected: "'a!'",
      },
      {
        input: "!a",
        expected: "'!a'",
      },
    ],
    "hyphen ('-')": [
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
  },
  [binZsh]: {
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
        expected: "'a'\\''b'",
      },
      {
        input: "a'b'c",
        expected: "'a'\\''b'\\''c'",
      },
      {
        input: "a'",
        expected: "'a'\\'''",
      },
      {
        input: "'a",
        expected: "''\\''a'",
      },
    ],
    "exclamation marks ('!')": [
      {
        input: "a!b",
        expected: "'a!b'",
      },
      {
        input: "a!b!c",
        expected: "'a!b!c'",
      },
      {
        input: "a!",
        expected: "'a!'",
      },
      {
        input: "!a",
        expected: "'!a'",
      },
    ],
    "hyphen ('-')": [
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
  },
};

export const redos = () => [
  // CVE-2022-36064
  `foo${"{".repeat(150_000)}bar`,
  `=${":".repeat(150_000)}foobar`,
  `{${",".repeat(150_000)}`,

  // CVE-2022-25918
  "{,".repeat(150_000),
];
