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
- _NodeJS_ v10.13 or higher and _NPM_ v7 or lower;
- (Recommended) _Ruby_ v2.7 or higher and _Jekyll_ v3.5 or higher;
- (Recommended) a code editor with _[EditorConfig]_ support.

We use [Husky] to automatically install git hooks for you. Please enable it when
contributing to _Shescape_.

## Making Changes

When making changes it is important that 1) your changes are properly formatted
and 2) your changes are properly tested if it is a code change. The former can
be achieved with the `npm run format` command. The latter requires you to add
new test cases to the project, you can use `npm test` to verify the new (and
old) tests pass.

[bug report]: https://github.com/ericcornelissen/shescape/issues/new?labels=bug&template=bug_report.md
[editorconfig]: https://editorconfig.org/
[husky]: https://github.com/typicode/husky
[open an issue]: https://github.com/ericcornelissen/shescape/issues/new/choose
