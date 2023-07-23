/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `exec` / `execSync`.
 * @license MIT
 */

const common = require("./_common.cjs");
const runners = require("../e2e/_runners.cjs");

async function fuzz(buf) {
  const arg = buf.toString();
  const shell = common.getFuzzShell();

  try {
    await runners.exec({ arg, shell });
    await runners.execUsingInterpolation({ arg, shell });
    runners.execSync({ arg, shell });
    runners.execSyncUsingInterpolation({ arg, shell });
  } catch (e) {
    throw e;
  }
}

module.exports = {
  fuzz,
};
