/**
 * @overview Outputs the release notes for the version currently specified in
 * the manifest.
 * @license MIT-0
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import { common } from "../_.js";

const manifestFile = path.resolve(common.projectRoot, "package.json");
const changelogFile = path.resolve(common.projectRoot, "CHANGELOG.md");

const manifestRaw = fs.readFileSync(manifestFile).toString();
const manifest = JSON.parse(manifestRaw);
const version = manifest.version;
const versionHeader = `## [${version}]`;

const changelog = fs.readFileSync(changelogFile).toString();
if (!changelog.includes(versionHeader)) {
  throw new Error(`${version} missing from CHANGELOG`);
}

const startIndex = changelog.indexOf(versionHeader) + versionHeader.length + 13;
const endIndex = startIndex + changelog.substring(startIndex).indexOf("## [");

const releaseNotes = changelog.substring(startIndex, endIndex);
process.stdout.write(releaseNotes);
process.stdout.write("\n");
