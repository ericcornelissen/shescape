# Changelog

All notable changes to _Shescape_ will be documented in this file.

The format is based on [Keep a Changelog], and this project adheres to [Semantic
Versioning].

## [Unreleased]

- _No changes yet_

## [1.6.1] - 2022-10-25

- Fix potential polynomial backtracking in regular expression for Bash escaping
  with `{interpolation:true}`. ([552e8ea])

## [1.6.0] - 2022-10-15

- Escape control characters `U+0008`, `U+000D`, `U+001B`, and `U+009B`. ([#456])
- Improve escaping performance when interpolation is set to `true`. ([#457])
- Improve newline substitution on Windows. ([#458], [#460])
- Improve specificity of supported Node.js versions. ([#432], [#459])
- Remove all side effects on import. ([#408])

## [1.5.10] - 2022-08-21

- Fix potential polynomial backtracking in regular expression for Bash escaping
  with `{interpolation:true}`. ([#373])
- Fix potential quadratic runtime regular expressions for Bash escaping with
  `{interpolation:true}`. ([#373])

## [1.5.9] - 2022-07-28

- Fix escaping characters after `U+0085` with `{interpolation:true}` for
  PowerShell on Windows systems. ([#354])
- Improve performance of escaping for Dash. ([#336])
- Include full documentation in published package. ([#350])

## [1.5.8] - 2022-07-15

- Fix escaping of line feed characters for Bash, Dash, and Zsh on Unix
  systems. ([#332])
- Fix escaping of line feed and carriage return characters for PowerShell and
  CMD on Windows systems. ([#332])
- Fix escaping of `~` and `{` for Bash on Unix systems with input strings
  containing line terminating characters. ([#332])

## [1.5.7] - 2022-07-06

- Fix escaping of characters after whitespace with `{interpolation:true}` for
  Bash, Dash, and Zsh on Unix systems. ([#324])
- Fix escaping of characters after whitespace with `{interpolation:true}` for
  Powershell on Windows systems. ([#322])

## [1.5.6] - 2022-07-02

- Fix unnecessary escaping of quotes with the `child_process` functions `fork`,
  `spawn`, and `execFile`. ([#310])
- Improve performance of escaping for Dash. ([#272])

## [1.5.5] - 2022-06-05

- Fix `The "path" argument must be of type string` error. ([#277])

## [1.5.4] - 2022-03-07

- Fix `Cannot find module 'path/win32'` error on Node.js <16.0.0. ([#199])
- Improve detection of the Windows operating system. ([#192])

## [1.5.3] - 2022-03-06

- Fix documented type of `interpolation` option. ([#190])

## [1.5.2] - 2022-02-23

- Add escaping of brace expansion for non-Zsh shells when interpolation is
  enabled. ([#178])
- Explicitly import `process`. ([#173])

## [1.5.1] - 2022-02-20

- Fix default shell for Windows when `%COMSPEC%` is missing.
- Fix escaping of `~` for certain input strings with `escape` and `escapeAll`
  when `interpolation` is set to `true` in the options.
- Improve error messaging for certain non-string arguments.

## [1.5.0] - 2022-02-14

- Follow symbolic links when determining the shell to escape for.

## [1.4.0] - 2022-02-08

- Add escaping for Unix interpolation characters to `escape`/`escapeAll`.
- Add escaping for Zsh wildcard characters to `escape`/`escapeAll`.
- Update TypeScript type definitions.
- Update type information in the documentation.

## [1.3.3] - 2022-01-15

- Add official support for Dash (_Debian Almquist shell_).
- Include offline documentation in package installation.

## [1.3.2] - 2022-01-05

- Fix escaping unicode double quotes (U+201C, U+201D, U+201) for PowerShell.
- Update documentation to include officially supported shells.

## [1.3.1] - 2021-12-06

- Add default shell detection.

## [1.3.0] - 2021-12-05

- Add support to configure the shell to escape for.
- Fix escaping backticks for PowerShell.
- Fix escaping `$` for PowerShell.

## [1.2.1] - 2021-04-24

- Provide TypeScript type definitions.
- Update documentation to use ECMAScript module in examples.

## [1.2.0] - 2021-04-14

- Provide native ECMAScript module source files.

## [1.1.3] - 2021-03-13

- Strip null characters from arguments.

## [1.1.2] - 2021-01-07

- Add in-source JSDoc documentation.

## [1.1.1] - 2020-12-30

- Improve error message when a value is not stringable.

## [1.1.0] - 2020-12-22

- Add `escapeAll` function to escape an array of arguments.
- Recommend usage of `escapeAll` when using `fork`/`spawn`/`execFile`.

## [1.0.0] - 2020-12-10

- BREAKING CHANGE: Remove ability to call `shescape()` directly.
- BREAKING CHANGE: Automatically convert input to array in `quoteAll()`.
- Fix numbering in documentation's "Install" section.

## [0.4.1] - 2020-12-09

- Support non-string values as arguments.

## [0.4.0] - 2020-12-08

- Add `quoteAll` function to quote and escape an array of arguments.
- Create website with full documentation (_no longer exists_).

## [0.3.1] - 2020-12-07

- Deprecate calling `shescape()` directly.

## [0.3.0] - 2020-12-07

- Add `escape` function to escape an argument (same as `shescape()`).
- Add `quote` function to quote and escape an argument.

## [0.2.1] - 2020-11-07

- Fix missing released files.

## [0.2.0] - 2020-11-07

- Add support for escaping of double quotes on Windows.

## [0.1.0] - 2020-11-06

- Escape individual shell arguments.

[#173]: https://github.com/ericcornelissen/shescape/pull/173
[#178]: https://github.com/ericcornelissen/shescape/pull/178
[#190]: https://github.com/ericcornelissen/shescape/pull/190
[#192]: https://github.com/ericcornelissen/shescape/pull/192
[#199]: https://github.com/ericcornelissen/shescape/pull/199
[#272]: https://github.com/ericcornelissen/shescape/pull/272
[#277]: https://github.com/ericcornelissen/shescape/pull/277
[#310]: https://github.com/ericcornelissen/shescape/pull/310
[#322]: https://github.com/ericcornelissen/shescape/pull/322
[#324]: https://github.com/ericcornelissen/shescape/pull/324
[#332]: https://github.com/ericcornelissen/shescape/pull/332
[#336]: https://github.com/ericcornelissen/shescape/pull/336
[#350]: https://github.com/ericcornelissen/shescape/pull/350
[#354]: https://github.com/ericcornelissen/shescape/pull/354
[#373]: https://github.com/ericcornelissen/shescape/pull/373
[#408]: https://github.com/ericcornelissen/shescape/pull/408
[#432]: https://github.com/ericcornelissen/shescape/pull/432
[#456]: https://github.com/ericcornelissen/shescape/pull/456
[#457]: https://github.com/ericcornelissen/shescape/pull/457
[#458]: https://github.com/ericcornelissen/shescape/pull/458
[#459]: https://github.com/ericcornelissen/shescape/pull/459
[#460]: https://github.com/ericcornelissen/shescape/pull/460
[552e8ea]: https://github.com/ericcornelissen/shescape/commit/552e8eab56861720b1d4e5474fb65741643358f9
[keep a changelog]: https://keepachangelog.com/en/1.0.0/
[semantic versioning]: https://semver.org/spec/v2.0.0.html
