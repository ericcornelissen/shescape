/**
 * @overview Contains end-to-end tests of using Shescape with the child_process
 * package's `exec` (and `execSync`) functions.
 * @license MIT
 */

import { common, macros } from "./_.js";

for (const shell of common.getTestShells()) {
  if (shell === false) {
    continue;
  }

  const test = common.getTestFn(shell);
  for (const arg of common.getTestArgs()) {
    test(macros.exec, { arg, shell });
    test(macros.execSync, { arg, shell });
  }
}
