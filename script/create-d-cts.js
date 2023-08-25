/**
 * @overview Create the `.d.cts` files for the published package.
 * @license MIT
 */

import fs from "node:fs";

import { common } from "./_.js";

const files = ["index.d.ts", "testing.d.ts"];
for (const file of files) {
  const copy = file.replace(".d.ts", ".d.cts");

  const filePath = common.projectPath(file);
  const copyPath = common.projectPath(copy);

  fs.copyFileSync(filePath, copyPath);
}
