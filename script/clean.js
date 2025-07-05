/**
 * @overview Reset the repository to a clean state, removing any generated
 * files and folders.
 * @license MIT-0
 */

import fs from "node:fs";
import path from "node:path";

import { common } from "./_.js";

const toBeRemoved = [
  ".cache/",
  ".temp/",
  "_reports/",
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
