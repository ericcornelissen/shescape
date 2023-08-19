/**
 * @overview Create the `.d.cts` files for the published package.
 * @license MIT
 */

import fs from "node:fs";
import path from "node:path";

import { common } from "./_.js";

const files = ["index.d.ts", "oneshot.d.ts", "testing.d.ts"];

for (const file of files) {
  const copy = file.replace(".d.ts", ".d.cts");

  const filePath = path.resolve(common.projectRoot, file);
  const copyPath = path.resolve(common.projectRoot, copy);

  fs.copyFileSync(filePath, copyPath);
}
