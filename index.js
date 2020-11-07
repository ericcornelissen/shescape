const os = require("os");

const main = require("./src/main.js");

module.exports = function (arg) {
  const platform = os.platform();
  return main.escapeShellArgByPlatform(arg, platform);
};
