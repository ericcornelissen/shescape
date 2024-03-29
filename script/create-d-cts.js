/**
 * @overview Create the `.d.cts` files for the published package.
 * @license MIT-0
 */

import fs from "node:fs";
import path from "node:path";

import { common } from "./_.js";

const files = ["index.d.ts", "stateless.d.ts", "testing.d.ts"];

for (const file of files) {
  const filePath = path.resolve(common.projectRoot, "src", "modules", file);
  const copyPath = path.resolve(common.projectRoot, file);

  fs.copyFileSync(filePath, copyPath);
}

for (const file of files) {
  const copy = file.replace(".d.ts", ".d.cts");

  const filePath = path.resolve(common.projectRoot, file);
  const copyPath = path.resolve(common.projectRoot, copy);

  fs.copyFileSync(filePath, copyPath);
}
