/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `exec` / `execSync`.
 * @license MIT
 */

const { common, runners } = require("./_.cjs");

async function fuzz(buf) {
  const arg = buf.toString();
  const shell = common.getFuzzShell();

  try {
    if (shell !== false) {
      await runners.execQuote({ arg, shell });
      runners.execSyncQuote({ arg, shell });
    }

    await runners.execEscape({ arg, shell });
    runners.execSyncEscape({ arg, shell });
  } catch (e) {
    throw e;
  }
}

module.exports = {
  fuzz,
};
