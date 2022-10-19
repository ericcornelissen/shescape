# Contributing Guidelines

The _Shescape_ project welcomes contributions and corrections of all forms. This
includes improvements to the documentation or code base, new tests, bug fixes,
and implementations of new features. We recommend you open an issue before
making any substantial changes so you can be sure your work won't be rejected.
But for small changes, such as fixing a typo, you can open a Pull Request
directly.

If you plan to make a contribution, please do make sure to read through the
relevant sections of this document.

- [Reporting Issues](#reporting-issues)
  - [Security](#security)
  - [Bug Reports](#bug-reports)
  - [Feature Requests](#feature-requests)
  - [Corrections](#corrections)
- [Making Changes](#making-changes)
  - [Prerequisites](#prerequisites)
  - [Workflow](#workflow)
  - [Development Details](#development-details)
- [Testing](#testing)
  - [Unit Testing](#unit-testing)
  - [Integration Testing](#integration-testing)
  - [End-to-end Testing](#end-to-end-testing)
  - [Compatibility Testing](#compatibility-testing)
  - [Property Testing](#property-testing)
  - [Fuzz Testing](#fuzz-testing)
- [Documentation](#documentation)
  - [Package Documentation](#package-documentation)
  - [Code Documentation](#code-documentation)

---

## Reporting Issues

### Security

For security related issues, please refer to the [security policy].

### Bug Reports

If you have problems with the package or think you've found a bug, please report
it to the developers. We ask you to always open an issue describing the bug as
soon as possible so that we, and others, are aware of the bug.

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

Once you have a precise problem you can report it as a [bug report].

### Feature Requests

The scope of the package is intentionally limited. Please avoid implementing a
new feature before submitting an issue for it first. To request a feature, make
sure you have a clear idea what you need and why. Also, make sure the feature
has not already been requested.

When you have a clear idea of what you need, you can submit a [feature request].

### Corrections

Corrections, such as fixing typos or refactoring code, are important. For small
changes you can open a Pull Request directly, Or you can first [open an issue].

---

## Making Changes

You are always free to contribute by working on one of the confirmed or accepted
and unassigned [open issues] and opening a Pull Request for it.

It is advised to indicate that you will be working on a issue by commenting on
that issue. This is so others don't start working on the same issue as you are.
Also, don't start working on an issue which someone else is working on - give
everyone a chance to make contributions.

When you open a Pull Request that implements an issue make sure to link to that
issue in the Pull Request description and explain how you implemented the issue
as clearly as possible.

> **Note** If you, for whatever reason, can no longer continue your contribution
> please share this in the issue or your Pull Request. This gives others the
> opportunity to work on it. If we don't hear from you for an extended period of
> time we may decide to allow others to work on the issue you were assigned to.

### Prerequisites

To be able to contribute you need the following tooling:

- [git];
- [Node.js] v18.7.0 or higher and [npm] v8.1.2 or higher;
- (Recommended) a code editor with [EditorConfig] support;
- (Suggested) [ShellCheck];
- (Optional) [curl];
- (Optional) [Docker];

### Workflow

If you decide to make a contribution, please do use the following workflow:

- Fork the repository.
- Create a new branch from the latest `main`.
- Make your changes on the new branch.
- Commit to the new branch and push the commit(s).
- Open a Pull Request against `main`.

### Development Details

Before you start making changes you should run `npm install`. This ensures your
local development environment is setup and ready to go.

We use [husky] to automatically install git hooks. Please enable it when
contributing to this project. If you have npm installation scripts disabled, run
`npm run prepare` after installing dependencies.

When making contributions, make sure your changes are [tested](#testing),
[documented](#documentation), [well-formatted](#formatting-and-linting), and
[vetted](#vetting).

#### Formatting and Linting

The source code of the project is formatted using [Prettier]. Run the command
`npm run format` to format the source code, or `npm run lint` to check if your
changes follow the expected format. The pre-commit hook will format all staged
changes. The pre-push hook will prevent pushing code that is not formatted
correctly.

On top of that, the project uses linters to catch mistakes. Use the following
commands to check your changes if applicable:

| File type                | Command           | Linter         |
| :----------------------- | :---------------- | :------------- |
| JavaScript (`.{js,cjs}`) | `npm run lint:js` | [ESLint]       |
| MarkDown (`.md`)         | `npm run lint:md` | [markdownlint] |
| Shell (`.{,sh}`)         | `npm run lint:sh` | [ShellCheck]   |

#### Vetting

The project is vetted using a small collection of static analysis tools. Run
`npm run vet` to analyze the project for potential problems.

#### Benchmarking

The project has a simple benchmarking suite that can be found at `test/bench`.
It is used to detect performance regressions in the escaping logic. To this end
they're run continuously in the project's continuous integration. You can run
the benchmarks locally using `npm run benchmark`.

#### Typings

Even though this project is written in JavaScript, it provides [TypeScript] type
definitions out-of-the-box. All type definitions are specified in `index.d.ts`.
This file only needs to change if the public API of the project changes.

#### Building

The source code is transpiled and bundled into a CommonJS file at `index.cjs`
with [rollup.js] when the package is published to npm. This is to provide
support for older Node.js versions. Run `npm run transpile` locally to create
this file. Note that the file ignored by git.

#### Auditing

To scan for vulnerabilities in the npm dependencies, use `npm run audit`.

#### Resetting

You can reset the repository to a clean state by running:

```shell
npm run clean
npm clean-install
```

---

## Testing

It is important to test any changes and equally important to add tests for
previously untested code. Tests for this project are written using [AVA] and its
built-in assertions. All tests go into the `test/` folder and use the naming
convention `[FILENAME].test.js`, non-test files follow the naming convention
`_[FILENAME].js`.

The tests for the project are split between unit, integration, end-to-end (e2e),
compatibility, property, and fuzz tests. Various commands are available to run
the tests, as shown in the overview below.

To run tests use `npm run [SCRIPT]:[MODIFIER]`, e.g. `npm run test:unit` or
`npm run coverage:e2e`.

| Script             | Modifier      | Description                      |
| :----------------- | :------------ | :------------------------------- |
| `test`, `coverage` | n/a           | Run unit tests                   |
| `test`, `coverage` | `unit`        | Run unit tests                   |
| `test`, `coverage` | `integration` | Run integration tests            |
| `test`, `coverage` | `e2e`         | Run end-to-end (e2e) tests       |
| `test`, `coverage` | `compat`      | Run the compatibility test suite |
| `test`             | `compat-all`  | Run all compatibility tests      |
| `test`, `coverage` | `property`    | Run property tests               |
| `fuzz`             | n/a           | Run fuzz tests                   |
| `test`             | `mutation`    | Mutation test the unit tests     |

Whenever you use the `coverage` variant of a script, a code coverage report will
be generated at `_reports/coverage/[MODIFIER]`.

### Unit Testing

The unit tests aim to test isolated units of code, typically a single function.
All unit test suites go into the `test/unit` folder. You can run unit tests
using the command `npm run test:unit`.

The structure of the unit tests folder follows that of the `src` folder. Each
file in `src` is represented by a folder in the test structure, where files
represent individual units within the respective file in `src`.

When writing unit tests, aim to test one thing at the time. Correspondingly, the
test title should describe what is being test - not how it is tested, or what is
expected.

#### Mutation Testing

The effectiveness of the unit tests is ensured by [mutation testing] with
[Stryker]. You can run mutation tests for using `npm run test:mutation`, which
will generate a mutation report in `_reports/mutation`.

After you make changes to the source and have added tests, consider running
mutation tests. Running mutation tests will tell you if there are behaviour
changing modification that can be made to the source without the unit tests
catching the change. Stryker labels such modifications as _Survived_.

You can use incremental mode to speed up subsequent mutation testing runs by
using `npm run test:mutation -- --incremental`. However, this does not work well
when the unit tests changed. If you change a unit test, add the `--force` flag,
and optionally a source code file, to instruct Stryker to re-test (some of) the
mutants.

```sh
# Rerun all mutation tests
npm run test:mutation -- --incremental --force

# Rerun mutation tests only for ./src/main.js
npm run test:mutation -- --incremental --force --mutate src/main.js
```

### Integration Testing

The integration tests aim to test the library as it would be used by users, both
in CommonJS and ESModule form. All integration test suites go into the
`test/integration` folder. You can run the integration tests using the command
`npm run test:integration`.

### End-to-end Testing

The end-to-end (e2e) tests aim to test the library when used to invoke shell
commands. All end-to-end test suites go into the `test/e2e` folder. You can run
the e2e tests using the command `npm run test:e2e`.

### Compatibility Testing

The compatibility tests aim to test that the library as backwards compatible
with older versions of Node.js. All compatibility test suites go into the
`test/compat` folder.

To run compatibility tests first run `npm run test:transpile` and then run
`npm run test:compat` to run the compatibility test suite. However, this does
not fully cover compatibility testing as it will only run the suite on the
Node.js version you're currently using. If you have [Docker] installed and
running you can use the command `npm run test:compat-all` to run the
compatibility test suite on all applicable Node.js versions.

The compatibility test suite is a smoke test suite that should be run using a
specific Node.js versions to verify compatibility with that Node.js version.
This happens automatically for all supported Node.js versions in the project's
continuous integration.

Because compatibility tests need to run on all Node.js version back to v10.13.0,
compatibility tests are written in CommonJS and run using [Mocha] (v9) and the
built-in [assert package].

### Property Testing

Additionally, [property testing] with [fast-check] is used. All property test
suites go into the `test/prop` folder. You can run the property tests using the
command `npm run test:property`.

After you make changes to the source, please consider running the property
tests. Running property tests ensures the package works as expected for a wide
variety of inputs, increasing confidence in its correctness.

### Fuzz Testing

Additionally, this project is [fuzz tested] using [jsfuzz]. All fuzz tests go
into the `test/fuzz` folder. You can start fuzzing using the command
`npm run fuzz`, which will provide more instructions.

Fuzz tests aim to find logic flaws or unhandled error scenarios. If you improve
or add to the fuzz code, please share your improvements. Note that fuzz logic
must be written in CommonJS (requirement from [jsfuzz]).

By default, the system default shell is used when fuzzing. You can change this
with the `FUZZ_SHELL` environment variable. The easiest way to change this is
with a `.env` file containing, for example:

```ini
# Unix example
FUZZ_SHELL=/bin/sh

# Windows example
FUZZ_SHELL=powershell.exe
```

When you discover a bug by fuzzing please keep the crash file. If you do not
plan to fix the bug, either follow the [security policy] or file a [bug report]
(depending on the type of bug) and include the crash file. If you do plan to fix
the bug, move the crash file to the `test/fuzz/corpus` folder, remove the
"crash-" prefix, and include it in the Pull Request fixing the bug. By adding it
in this folder the bug will automatically be retested when fuzzing again.

---

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
- `@license`: Must be `MPL-2.0` for all source code files. Must be `Unlicense`
  (preferred) or `MPL-2.0` for all test files.

##### Structure

```javascript
/**
 * @overview [description]
 * @license [identifier]
 */
```

##### Example

```javascript
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

```javascript
/**
 * [description]
 *
 * @param {[type]} [name] [description]
 * @returns {[type]} [description]
 * @throws {[type]} [description]
 * @since [version]
 */
```

##### Example

```javascript
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

```javascript
/**
 * [description]
 *
 * @constant
 * @type {[type]}
 */
```

##### Example

```javascript
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
[curl]: https://curl.se/
[docker]: https://www.docker.com/
[editorconfig]: https://editorconfig.org/
[eslint]: https://eslint.org/
[fast-check]: https://github.com/dubzzz/fast-check
[feature request]: https://github.com/ericcornelissen/shescape/issues/new?labels=enhancement
[fuzz tested]: https://en.wikipedia.org/wiki/Fuzzing
[git]: https://git-scm.com/
[husky]: https://github.com/typicode/husky
[jsdoc]: https://jsdoc.app/
[jsfuzz]: https://gitlab.com/gitlab-org/security-products/analyzers/fuzzers/jsfuzz
[markdown]: https://en.wikipedia.org/wiki/Markdown
[markdownlint]: https://github.com/DavidAnson/markdownlint
[mocha]: https://mochajs.org/
[mutation testing]: https://en.wikipedia.org/wiki/Mutation_testing
[node.js]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/
[open an issue]: https://github.com/ericcornelissen/shescape/issues/new
[open issues]: https://github.com/ericcornelissen/shescape/issues?q=is%3Aissue+is%3Aopen+no%3Aassignee
[prettier]: https://prettier.io/
[property testing]: https://en.wikipedia.org/wiki/Property_testing
[rollup.js]: https://rollupjs.org/guide/en/
[security policy]: ./SECURITY.md
[shellcheck]: https://www.shellcheck.net/
[stryker]: https://stryker-mutator.io/
[typescript]: https://www.typescriptlang.org/
[#160]: https://github.com/ericcornelissen/shescape/issues/160
