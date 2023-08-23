/**
 * @overview Contains end-to-end tests of using Shescape with the child_process
 * package's `spawn` (and `spawnSync`) functions.
 * @license MIT
 */

import { common, macros } from "./_.js";

for (const shell of common.getTestShells()) {
  const test = common.getTestFn(shell);
  for (const arg of common.getTestArgs()) {
    test(macros.spawn, { arg, shell });
    test(macros.spawnSync, { arg, shell });
  }
}
