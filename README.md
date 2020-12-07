# Shescape

[![GitHub Actions][ci-image]][ci-url]
[![NPM Package][npm-image]][npm-url]

A simple shell escape library. Use it to escape user-specified inputs to shell
commands to prevent [shell injection].

## Example

Below is a basic example of how to use _Shescape_. It is recommended to use the
`quote` function. This will put (OS appropriate) quotes around the user input
and escape any characters in the input if necessary.

```js
const cp = require("child_process");
const shescape = require("shescape");

cp.exec(`command ${shescape.quote(userInput)}`, callback);
```

[shell injection]: https://portswigger.net/web-security/os-command-injection
[ci-url]: https://github.com/ericcornelissen/shescape/actions?query=workflow%3A%22Test+and+Lint%22+branch%3Amain
[ci-image]: https://github.com/ericcornelissen/shescape/workflows/Test%20and%20Lint/badge.svg
[npm-url]: https://www.npmjs.com/package/shescape
[npm-image]: https://img.shields.io/npm/v/shescape.svg
