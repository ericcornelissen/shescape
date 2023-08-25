/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `spawn` / `spawnSync`.
 * @license MIT
 */

async function fuzz(buf) {
  const { common, runners } = await import("./_.js");

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
