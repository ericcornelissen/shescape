<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

# Unsafe Usage

This document provides examples of unsafe ways of using untrusted input in
commands that Shescape cannot protect against. This list should not be
considered exhaustive.

Some snippets in this document are intentionally incomplete with the goal of
preventing them from being copy-pasted into production code, which could lead to
a vulnerability.

Please [open an issue] if you found a mistake or if you have a suggestion for
how to improve the documentation.

[open an issue]: https://github.com/ericcornelissen/shescape/issues/new?template=documentation.md

## User-defined Command

If you use untrusted input as the command to execute, then escaping provides no
safety. This may look like:

```javascript
const escaped = shescape.escape(untrusted);
exec(`${escaped} arg1 ... argN`);
spawn(escaped, ["arg1", "...", "argN"]);
```

If you must change the command depending on untrusted input, use indirection.
For example:

```javascript
let command;
switch (untrusted) {
  case "cat":
  case "head":
  case "tail":
  case "wc":
    command = untrusted;
    break;
  default:
    throw new Error(`Unknown command '${untrusted}'`);
}

spawn(command, ["public-file.txt"]);
```

## User-defined Variables

If you use untrusted input for shell variable names, then, even with escaping,
the attacker may be able to set variables you weren't expecting. The following
is an example of why this might be a problem:

```javascript
const escaped = shescape.escape(untrusted);
exec(
  `export ${escaped}; cp -r "$PWD/$(basename $ORIGINAL)" "/bkp/$(ls /bkp | wc -l)"`,
);
```

which enables path traversel through inputs like `untrusted = "PWD=/some/path"`.

Instead, explicitly list the variables that are provided by the user, preferably
via the `env` option of the `node:child_process` API as described in
the [tips][tips-env].

[tips-env]: ./tips.md#use-environment-variables
