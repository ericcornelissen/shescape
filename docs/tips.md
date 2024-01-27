<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

# Tips

This document provides tips to avoid shell injection beyond using a shell
escape library like Shescape. Most tips apply outside of Node.js, but some are
specific to Node.js.

Please [open an issue] if you found a mistake or if you have a suggestion for
how to improve the documentation.

## Do

This section provides tips for what you can do to protect against shell
injection in addition to, or instead of, using Shescape.

### Use Indirection

Instead of using user input directly, evaluate the user's input and select an
appropriate known safe value.

```javascript
import { exec } from "node:child_process";
import { Shescape } from "shescape";

const shescape = new Shescape();
const userInput = "Yes";

// Good
exec(`echo 'Your choice was' ${shescape.quote(choice)}`);

// Better
let safeChoice;
switch (choice.toLowerCase()) {
  case "yes":
  case "y":
    safeChoice = "yes";
    break;
  case "no":
  case "n":
    safeChoice = "no";
    break;
  default:
    throw new Error(`Invalid choice '${choice}'`);
}
exec(`echo 'Your choice was ${safeChoice}'`);
```

### Use Environment Variables

Most shells allow you to use environment variables in your commands (e.g.
`$PATH` or `%PATH%`). Because of how environment variables are evaluated they
can prevent shell injection when using user input.

However, using environment variables is not without drawbacks:

- You must be careful not to leak any environment variables unintentionally.
- You may need to prevent [argument splitting] by quoting the environment
  variable.
- Environment variables must be a string and have a limited character set, if
  you assign an invalid value Node.js will throw an error.
- How environment variables are accessed differs between shells, so the shell
  must be known beforehand.
- They can only be used when using either `exec` or `execFile`/`spawn` (or their
  respective synchronous versions) with a shell.

In Node.js you can provide environment variables to the [`node:child_process`]
module's functions using the `options.env` object, for example:

```javascript
import { exec } from "node:child_process";

const userInput = "&& ls";

try {
  const options = {
    env: { USER_INPUT: userInput },
  };

  // Typical Unix shell
  exec(`echo 'Hello' "$USER_INPUT"`, options);

  // Windows PowerShell
  exec(`echo 'Hello' "$Env:USER_INPUT"`, options);

  // Windows Command Prompt
  exec(`echo Hello %USER_INPUT%`, options);
} catch (error) {
  console.log("invalid environment, error:", error);
}
```

### Use `--`

Some CLI program support the special option `--`. If supported, arguments after
this option will not be interpreted as options/flags.

> **Note**: Always verify that the program you're invoking supports `--`.

```javascript
import { exec } from "node:child_process";
import { Shescape } from "shescape";

const userInput = "foobar.txt";

// Good
let shescape = new Shescape({ flagProtection: true });
exec(`git clean -n ${shescape.quote(userInput)}`);

// Better
shescape = new Shescape({ flagProtection: false });
exec(`git clean -n -- ${shescape.quote(userInput)}`);
```

### Prefer `execFile`, `fork`, or `spawn`

... without an explicit shell (or the synchronous variants `execFileSync` or
`spawnSync`).

These functions spawn the command directly without first spawning a shell -
provided the `shell` option is left undefined. As a result, most shell injection
attacks are prevented by using these functions.

```javascript
import { exec } from "node:child_process";
import { Shescape } from "shescape";

const shescape = new Shescape({ shell: false });
const userInput = "&& ls";

execFile("echo", shescape.escapeAll(["Hello", userInput, "!"]));
```

The use of Shescape here provides extra protection, for example around control
characters.

## Do not

In this section you can find things that DO NOT work to protect against shell
injection.

### Use a Blocklist

A blocklist (sometimes called a _blacklist_) is an ineffective way to to protect
against shell injection. This is because it is likely you will forget to block
something. If you think your only option is a blocklist, use a shell escape
library like Shescape instead.

---

_Content licensed under [CC BY-SA 4.0]; Code snippets under the [MIT license]._

[argument splitting]: https://www.shellcheck.net/wiki/SC2046
[cc by-sa 4.0]: https://creativecommons.org/licenses/by-sa/4.0/
[mit license]: https://opensource.org/license/mit/
[`node:child_process`]: https://nodejs.org/api/child_process.html
[open an issue]: https://github.com/ericcornelissen/shescape/issues/new?labels=documentation&template=documentation.md
