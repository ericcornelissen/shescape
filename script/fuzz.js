/**
 * @overview Start fuzzing using a specific fuzz target.
 * @license MIT-0
 */

import "dotenv/config";

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import { common, fuzz } from "./_.js";

const fuzzTargetsDir = path.resolve(common.projectRoot, "test/fuzz/");

if (common.argv.length === 0) {
  usage();
  process.exit(1);
}

const fuzzShell = fuzz.getFuzzShell();
const fuzzTarget = common.argv[0];
const fuzzIterations = fuzz.getIterations();

if (!fs.existsSync(path.resolve(fuzzTargetsDir, `${fuzzTarget}.test.js`))) {
  console.log(`Cannot find fuzz target for "${fuzzTarget}"`);
  process.exit(2);
}

if (Number.isNaN(fuzzIterations)) {
  console.log("The FUZZ_ITERATIONS should be a numeric value");
  console.log(`Got '${process.env.FUZZ_ITERATIONS}' instead`);
  process.exit(2);
}

logDetails(fuzzShell, fuzzTarget, fuzzIterations);
start(fuzzTarget);

// -----------------------------------------------------------------------------

function logDetails(shell, target, iterations) {
  console.log(
    "Will fuzz",
    Number.isFinite(iterations) ? `for ${iterations} iterations(s)` : "forever",
    "using",
    shell === false
      ? "no shell"
      : shell === true
        ? "the default system shell"
        : `${shell}`,
    "targeting",
    target,
    "\n",
  );
}

function start(target) {
  const fuzz = common.npm([
    "exec",
    "ava",
    "--",
    "--serial",
    "--fail-fast",
    "--timeout=9999h",
    `test/fuzz/${target}.test.js`,
  ]);

  fuzz.on("close", (code) => process.exit(code));
}

function usage() {
  const availableTargets = fs
    .readdirSync(fuzzTargetsDir)
    .filter((fileName) => fileName.endsWith(".test.js"))
    .map((fileName) => fileName.replace(".test.js", ""));
  const exampleTarget = availableTargets[0];

  console.log("Provide a fuzz target. Available targets:");
  for (const target of availableTargets) {
    console.log(`- '${target}'`);
  }
  console.log();
  console.log(`Example: 'npm run fuzz -- ${exampleTarget}'`);
}
