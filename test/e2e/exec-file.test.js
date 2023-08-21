/**
 * @overview Contains end-to-end tests of using Shescape with the child_process
 * package's `execFile` (and `execFileSync`) functions.
 * @license MIT
 */

import { common, macros } from "./_.js";

for (const shell of common.getTestShells()) {
  for (const arg of common.getTestArgs()) {
    const test = common.getTestFn(shell);
    test(macros.execFile, { arg, shell });
    test(macros.execFileSync, { arg, shell });
  }
}
