/**
 * @overview A benchmark suite for comparing performance.
 * @license MIT
 */

import Benchmark from "benchmark";

import { binBash, binCsh, binDash, binZsh } from "../test/_constants.cjs";

import * as shescape from "../index.js";
import { Shescape } from "../experimental.js";

const targetOptions = {
  interpolation: false,
  quoted: false,
  shell: binBash,
};
const sampleArg = "foobar";

const suite = new Benchmark.Suite();

// Current API
suite.add(`current`, () => {
  shescape.escape(sampleArg, targetOptions);
});

// Experimental API
const shescapeNew = new Shescape(targetOptions);
suite.add(`experimental`, () => {
  shescapeNew.escape(sampleArg);
});

// Configure & Run
suite.on("cycle", function (event) {
  console.log(event.target.toString());
});
suite.on("complete", function () {
  console.log(`Fastest is '${this.filter("fastest").map("name")}'`);
});

suite.run();
