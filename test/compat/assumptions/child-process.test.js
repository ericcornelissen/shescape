/**
 * @overview Contains tests for assumptions this library makes about the Node.js
 * builtin module `node:child_process`.
 * @license MIT
 */

import * as cp from "node:child_process";

/**
 * Test if the 'shell' value from the option's prototype is used or not.
 *
 * @throws {Error} If the test fails.
 */
export function testShellInheritance() {
  const command = "echo 'Hello world!'";
  const options = {
    shell: "this is definitely not a real shell",
  };

  let didErrorOwn = false;
  try {
    cp.execSync(command, options);
  } catch {
    didErrorOwn = true;
  }

  let didErrorProto = false;
  try {
    Object.prototype.shell = options.shell; // eslint-disable-line no-extend-native
    cp.execSync(command, {});
  } catch {
    didErrorProto = true;
  } finally {
    delete Object.prototype.shell;
  }

  if (didErrorOwn === didErrorProto) {
    throw new Error(
      `own shell error ${didErrorOwn}, proto shell error ${didErrorProto}`,
    );
  }
}
