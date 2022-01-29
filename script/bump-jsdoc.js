/**
 * @overview Sets the current version in the manifest as the version in the
 * JSDoc of `index.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import * as fs from "fs";

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
