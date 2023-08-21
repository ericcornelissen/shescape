/**
 * @overview Start fuzzing using a specific fuzz target. Use the first argument
 * to specify the fuzz target, for example: `npm run fuzz exec`.
 * @license MIT
 */

import "dotenv/config";

import cp from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import process from "node:process";

import { getFuzzShell } from "../test/fuzz/_common.cjs";

const corpusDir = "./.corpus";
const fuzzTargetsDir = "./test/fuzz";
const nycOutputDir = "./.nyc_output";
const testCasesDir = "./test/fuzz/corpus";

main(process.argv.slice(2));

function main(argv) {
  const fuzzShell = getFuzzShell();
  const fuzzTarget = getFuzzTarget(argv);
  const fuzzTime = getFuzzTime(argv);
  prepareCorpus();
  logFuzzDetails(fuzzShell, fuzzTarget, fuzzTime);
  startFuzzing(fuzzShell, fuzzTarget, fuzzTime);
}

function fuzzTargetToFuzzFile(target) {
  return `${fuzzTargetsDir}/${target}.test.cjs`;
}

function getFuzzTarget(argv) {
  if (argv.length === 0) {
    const availableTargets = fs
      .readdirSync(fuzzTargetsDir)
      .filter((fileName) => fileName.endsWith(".test.cjs"))
      .map((fileName) => fileName.replace(".test.cjs", ""));
    const exampleTarget = availableTargets[0];

    console.log("Provide a fuzz target. Available targets:");
    for (const target of availableTargets) {
      console.log(`- '${target}'`);
    }
    console.log();
    console.log(`Example: 'npm run fuzz -- ${exampleTarget}'`);
    console.log();
    console.log("Use '--fuzzTime' to set the fuzz duration (in seconds)");
    console.log(`Example: 'npm run fuzz -- ${exampleTarget} --fuzzTime=10'`);

    process.exit(1);
  }

  const target = argv[0];
  const targetFile = fuzzTargetToFuzzFile(target);
  if (!fs.existsSync(targetFile)) {
    console.log(`Cannot find fuzz target "${targetFile}"`);
    process.exit(2);
  }

  return target;
}

function getFuzzTime(argv) {
  const fuzzTimeArg = argv.find((arg) => arg.startsWith("--fuzzTime"));
  const fuzzTimeEnv = process.env.FUZZ_TIME;
  if (fuzzTimeArg === undefined && fuzzTimeEnv === undefined) {
    return 0;
  }

  let timeInSeconds;
  if (fuzzTimeArg) {
    [, timeInSeconds] = fuzzTimeArg.split("=");
  } else {
    timeInSeconds = fuzzTimeEnv;
  }

  if (isNaN(parseInt(timeInSeconds))) {
    console.log("The --fuzzTime should be a numeric value (number of seconds)");
    console.log(`Got '${timeInSeconds}' instead`);

    process.exit(1);
  }

  return timeInSeconds;
}

function logFuzzDetails(shell, target, time) {
  console.log(
    "Will fuzz",
    time ? `for ${time} second(s)` : "forever",
    "using",
    shell === false ? "[no shell]" : shell === true ? "[default shell]" : shell,
    "as shell targeting",
    target,
    "\n",
  );
}

function prepareCorpus() {
  if (!fs.existsSync(corpusDir)) {
    fs.mkdirSync(corpusDir);
  }

  for (const entry of fs.readdirSync(testCasesDir)) {
    fs.copyFileSync(`${testCasesDir}/${entry}`, `${corpusDir}/${entry}`);
  }
}

function startFuzzing(shell, target, time) {
  const npm = os.platform() === "win32" ? "npm.cmd" : "npm";
  const fuzzFile = fuzzTargetToFuzzFile(target);

  const fuzz = cp.spawn(
    npm,
    ["exec", "jsfuzz", "--", fuzzFile, corpusDir, `--fuzzTime=${time}`],
    { stdio: "inherit" },
  );

  fuzz.on("close", (code) => {
    console.log("Arranging (raw) coverage files");
    const shellName = (
      shell === false
        ? "no-shell"
        : shell === true || shell === undefined
        ? "default-shell"
        : shell
    ).replace(/[/\\]/gu, "");
    const defaultCoverageFile = `${nycOutputDir}/cov.json`;
    const runCoverageFile = `${nycOutputDir}/cov-${target}-${shellName}.json`;
    fs.copyFileSync(defaultCoverageFile, runCoverageFile);
    fs.rmSync(defaultCoverageFile);

    console.log("Generating coverage report");
    cp.spawnSync(npm, ["run", "fuzz:coverage"]);

    process.exit(code);
  });

  process.on("SIGINT", () => {
    fuzz.kill("SIGINT");
  });
}
