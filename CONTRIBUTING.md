# Contributing Guidelines

The _Shescape_ project welcomes contributions and corrections of all forms. This
includes improvements to the documentation or code base, new tests, bug fixes,
and implementations of new features. We recommend opening an issue before making
any significant changes so you can be sure your work won't be rejected. But for
changes such as fixing a typo you can open a Pull Request directly.

Before you continue, please do make sure to read through the relevant sections
of this document. In this document you can read about:

- [Bug Reports](#bug-reports)
- [Feature Requests](#feature-requests)
- [Workflow](#workflow)
- [Project Setup](#project-setup)
  - [Using Docker](#using-docker)
- [Making Changes](#making-changes)
- [Testing](#testing)
  - [Unit Testing](#unit-testing)
  - [End-to-end Testing](#end-to-end-testing)
  - [Property Testing](#property-testing)
  - [Compatibility Testing](#compatibility-testing)
  - [Fuzz Testing](#fuzz-testing)
- [Documentation](#documentation)
  - [Package Documentation](#package-documentation)
  - [Code Documentation](#code-documentation)

---

## Bug Reports

If you have problems with _Shescape_ or think you've found a bug, please report
it to the developers; we cannot promise to do anything but we might well want to
fix it.

Before reporting a bug, make sure you've actually found a real bug. Carefully
read the documentation and see if it really says you can do what you're trying
to do. If it's not clear whether you should be able to do something or not,
report that too; it's a bug in the documentation! Also, make sure the bug has
not already been reported.

When preparing to report a bug, try to isolate it to a small working example
that reproduces the problem. Then, create a bug report including this example
and its results as well as any error or warning messages. Please don't
paraphrase these messages: it's best to copy and paste them into your report.
Finally, be sure to explain what you expected to happen; this will help us
decide whether it is a bug or a problem with the documentation.

Once you have a precise problem you can report it online as a [Bug Report].

## Feature Requests

The scope of _Shescape_ is intentionally limited. If you would still like to see
a new feature, please [open an issue] so that it can be discussed first.

## Workflow

If you decide to make a contribution, please do use the following workflow:

- Fork the repository.
- Create a new branch from the latest `main`.
- Make your changes on the new branch.
- Commit to the new branch and push the commit(s).
- Make a Pull Request.

## Project Setup

To be able to contribute you need at least the following:

- _Git_;
- _Node.js_ v18 or higher and _npm_ v8.1.2 or higher;
- (Recommended) a code editor with _[EditorConfig]_ support;

We use [Husky] to automatically install git hooks. Please enable it when
contributing to _Shescape_.

### Using Docker

To use a Docker container for development you can follow the steps below. If
you're already familiar with Docker (or another container management platform)
you can use your preferred workflow, just ensure your meet the requirements
listed above.

```sh
# Make sure you're in the directory where you cloned shescape.
$ pwd
/path/to/shescape

# Start a container. This command will mount your current working directory to
# the working directory in the container so that you can use your own editor.
$ docker run -it \
    --entrypoint "sh" \
    --workdir "/shescape" \
    --mount "type=bind,source=$(pwd),target=/shescape" \
    --name "shescape" \
    "node:$(cat .nvmrc)-alpine"

# (Optional) Setup git if you want to run git commands inside the container.
shescape$ apk add git
shescape$ git config --global user.email "you@example.com"
shescape$ git config --global user.name "Your Name"

# Run any command you want to run.
shescape$ npm test

# After exiting the container it won't be removed and you can reuse it later.
shescape$ exit
$ docker start -i shescape

# Don't forget to delete the container when you no longer need it.
shescape$ exit
$ docker container rm shescape
```

## Making Changes

Before you start making changes, be sure to run `npm install`.

When making changes it is important that 1) your changes are properly formatted
and 2) your changes are properly tested if it is a code change. The former can
be achieved with the `npm run format` command. The latter requires you to add
new test cases to the project, you can use `npm test` to verify the new (and
old) tests pass.

## Testing

It is important to test any changes and equally important to add tests for
previously untested code. Tests for this project are written using [AVA] and its
built-in assertions. All tests go into the `test/` folder and use the naming
convention `[FILENAME].test.js`, non-test files follow the naming convention
`_[FILENAME].js`.

The tests for _Shescape_ are split between unit, property, end-to-end (e2e),
compatibility, and fuzz tests. Commands are available to run the tests, as shown
in the overview below. To run tests use `npm run [SCRIPT]:[MODIFIER]`, e.g.
`npm run test:unit` or `npm run coverage:e2e`.

| Scripts            | Modifier        | Description                  |
| :----------------- | :-------------- | :--------------------------- |
| `test`, `coverage` | n/a             | Run unit tests               |
| `test`, `coverage` | `unit`          | Run unit tests               |
| `test`, `coverage` | `e2e`           | Run end-to-end (e2e) tests   |
| `test`, `coverage` | `property`      | Run property tests           |
| `test`, `coverage` | `compatibility` | Run compatibility tests      |
| `fuzz`             | n/a             | Run fuzz tests               |
| `test`             | `mutation`      | Mutation test the unit tests |

Whenever you use the `coverage` variant of a script, a code coverage report will
be generated. Find it at `_reports/coverage/[MODIFIER]/lcov-report/index.html`.

### Unit Testing

Unit tests for _Shescape_ aim to test isolated units of code, typically a single
function. All unit test suites go into the `test/unit` folder. You can run unit
tests using the command `npm run test:unit`.

The structure of the unit tests folder follows that of the `src` folder. Each
file in `src` is represented by a folder in the test structure, where files
represent individual units within the respective file in `src`.

When writing unit tests, aim to test one thing at the time. Correspondingly, the
test title should describe what is being test - not how it is tested, or what is
expected.

#### Mutation Testing

_Shescape_ uses [mutation testing] with [StrykerJS] to ensure unit tests are
effective. You can run mutation tests for _Shescape_ using the command
`npm run test:mutation` and find the mutation report in `./_reports/mutation`.

After you make changes to the source and have added tests, please consider
running mutation tests. Running mutation tests will tell you if there are
behaviour changing modification that can be made to the source without the unit
tests catching this change. [StrykerJS] labels such modifications as _Survived_.

### End-to-end Testing

End-to-end tests for _Shescape_ aim to test the library as it would be used by
users. All end-to-end test suites go into the `test/e2e` folder. You can run e2e
tests using the command `npm run test:e2e`.

The end-to-end tests are duplicated between ESM and CJS as both are supported by
_Shescape_. When making changes to the end-to-end test, make sure to update both
versions of the test.

### Property Testing

Additionally, _Shescape_ uses [property testing] with [fast-check]. All property
test suites go into the `test/prop` folder. You can run property tests using
the command `npm run test:property`.

After you make changes to the source, please consider running the property
tests. Running property tests ensures _Shescape_ works as expected for a wide
variety of inputs, increasing confidence in its correctness.

### Compatibility Testing

Compatibility tests for _Shescape_ aim to test that the library as backwards
compatible with older versions of Node.js. All compatibility test suites go into
the `test/compat` folder. You can run compatibility tests using the command
`npm run test:compatibility`.

The compatibility test suite is a smoke test suite that should be run using a
specific Node.js versions to verify compatibility with that Node.js version.
This happens automatically for all supported Node.js versions in the project's
continuous integration.

Because compatibility tests need to run on all Node.js version back to v10.13.0,
compatibility tests are written in CommonJS and run using [Mocha] (v9) and the
built-in [assert package].

### Fuzz Testing

Additionally, _Shescape_ uses [fuzz testing] using [jsfuzz]. All fuzz tests go
into the `test/fuzz` folder. You can start fuzzing using the command
`npm run fuzz`, which will provide more instructions.

Fuzz tests aim to find logic flaws or unhandled error scenarios. If you improve
or add to the fuzz code, please share your improvements. Note that fuzz logic
must be written in CommonJS (because of [jsfuzz]).

By default, the [`execSync`] default shell is used when fuzzing. You can change
this with the `FUZZ_SHELL` environment variable. The easiest way to change this
is with a `.env` file containing, for example:

```ini
# Unix example
FUZZ_SHELL=/bin/sh

# Windows example
FUZZ_SHELL=powershell.exe
```

When you discover a bug by fuzzing please keep the crash file. If you do not
plan to fix the bug, either follow the [security policy] or file a [bug report],
depending on the type of bug, and include the crash file. If you do plan to fix
the bug, move the file to the `./test/fuzz/corpus` folder, remove the "crash-"
prefix, and include it in the Pull Request fixing the bug. By adding it in this
folder the bug will automatically be retested when fuzzing again.

## Documentation

It is important to document the behavior of _Shescape_. The documentation for
this project is split between package documentation and code documentation. In
this section you can find guidelines for both types of documentation.

### Package Documentation

_This section is planned to be added as part of [#160]._

### Code Documentation

The source code of _Shescape_ is documented following the [JSDoc] standard. In
general, code documentation should be written in plain English using full
sentences. It is allowed to use [MarkDown] syntax in code documentation.

#### File Documentation

The documentation of a source file (excluding `index.js` at the root) or test
file should follow the following guidelines:

- `@overview`: Should describe the contents of the file. Must be written in the
  present tense with an active voice. In the first sentence, the subject must be
  omitted for brevity.
- `@license`: Must be `MPL-2.0` for all source code files. Must be `MPL-2.0` or
  `Unlicense` (preferred) for all test files.

##### Structure

```js
/**
 * @overview [Description]
 * @license [identifier]
 */
```

##### Example

```js
/**
 * @overview Provides utility functions.
 * @license MPL-2.0
 */

import foo from "bar";
```

#### Function Documentation

The documentation of a function should follow the following guidelines:

- **Description**: Must be written in the present tense with an active voice.
  In the first sentence, the subject must be omitted for brevity.
- `@param`: Must include the type, name, and a description of the parameter.
- `@returns`: Must include the type and a description of the return value.
- `@throws`: Should only be present if the function may throw an error. Must
  include the type and a description of when the error occurs. If multiple
  distinct errors may be thrown, multiple `@throws` tags should be used.
- `@since`: Must be present if the function is exported by _Shescape_ and must
  be omitted if it is not. The value must be the version of _Shescape_ in which
  the function was first exported (without "v" prefix).

##### Structure

```js
/**
 * [Description]
 *
 * @param {[type]} [name] [Description]
 * @returns {[type]} [Description]
 * @throws {[type]} [Description]
 * @since [Version]
 */
```

##### Example

```js
/**
 * Checks if the value is valid.
 *
 * @param {string} value The value to check.
 * @returns {boolean} `true` if the value is valid, `false` otherwise.
 * @throws {TypeError} The value is not a string.
 * @since 3.1.4
 */
function isValid(value) {
  // Omitted for brevity
}
```

#### Constants Documentation

The documentation of a constant should follow the following guidelines:

- **Description**: Must start with "The".
- `@constant`: Must be present.
- `@type`: Must specify the type of the constant.

##### Structure

```js
/**
 * [Description]
 *
 * @constant
 * @type {[type]}
 */
```

##### Example

```js
/**
 * The full name of John.
 *
 * @constant
 * @type {string}
 */
const john = "John Doe";
```

[assert package]: https://nodejs.org/api/assert.html
[ava]: https://github.com/avajs/ava
[bug report]: https://github.com/ericcornelissen/shescape/issues/new?labels=bug&template=bug_report.md
[editorconfig]: https://editorconfig.org/
[`execsync`]: https://nodejs.org/api/child_process.html#child_processexecsynccommand-options
[fast-check]: https://www.npmjs.com/package/fast-check
[fuzz testing]: https://en.wikipedia.org/wiki/Fuzzing
[husky]: https://github.com/typicode/husky
[jsdoc]: https://jsdoc.app/
[jsfuzz]: https://gitlab.com/gitlab-org/security-products/analyzers/fuzzers/jsfuzz
[markdown]: https://en.wikipedia.org/wiki/Markdown
[mocha]: https://mochajs.org/
[mutation testing]: https://en.wikipedia.org/wiki/Mutation_testing
[open an issue]: https://github.com/ericcornelissen/shescape/issues/new/choose
[property testing]: https://en.wikipedia.org/wiki/Property_testing
[security policy]: https://github.com/ericcornelissen/shescape/security/policy
[strykerjs]: https://stryker-mutator.io/
[#160]: https://github.com/ericcornelissen/shescape/issues/160
