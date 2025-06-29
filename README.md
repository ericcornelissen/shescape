<!-- SPDX-License-Identifier: CC-BY-SA-4.0 -->

# Shescape

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

- **Unix**: [Bash], [BusyBox], [csh], [Dash], [Zsh]
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
   const shescape = new Shescape(/* Options */);
   ```

4. Use `shescape`.

### Getting Started

- Look at the [use cases] for Shescape.
- Check the [recipes] for examples of how to use Shescape.
- Read the [tips] for additional ways to protect against shell injection.

### Migrating from v1

View the [migration guidelines] for help.

### API

View the [API] documentation of Shescape.

### Testing

View the [testing] documentation for how to test code that uses Shescape.

## License

The source code is licensed under the `MPL-2.0` license, see [LICENSE] for
the full license text. The documentation text is licensed under [CC BY-SA 4.0];
code snippets under the [MIT-0] license.

Supporting code, such a scripts and tests, is generally licensed under the `MIT`
or `MIT-0` license. Individual files may be licensed differently depending on
the intend or origin.

The license under which a given file is available can always be found in the
file's banner comment.

[an issue]: https://github.com/ericcornelissen/shescape/issues
[api]: docs/api.md
[bash]: https://en.wikipedia.org/wiki/Bash_(Unix_shell) "Bourne-Again Shell"
[busybox]: https://en.wikipedia.org/wiki/BusyBox "BusyBox"
[cc by-sa 4.0]: ./docs/LICENSE-CC-BY-SA-4.0
[changelog]: ./CHANGELOG.md
[cmd.exe]: https://en.wikipedia.org/wiki/Cmd.exe
[csh]: https://en.wikipedia.org/wiki/C_shell
[dash]: https://en.wikipedia.org/wiki/Almquist_shell#Dash "Debian Almquist Shell"
[license]: ./LICENSE
[migration guidelines]: docs/migration.md
[mit-0]: ./docs/LICENSE-MIT-0
[npm-url]: https://www.npmjs.com/package/shescape
[powershell]: https://en.wikipedia.org/wiki/PowerShell
[recipes]: docs/recipes.md
[security]: ./SECURITY.md
[shell injection]: ./docs/vocabulary.md#shell-injection
[source code]: https://github.com/ericcornelissen/shescape
[testing]: docs/testing.md
[tips]: docs/tips.md
[use cases]: docs/use-cases.md
[zsh]: https://en.wikipedia.org/wiki/Z_shell "Z shell"
