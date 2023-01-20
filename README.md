# Shescape

[![GitHub Actions][ci-image]][ci-url]
[![Coverage Report][coverage-image]][coverage-url]
[![Mutation Report][mutation-image]][mutation-url]
[![npm Package][npm-image]][npm-url]

A simple shell escape library for JavaScript. Use it to escape user-controlled
inputs to shell commands to prevent [shell injection].

**Quick links**:
[npm][npm-url] |
[Source code] |
[License] |
[Changelog] |
[Security]

## Features

- Advanced shell detection
- Lightweight
- Supports MacOS, Linux, and Windows

### Shells

The following shells are officially supported and extensively tested. It is
recommended to only use shells found in this list.

- **Unix**: [Bash], [Dash], [Zsh]
- **Windows**: [cmd.exe], [PowerShell]

If you want to use Shescape with another shell you can request it on GitHub by
opening [an issue].

## Usage

### Install

1. Install `shescape`

   ```shell
   npm install shescape
   ```

2. Import `shescape`

   ```javascript
   import * as shescape from "shescape";
   ```

3. Use `shescape`

### Recipes

View the [recipes] for examples of how to use Shescape.

### API

View the [API] documentation of Shescape.

## Further Reading

Read the [tips] for additional ways to protect against shell injection.

---

Please [open an issue] if you found a mistake or if you have a suggestion for
how to improve the documentation.

[ci-url]: https://github.com/ericcornelissen/shescape/actions/workflows/checks.yml
[ci-image]: https://github.com/ericcornelissen/shescape/actions/workflows/checks.yml/badge.svg
[coverage-url]: https://codecov.io/gh/ericcornelissen/shescape
[coverage-image]: https://codecov.io/gh/ericcornelissen/shescape/branch/main/graph/badge.svg
[mutation-url]: https://dashboard.stryker-mutator.io/reports/github.com/ericcornelissen/shescape/main
[mutation-image]: https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fericcornelissen%2Fshescape%2Fmain
[npm-url]: https://www.npmjs.com/package/shescape
[npm-image]: https://img.shields.io/npm/v/shescape.svg
[an issue]: https://github.com/ericcornelissen/shescape/issues
[api]: docs/api.md
[bash]: https://en.wikipedia.org/wiki/Bash_(Unix_shell) "Bourne-Again Shell"
[changelog]: https://github.com/ericcornelissen/shescape/blob/main/CHANGELOG.md
[cmd.exe]: https://en.wikipedia.org/wiki/Cmd.exe
[dash]: https://en.wikipedia.org/wiki/Almquist_shell#Dash "Debian Almquist Shell"
[license]: https://github.com/ericcornelissen/shescape/blob/main/LICENSE
[open an issue]: https://github.com/ericcornelissen/shescape/issues/new?labels=documentation&template=documentation.md
[powershell]: https://en.wikipedia.org/wiki/PowerShell
[recipes]: docs/recipes.md
[security]: https://github.com/ericcornelissen/shescape/blob/main/SECURITY.md
[shell injection]: https://portswigger.net/web-security/os-command-injection
[source code]: https://github.com/ericcornelissen/shescape
[tips]: docs/tips.md
[zsh]: https://en.wikipedia.org/wiki/Z_shell "Z shell"
