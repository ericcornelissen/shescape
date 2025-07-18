/**
 * @overview Sets the current version in the manifest as the latest release in
 * the CHANGELOG.
 * @license MIT-0
 */

import fs from "node:fs";
import path from "node:path";

import { common } from "../_.js";

const STR_UNRELEASED = "## [Unreleased]";
const STR_NO_CHANGES = "- _No changes yet_";

const manifestFile = path.resolve(common.projectRoot, "package.json");
const changelogFile = path.resolve(common.projectRoot, "CHANGELOG.md");

const manifestRaw = fs.readFileSync(manifestFile).toString();
const manifest = JSON.parse(manifestRaw);
const version = manifest.version;

const changelog = fs.readFileSync(changelogFile).toString();
if (changelog.includes(`## [${version}]`)) {
  throw new Error(`${version} already in CHANGELOG`);
}

const unreleasedTitleIndex = changelog.indexOf(STR_UNRELEASED);
if (unreleasedTitleIndex === -1) {
  throw new Error("The CHANGELOG is invalid");
}

if (changelog.includes(STR_NO_CHANGES)) {
  throw new Error("No changes to release in the CHANGELOG");
}

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const monthStr = month < 10 ? `0${month}` : month;
const day = date.getDate();
const dayStr = day < 10 ? `0${day}` : day;

const updatedChangelog = `${changelog.slice(0, unreleasedTitleIndex + STR_UNRELEASED.length)}

${STR_NO_CHANGES}

## [${version}] - ${year}-${monthStr}-${dayStr}
${changelog.slice(unreleasedTitleIndex + STR_UNRELEASED.length + 1)}`;

fs.writeFileSync(changelogFile, updatedChangelog);
