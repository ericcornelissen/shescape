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
const folders = [".corpus/", ".nyc_output/", ".temp/", "_reports/"];

for (const file of files) {
  const filePath = path.resolve(common.projectRoot, file);
  deleteFile(filePath);
}

for (const folder of folders) {
  const folderPath = path.resolve(common.projectRoot, folder);
  deleteFolder(folderPath);
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
