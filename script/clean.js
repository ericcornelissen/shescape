/**
 * @overview Reset the repository to a clean state, removing any generated
 * files.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import * as fs from "fs";
import * as path from "path";

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
  if (/^crash-[a-z0-9]+/.test(file)) {
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
