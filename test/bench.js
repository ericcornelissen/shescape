import Benchmark from "benchmark";

const suite = new Benchmark.Suite();

import * as unix from "../src/unix.js";
import * as win from "../src/win.js";

const arg = "foobar";

suite
  .add("unix::escapeShellArg(., .)", () => {
    unix.escapeShellArg(arg, "/bin/sh");
  })
  .add('win::escapeShellArg(., "cmd.exe")', () => {
    win.escapeShellArg(arg, "cmd.exe");
  })
  .add('win::escapeShellArg(., "powershell.exe")', () => {
    win.escapeShellArg(arg, "powershell.exe");
  })
  .on("cycle", (event) => {
    console.log(`${event.target}`);
  })
  .run();
