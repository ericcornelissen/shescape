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
  "src/modules/index.d.cts",
  "src/modules/stateless.cjs",
  "src/modules/stateless.d.cts",
  "src/modules/testing.cjs",
  "src/modules/testing.d.cts",
];
const folders = [".corpus/", ".nyc_output/", ".temp/", "_reports/"];

for (const file of files) {
  const filePath = path.resolve(common.projectRoot, file);
  deleteFile(filePath);
}

for (const folder of folders) {
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
