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

[changelog]: ./CHANGELOG.md
[license]: ./LICENSE
[npm-url]: https://www.npmjs.com/package/shescape
[shell injection]: ./docs/vocabulary.md#shell-injection
[security]: ./SECURITY.md
[source code]: https://github.com/ericcornelissen/shescape

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

[an issue]: https://github.com/ericcornelissen/shescape/issues
[bash]: https://en.wikipedia.org/wiki/Bash_(Unix_shell) "Bourne-Again Shell"
[busybox]: https://en.wikipedia.org/wiki/BusyBox "BusyBox"
[cmd.exe]: https://en.wikipedia.org/wiki/Cmd.exe "CMD.exe"
[csh]: https://en.wikipedia.org/wiki/C_shell "C shell"
[dash]: https://en.wikipedia.org/wiki/Almquist_shell#Dash "Debian Almquist Shell"
[powershell]: https://en.wikipedia.org/wiki/PowerShell "PowerShell"
[zsh]: https://en.wikipedia.org/wiki/Z_shell "Z shell"

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
- Having trouble? See the [troubleshooting] document for help.

[troubleshooting]: docs/troubleshoot.md
[recipes]: docs/recipes.md
[tips]: docs/tips.md
[use cases]: docs/use-cases.md

### Migrating from v1

View the [migration guidelines] for help.

[migration guidelines]: docs/migration.md

### API

View the [API] documentation of Shescape.

[api]: docs/api.md

### Testing

View the [testing] documentation for how to test code that uses Shescape.

[testing]: docs/testing.md

## License

The source code is licensed under the `MPL-2.0` license, see [LICENSE] for
the full license text. The documentation text is licensed under [CC BY-SA 4.0];
code snippets under the [MIT-0] license.

Supporting code (scripts and tests) is generally licensed under the `MIT` or
`MIT-0` license. Individual files may be licensed differently depending on the
intend or origin.

The license under which a given file is available can always be found in the
file's banner comment.

[cc by-sa 4.0]: ./docs/LICENSE-CC-BY-SA-4.0
[mit-0]: ./docs/LICENSE-MIT-0
