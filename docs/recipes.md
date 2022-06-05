# Shescape Recipes

## [`node:child_process`]

### `exec` / `execSync`

#### `exec(command, callback)`

```js
import { exec } from "node:child_process";
import * as shescape from "shescape";

/* 1. Collect user input */
const userInput = "&& ls";

/* 2. Execute shell command */
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

```js
import { exec } from "node:child_process";
import * as shescape from "shescape";

/* 1. Set up configuration */
const execOptions = {
  // Example configuration for `exec`
  shell: "/bin/bash",
};
const shescapeOptions = {
  // Set options for Shescape first, then add the options for `exec`. DO NOT set
  // any keys from the child_process API here.
  ...execOptions,
};

/* 2. Collect user input */
const userInput = "&& ls";

/* 3. Execute shell command */
exec(
  `echo Hello ${shescape.quote(userInput, shescapeOptions)}`,
  execOptions,
  (error, stdout) => {
    if (error) {
      console.error(`An error occurred: ${error}`);
    } else {
      console.log(stdout);
      // Output:  "Hello && ls"
    }
  }
);
```

#### `execSync(command)`

```js
import { execSync } from "node:child_process";
import * as shescape from "shescape";

/* 1. Collect user input */
const userInput = "&& ls";

/* 2. Execute shell command */
try {
  const stdout = execSync(`echo Hello ${shescape.quote(userInput)}`);
  console.log(`${stdout}`);
  // Output:  "Hello && ls"
} catch (error) {
  console.error(`An error occurred: ${error}`);
}
```

#### `execSync(command, options)`

```js
import { execSync } from "node:child_process";
import * as shescape from "shescape";

/* 1. Set up configuration */
const execOptions = {
  // Example configuration for `execSync`
  shell: "/bin/bash",
};
const shescapeOptions = {
  // Set options for Shescape first, then add the options for `execSync`. DO NOT
  // set any keys from the child_process API here.
  ...execOptions,
};

/* 2. Collect user input */
const userInput = "&& ls";

/* 3. Execute shell command */
try {
  const stdout = execSync(
    `echo Hello ${shescape.quote(userInput, shescapeOptions)}`,
    execOptions
  );
  console.log(`${stdout}`);
  // Output:  "Hello && ls"
} catch (error) {
  console.error(`An error occurred: ${error}`);
}
```

### `execFile` / `execFileSync`

#### `execFile(command, args, callback)`

```js
import { execFile } from "node:child_process";
import * as shescape from "shescape";

/* 1. Collect user input */
const userInput = "&& ls";

/* 2. Execute shell command */
execFile("echo", shescape.escapeAll(["Hello", userInput]), (error, stdout) => {
  if (error) {
    console.error(`An error occurred: ${error}`);
  } else {
    console.log(stdout);
    // Output:  "Hello && ls"
  }
});
```

#### `execFile(command, args, options, callback)`

```js
import { execFile } from "node:child_process";
import * as shescape from "shescape";

/* 1. Set up configuration */
const execFileOptions = {
  // Example configuration for `execFile`
  shell: "/bin/bash",
};
const shescapeOptions = {
  // Set options for Shescape first, then add the options for `execFile`. DO NOT
  // set any keys from the child_process API here.
  ...execFileOptions,
};

/* 2. Collect user input */
const userInput = "&& ls";

/* 3. Execute shell command */
execFile(
  "echo",
  execFileOptions.shell
    ? // When the `shell` option is configured, arguments should be quoted
      shescape.quoteAll(["Hello", userInput], shescapeOptions)
    : // When the `shell` option is NOT configured, arguments should NOT be quoted
      shescape.escapeAll(["Hello", userInput], shescapeOptions),
  execFileOptions,
  (error, stdout) => {
    if (error) {
      console.error(`An error occurred: ${error}`);
    } else {
      console.log(stdout);
      // Output:  "Hello && ls"
    }
  }
);
```

#### `execFileSync(command, args)`

```js
import { execFileSync } from "node:child_process";
import * as shescape from "shescape";

/* 1. Collect user input */
const userInput = "&& ls";

/* 2. Execute shell command */
try {
  const stdout = execFileSync("echo", shescape.escapeAll(["Hello", userInput]));
  console.log(`${stdout}`);
  // Output:  "Hello && ls"
} catch (error) {
  console.error(`An error occurred: ${error}`);
}
```

#### `execFileSync(command, args, options)`

NOTE: Using `execFileSync` with a shell may result in `args` not being passed
properly to the `command`.
See also [nodejs/node#29466](https://github.com/nodejs/node/issues/29466).

```js
import { execFileSync } from "node:child_process";
import * as shescape from "shescape";

/* 1. Set up configuration */
const execFileOptions = {
  // Example configuration for `execFileSync`
  shell: "/bin/bash",
};
const shescapeOptions = {
  // Set options for Shescape first, then add the options for `execFileSync`. DO
  // NOT set any keys from the child_process API here.
  ...execFileOptions,
};

/* 2. Collect user input */
const userInput = "&& ls";

/* 3. Execute shell command */
try {
  const stdout = execFileSync(
    "echo",
    execFileOptions.shell
      ? // When the `shell` option is configured, arguments should be quoted
        shescape.quoteAll(["Hello", userInput], shescapeOptions)
      : // When the `shell` option is NOT configured, arguments should NOT be quoted
        shescape.escapeAll(["Hello", userInput], shescapeOptions),
    execFileOptions
  );
  console.log(`${stdout}`);
  // Output:  "Hello && ls"
} catch (error) {
  console.error(`An error occurred: ${error}`);
}
```

### `spawn` / `spawnSync`

#### `spawn(command, args)`

```js
import { spawn } from "node:child_process";
import * as shescape from "shescape";

/* 1. Collect user input */
const userInput = "&& ls";

/* 2. Execute shell command */
const echo = spawn("echo", shescape.escapeAll(["Hello", userInput]));
echo.on("error", (error) => {
  console.error(`An error occurred: ${error}`);
});
echo.stdout.on("data", (data) => {
  console.log(`${data}`);
  // Output:  "Hello && ls"
});
```

#### `spawn(command, args, options)`

```js
import { spawn } from "node:child_process";
import * as shescape from "shescape";

/* 1. Set up configuration */
const spawnOptions = {
  // Example configuration for `spawn`
  shell: "/bin/bash",
};
const shescapeOptions = {
  // Set options for Shescape first, then add the options for `spawn`. DO NOT
  // set any keys from the child_process API here.
  ...spawnOptions,
};

/* 2. Collect user input */
const userInput = "&& ls";

/* 3. Execute shell command */
const echo = spawn(
  "echo",
  spawnOptions.shell
    ? // When the `shell` option is configured, arguments should be quoted
      shescape.quoteAll(["Hello", userInput], shescapeOptions)
    : // When the `shell` option is NOT configured, arguments should NOT be quoted
      shescape.escapeAll(["Hello", userInput], shescapeOptions),
  spawnOptions
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

```js
import { spawnSync } from "node:child_process";
import * as shescape from "shescape";

/* 1. Collect user input */
const userInput = "&& ls";

/* 2. Execute shell command */
const echo = spawnSync("echo", shescape.escapeAll(["Hello", userInput]));
if (echo.error) {
  console.error(`An error occurred: ${echo.error}`);
} else {
  console.log(`${echo.stdout}`);
  // Output:  "Hello && ls"
}
```

#### `spawnSync(command, args, options)`

```js
import { spawnSync } from "node:child_process";
import * as shescape from "shescape";

/* 1. Set up configuration */
const spawnOptions = {
  // Example configuration for `spawn`
  shell: "/bin/bash",
};
const shescapeOptions = {
  // Set options for Shescape first, then add the options for `spawnSync`. DO
  // NOT set any keys from the child_process API here.
  ...spawnOptions,
};

/* 2. Collect user input */
const userInput = "&& ls";

/* 3. Execute shell command */
const echo = spawnSync(
  "echo",
  spawnOptions.shell
    ? // When the `shell` option is configured, arguments should be quoted
      shescape.quoteAll(["Hello", userInput], shescapeOptions)
    : // When the `shell` option is NOT configured, arguments should NOT be quoted
      shescape.escapeAll(["Hello", userInput], shescapeOptions),
  spawnOptions
);
if (echo.error) {
  console.error(`An error occurred: ${echo.error}`);
} else {
  console.log(`${echo.stdout}`);
  // Output:  "Hello && ls"
}
```

[`node:child_process`]: https://nodejs.org/api/child_process.html
