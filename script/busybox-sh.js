/**
 * @overview Create a link file called "sh" to BusyBox so that it can be used as
 * a shell.
 * @license MIT-0
 */

import fs from "node:fs";
import path from "node:path";

import which from "which";

const root = path.resolve(import.meta.dirname, "..");
const temp = path.resolve(root, ".temp", "busybox");
if (!fs.existsSync(temp)) {
  fs.mkdirSync(temp, { recursive: true });
}

const busyboxSh = path.resolve(temp, "sh");
if (!fs.existsSync(busyboxSh)) {
  try {
    const busybox = which.sync("busybox");
    fs.symlinkSync(busybox, busyboxSh);
  } catch {
    // Nothing to do, BusyBox is not installed
  }
}
