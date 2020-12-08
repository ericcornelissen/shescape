const os = require("os");

const main = require("./src/main.js");

module.exports = function (arg) {
  console.warn(
    "calling shescape() directly is deprecated since v0.3.1 and will be removed in v1.0.0"
  );
  const platform = os.platform();
  return main.escapeShellArgByPlatform(arg, platform);
};

module.exports.escape = function (arg) {
  const platform = os.platform();
  return main.escapeShellArgByPlatform(arg, platform);
};

module.exports.quote = function (arg) {
  const platform = os.platform();
  return main.quoteByPlatform(arg, platform);
};

module.exports.quoteAll = function (args) {
  if (!Array.isArray(args)) return args;

  const platform = os.platform();
  const result = [];
  for (const arg of args) {
    const safeArg = main.quoteByPlatform(arg, platform);
    result.push(safeArg);
  }

  return result;
};
