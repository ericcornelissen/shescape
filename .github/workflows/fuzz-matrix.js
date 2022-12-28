/**
 * @overview Computes a matrix of fuzz jobs for `reusable-fuzz.yml`.
 * @license Unlicense
 */

const unixOS = "ubuntu-22.04";
const winOS = "windows-2022";

// As a falsy value, the empty string will result in the system shell being used
const systemShell = "";

const unixShells = [systemShell, "/bin/bash", "/bin/dash", "/bin/zsh"];
const winShells = [systemShell, "cmd.exe", "powershell.exe"];

const targets = ["exec", "exec-file", "fork", "spawn"];

export function determineMatrix({ unix, windows }) {
  return [
    ...(unix
      ? unixShells.flatMap((shell) =>
          targets.map((target) => ({ os: unixOS, shell, target }))
        )
      : []),
    ...(windows
      ? winShells.flatMap((shell) =>
          targets.map((target) => ({ os: winOS, shell, target }))
        )
      : []),
  ];
}
