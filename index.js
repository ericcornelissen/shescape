const os = require("os");

const main = require("./src/main.js");

module.exports.escape = function (arg) {
  const platform = os.platform();
  return main.escapeShellArgByPlatform(arg, platform);
};

module.exports.quote = function (arg) {
  const platform = os.platform();
  return main.quoteByPlatform(arg, platform);
};
