# Shescape

[![GitHub Actions][ci-image]][ci-url]
[![Coverage Report][coverage-image]][coverage-url]
[![NPM Package][npm-image]][npm-url]
[![Documentation][docs-image]][docs-url]

A simple shell escape package for JavaScript. Use it to escape user-controlled
inputs to shell commands to prevent [shell injection].

## Example

> Please read [the full documentation][docs-url] for more information.

Below is a basic example of how to use _Shescape_. In this example `spawn` is
used to invoke a shell command and `shescape.quoteAll` is used to quote and
escape any _dangerous_ character in any of the arguments specified by
`userInput`.

```js
const cp = require("child_process");
const shescape = require("shescape");

cp.spawn("command", shescape.quoteAll(userInput), options);
```

[shell injection]: https://portswigger.net/web-security/os-command-injection
[ci-url]: https://github.com/ericcornelissen/shescape/actions?query=workflow%3A%22Test+and+Lint%22+branch%3Amain
[ci-image]: https://img.shields.io/github/workflow/status/ericcornelissen/shescape/Test%20and%20Lint/main
[coverage-url]: https://codecov.io/gh/ericcornelissen/shescape
[coverage-image]: https://codecov.io/gh/ericcornelissen/shescape/branch/main/graph/badge.svg
[npm-url]: https://www.npmjs.com/package/shescape
[npm-image]: https://img.shields.io/npm/v/shescape.svg
[docs-url]: https://ericcornelissen.github.io/shescape/
[docs-image]: https://img.shields.io/badge/read-the%20docs-informational
