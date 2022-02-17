import Benchmark from "benchmark";

import { bash, cmdExe, powershellExe, zsh } from "./common.js";

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

suite.add(`unix, ${bash}, ${sampleArg}`, () => {
  const escapeShellArg = unix.getEscapeFunction(bash);
  escapeShellArg(sampleArg);
});

suite.add(`unix, ${zsh}, ${sampleArg}`, () => {
  const escapeShellArg = unix.getEscapeFunction(zsh);
  escapeShellArg(sampleArg);
});

suite.add(`win, ${cmdExe}, ${sampleArg}`, () => {
  const escapeShellArg = win.getEscapeFunction(cmdExe);
  escapeShellArg(sampleArg);
});

suite.add(`win, ${powershellExe}, ${sampleArg}`, () => {
  const escapeShellArg = win.getEscapeFunction(powershellExe);
  escapeShellArg(sampleArg);
});

suite.run();
