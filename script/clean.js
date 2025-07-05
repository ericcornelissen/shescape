/**
 * @overview Reset the repository to a clean state, removing any generated
 * files and folders.
 * @license MIT-0
 */

import fs from "node:fs";
import path from "node:path";

import { common } from "./_.js";

const files = [
  "src/modules/index.cjs",
  "src/modules/stateless.cjs",
  "src/modules/testing.cjs",
  "index.d.cts",
  "index.d.ts",
  "stateless.d.cts",
  "stateless.d.ts",
  "testing.d.cts",
  "testing.d.ts",
];
const folders = [".cache/", ".temp/", "_reports/"];

for (const file of files) {
  deleteFile(file);
}

for (const folder of folders) {
  deleteFolder(folder);
}

// -----------------------------------------------------------------------------

function deleteFile(entry) {
  const filePath = path.resolve(common.projectRoot, entry);
  try {
    fs.rmSync(filePath);
    console.log(`remove ${entry}`);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error(`# failed to delete file: ${entry} (${error.message})`);
    }
  }
}

function deleteFolder(entry) {
  const folderPath = path.resolve(common.projectRoot, entry);
  try {
    fs.rmSync(folderPath, { recursive: true });
    console.log(`remove ${entry}`);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error(`# failed to delete folder: ${entry} (${error.message})`);
    }
  }
}
