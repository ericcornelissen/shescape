# Release Guidelines

If you need to release a new version of Shescape you should follow the
guidelines found in this file.

## Automated Releases (Preferred)

The [`release.yml`](./.github/workflows/release.yml) [GitHub Actions] workflow
should be used to created releases. This workflow:

1. Can be [triggered manually] to initiate a new release by means of a Pull
   Request.
2. Is trigger when pushing a [git tag] in which case it will publish a new
   release to [npm] (based on the version number found in the manifest) **and**
   create a [GitHub Release] (based on the annotation of the git tag).

The release process is as follows:

1. Initiate a new release by triggering the `release.yml` workflow manually. Use
   an update type in accordance with [Semantic Versioning].
2. Follow the instructions in the Pull Request description.

## Manual Releases (Discouraged)

If it's not possible to use automated releases you can follow these steps to
release a version to [npm] (using `v3.1.4` as an example):

1. Make sure that your local copy of the repository is up-to-date:

   ```sh
   # Sync
   git switch main
   git pull origin main

   # Or clone
   git clone git@github.com:ericcornelissen/shescape.git
   ```

2. Verify that the repository is in a state that can be released:

   ```sh
   npm install
   npm run lint
   npm run eslint
   npm run test
   ```

3. Update the version number in the package manifest and lockfile:

   ```sh
   npm version v3.1.4 --no-git-tag-version
   ```

   If that fails change the value of the version field in `package.json` to the
   new version:

   ```diff
   -  "version": "3.1.3",
   +  "version": "3.1.4",
   ```

   To update the version number in `package-lock.json` it is recommended to run
   `npm install` (after updating `package.json`) which will sync the version
   number.

4. Update the version number in `index.js`:

   ```sh
   node script/bump-jsdoc.js
   ```

   If that fails, change the value of the `@version` tag in the documentation at
   the top of the file:

   ```diff
     * @module shescape
   - * @version 3.1.3
   + * @version 3.1.4
     * @license MPL-2.0
   ```

5. Update the changelog:

   ```sh
   node script/bump-changelog.js
   ```

   If that fails, manually add the following text after the `## [Unreleased]`
   line:

   ```md
   - _No changes yet_

   ## [3.1.4] - YYYY-MM-DD
   ```

   The date should follow the year-month-day format where single-digit months
   and days should be prefixed with a `0` (e.g. `2022-01-01`).

6. Commit the changes to `main` using:

   ```sh
   git add CHANGELOG.md index.js package.json package-lock.json
   git commit -m "Version bump"
   ```

7. Create an annotated tag for the new version:

   ```sh
   git tag -a v3.1.4
   ```

   Set the annotation to the list of changes for that version.

8. Push the commit and tag:

   ```sh
   git push origin main v3.1.4
   ```

9. Publish to [npm] using:

   ```sh
   npm publish
   ```

[git tag]: https://git-scm.com/book/en/v2/Git-Basics-Tagging
[github actions]: https://github.com/features/actions
[github release]: https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository
[npm]: https://www.npmjs.com/
[semantic versioning]: https://semver.org/spec/v2.0.0.html
[triggered manually]: https://docs.github.com/en/actions/managing-workflow-runs/manually-running-a-workflow
