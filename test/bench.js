import { GatherReporter, benchmark } from "@c4312/matcha";

import * as unix from "../src/unix.js";
import * as win from "../src/win.js";

const reporter = new GatherReporter();

await benchmark({
  reporter,
  prepare({ set, suite, bench }) {
    suite("escapeShellArg", () => {
      const arg = "foobar";

      bench("unix", () => {
        unix.escapeShellArg(arg, "/bin/sh");
      });

      bench("win, cmd.exe", () => {
        win.escapeShellArg(arg, "cmd.exe");
      });

      bench("win, powershell.exe", () => {
        win.escapeShellArg(arg, "powershell.exe");
      });
    });
  },
});

for (const result of reporter.results) {
  console.log("Benchmark", result.name, "runs at", result.hz, "ops/sec");
}
