/**
 * @overview Reset the repository to a clean state, removing any generated
 * files.
 * @license Unlicense
 */

import * as fs from "node:fs";
import * as path from "node:path";

const files = ["index.cjs"];
const folders = ["./.corpus", "./.nyc_output", "./.temp", "./_reports"];

for (const file of files) {
  const filePath = path.resolve(file);
  deleteFile(filePath);
}

for (const folder of folders) {
  const folderPath = path.resolve(folder);
  deleteFolder(folderPath);
}

for (const file of fs.readdirSync(".")) {
  if (/^crash-[0-9a-z]+/u.test(file)) {
    const filePath = path.resolve(file);
    deleteFile(filePath);
  }
}

function deleteFile(filePath) {
  fs.rmSync(filePath, { force: true });
}

function deleteFolder(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.rmSync(folderPath, { recursive: true });
  }
}
