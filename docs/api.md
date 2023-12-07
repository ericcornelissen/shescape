<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

# Shescape API

This document provides a description of the full Application Programming
Interface (API) of Shescape.

Please [open an issue] if you found a mistake or if you have a suggestion for
how to improve the documentation.

## `Shescape([options])`

The class to create a `shescape` instance for quoting and escaping. Optionally
takes an [options] object.

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

### `Shescape#quote(arg)`

The `quote` function escapes and quotes a single argument. Always returns a
string, the escaped and quoted argument.

Non-string arguments are converted to strings; an error is thrown if this is not
possible.

When Shescape is configured with `shell: false` this function should not be
called and will throw an error.

### `Shescape#quoteAll(args)`

The `quoteAll` function escapes and quotes an array of arguments. Always returns
an array of strings (same length as the input array), the escaped and quoted
arguments.

Non-array inputs are converted to single-value arrays. Non-string arguments are
converted to strings; an error is thrown if this is not possible.

When Shescape is configured with `shell: false` this function should not be
called and will throw an error.

## Options

### `flagProtection`

| Type      | Required | Default |
| --------- | -------- | ------- |
| `boolean` | No       | `true`  |

Whether or not to protect against flag/option injection - e.g. an attacker
enabling `--verbose` mode to leak system information. Note that this may not
work for your use case since flags/options are specific to the implementation of
the program you invoke.

It is recommended to leave this `true` unless you use (and verified the program
you invoke supports) the special `--` option. Also, if the program you invoke
has a non-standard flag implementation you should disable this option and add
program-specific protection of your own.

### `shell`

| Type                  | Required | Default |
| --------------------- | -------- | ------- |
| `string` or `boolean` | No       | `true`  |

Which shell to escape for. If omitted it defaults to `true` to prevent
accidental misuse, however this may lead to unnecessary and/or incorrect
escaping.

For usage with [`node:child_process`]'s `exec` and `execSync` functions the
value must be `true` or the same as the `shell` option for `child_process`
unless you set it to `false` (which is incorrect). For `spawn`, `spawnSync`,
`execFile`, and `execFileSync` the value must be the same as the `shell` option
for `child process`, or `false` if no shell is used. For `fork` it should always
be `false` (because it can't be used with a shell).

---

_Content licensed under [CC BY-SA 4.0]; Code snippets under the [MIT license]._

[cc by-sa 4.0]: https://creativecommons.org/licenses/by-sa/4.0/
[mit license]: https://opensource.org/license/mit/
[`node:child_process`]: https://nodejs.org/api/child_process.html
[open an issue]: https://github.com/ericcornelissen/shescape/issues/new?labels=documentation&template=documentation.md
[options]: #options
