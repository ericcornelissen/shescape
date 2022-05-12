import Benchmark from "benchmark";

import { binBash, binCmd, binPowerShell, binZsh } from "../_constants.cjs";

import * as unix from "../../src/unix.js";
import * as win from "../../src/win.js";

const sampleArg = "foobar";

const suite = new Benchmark.Suite("escapeShellArg", {
  onCycle: (event) => {
    const fn = event.currentTarget.name;
    const cycleResult = event.target.toString();
    console.log(fn, "-", cycleResult);
  },
});

suite.add(`unix, ${binBash}, ${sampleArg}`, () => {
  const escapeShellArg = unix.getEscapeFunction(binBash);
  escapeShellArg(sampleArg);
});

suite.add(`unix, ${binZsh}, ${sampleArg}`, () => {
  const escapeShellArg = unix.getEscapeFunction(binZsh);
  escapeShellArg(sampleArg);
});

suite.add(`win, ${binCmd}, ${sampleArg}`, () => {
  const escapeShellArg = win.getEscapeFunction(binCmd);
  escapeShellArg(sampleArg);
});

suite.add(`win, ${binPowerShell}, ${sampleArg}`, () => {
  const escapeShellArg = win.getEscapeFunction(binPowerShell);
  escapeShellArg(sampleArg);
});

suite.run();
