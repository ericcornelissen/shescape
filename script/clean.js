/**
 * @overview Reset the repository to a clean state, removing any generated
 * files and folders.
 * @license MIT-0
 */

import fs from "node:fs";
import path from "node:path";

import { common } from "./_.js";

const toBeRemoved = [".cache/", ".temp/", "_reports/"];

for (const entry of toBeRemoved) {
  remove(entry);
}

// -----------------------------------------------------------------------------

function remove(entry) {
  const entryPath = path.resolve(common.projectRoot, entry);
  try {
    fs.rmSync(entryPath, { recursive: true });
    console.log(`remove ${entry}`);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error(`# failed to delete: ${entry} (${error.message})`);
    }
  }
}
