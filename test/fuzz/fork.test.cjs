/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `fork`.
 * @license MIT
 */

async function fuzz(buf) {
  const { common, runners } = await import("./_.js");

  const arg = buf.toString();
  const shell = common.getFuzzShell();

  if (shell !== false) {
    throw new Error("Fuzzing fork requires a falsy shell");
  }

  try {
    await runners.fork(arg);
  } catch (e) {
    throw e;
  }
}

module.exports = {
  fuzz,
};
