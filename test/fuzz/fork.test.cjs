/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `fork`.
 * @license MIT
 */

const { runners } = require("./_.cjs");

async function fuzz(buf) {
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
