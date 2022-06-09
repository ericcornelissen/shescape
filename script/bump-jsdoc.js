/**
 * @overview Sets the current version in the manifest as the version in the
 * JSDoc of `index.js`.
 * @license Unlicense
 */

import * as fs from "node:fs";

const manifestFile = "./package.json";
const indexFile = "./index.js";

const manifestRaw = fs.readFileSync(manifestFile).toString();
const manifest = JSON.parse(manifestRaw);
const version = manifest.version;

const index = fs.readFileSync(indexFile).toString();
const newIndex = index.replace(
  / \* @version \d+\.\d+\.\d+/,
  ` * @version ${version}`
);

fs.writeFileSync(indexFile, newIndex);
