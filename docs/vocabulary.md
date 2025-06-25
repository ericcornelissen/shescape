# Vocabulary

This document provides definitions of terminology related to Shescape.

Please [open an issue] if you found a mistake or if you have a suggestion for
how to improve the documentation.

## Argument Splitting

_Argument splitting_ occurs when an input to a shell command unexpectedly
contains a space, thus introducing a new argument. The new argument may be
interpreted differently by the program, typically leading to unexpected failure
but sometimes also in security vulnerabilities.

The following is an example of this type of problem:

```javascript
import { execSync } from "node:child_process";

execSync(`npm --omit ${category} list`);
```

where the `category` should be "dev", "peer", or "optional". However, due to
argument splitting a value like "dev install" will result in installing the
dependency `list` instead of listing all dependencies. This is because the
following will be executed:

```javascript
execSync("npm --omit dev install list");
```

## Shell Injection

A _shell injection_ or _command injection_ vulnerability occurs when untrusted
user input is used in the construction of a command in an insecure way. This
allows attackers to execute arbitrary commands on the target system, leaving it
vulnerable to a myriad of attacks.

The following snippet is an an example of this type of vulnerability

```javascript
import { execSync } from "node:child_process";

const stdout = execSync(`echo 'Hello, ${name}!'`);
console.log(stdout);
```

an attacker could pick as `name` a malicious value in order to execute a command
of their choosing. For example `';whoami;echo '` would leak the current user.
This is because the following will be executed:

```javascript
const stdout = execSync("echo 'Hello, ';whoami;echo '!'");
console.log(stdout);
// Outputs: 'Hello,\njohn-doe\n!'
```

---

_Content licensed under [CC BY-SA 4.0]; Code snippets under [MIT-0]._

[cc by-sa 4.0]: ./LICENSE-CC-BY-SA-4.0
[mit-0]: ./LICENSE-MIT-0
[open an issue]: https://github.com/ericcornelissen/shescape/issues/new?labels=documentation&template=documentation.md
