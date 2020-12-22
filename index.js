const os = require("os");

const main = require("./src/main.js");

module.exports.escape = function (arg) {
  const platform = os.platform();
  return main.escapeShellArgByPlatform(arg, platform);
};

module.exports.escapeAll = function (args) {
  if (!Array.isArray(args)) args = [args];

  const platform = os.platform();
  const result = [];
  for (const arg of args) {
    const safeArg = main.escapeShellArgByPlatform(arg, platform);
    result.push(safeArg);
  }

  return result;
};

module.exports.quote = function (arg) {
  const platform = os.platform();
  return main.quoteByPlatform(arg, platform);
};

module.exports.quoteAll = function (args) {
  if (!Array.isArray(args)) args = [args];

  const platform = os.platform();
  const result = [];
  for (const arg of args) {
    const safeArg = main.quoteByPlatform(arg, platform);
    result.push(safeArg);
  }

  return result;
};
