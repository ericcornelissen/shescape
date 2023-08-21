/**
 * @overview Contains end-to-end tests of using Shescape with the child_process
 * package's `exec` (and `execSync`) functions.
 * @license MIT
 */

import { common, macros } from "./_.js";

for (const shell of common.getTestShells()) {
  for (const arg of common.getTestArgs()) {
    const test = common.getTestFn(shell);
    test(macros.exec, { arg, shell });
    test(macros.execSync, { arg, shell });
  }
}
