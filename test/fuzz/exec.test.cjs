/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `exec` / `execSync`.
 * @license MIT
 */

const { common, runners } = require("./_.cjs");

async function fuzz(buf) {
  const arg = buf.toString();
  const shell = common.getFuzzShell();

  if (shell === false) {
    throw new Error("Fuzzing exec requires a shell");
  }

  try {
    await runners.execQuote({ arg, shell });
    await runners.execEscape({ arg, shell });
    runners.execSyncQuote({ arg, shell });
    runners.execSyncEscape({ arg, shell });
  } catch (e) {
    throw e;
  }
}

module.exports = {
  fuzz,
};
