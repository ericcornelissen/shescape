let unix;
let win;

set("setup", async () => {
  unix = await import("../src/unix.js");
  win = await import("../src/win.js");
});

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
