# Shescape API

This document provides a description of the full Application Programming
Interface (API) of Shescape.

Please [open an issue] if you found a mistake or if you have a suggestion for
how to improve the documentation.

## `quote(arg)`

The `quote` function takes as input a single value, the argument, puts
OS-specific quotes around it, and escapes any _dangerous_ characters.

### Example

```javascript
import { quote } from "shescape";

const arg = " && ls -al";
const safeArg = quote(arg);
console.log(safeArg);
// Output:  "' && ls -al'"
```

### Input-output

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

## `quoteAll(args)`

The `quoteAll` function takes as input an array of values, the arguments, puts
OS-specific quotes around every argument, and escapes any _dangerous_ characters
in every argument.

### Example

```javascript
import { quoteAll } from "shescape";

const args = ["Guppy", " && ls -al"];
const safeArgs = quoteAll(args);
console.log(safeArgs);
// Output:  ["'Guppy'", "' && ls -al"]
```

### Input-output

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

## `escape(arg)`

The `escape` function takes as input a value, the argument, and escapes any
_dangerous_ characters.

Calling `escape()` directly is not recommended unless you know what you're
doing.

The `options.interpolation` value should be set to `true` if using this function
with the `exec` function, or when using `fork`, `spawn`, `execFile`, or similar,
and setting `{ shell: true }` in the call options. If in doubt, set it to `true`
explicitly.

### Example

```javascript
import { escape } from "shescape";

const arg = "' && ls -al";
const safeArg = `'${escape(arg)}'`;
console.log(safeArg);
// Output:  "''\'' && ls -al'"
```

### Input-output

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

## `escapeAll(args)`

The `escapeAll` function takes as input an array of values, the arguments, and
escapes any _dangerous_ characters in every argument.

The `options.interpolation` value should be set to `true` if using this function
with `fork`, `spawn`, `execFile`, or similar, and setting `{ shell: true }` in
the call options. If in doubt, set it to `true` explicitly.

### Example

```javascript
import { escapeAll } from "shescape";

const args = ["Guppy", "' && ls -al"];
const safeArgs = escapeAll(args);
console.log(safeArgs);
// Output:  ["Guppy", "'\'' ls -al"]
```

### Input-output

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

[open an issue]: https://github.com/ericcornelissen/shescape/issues/new?labels=documentation&template=documentation.md
