/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `execFile` / `execFileSync`.
 * @license MIT
 */

const { common, runners } = require("./_.cjs");

async function fuzz(buf) {
  const arg = buf.toString();
  const shell = common.getFuzzShell();

  try {
    await runners.execFile({ arg, shell });
    runners.execFileSync({ arg, shell });
  } catch (e) {
    throw e;
  }
}

module.exports = {
  fuzz,
};
