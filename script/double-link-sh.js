/**
 * @overview Creates a link to a link to the "sh" binary. Used to test the link
 * resolver in this library.
 * @license MIT-0
 */

import fs from "node:fs";
import path from "node:path";
import { exit } from "node:process";

import which from "which";

const root = path.resolve(import.meta.dirname, "..");
const temp = path.resolve(root, ".temp", "double-link");
if (!fs.existsSync(temp)) {
  fs.mkdirSync(temp, { recursive: true });
}

const shell = which.sync("sh", { nothrow: true });
if (shell === null) {
  exit(0);
}

const linkToShell = path.resolve(temp, "link-to-shell");
const linkToLink = path.resolve(temp, "link-to-link");
if (!fs.existsSync(linkToLink)) {
  fs.symlinkSync(shell, linkToShell);
  fs.symlinkSync(`.${path.sep}${path.basename(linkToShell)}`, linkToLink);
}
