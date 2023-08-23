/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `exec` / `execSync`.
 * @license MIT
 */

async function fuzz(buf) {
  const { common, runners } = await import("./_.js");

  const arg = buf.toString();
  const shell = common.getFuzzShell();

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
