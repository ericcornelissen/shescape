# Shescape API

This document provides a description of the full Application Programming
Interface (API) of Shescape.

Please [open an issue] if you found a mistake or if you have a suggestion for
how to improve the documentation.

## `quote(arg[, options])`

The `quote` function escapes and quotes a single argument and optionally takes
an options object. `quote` always returns a string, the escaped and quoted
argument.

Non-string arguments are converted to strings; an error is thrown if this is not
possible.

## `quoteAll(args[, options])`

The `quoteAll` function escapes and quotes an array of arguments and optionally
takes an options object. `quoteAll` always returns an array of strings (same
length as the input array), the escaped and quoted arguments.

Non-array inputs are converted to single-value arrays. Non-string arguments are
converted to strings; an error is thrown if this is not possible.

## `escape(arg[, options])`

The `escape` function escapes a single argument and optionally takes an options
object. `escape` always returns a string, the escaped argument.

Non-string arguments are converted to strings; an error is thrown if this is not
possible.

## `escapeAll(args[, options])`

The `escapeAll` function escapes an array of arguments and optionally takes an
options object. `escapeAll` always returns an array of strings (same length as
the input array), the escaped arguments.

Non-array inputs are converted to single-value arrays. Non-string arguments are
converted to strings; an error is thrown if this is not possible.

---

_Content licensed under [CC BY-SA 4.0]; Code snippets under the [MIT license]._

[cc by-sa 4.0]: https://creativecommons.org/licenses/by-sa/4.0/
[mit license]: https://opensource.org/license/mit/
[open an issue]: https://github.com/ericcornelissen/shescape/issues/new?labels=documentation&template=documentation.md
