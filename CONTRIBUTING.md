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
- [Making Changes](#making-changes)
- [Testing](#testing)
  - [Mutation Testing](#mutation-testing)
  - [Property Testing](#property-testing)
  - [Fuzz Testing](#fuzz-testing)

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
- _NodeJS_ v14.16 or higher and _NPM_ v7 or higher;
- (Recommended) a code editor with _[EditorConfig]_ support;
- (Website only) _Ruby_ v2.7 or higher and _Jekyll_ v3.5 or higher.

We use [Husky] to automatically install git hooks. Please enable it when
contributing to _Shescape_.

## Making Changes

Before you start making changes, be sure to run `npm install`.

When making changes it is important that 1) your changes are properly formatted
and 2) your changes are properly tested if it is a code change. The former can
be achieved with the `npm run format` command. The latter requires you to add
new test cases to the project, you can use `npm test` to verify the new (and
old) tests pass.

## Testing

It is important to test any changes and equally important to add tests for
previously untested code. Tests for this project are written using [Mocha] and
the standard [assert package]. All tests go into the `test/` folder and use the
naming convention `[FILENAME].test.js`. You can run the tests for _Shescape_
using the command `npm run test`, or use `npm run coverage` to run tests and get
a coverage report in `./reports/coverage`.

### Mutation Testing

Additionally, _Shescape_ uses [mutation testing] with [StrykerJS]. You can run
mutation tests for _Shescape_ using the command `npm run test:mutation` and get
a report in `./reports/mutation`.

After you make changes to the source and have added tests, please consider
running mutation tests. Running mutation tests will tell you if there are
behaviour changing modification that can be made to the source without the tests
catching this change. [StrykerJS] labels such modifications as _Survived_.

### Property Testing

Additionally, _Shescape_ uses [property testing] with [fast-check]. All property
test suites go into the `test/` folder and use the naming convention
`[FILENAME].prop.js`. You can run property tests using the command
`npm run test:property`.

After you make changes to the source, please consider running the property
tests. Running property tests ensures _Shescape_ works as expected for a wide
variety of inputs, increasing confidence in its correctness.

Also, consider adding new or improving existing property tests based on changes.
If you do so, please share your improvements.

### Fuzz Testing

Additionally, _Shescape_ uses [fuzz testing] using [jsfuzz]. All fuzz logic goes
into the `test/` folder and use the naming convention `[FILENAME].fuzz.cjs`.
Note that fuzz logic must be written in CommonJS style as opposed to the rest of
the project.

You can start fuzzing using the command `npm run fuzz`, which runs
`index.fuzz.cjs` by default. If you improve or add to the fuzz code, please
share your improvements.

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

[assert package]: https://nodejs.org/api/assert.html
[bug report]: https://github.com/ericcornelissen/shescape/issues/new?labels=bug&template=bug_report.md
[editorconfig]: https://editorconfig.org/
[`execsync`]: https://nodejs.org/api/child_process.html#child_processexecsynccommand-options
[fast-check]: https://www.npmjs.com/package/fast-check
[fuzz testing]: https://en.wikipedia.org/wiki/Fuzzing
[husky]: https://github.com/typicode/husky
[jsfuzz]: https://gitlab.com/gitlab-org/security-products/analyzers/fuzzers/jsfuzz
[mocha]: https://mochajs.org/
[mutation testing]: https://en.wikipedia.org/wiki/Mutation_testing
[open an issue]: https://github.com/ericcornelissen/shescape/issues/new/choose
[property testing]: https://en.wikipedia.org/wiki/Property_testing
[security policy]: https://github.com/ericcornelissen/shescape/security/policy
[strykerjs]: https://stryker-mutator.io/
