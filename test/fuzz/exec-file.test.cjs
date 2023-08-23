/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `execFile` / `execFileSync`.
 * @license MIT
 */

async function fuzz(buf) {
  const { common, runners } = await import("./_.js");

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
