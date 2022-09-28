/**
 * @overview Runs the project's compatibility tests on all supported Node.js
 * version using Docker.
 * @license Unlicense
 */

import cp from "node:child_process";
import path from "node:path";
import url from "node:url";

const emptyLine = " ".repeat(process.stdout.columns);
const print = (s) => process.stdout.write(s);
const println = (s) => print(`${s}\n`);
const reprint = (s) => print(`\r${emptyLine}\r${s}`);
const reprintln = (s) => reprint(`${s}\n`);

function runCompatibilityTestsOn(nodeVersion) {
  const projectRoot = path.resolve(
    path.dirname(url.fileURLToPath(new URL(import.meta.url))),
    ".."
  );
  const workdir = "/shescape";

  const { status, stderr } = cp.spawnSync(
    "docker",
    [
      "run",
      "--rm",
      "--workdir",
      workdir,
      "--mount",
      `type=bind,source=${projectRoot},target=${workdir}`,
      "--name",
      `shescape-compatibility-test-on-node${nodeVersion}`,
      `node:${nodeVersion}`,
      "npm",
      "run",
      "test:compat-suite",
    ],
    { encoding: "utf-8" }
  );

  return {
    success: status === 0,
    stderr,
  };
}

const nodeVersions = ["10.13.0", "12", "14", "16", "18"];

const fails = [];
for (const nodeVersion of nodeVersions) {
  print(`Running compatibility tests on Node.js v${nodeVersion}...`);
  const { success, stderr } = runCompatibilityTestsOn(nodeVersion);
  if (success) {
    reprintln(`Compatibility tests succeeded on Node.js v${nodeVersion}`);
  } else {
    reprintln(`Compatibility tests failed on Node.js v${nodeVersion}`);
    fails.push({ error: stderr, nodeVersion });
  }
}

if (fails.length > 0) {
  println("");
  for (const { error, nodeVersion } of fails) {
    println("");
    println(`Compatibility tests failed on Node.js v${nodeVersion} with:`);
    println("");
    println(error);
  }
}
