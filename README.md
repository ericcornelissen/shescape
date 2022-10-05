# Shescape

[![GitHub Actions][ci-image]][ci-url]
[![Coverage Report][coverage-image]][coverage-url]
[![Mutation Report][mutation-image]][mutation-url]
[![NPM Package][npm-image]][npm-url]

A simple shell escape package for JavaScript. Use it to escape user-controlled
inputs to shell commands to prevent [shell injection].

**Quick links**:
[NPM][npm-url] |
[Source code] |
[License] |
[Changelog] |
[Security]

## Features

- Advanced shell detection
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

   ```javascript
   import * as shescape from "shescape";
   ```

3. Use `shescape`

## Shells

The following shells are officially supported and extensively tested. It is
recommended to only use shells found in this list.

- **Unix**
  - [Bash]
  - [Dash]
  - [Zsh]
- **Windows**
  - [cmd.exe]
  - [PowerShell]

If you want to use Shescape with another shell you can request it on GitHub by
opening [an issue].

## Recipes

View the [recipes] for examples of how to use Shescape.

## API

### `quote(arg)`

The `quote` function takes as input a single value, the argument, puts
OS-specific quotes around it, and escapes any _dangerous_ characters.

#### Example

```javascript
import { quote } from "shescape";

const arg = " && ls -al";
const safeArg = quote(arg);
console.log(safeArg);
// Output:  "' && ls -al'"
```

#### Input-output

| Input           | Type                | Required | Description                       |
| --------------- | ------------------- | -------- | --------------------------------- |
| `arg`           | `string`            | Yes      | The argument to quote and escape. |
| `options`       | `Object`            | No       | The escape options.               |
| `options.shell` | `string`, `boolean` | No       | The shell that will be used.      |

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

```javascript
import { quoteAll } from "shescape";

const args = ["Guppy", " && ls -al"];
const safeArgs = quoteAll(args);
console.log(safeArgs);
// Output:  ["'Guppy'", "' && ls -al"]
```

#### Input-output

| Input           | Type                | Required | Description                        |
| --------------- | ------------------- | -------- | ---------------------------------- |
| `args`          | `string[]`          | Yes      | The arguments to quote and escape. |
| `options`       | `Object`            | No       | The escape options.                |
| `options.shell` | `string`, `boolean` | No       | The shell that will be used.       |

| Output     | Type       | Description                       |
| ---------- | ---------- | --------------------------------- |
| `safeArgs` | `string[]` | The quoted and escaped arguments. |

> `quoteAll` automatically converts non-array inputs to single-value arrays and
> individual non-string values to strings if needed and will error if this is
> not possible. You are responsible for verifying the input makes sense.

### `escape(arg)`

The `escape` function takes as input a value, the argument, and escapes any
_dangerous_ characters.

Calling `escape()` directly is not recommended unless you know what you're
doing.

The `options.interpolation` value should be set to `true` if using this function
with the `exec` function, or when using `fork`, `spawn`, `execFile`, or similar,
and setting `{ shell: true }` in the call options. If in doubt, set it to `true`
explicitly.

#### Example

```javascript
import { escape } from "shescape";

const arg = "' && ls -al";
const safeArg = `'${escape(arg)}'`;
console.log(safeArg);
// Output:  "''\'' && ls -al'"
```

#### Input-output

| Input                   | Type                | Required | Description                  |
| ----------------------- | ------------------- | -------- | ---------------------------- |
| `arg`                   | `string`            | Yes      | The argument to escape.      |
| `options`               | `Object`            | No       | The escape options.          |
| `options.interpolation` | `boolean`           | No       | Is interpolation enabled.    |
| `options.shell`         | `string`, `boolean` | No       | The shell that will be used. |

| Output    | Type     | Description           |
| --------- | -------- | --------------------- |
| `safeArg` | `string` | The escaped argument. |

> `escape` automatically converts non-string values to strings if needed and
> will error if this is not possible. You are responsible for verifying the
> input makes sense.

### `escapeAll(args)`

The `escapeAll` function takes as input an array of values, the arguments, and
escapes any _dangerous_ characters in every argument.

The `options.interpolation` value should be set to `true` if using this function
with `fork`, `spawn`, `execFile`, or similar, and setting `{ shell: true }` in
the call options. If in doubt, set it to `true` explicitly.

#### Example

```javascript
import { escapeAll } from "shescape";

const args = ["Guppy", "' && ls -al"];
const safeArgs = escapeAll(args);
console.log(safeArgs);
// Output:  ["Guppy", "'\'' ls -al"]
```

#### Input-output

| Input                   | Type                | Required | Description                  |
| ----------------------- | ------------------- | -------- | ---------------------------- |
| `args`                  | `string[]`          | Yes      | The arguments to escape.     |
| `options`               | `Object`            | No       | The escape options.          |
| `options.interpolation` | `boolean`           | No       | Is interpolation enabled.    |
| `options.shell`         | `string`, `boolean` | No       | The shell that will be used. |

| Output     | Type       | Description            |
| ---------- | ---------- | ---------------------- |
| `safeArgs` | `string[]` | The escaped arguments. |

> `escapeAll` automatically converts non-array inputs to single-value arrays and
> individual non-string values to strings if needed and will error if this is
> not possible. You are responsible for verifying the input makes sense.

---

Please [open an issue] if you found a mistake or if you have a suggestion for
how to improve the documentation.

[ci-url]: https://github.com/ericcornelissen/shescape/actions/workflows/checks.yml
[ci-image]: https://github.com/ericcornelissen/shescape/actions/workflows/checks.yml/badge.svg
[coverage-url]: https://codecov.io/gh/ericcornelissen/shescape
[coverage-image]: https://codecov.io/gh/ericcornelissen/shescape/branch/main/graph/badge.svg
[mutation-url]: https://dashboard.stryker-mutator.io/reports/github.com/ericcornelissen/shescape/main
[mutation-image]: https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fericcornelissen%2Fshescape%2Fmain
[npm-url]: https://www.npmjs.com/package/shescape
[npm-image]: https://img.shields.io/npm/v/shescape.svg
[an issue]: https://github.com/ericcornelissen/shescape/issues
[bash]: https://en.wikipedia.org/wiki/Bash_(Unix_shell) "Bourne-Again Shell"
[changelog]: https://github.com/ericcornelissen/shescape/blob/main/CHANGELOG.md
[cmd.exe]: https://en.wikipedia.org/wiki/Cmd.exe
[dash]: https://en.wikipedia.org/wiki/Almquist_shell#Dash "Debian Almquist Shell"
[license]: https://github.com/ericcornelissen/shescape/blob/main/LICENSE
[open an issue]: https://github.com/ericcornelissen/shescape/issues/new?labels=documentation&template=documentation.md
[powershell]: https://en.wikipedia.org/wiki/PowerShell
[recipes]: docs/recipes.md
[security]: https://github.com/ericcornelissen/shescape/blob/main/SECURITY.md
[shell injection]: https://portswigger.net/web-security/os-command-injection
[source code]: https://github.com/ericcornelissen/shescape
[zsh]: https://en.wikipedia.org/wiki/Z_shell "Z shell"
