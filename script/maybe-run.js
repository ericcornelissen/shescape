/**
 * @overview Run a tool if it's present on the PATH, otherwise output a warning.
 * If used in a CI context, the tool will be run without any checks.
 * @license MIT-0
 */

import process from "node:process";

import isCI from "is-ci";
import which from "which";

import { common } from "./_.js";

if (common.argv.length === 0) {
  console.error("Provide a command to try and execute.");
  process.exit(1);
}

const cmd = common.argv[0];
const args = common.argv.slice(1);

if (!isCI) {
  try {
    which.sync(cmd);
  } catch (_) {
    console.warn(
      `Command '${cmd}' not found, it will not be run.`,
      "Install it to make this warning go away.",
    );
    process.exit(0);
  }
}

const { status } = common.spawnSync(cmd, args);
process.exit(status);
