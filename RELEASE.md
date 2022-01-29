# Release Guidelines

If you need to release a new version of Shescape you should follow the
guidelines found in this file.

## Automated Releases (Preferred)

The [`release.yml`](./.github/workflows/release.yml) [GitHub Actions] workflow
should be used to created releases. This workflow will publish a release to npm
and create a [GitHub Release] **after** verifying that the package is ready for
release.

To trigger this workflow you must push a [git tag] to the repository. This will
create a release based on the version number found in the package manifest and
the annotation of the git tag.

A typical release process will look something like this (using `v3.1.4` as an
example):

1. [Update the version] in the package manifest, lockfile, and `./index.js` to
   "3.1.4" (excluding the "v") and [update the changelog] accordingly.
2. Commit the changes to `main` using `git commit -a -m "Version bump"`.
3. Create a tag for the new version using `git tag -a v3.1.4` (including the
   "v").
4. Push the commit and tag using `git push origin main v3.1.4`.

## Manual Releases (Discouraged)

If it's not possible to use automated releases you can follow these steps to
release a version to npm.

```sh
# Make sure you can run checks
npm install

# Run checks before you publish
npm run lint
npm run test

# Publish to npm (make sure your computer and account are ready to do this)
npm publish
```

## Updating the Version Number

### Manifest and Lockfile

To update the version number run (using `v3.1.4` as an example):

```sh
npm version v3.1.4 --no-git-tag-version
```

If that fails, in `package.json`, change the value of the version field to the
new version:

```diff
-  "version": "3.1.3",
+  "version": "3.1.4",
```

To update the version number in `package-lock.json` it is recommended to run
`npm install` (after updating `package.json`) this will sync the version number.

### `index.js`

To update the version number in `index.js` run (after updating the package
manifest):

```sh
node script/bump-jsdoc.js
```

If that fails,, change the value of the `@version` tag in the documentation at
the top of the file:

```diff
  * @module shescape
- * @version 3.1.3
+ * @version 3.1.4
  * @license MPL-2.0
```

## Updating the Changelog

To update the changelog run (after updating the package manifest):

```sh
node script/bump-changelog.js
```

If that fails, manually add the following text after the `## [Unreleased]` line
(using `v3.1.4` as an example):

```md
- _No changes yet_

## [3.1.4] - YYYY-MM-DD
```

The date should follow the year-month-day format where single-digit months and
days should be prefixed with a `0` (e.g. `2022-01-01`).

[git tag]: https://git-scm.com/book/en/v2/Git-Basics-Tagging
[github actions]: https://github.com/features/actions
[github release]: https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository
[update the changelog]: #updating-the-changelog
[update the version]: #updating-the-version-number
