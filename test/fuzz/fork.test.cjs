/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `fork`.
 * @license MIT
 */

async function fuzz(buf) {
  const { runners } = await import("./_.js");

  const arg = buf.toString();

  try {
    await runners.fork(arg);
  } catch (e) {
    throw e;
  }
}

module.exports = {
  fuzz,
};
