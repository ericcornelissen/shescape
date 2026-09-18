<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

# Troubleshooting

This document provides help with errors that might come up when using Shescape.
If you can't find a solution to your problem, feel free to [ask a question].

Please [open an issue] if you found a mistake or if you have a suggestion for
how to improve the documentation.

[ask a question]: https://github.com/ericcornelissen/shescape/issues/new?template=question.md
[open an issue]: https://github.com/ericcornelissen/shescape/issues/new?template=documentation.md

## "Module not found: Error: Can't resolve '...'"

When bundling `shescape` into an application, the bundler might report that it
cannot find the module `@ericcornelissen/lregexp`. To address this it is
recommended to configure the bundler. For help with this, see the documentation
on [bundlers].

Alternatively, add and install the module as a dependency to your application so
that it can be resolved.

[bundlers]: ./bundlers.md

## `EBADENGINE`

When installing `shescape` you might get an npm warning that you are using an
unsupported engine. If there is a warning for Shescape itself, you must either
adjust the Node.js version you are using or request support for the version you
want to use.

## "Shell not supported"

When using Shescape you might get a runtime error that it does not support a
shell, like

```log
Error: Shescape does not support the shell Example
```

This occurs because escaping logic is shell-specific and some shells might not
be implemented.

The name in the error may not match what you specified in your code, this is
because the binary is resolves at runtime to determine the executable that will
be used. A common reason for this is `sh` (or `/bin/sh`) on Unix systems, which
is typically a symbolic link to another shell (such as Bash or BusyBox).

If you believe it necessary you can open a request to support your shell but
it is also recommended to consult the [use cases] and [tips] for alternative
solutions.

[use cases]: ./use-cases.md
[tips]: ./tips.md
