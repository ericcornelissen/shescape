const { win32 } = require("./constants.js");
const unix = require("./unix.js");
const win = require("./win.js");

function escapeShellArgByPlatform(arg, platform) {
  switch (platform) {
    case win32:
      return win.escapeShellArg(arg);
    default:
      return unix.escapeShellArg(arg);
  }
}

module.exports.escapeShellArgByPlatform = escapeShellArgByPlatform;
