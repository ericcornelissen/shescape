/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `spawn` / `spawnSync`.
 * @license MIT
 */

const common = require("./_common.cjs");
const runners = require("../e2e/_runners.cjs");

async function fuzz(buf) {
  const arg = buf.toString();
  const shell = common.getFuzzShell();

  try {
    await runners.spawn({ arg, shell });
    runners.spawnSync({ arg, shell });
  } catch (e) {
    throw e;
  }
}

module.exports = {
  fuzz,
};
