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

  let didErrorForOwnProperty = false;
  try {
    cp.execSync(command, options);
  } catch {
    didErrorForOwnProperty = true;
  }

  let didErrorForPrototypeProperty = false;
  try {
    Object.prototype.shell = options.shell; // eslint-disable-line no-extend-native
    cp.execSync(command, {});
  } catch {
    didErrorForPrototypeProperty = true;
  } finally {
    delete Object.prototype.shell;
  }

  const got = didErrorForPrototypeProperty;
  const want = !didErrorForOwnProperty;
  if (got !== want) {
    throw new Error("own and prototype shell property behavior mismatch");
  }
}
