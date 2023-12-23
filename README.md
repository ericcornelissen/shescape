<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

# Shescape

[![GitHub Actions][ci-image]][ci-url]
[![Coverage Report][coverage-image]][coverage-url]
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
- Prevents environment variable access

### Shells

The following shells are officially supported and extensively tested. It is
recommended to only use shells found in this list.

- **Unix**: [Bash], [csh], [Dash], [Zsh]
- **Windows**: [cmd.exe], [PowerShell]

If you want to use Shescape with another shell you can request it on GitHub by
opening [an issue].

## Usage

### Install

1. Install `shescape`:

   ```shell
   npm install shescape
   ```

2. Import `shescape`:

   ```javascript
   import { Shescape } from "shescape";
   ```

3. Initialize `Shescape`.

   ```javascript
   const shescape = new Shescape(/* options */);
   ```

4. Use `shescape`.

### Migrating from v1

View the [migration] guidelines for help.

### Recipes

View the [recipes] for examples of how to use Shescape.

### API

View the [API] documentation of Shescape.

### Testing

View the [testing] documentation for how to test code that uses Shescape.

## Further Reading

Read the [tips] for additional ways to protect against shell injection.

## License

The source code is licensed under the `MPL-2.0` license, see [LICENSE] for
the full license text. The documentation text is licensed under [CC BY-SA 4.0];
code snippets under the [MIT license].

Supporting code, such a scripts and tests, is generally licensed under the `MIT`
license. However, individual files may be licensed differently depending on the
intend or origin.

The license under which a given file is available can always be found in the
file's banner comment.

[ci-url]: https://github.com/ericcornelissen/shescape/actions/workflows/checks.yml
[ci-image]: https://github.com/ericcornelissen/shescape/actions/workflows/checks.yml/badge.svg
[coverage-url]: https://codecov.io/gh/ericcornelissen/shescape
[coverage-image]: https://codecov.io/gh/ericcornelissen/shescape/branch/main/graph/badge.svg
[npm-url]: https://www.npmjs.com/package/shescape
[npm-image]: https://img.shields.io/npm/v/shescape.svg
[an issue]: https://github.com/ericcornelissen/shescape/issues
[api]: docs/api.md
[bash]: https://en.wikipedia.org/wiki/Bash_(Unix_shell) "Bourne-Again Shell"
[cc by-sa 4.0]: https://creativecommons.org/licenses/by-sa/4.0/
[changelog]: https://github.com/ericcornelissen/shescape/blob/main/CHANGELOG.md
[cmd.exe]: https://en.wikipedia.org/wiki/Cmd.exe
[csh]: https://en.wikipedia.org/wiki/C_shell
[dash]: https://en.wikipedia.org/wiki/Almquist_shell#Dash "Debian Almquist Shell"
[license]: ./LICENSE
[migration]: docs/migration.md
[mit license]: https://opensource.org/license/mit/
[powershell]: https://en.wikipedia.org/wiki/PowerShell
[recipes]: docs/recipes.md
[security]: https://github.com/ericcornelissen/shescape/blob/main/SECURITY.md
[shell injection]: https://portswigger.net/web-security/os-command-injection
[source code]: https://github.com/ericcornelissen/shescape
[testing]: docs/testing.md
[tips]: docs/tips.md
[zsh]: https://en.wikipedia.org/wiki/Z_shell "Z shell"
