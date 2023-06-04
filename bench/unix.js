/**
 * @overview A benchmark suite for comparing performance for Unix logic.
 * @license MIT
 */

import Benchmark from "benchmark";

import { binBash, binCsh, binDash, binZsh } from "../test/_constants.cjs";

import * as unix from "../src/unix/index.js";

const targetArg = "foobar";
const targetShell = binZsh;
const targetOptions = { interpolation: false };

const suite = new Benchmark.Suite();

// Current approach
suite.add("current", () => {
  const escapeArg = unix.getEscapeFunction(targetShell, targetOptions);
  escapeArg(targetArg, targetOptions);
});

// New approach
const escapeArgNew = unix.getEscapeFunction(targetShell, targetOptions);
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
