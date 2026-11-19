/**
 * @overview Provides utility functions for writing tests.
 * @license MIT
 */

/**
 * Transforms a string by replacing control characters with Unicode point codes
 * (e.g. `\u{0000}`) or common text shorthands (e.g. `\t`).
 *
 * @param {string} string The string to escape control characters on.
 * @returns {string} The transformed string.
 */
export function escapeControlCharacters(string) {
  return string
    .replaceAll(/ {2}/gu, "_{2}")
    .replaceAll("\0", "\\u{0000}")
    .replaceAll("\t", "\\t")
    .replaceAll("\n", "\\n")
    .replaceAll("\v", "\\v")
    .replaceAll("\f", "\\f")
    .replaceAll("\r", "\\r")
    .replaceAll("\b", "\\u{0008}")
    .replaceAll("\u001B", "\\u{001B}")
    .replaceAll("\u0085", "\\u{0085}")
    .replaceAll("\u009B", "\\u{009B}")
    .replaceAll("\u00A0", "\\u{00A0}")
    .replaceAll("\u1680", "\\u{1680}")
    .replaceAll("\u2000", "\\u{2000}")
    .replaceAll("\u2001", "\\u{2001}")
    .replaceAll("\u2002", "\\u{2002}")
    .replaceAll("\u2003", "\\u{2003}")
    .replaceAll("\u2004", "\\u{2004}")
    .replaceAll("\u2005", "\\u{2005}")
    .replaceAll("\u2006", "\\u{2006}")
    .replaceAll("\u2007", "\\u{2007}")
    .replaceAll("\u2008", "\\u{2008}")
    .replaceAll("\u2009", "\\u{2009}")
    .replaceAll("\u200A", "\\u{200A}")
    .replaceAll("\u2028", "\\u{2028}")
    .replaceAll("\u2029", "\\u{2029}")
    .replaceAll("\u202F", "\\u{202F}")
    .replaceAll("\u205F", "\\u{205F}")
    .replaceAll("\u3000", "\\u{3000}")
    .replaceAll("\uFEFF", "\\u{FEFF}");
}
