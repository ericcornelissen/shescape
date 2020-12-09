const { win32 } = require("./constants.js");
const unix = require("./unix.js");
const win = require("./win.js");

function escapeShellArgByPlatform(arg, platform) {
  const argAsString = arg.toString();
  switch (platform) {
    case win32:
      return win.escapeShellArg(argAsString);
    default:
      return unix.escapeShellArg(argAsString);
  }
}

function quoteByPlatform(arg, platform) {
  const safeArg = escapeShellArgByPlatform(arg, platform);
  switch (platform) {
    case win32:
      return `"${safeArg}"`;
    default:
      return `'${safeArg}'`;
  }
}

module.exports.escapeShellArgByPlatform = escapeShellArgByPlatform;
module.exports.quoteByPlatform = quoteByPlatform;
