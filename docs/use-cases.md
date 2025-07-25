<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

# Shescape Use Cases

This document aims to help users of Shescape determine how to use the library
based on their use case. Broadly speaking there are two usage scenarios, either
you run it in an environment you control ([on managed systems]) or you don't
([on client systems]).

Please [open an issue] if you found a mistake or if you have a suggestion for
how to improve the documentation.

## On Client Systems

If you use Shescape in applications that your users run themselves, it is
advised to avoid using a shell. The reason for this is that your users may not
use or have the shell you expect. It is recommended to limit usage to the
`child_process` APIs `execFile`, `fork`, and `spawn` (or their synchronous
versions) without a shell. I.e. omitting the `shell` option or setting it to
`false` explicitly. See the [recipes] for detailed examples.

One challenge is that `child_process` cannot run [`.bat`/`.cmd` scripts without
a shell on Windows][bat-and-cmd-files]. If your client systems might be Windows
and you need to run scripts there it is recommended to use the `exec` API with
the default shell along with Shescape. This might look something like:

```javascript
import * as cp from "node:child_process";
import * as os from "node:os";
import { Shescape } from "shescape";

const cmd = "example";
const arg = "untrusted user input";

if (os.platform() === "win32") {
  // A shell is required on Windows to run scripts.
  const shescape = new Shescape({ shell: true });
  cp.execSync(`${cmd} ${shescape.quote(arg)}`);
} else {
  // No shell is preferred because it's safer.
  const shescape = new Shescape({ shell: false });
  cp.spawnSync(cmd, [shescape.escape(arg)]);
}
```

## On Managed Systems

If you use Shescape in applications you run on your own computer, a container
(e.g. [Docker]), or a virtual machine, there are no restrictions on how to use
Shescape. It is still recommended to follow [tips] to protect against shell
injection and use the [recipes] to guide your implementation.

---

_Content licensed under [CC BY-SA 4.0]; Code snippets under [MIT-0]._

[cc by-sa 4.0]: ./LICENSE-CC-BY-SA-4.0
[docker]: https://www.docker.com/
[mit-0]: ./LICENSE-MIT-0
[on client systems]: #on-client-systems
[on managed systems]: #on-managed-systems
[open an issue]: https://github.com/ericcornelissen/shescape/issues/new?labels=documentation&template=documentation.md
[recipes]: ./recipes.md
[tips]: ./tips.md
[bat-and-cmd-files]: https://nodejs.org/docs/latest-v24.x/api/child_process.html#spawning-bat-and-cmd-files-on-windows
