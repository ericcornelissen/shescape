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

3. Use `shescape`

### Recipes

When using `fork`, `spawn`, `execFile`, or similar, **without configuration** it
is recommended to use the [escapeAll()](#escapeallargs) function to escape the
array of arguments. This is because these function come with built-in protection
which may cause unexpected behaviour when using [quoteAll()](#quoteallargs).

```js
import { spawn } from "child_process";
import * as shescape from "shescape";

const name = "&& ls";
const echo = spawn("echo", shescape.escapeAll(["Hello", name]));
echo.stdout.on("data", (data) => {
  console.log(data.toString());
  // Output:  "Hello && ls"
});
```

When using `fork`, `spawn`, `execFile`, or similar, and set `{ shell: true }` in
the call options it is recommended to use the [quoteAll()](#quoteallargs)
function to quote and escape the array of arguments.

```js
import { spawn } from "child_process";
import * as shescape from "shescape";

const name = "&& ls";
const echo = spawn("echo", shescape.quoteAll(["Hello", name]), { shell: true });
echo.stdout.on("data", (data) => {
  console.log(data.toString());
  // Output:  "Hello && ls"
});
```

When using the `exec` function, or similar, it is recommended to use the
[quote()](#quotearg) function to quote and escape individual arguments.

```js
import { exec } from "child_process";
import * as shescape from "shescape";

const name = "&& ls";
exec(`echo Hello ${shescape.quote(name)}`, (err, stdout) => {
  console.log(stdout);
  // Output:  "Hello && ls"
});
```

When configuring what shell should be used when calling `exec`, `execFile`, or
`spawn` make sure to pass that information to Shescape as well, for example:

```js
import { exec } from "child_process";
import * as shescape from "shescape";

const options = { shell: "/bin/bash" };
const name = "&& ls";
exec(`echo Hello ${shescape.quote(name, options)}`, options, (err, stdout) => {
  console.log(stdout);
  // Output:  "Hello && ls"
});
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
// Output:  "' && ls -al'"
```

#### Input-output

| Input           | Type     | Required | Description                       |
| --------------- | -------- | -------- | --------------------------------- |
| `arg`           | `string` | Yes      | The argument to quote and escape. |
| `options`       | `Object` | No       | The escape options.               |
| `options.shell` | `string` | No       | The shell that will be used.      |

| Output    | Type     | Description                      |
| --------- | -------- | -------------------------------- |
| `safeArg` | `string` | The quoted and escaped argument. |

> `quote` automatically converts non-string values to strings if needed and will
> error if this is not possible. You are responsible for verifying the input
> makes sense.

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
// Output:  ["'Guppy'", "' && ls -al"]
```

#### Input-output

| Input           | Type       | Required | Description                        |
| --------------- | ---------- | -------- | ---------------------------------- |
| `args`          | `string[]` | Yes      | The arguments to quote and escape. |
| `options`       | `Object`   | No       | The escape options.                |
| `options.shell` | `string`   | No       | The shell that will be used.       |

| Output    | Type       | Description                       |
| --------- | ---------- | --------------------------------- |
| `safeArg` | `string[]` | The quoted and escaped arguments. |

> `quoteAll` automatically converts non-array inputs to single-value arrays and
> individual non-string values to strings if needed and will error if this is
> not possible. You are responsible for verifying the input makes sense.

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
// Output:  "''\'' && ls -al'"
```

#### Input-output

| Input           | Type     | Required | Description                  |
| --------------- | -------- | -------- | ---------------------------- |
| `arg`           | `string` | Yes      | The argument to escape.      |
| `options`       | `Object` | No       | The escape options.          |
| `options.shell` | `string` | No       | The shell that will be used. |

| Output    | Type     | Description           |
| --------- | -------- | --------------------- |
| `safeArg` | `string` | The escaped argument. |

> `escape` automatically converts non-string values to strings if needed and
> will error if this is not possible. You are responsible for verifying the
> input makes sense.

### `escapeAll(args)`

The `escapeAll` function takes as input an array of values, the arguments, and
escapes any _dangerous_ characters in every argument.

#### Example

```js
import { escapeAll } from "shescape";

const args = ["Guppy", "' && ls -al"];
const safeArgs = escapeAll(args);
console.log(safeArgs);
// Output:  ["Guppy", "'\'' ls -al"]
```

#### Input-output

| Input           | Type       | Required | Description                  |
| --------------- | ---------- | -------- | ---------------------------- |
| `args`          | `string[]` | Yes      | The arguments to escape.     |
| `options`       | `Object`   | No       | The escape options.          |
| `options.shell` | `string`   | No       | The shell that will be used. |

| Output    | Type       | Description            |
| --------- | ---------- | ---------------------- |
| `safeArg` | `string[]` | The escaped arguments. |

> `escapeAll` automatically converts non-array inputs to single-value arrays and
> individual non-string values to strings if needed and will error if this is
> not possible. You are responsible for verifying the input makes sense.

[shell injection]: https://portswigger.net/web-security/os-command-injection
[npm]: https://www.npmjs.com/package/shescape
[changelog]: https://github.com/ericcornelissen/shescape/blob/main/CHANGELOG.md
[license]: https://github.com/ericcornelissen/shescape/blob/main/LICENSE
[security]: https://github.com/ericcornelissen/shescape/blob/main/SECURITY.md
