/**
 * @overview Contains tests for assumptions this library makes about the Node.js
 * builtin module `node:child_process`.
 * @license MIT
 */

import * as cp from "node:child_process";
import * as process from "node:process";

const nodeMajorVersion = process.versions.node.split(".")[0];

/**
 * Test if the 'shell' value from the options prototype is used.
 *
 * @throws {Error} If the test fails.
 */
export function testShellInheritance() {
  const command = "echo 'Hello world!'";
  const options = {
    shell: "this is definitely not a real shell",
  };

  let errOwn = false;
  try {
    cp.execSync(command, options);
  } catch {
    errOwn = true;
  }

  let errProto = false;
  try {
    Object.prototype.shell = options.shell; // eslint-disable-line no-extend-native
    cp.execSync(command, {});
  } catch {
    errProto = true;
  } finally {
    delete Object.prototype.shell;
  }

  if (
    (nodeMajorVersion >= 22 && errOwn === errProto) ||
    (nodeMajorVersion < 22 && errOwn !== errProto)
  ) {
    throw new Error(`own shell error ${errOwn}, proto shell error ${errProto}`);
  }
}
