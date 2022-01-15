# Shescape

[![GitHub Actions][ci-image]][ci-url]
[![Coverage Report][coverage-image]][coverage-url]
[![Mutation Report][mutation-image]][mutation-url]
[![quality Report][quality-image]][quality-url]
[![NPM Package][npm-image]][npm-url]
[![Documentation][docs-image]][docs-url]

A simple shell escape package for JavaScript. Use it to escape user-controlled
inputs to shell commands to prevent [shell injection].

## Example

> Please read [the full documentation][docs-url] for more information.

Below is a basic example of how to use _Shescape_. In this example `execSync` is
used to invoke a shell command and `shescape.quote` is used to quote and escape
any _dangerous_ character in the user input used as command input.

```js
import { execSync } from "child_process";
import * as shescape from "shescape";

const userInput = "&& ls";
const stdout = execSync(`echo Hello ${shescape.quote(userInput)}`);
console.log(stdout.toString());
// Output:  "Hello && ls"
```

[shell injection]: https://portswigger.net/web-security/os-command-injection
[ci-url]: https://github.com/ericcornelissen/shescape/actions/workflows/push-checks.yml
[ci-image]: https://img.shields.io/github/workflow/status/ericcornelissen/shescape/Push%20checks/main?logo=github
[coverage-url]: https://codecov.io/gh/ericcornelissen/shescape
[coverage-image]: https://codecov.io/gh/ericcornelissen/shescape/branch/main/graph/badge.svg
[mutation-url]: https://dashboard.stryker-mutator.io/reports/github.com/ericcornelissen/shescape/main
[mutation-image]: https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fericcornelissen%2Fshescape%2Fmain
[quality-url]: https://codeclimate.com/github/ericcornelissen/shescape/maintainability
[quality-image]: https://api.codeclimate.com/v1/badges/6eb1a10f41cf6950b6ce/maintainability
[npm-url]: https://www.npmjs.com/package/shescape
[npm-image]: https://img.shields.io/npm/v/shescape.svg
[docs-url]: https://ericcornelissen.github.io/shescape/
[docs-image]: https://img.shields.io/badge/read-the%20docs-informational
