<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

# Migration Guidelines

This document provides help and context when migration from one major version of
Shescape to the next.

## _From_ v1 _to_ v2

To start, check the items labeled as `BREAKING CHANGE:` for v2.0.0 in the
changelog to get up to speed.

Major version 2 made two important breaking changes that require a migration.
The first is that the default API changed to a class that must be initialized
with the `options` (this change was made to improve performance by avoiding
repeatedly looking up the shell on the system). After initialization it has the
same API as v1 in terms of functions. Alternatively, the `shescape/stateless`
module, available since v2.1.0, provides the same API as v1, but it is still
subject to the second important breaking change.

The second is that the configuration options changed to be simpler and secure by
default. First, the `interpolation` option has been removed (it is now derived
from the `shell` option). Second, the default `shell` is now `true` to err on
the safe side (it used to be falsy by default). Similarly, the `flagProtection`
value is now `true` by default (it used to be `false` by default).

As such, when migrating you may omit the `interpolation` option you used to use
and consider explicitly specifying the `shell` and `flagProtection` options (see
the v2 API documentation for guidance).

For example, using the new `Shescape` class:

```diff
  import * as cp from "node:child_process";

  // 1. Update how you import shescape
- import * as shescape from "shescape";
+ import { Shescape } from "shescape";

  // 2. Update how you configure shescape, if necessary
  const options = {
    flagProtection: true,
-   interpolation: false,
+   shell: false // because we use spawn w/o shell
  };

  // 3. Initialize shescape
+ const shescape = new Shescape(options);

  // 4. Omit options from the shescape API call
- const args = shescape.escapeAll(["Hello", userInput], options);
+ const args = shescape.escapeAll(["Hello", userInput]);

  cp.spawnSync("echo", args);
```

Or, using the new stateless API:

```diff
  import * as cp from "node:child_process";

  // 1. Update how you import shescape
- import * as shescape from "shescape";
+ import * as shescape from "shescape/stateless";

  // 2. Update how you configure shescape, if necessary
  const options = {
    flagProtection: true,
-   interpolation: false,
+   shell: false // because we use spawn w/o shell
  };

  const args = shescape.escapeAll(["Hello", userInput], options);
  cp.spawnSync("echo", args);
```
