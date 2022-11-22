/**
 * @overview Start fuzzing using a specific fuzz target. Use the first argument
 * to specify the fuzz target, for example: `npm run fuzz exec`.
 * @license Unlicense
 */

import * as cp from "node:child_process";
import * as fs from "node:fs";
import * as process from "node:process";

import { getFuzzShell } from "../test/fuzz/_common.cjs";

const corpusDir = "./.corpus";
const fuzzTargetsDir = "./test/fuzz";
const testCasesDir = "./test/fuzz/corpus";

main(process.argv.slice(2));

function main(argv) {
  const [fuzzTarget, fuzzTime] = getFuzzTarget(argv);
  prepareCorpus();
  logShellToFuzz();
  startFuzzing(fuzzTarget, fuzzTime);
}

function getFuzzTarget(argv) {
  if (argv.length === 0) {
    const availableTargets = fs
      .readdirSync(fuzzTargetsDir)
      .filter((fileName) => fileName.endsWith(".test.cjs"))
      .map((fileName) => fileName.replace(".test.cjs", ""));

    console.log("Provide a fuzz target. Available targets:");
    for (const target of availableTargets) {
      console.log(`- '${target}'`);
    }
    console.log("\n", `Example: 'npm run fuzz -- ${availableTargets[0]}'`);
    console.log("\n\n", "Or include a time in minutes");
    console.log(` Example: 'npm run fuzz -- ${availableTargets[0]} 5'`);

    process.exit(1);
  }

  const target = `${fuzzTargetsDir}/${argv[0]}.test.cjs`;
  if (!fs.existsSync(target)) {
    console.log(`Cannot find fuzz target "${target}"`);
    process.exit(2);
  }

  const time = argv[1] || null;

  return [target, time];
}

function logShellToFuzz() {
  console.log(
    `Fuzzing will use ${getFuzzShell() || "[default shell]"} as shell`
  );
  console.log("\n");
}

function prepareCorpus() {
  if (!fs.existsSync(corpusDir)) {
    fs.mkdirSync(corpusDir);
  }

  for (const entry of fs.readdirSync(testCasesDir)) {
    fs.copyFileSync(`${testCasesDir}/${entry}`, `${corpusDir}/${entry}`);
  }
}

function startFuzzing(target, time) {
  const fuzz = cp.spawn(
    "jazzer",
    [target, corpusDir, "--", time ? `-max_total_time=${time * 60}` : ""],
    {
      stdio: ["inherit", "inherit", "inherit"],
      shell: true,
    }
  );

  fuzz.on("close", (code) => process.exit(code));
}
