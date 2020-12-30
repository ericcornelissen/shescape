const { typeError, win32 } = require("./constants.js");
const unix = require("./unix.js");
const win = require("./win.js");

function isStringable(value) {
  if (value === undefined || value === null) {
    return false;
  }

  return typeof value.toString === "function";
}

function escapeShellArgByPlatform(arg, platform) {
  let argAsString = arg;
  if (typeof arg !== "string") {
    if (!isStringable(arg)) {
      throw new TypeError(typeError);
    }

    argAsString = arg.toString();
  }

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
