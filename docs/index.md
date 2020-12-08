---
layout: default
title: Documentation
---

# Documentation

Shescape is a simple shell escape package for JavaScript. Use it to escape
user-controlled inputs to shell commands to prevent [shell injection].

**Quick links**:
[NPM] |
[License] |
[Changelog] |
[Security]

## Features

- Zero dependencies
- Lightweight
- Supports MacOS, Linux, and Windows

## Usage

### Install

1. Install `shescape`

```shell
# npm
npm install shescape

# yarn
yarn add shescape
```

2. Import `shescape`

```js
import * as shescape from "shescape";
```

### Recipes

When using `fork`, `spawn`, `execFile`, or similar, it is recommended to use the
[quoteAll()](#quoteallargs) function to escape the array of arguments.

```js
import { spawn } from "child_process";
import * as shescape from "shescape";

spawn("command", shescape.quoteAll(args), options);
```

When using the `exec` function, or similar, it is recommended to use the
[quote()](#quotearg) function to escape individual arguments.

```js
import { exec } from "child_process";
import * as shescape from "shescape";

exec(`command ${shescape.quote(arg)}`, callback);
```

## API

### `quote(arg)`

The `quote` function takes as input a single value, the argument, puts
OS-specific quotes around it, and escapes any _dangerous_ characters.

#### Example

```js
import { quote } from "shescape";

const arg = " && ls -al";
const safeArg = quote(arg);
console.log(safeArg);
// Outputs:  "' && ls -al'"
```

#### Input-output

| Input | Type     | Description                       |
| ----- | -------- | --------------------------------- |
| `arg` | `string` | The argument to quote and escape. |

| Output    | Type     | Description                      |
| --------- | -------- | -------------------------------- |
| `safeArg` | `string` | The quoted and escaped argument. |

### `quoteAll(args)`

The `quoteAll` function takes as input an array of values, the arguments, puts
OS-specific quotes around every argument, and escapes any _dangerous_ characters
in every argument.

#### Example

```js
import { quoteAll } from "shescape";

const args = ["Guppy", " && ls -al"];
const safeArgs = quoteAll(args);
console.log(safeArgs);
// Outputs:  ["'Guppy'", "' && ls -al"]
```

#### Input-output

| Input  | Type       | Description                        |
| ------ | ---------- | ---------------------------------- |
| `args` | `string[]` | The arguments to quote and escape. |

| Output    | Type       | Description                       |
| --------- | ---------- | --------------------------------- |
| `safeArg` | `string[]` | The quoted and escaped arguments. |

### `escape(arg)`

The `escape` function takes as input a value, the argument, and escapes any
_dangerous_ characters.

Calling `escape()` directly is not recommended unless you know what you're
doing.

#### Example

```js
import { escape } from "shescape";

const arg = "' && ls -al";
const safeArg = `'${escape(arg)}'`;
console.log(safeArg);
// Outputs:  "''\'' && ls -al'"
```

#### Input-output

| Input | Type     | Description             |
| ----- | -------- | ----------------------- |
| `arg` | `string` | The argument to escape. |

| Output    | Type     | Description           |
| --------- | -------- | --------------------- |
| `safeArg` | `string` | The escaped argument. |

[shell injection]: https://portswigger.net/web-security/os-command-injection
[npm]: https://www.npmjs.com/package/shescape
[changelog]: https://github.com/ericcornelissen/shescape/blob/main/CHANGELOG.md
[license]: https://github.com/ericcornelissen/shescape/blob/main/LICENSE
[security]: https://github.com/ericcornelissen/shescape/blob/main/SECURITY.md
