/**
 * @overview Reset the repository to a clean state, removing any generated
 * files and folders.
 * @license MIT
 */

import fs from "node:fs";
import path from "node:path";

import { common } from "./_.js";

const filesToDelete = [
  "index.cjs",
  "index.d.cts",
  "testing.cjs",
  "testing.d.cts",
];
const foldersToDelete = [".corpus/", ".nyc_output/", ".temp/", "_reports/"];

for (const file of filesToDelete) {
  const filePath = path.resolve(common.projectRoot, file);
  deleteFile(filePath);
}

for (const folder of foldersToDelete) {
  const folderPath = path.resolve(common.projectRoot, folder);
  deleteFolder(folderPath);
}

for (const file of fs.readdirSync(".")) {
  if (/^crash-[0-9a-z]+/u.test(file)) {
    const filePath = path.resolve(common.projectRoot, file);
    deleteFile(filePath);
  }
}

// -----------------------------------------------------------------------------

function deleteFile(filePath) {
  fs.rmSync(filePath, { force: true });
}

function deleteFolder(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.rmSync(folderPath, { recursive: true });
  }
}
