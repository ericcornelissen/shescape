import Benchmark from "benchmark";

import { binBash, binZsh, cmdExe, powershellExe } from "./common.js";

import * as unix from "../src/unix.js";
import * as win from "../src/win.js";

const sampleArg = "foobar";

const suite = new Benchmark.Suite("escapeShellArg", {
  onCycle: (event) => {
    const fn = event.currentTarget.name;
    const cycleResult = event.target.toString();
    console.log(fn, "-", cycleResult);
  },
});

suite.add(`unix, ${binBash}, ${sampleArg}`, () => {
  unix.escapeShellArg(sampleArg, binBash);
});

suite.add(`unix, ${binZsh}, ${sampleArg}`, () => {
  unix.escapeShellArg(sampleArg, binZsh);
});

suite.add(`win, ${cmdExe}, ${sampleArg}`, () => {
  win.escapeShellArg(sampleArg, cmdExe);
});

suite.add(`win, ${powershellExe}, ${sampleArg}`, () => {
  win.escapeShellArg(sampleArg, powershellExe);
});

suite.run();
