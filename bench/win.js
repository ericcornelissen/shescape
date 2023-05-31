/**
 * @overview A benchmark suite for comparing performance for Windows logic.
 * @license MIT
 */

import Benchmark from "benchmark";

import { binCmd, binPowerShell } from "../test/_constants.cjs";

import * as win from "../src/win.js";
import * as winNew from "../src/win/index.js";

const targetArg = "foobar";
const targetShell = binCmd;
const targetOptions = { interpolation: false };

const suite = new Benchmark.Suite();

// Current implementation
const escapeArg = win.getEscapeFunction(targetShell);
suite.add("current", () => {
  escapeArg(targetArg, targetOptions);
});

// New implementation
const escapeArgNew = winNew.getEscapeFunction(targetShell, targetOptions);
suite.add("new", () => {
  escapeArgNew(targetArg);
});

// Configure & Run
suite.on("cycle", function (event) {
  console.log(event.target.toString());
});

suite.on("complete", function () {
  console.log(`Fastest is '${this.filter("fastest").map("name")}'`);
});

suite.run();
