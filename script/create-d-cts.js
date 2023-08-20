/**
 * @overview Create the `.d.cts` files for the published package.
 * @license MIT
 */

import * as fs from "node:fs";
import * as path from "node:path";

const files = ["index.d.ts", "testing.d.ts"];

for (const file of files) {
  const copy = file.replace(".d.ts", ".d.cts");

  const filePath = path.resolve(file);
  const copyPath = path.resolve(copy);

  fs.copyFileSync(filePath, copyPath);
}
