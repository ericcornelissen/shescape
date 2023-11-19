<!-- SPDX-License-Identifier: CC0-1.0 -->

# Release Guidelines

If you need to release a new version of _Shescape_, follow the guidelines found
in this document.

- [Automated Releases (Preferred)](#automated-releases-preferred)
- [Manual Releases (Discouraged)](#manual-releases-discouraged)

## Automated Releases (Preferred)

To release a new version follow these steps:

1. [Manually trigger] the [release workflow] from the `main` branch; Use an
   update type in accordance with [Semantic Versioning]. This will create a Pull
   Request that start the release process.
1. Follow the instructions in the description of the created Pull Request.

## Manual Releases (Discouraged)

If it's not possible to use automated releases, or if something goes wrong with
the automatic release process, you can follow these steps to release a new
version (using `v1.6.2` as an example):

1. Make sure that your local copy of the repository is up-to-date, sync:

   ```shell
   git checkout main
   git pull origin main
   ```

   Or clone:

   ```shell
   git clone git@github.com:ericcornelissen/shescape.git
   ```

1. Update the version number in the package manifest and lockfile:

   ```shell
   npm version --no-git-tag-version v1.6.2
   ```

   If that fails, change the value of the version field in `package.json` to the
   new version:

   ```diff
   -  "version": "1.6.1",
   +  "version": "1.6.2",
   ```

   and update the version number in `package-lock.json` using `npm install`
   (after updating `package.json`), which will sync the version number.

1. Update the version number in `index.js`:

   ```shell
   node script/release/bump-jsdoc.js
   ```

   If that fails, change the value of the `@version` tag in the documentation at
   the top of the file:

   ```diff
     * @module shescape
   - * @version 1.6.1
   + * @version 1.6.2
     * @license MPL-2.0
   ```

1. Update the changelog:

   ```shell
   node script/release/bump-changelog.js
   ```

   If that fails, manually add the following text after the `## [Unreleased]`
   line:

   ```markdown
   - _No changes yet_

   ## [1.6.2] - YYYY-MM-DD
   ```

   The date should follow the year-month-day format where single-digit months
   and days should be prefixed with a `0` (e.g. `2022-01-01`).

1. Commit the changes to a new release branch and push using:

   ```shell
   git checkout -b release-$(sha1sum package-lock.json | awk '{print $1}')
   git add CHANGELOG.md index.js package.json package-lock.json
   git commit -m "Version bump"
   git push origin release-$(sha1sum package-lock.json | awk '{print $1}')
   ```

1. Create a Pull Request to merge the release branch into `main`.

1. Merge the Pull Request if the changes look OK and all continuous integration
   checks are passing.

   > **Note** At this point, the continuous delivery automation may pick up and
   > complete the release process. If not, or only partially, continue following
   > the remaining steps.

1. Immediately after the Pull Request is merged, sync the `main` branch:

   ```shell
   git checkout main
   git pull origin main
   ```

1. Create a [git tag] for the new version:

   ```shell
   git tag v1.6.2
   ```

1. Update the major version branch to point to the same commit as the new tag:

   ```shell
   git checkout v1
   git merge main
   ```

1. Push the branch and tag:

   ```shell
   git push origin v1 v1.6.2
   ```

1. Publish to [npm]:

   ```shell
   npm publish
   ```

1. Create a [GitHub Release]. The release title should be "Release v1.6.2" and
   the release text should be the list of changes for the version from the
   changelog (including links).

[git tag]: https://git-scm.com/book/en/v2/Git-Basics-Tagging
[github release]: https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository
[manually trigger]: https://docs.github.com/en/actions/managing-workflow-runs/manually-running-a-workflow
[npm]: https://www.npmjs.com/
[release workflow]: ./.github/workflows/release.yml
[semantic versioning]: https://semver.org/spec/v2.0.0.html
