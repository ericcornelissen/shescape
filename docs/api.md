# Shescape API

This document provides a description of the full Application Programming
Interface (API) of Shescape.

Please [open an issue] if you found a mistake or if you have a suggestion for
how to improve the documentation.

## `Shescape([options])`

The class to create a `shescape` instance for quoting and escaping. optionally
takes an [options] object.

### `Shescape#quote(arg)`

The `quote` function escapes and quotes a single argument. Always returns a
string, the escaped and quoted argument.

Non-string arguments are converted to strings; an error is thrown if this is not
possible.

### `Shescape#quoteAll(args)`

The `quoteAll` function escapes and quotes an array of arguments. Always returns
an array of strings (same length as the input array), the escaped and quoted
arguments.

Non-array inputs are converted to single-value arrays. Non-string arguments are
converted to strings; an error is thrown if this is not possible.

### `Shescape#escape(arg)`

The `escape` function escapes a single argument. Always returns a string, the
escaped argument.

Non-string arguments are converted to strings; an error is thrown if this is not
possible.

### `Shescape#escapeAll(args)`

The `escapeAll` function escapes an array of arguments. Always returns an array
of strings (same length as the input array), the escaped arguments.

Non-array inputs are converted to single-value arrays. Non-string arguments are
converted to strings; an error is thrown if this is not possible.

## Options

### `flagProtection`

Whether or not to protect against flag/option injection - e.g. an attacker
enabling `--verbose` mode to leak system information. Note that this may not
work for your use case since flags/options are specific to the implementation of
the program you invoke.

It is recommended to leave this `true` unless you use (and verified the command
you invoke supports) the special `--` option.

|         | Escaping  | Quoting   |
| ------- | --------- | --------- |
| Used    | Yes       | Yes       |
| Default | `true`    | `true`    |
| Type    | `boolean` | `boolean` |

### `interpolation`

Whether or not to escape for usage where shell interpolation functionality is
enabled. If enabled, more characters will be escaped than usual.

It is recommended to leave this `true` if you're unsure whether or not shell
interpolation is enabled.

|         | Escaping  | Quoting |
| ------- | --------- | ------- |
| Used    | Yes       | No      |
| Default | `true`    | n/a     |
| Type    | `boolean` | n/a     |

### `shell`

Which shell to escape for. This should **always** have the same value as the
[`node:child_process`] `shell` option. If omitted (or falsy) the system's
default shell will be used.

|         | Escaping              | Quoting               |
| ------- | --------------------- | --------------------- |
| Used    | Yes                   | Yes                   |
| Default | `undefined`           | `undefined`           |
| Type    | `string` or `boolean` | `string` or `boolean` |

---

_Content licensed under [CC BY-SA 4.0]; Code snippets under the [MIT license]._

[cc by-sa 4.0]: https://creativecommons.org/licenses/by-sa/4.0/
[mit license]: https://opensource.org/license/mit/
[`node:child_process`]: https://nodejs.org/api/child_process.html
[open an issue]: https://github.com/ericcornelissen/shescape/issues/new?labels=documentation&template=documentation.md
[options]: #options
