<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

# Shescape Recipes

This document provides examples, called _recipes_, for how to use Shescape in
practice.

Please [open an issue] if you found a mistake or if you have a suggestion for
how to improve the documentation.

## [`node:child_process`]

This section provides recipes of how to use Shescape with the Node.js built-in
module `node:child_process`.

### [`exec`] / [`execSync`]

#### `exec(command, callback)`

When using `child_process.exec` without the `options` argument, use
`Shescape#quote` to escape all user input in the command string.

```javascript
import { exec } from "node:child_process";
import { Shescape } from "shescape";

/* 1. Set up */
const shescape = new Shescape({
  shell: true,
});

/* 2. Collect user input */
const userInput = "&& ls";

/* 3. Execute shell command */
exec(`echo Hello ${shescape.quote(userInput)}`, (error, stdout) => {
  if (error) {
    console.error(`An error occurred: ${error}`);
  } else {
    console.log(stdout);
    // Output:  "Hello && ls"
  }
});
```

#### `exec(command, options, callback)`

When using `child_process.exec` with the `options` argument, use
`Shescape#quote` to escape all user input in the command string. Provide the
`options` argument to `Shescape#quote` as well.

```javascript
import { exec } from "node:child_process";
import { Shescape } from "shescape";

/* 1. Set up */
const execOptions = {
  // Example configuration for `exec`
  shell: "/bin/bash",
};

const shescape = new Shescape({
  shell: execOptions.shell,
});

/* 2. Collect user input */
const userInput = "&& ls";

/* 3. Execute shell command */
exec(
  `echo Hello ${shescape.quote(userInput)}`,
  execOptions,
  (error, stdout) => {
    if (error) {
      console.error(`An error occurred: ${error}`);
    } else {
      console.log(stdout);
      // Output:  "Hello && ls"
    }
  },
);
```

#### `execSync(command)`

When using `child_process.execSync` without the `options` argument, use
`Shescape#quote` to escape all user input in the command string.

```javascript
import { execSync } from "node:child_process";
import { Shescape } from "shescape";

/* 1. Set up */
const shescape = new Shescape({
  shell: true,
});

/* 2. Collect user input */
const userInput = "&& ls";

/* 3. Execute shell command */
try {
  const stdout = execSync(`echo Hello ${shescape.quote(userInput)}`);
  console.log(`${stdout}`);
  // Output:  "Hello && ls"
} catch (error) {
  console.error(`An error occurred: ${error}`);
}
```

#### `execSync(command, options)`

When using `child_process.execSync` with the `options` argument, use
`Shescape#quote` to escape all user input in the command string. Provide the
`options` argument to `Shescape#quote` as well.

```javascript
import { execSync } from "node:child_process";
import { Shescape } from "shescape";

/* 1. Set up */
const execOptions = {
  // Example configuration for `execSync`
  shell: "/bin/bash",
};

const shescape = new Shescape({
  shell: execOptions.shell,
});

/* 2. Collect user input */
const userInput = "&& ls";

/* 3. Execute shell command */
try {
  const stdout = execSync(
    `echo Hello ${shescape.quote(userInput)}`,
    execOptions,
  );
  console.log(`${stdout}`);
  // Output:  "Hello && ls"
} catch (error) {
  console.error(`An error occurred: ${error}`);
}
```

#### With `Shescape#escape`

If you find yourself in a situation where the inputted argument to `exec` cannot
be quoted, you can use `Shescape#escape` though this is not advised. This will
escape as much as possible - including whitespace in order to preserve it and
prevent argument splitting. This comes with some caveats:

- For all shells newlines (`\r?\n`) are always replaced by a single space.
- On Windows, cmd.exe does not support whitespace preservation. So, if argument
  splitting is a concern, use `Shescape#quote` instead.
- On Windows, PowerShell will strip whitespace at the beginning of arguments.

> **Warning**: If possible, it is advised to rewrite your code so that you can
> use `Shescape#quote` as shown above. Or use a different function from the
> `child_process` API, as shown further down below.

```javascript
import { exec } from "node:child_process";
import { Shescape } from "shescape";

/* 1. Set up */
const shescape = new Shescape({
  shell: true,
});

/* 2. Collect user input */
const userInput = "&& ls";

/* 3. Execute shell command */
exec(`echo Hello ${shescape.escape(userInput)}`, (error, stdout) => {
  if (error) {
    console.error(`An error occurred: ${error}`);
  } else {
    console.log(stdout);
    // Output:  "Hello && ls"
  }
});
```

### [`execFile`] / [`execFileSync`]

#### `execFile(file, args, callback)`

When using `child_process.execFile` without the `options` argument, use
`Shescape#escapeAll` to escape all `args`.

```javascript
import { execFile } from "node:child_process";
import { Shescape } from "shescape";

/* 1. Set up */
const shescape = new Shescape({
  shell: false,
});

/* 2. Collect user input */
const userInput = "\x00world";

/* 3. Execute shell command */
execFile(
  "echo",
  shescape.escapeAll(["Hello", userInput, "!"]),
  (error, stdout) => {
    if (error) {
      console.error(`An error occurred: ${error}`);
    } else {
      console.log(stdout);
      // Output:  "Hello world !"
    }
  },
);
```

#### `execFile(file, args, options, callback)`

When using `child_process.execFile` with the `options` argument, always provide
the `options` argument to Shescape as well. If `options.shell` is set to a
truthy value, use `Shescape#quoteAll` to escape all `args`. If `options.shell`
is set to a falsy value (or omitted), use `Shescape#escapeAll` to escape all
`args`.

```javascript
import { execFile } from "node:child_process";
import { Shescape } from "shescape";

/* 1. Set up */
const execFileOptions = {
  // Example configuration for `execFile`
  shell: "/bin/bash",
};

const shescape = new Shescape({
  shell: execFileOptions.shell,
});

/* 2. Collect user input */
const userInput = "&& ls";

/* 3. Execute shell command */
execFile(
  "echo",
  execFileOptions.shell
    ? // When the `shell` option is configured, arguments should be quoted
      shescape.quoteAll(["Hello", userInput])
    : // When the `shell` option is NOT configured, arguments should NOT be quoted
      shescape.escapeAll(["Hello", userInput]),
  execFileOptions,
  (error, stdout) => {
    if (error) {
      console.error(`An error occurred: ${error}`);
    } else {
      console.log(stdout);
      // Output:  "Hello && ls"
    }
  },
);
```

#### `execFileSync(file, args)`

When using `child_process.execFileSync` without the `options` argument, use
`Shescape#escapeAll` to escape all `args`.

```javascript
import { execFileSync } from "node:child_process";
import { Shescape } from "shescape";

/* 1. Set up */
const shescape = new Shescape({
  shell: false,
});

/* 2. Collect user input */
const userInput = "\x00world";

/* 3. Execute shell command */
try {
  const stdout = execFileSync(
    "echo",
    shescape.escapeAll(["Hello", userInput, "!"]),
  );
  console.log(`${stdout}`);
  // Output:  "Hello world !"
} catch (error) {
  console.error(`An error occurred: ${error}`);
}
```

#### `execFileSync(file, args, options)`

When using `child_process.execFile` with the `options` argument, always provide
the `options` argument to Shescape as well. If `options.shell` is set to a
truthy value, use `Shescape#quoteAll` to escape all `args`. If `options.shell`
is set to a falsy value (or omitted), use `Shescape#escapeAll` to escape all
`args`.

> **Warning**: Due to a bug in Node.js (<18.7.0), using `execFileSync` with a
> shell may result in `args` not being passed properly to the `command`,
> depending on the shell being used. See [nodejs/node#43333].

```javascript
import { execFileSync } from "node:child_process";
import { Shescape } from "shescape";

/* 1. Set up */
const execFileOptions = {
  // Example configuration for `execFileSync`
  shell: "/bin/bash",
};

const shescape = new Shescape({
  shell: execFileOptions.shell,
});

/* 2. Collect user input */
const userInput = "&& ls";

/* 3. Execute shell command */
try {
  const stdout = execFileSync(
    "echo",
    execFileOptions.shell
      ? // When the `shell` option is configured, arguments should be quoted
        shescape.quoteAll(["Hello", userInput])
      : // When the `shell` option is NOT configured, arguments should NOT be quoted
        shescape.escapeAll(["Hello", userInput]),
    execFileOptions,
  );
  console.log(`${stdout}`);
  // Output:  "Hello && ls"
} catch (error) {
  console.error(`An error occurred: ${error}`);
}
```

### [`fork`]

#### `fork(modulePath, args)`

When using `child_process.fork` without the `options` argument, use
`Shescape#escapeAll` to escape all `args`.

```javascript
// echo.js

import { fork } from "node:child_process";
import { argv } from "node:process";
import { Shescape } from "shescape";

if (argv[2] === "Hello") {
  console.log(`${argv[2]} ${argv[3]} ${argv[4]}`);
  // Output:  "Hello world !"
} else {
  /* 1. Set up */
  const shescape = new Shescape({
    shell: false,
  });

  /* 2. Collect user input */
  const userInput = "\x00world";

  /* 3. Execute a Node.js module */
  const echo = fork("echo.js", shescape.escapeAll(["Hello", userInput, "!"]));
  echo.on("error", (error) => {
    console.error(`An error occurred: ${error}`);
  });
}
```

#### `fork(modulePath, args, options)`

When using `child_process.fork` with the `options` argument, use
`Shescape#escapeAll` to escape all `args`.

```javascript
// echo.js

import { fork } from "node:child_process";
import { argv } from "node:process";
import { Shescape } from "shescape";

if (argv[2] === "Hello") {
  console.log(`${argv[2]} ${argv[3]} ${argv[4]}`);
  // Output:  "Hello world !"
} else {
  /* 1. Set up */
  const forkOptions = {
    // Example configuration for `fork`
    detached: true,
  };

  const shescape = new Shescape({
    shell: false,
  });

  /* 2. Collect user input */
  const userInput = "\x00world";

  /* 3. Execute a Node.js module */
  const echo = fork(
    "echo.js",
    shescape.escapeAll(["Hello", userInput, "!"]),
    forkOptions,
  );
  echo.on("error", (error) => {
    console.error(`An error occurred: ${error}`);
  });
}
```

### [`spawn`] / [`spawnSync`]

#### `spawn(command, args)`

When using `child_process.spawn` without the `options` argument, use
`Shescape#escapeAll` to escape all `args`.

```javascript
import { spawn } from "node:child_process";
import { Shescape } from "shescape";

/* 1. Set up */
const shescape = new Shescape({
  shell: false,
});

/* 2. Collect user input */
const userInput = "\x00world";

/* 3. Execute shell command */
const echo = spawn("echo", shescape.escapeAll(["Hello", userInput, "!"]));
echo.on("error", (error) => {
  console.error(`An error occurred: ${error}`);
});
echo.stdout.on("data", (data) => {
  console.log(`${data}`);
  // Output:  "Hello world !"
});
```

#### `spawn(command, args, options)`

When using `child_process.spawn` with the `options` argument, always provide
the `options` argument to Shescape as well. If `options.shell` is set to a
truthy value, use `Shescape#quoteAll` to escape all `args`. If `options.shell`
is set to a falsy value (or omitted), use `Shescape#escapeAll` to escape all
`args`.

```javascript
import { spawn } from "node:child_process";
import { Shescape } from "shescape";

/* 1. Set up */
const spawnOptions = {
  // Example configuration for `spawn`
  shell: "/bin/bash",
};

const shescape = new Shescape({
  shell: spawnOptions.shell,
});

/* 2. Collect user input */
const userInput = "&& ls";

/* 3. Execute shell command */
const echo = spawn(
  "echo",
  spawnOptions.shell
    ? // When the `shell` option is configured, arguments should be quoted
      shescape.quoteAll(["Hello", userInput])
    : // When the `shell` option is NOT configured, arguments should NOT be quoted
      shescape.escapeAll(["Hello", userInput]),
  spawnOptions,
);
echo.on("error", (error) => {
  console.error(`An error occurred: ${error}`);
});
echo.stdout.on("data", (data) => {
  console.log(`${data}`);
  // Output:  "Hello && ls"
});
```

#### `spawnSync(command, args)`

When using `child_process.spawnSync` without the `options` argument, use
`Shescape#escapeAll` to escape all `args`.

```javascript
import { spawnSync } from "node:child_process";
import { Shescape } from "shescape";

/* 1. Set up */
const shescape = new Shescape({
  shell: false,
});

/* 2. Collect user input */
const userInput = "\x00world";

/* 3. Execute shell command */
const echo = spawnSync("echo", shescape.escapeAll(["Hello", userInput, "!"]));
if (echo.error) {
  console.error(`An error occurred: ${echo.error}`);
} else {
  console.log(`${echo.stdout}`);
  // Output:  "Hello world !"
}
```

#### `spawnSync(command, args, options)`

When using `child_process.spawnSync` with the `options` argument, always provide
the `options` argument to Shescape as well. If `options.shell` is set to a
truthy value, use `Shescape#quoteAll` to escape all `args`. If `options.shell`
is set to a falsy value (or omitted), use `Shescape#escapeAll` to escape all
`args`.

```javascript
import { spawnSync } from "node:child_process";
import { Shescape } from "shescape";

/* 1. Set up */
const spawnOptions = {
  // Example configuration for `spawn`
  shell: "/bin/bash",
};

const shescape = new Shescape({
  shell: spawnOptions.shell,
});

/* 2. Collect user input */
const userInput = "&& ls";

/* 3. Execute shell command */
const echo = spawnSync(
  "echo",
  spawnOptions.shell
    ? // When the `shell` option is configured, arguments should be quoted
      shescape.quoteAll(["Hello", userInput])
    : // When the `shell` option is NOT configured, arguments should NOT be quoted
      shescape.escapeAll(["Hello", userInput]),
  spawnOptions,
);
if (echo.error) {
  console.error(`An error occurred: ${echo.error}`);
} else {
  console.log(`${echo.stdout}`);
  // Output:  "Hello && ls"
}
```

---

_Content licensed under [CC BY-SA 4.0]; Code snippets under the [MIT license]._

[`exec`]: https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback
[`execfile`]: https://nodejs.org/api/child_process.html#child_processexecfilefile-args-options-callback
[`execsync`]: https://nodejs.org/api/child_process.html#child_processexecsynccommand-options
[`execfilesync`]: https://nodejs.org/api/child_process.html#child_processexecfilesyncfile-args-options
[`fork`]: https://nodejs.org/api/child_process.html#child_processforkmodulepath-args-options
[`node:child_process`]: https://nodejs.org/api/child_process.html
[`spawn`]: https://nodejs.org/api/child_process.html#child_processspawncommand-args-options
[`spawnsync`]: https://nodejs.org/api/child_process.html#child_processspawnsynccommand-args-options
[cc by-sa 4.0]: https://creativecommons.org/licenses/by-sa/4.0/
[mit license]: https://opensource.org/license/mit/
[nodejs/node#43333]: https://github.com/nodejs/node/issues/43333
[open an issue]: https://github.com/ericcornelissen/shescape/issues/new?labels=documentation&template=documentation.md
