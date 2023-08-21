/**
 * @overview Contains end-to-end tests of using Shescape with the child_process
 * package's `fork` functions.
 * @license MIT
 */

import { common, macros } from "./_.js";

for (const arg of common.getTestArgs()) {
  const test = common.getTestFn(null);
  test(macros.fork, { arg });
}
