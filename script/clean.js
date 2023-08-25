/**
 * @overview Reset the repository to a clean state, removing any generated
 * files and folders.
 * @license MIT
 */

import fs from "node:fs";

import { common } from "./_.js";

const filesToDelete = [
  "index.cjs",
  "index.d.cts",
  "testing.cjs",
  "testing.d.cts",
];
const foldersToDelete = [".corpus/", ".nyc_output/", ".temp/", "_reports/"];

for (const file of filesToDelete) {
  const filePath = common.projectPath(file);
  deleteFile(filePath);
}

for (const folder of foldersToDelete) {
  const folderPath = common.projectPath(folder);
  deleteFolder(folderPath);
}

for (const file of fs.readdirSync(".")) {
  if (/^crash-[0-9a-z]+/u.test(file)) {
    const filePath = common.projectPath(file);
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
