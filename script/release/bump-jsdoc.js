/**
 * @overview Sets the current version in the manifest as the version in the
 * JSDoc of `src/modules/index.js`.
 * @license MIT-0
 */

import fs from "node:fs";
import path from "node:path";

import { common } from "../_.js";

const manifestFile = path.resolve(common.projectRoot, "package.json");
const indexFile = path.resolve(common.projectRoot, "src/modules/index.js");

const manifestRaw = fs.readFileSync(manifestFile).toString();
const manifest = JSON.parse(manifestRaw);
const version = manifest.version;

const index = fs.readFileSync(indexFile).toString();
const updatedIndex = index.replace(
  / \* @version \d+\.\d+\.\d+/u,
  ` * @version ${version}`,
);

fs.writeFileSync(indexFile, updatedIndex);
