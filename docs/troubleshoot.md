<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

# Troubleshooting

This document provides help with errors that might come up when using Shescape.
If you can't find a solution to your problem, feel free to [ask a question].

Please [open an issue] if you found a mistake or if you have a suggestion for
how to improve the documentation.

[ask a question]: https://github.com/ericcornelissen/shescape/issues/new?template=question.md
[open an issue]: https://github.com/ericcornelissen/shescape/issues/new?template=documentation.md

## `EBADENGINE`

When installing `shescape` you might get an npm warning that you are using an
unsupported engine. If there is a warning for Shescape itself, you must either
adjust the Node.js version you are using or request support for the version you
want to use.

Otherwise, if there is a warning for a dependency of Shescape, like

```shell
$ npm install shescape
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: 'which@6.0.0',
npm WARN EBADENGINE   required: { node: '^20.17.0 || >=22.9.0' },
npm WARN EBADENGINE   current: { node: 'v18.17.0', npm: '9.6.7' }
npm WARN EBADENGINE }
```

this can be resolved by downgrading the transitive dependency. For the warning
from this example (where we are using Node.js v18.17.0 but the package `which`
requires a newer Node.js version) you can address this by forcing npm to use an
older version of `which` using an [override]. To do this add the following to
your `package.json`:

```json
{
  "overrides": {
    "shescape": {
      "which": "^5.0.0"
    }
  }
}
```

[override]: https://docs.npmjs.com/cli/v11/configuring-npm/package-json#overrides

## Shell not Supported

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
