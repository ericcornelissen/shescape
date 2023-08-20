/**
 * @overview Provides values common to all tests.
 * @license MIT
 */

const os = require("node:os");

module.exports.echoScript = "test/_echo.js";
module.exports.isWindows = os.platform() === "win32";

/* Illegal arguments */
module.exports.illegalArguments = [
  { description: "null", value: null },
  { description: "undefined", value: undefined },
  { description: "toString is missing", value: { toString: null } },
  { description: "toString returns null", value: { toString: () => null } },
  { description: "toString returns a number", value: { toString: () => 42 } },
];

/* OS platforms (based on https://nodejs.org/api/os.html#osplatform) */
module.exports.osAix = "aix";
module.exports.osDarwin = "darwin";
module.exports.osFreebsd = "freebsd";
module.exports.osLinux = "linux";
module.exports.osOpenbsd = "openbsd";
module.exports.osSunos = "sunos";
module.exports.osWin32 = "win32";

module.exports.platforms = [
  module.exports.osAix,
  module.exports.osDarwin,
  module.exports.osFreebsd,
  module.exports.osLinux,
  module.exports.osOpenbsd,
  module.exports.osSunos,
  module.exports.osWin32,
];

/* OS types */
module.exports.ostypeCygwin = "cygwin";
module.exports.ostypeMsys = "msys";

module.exports.osTypes = [
  module.exports.ostypeCygwin,
  module.exports.ostypeMsys,
];

/* Unix related constants */
module.exports.binBash = "bash";
module.exports.binCsh = "csh";
module.exports.binDash = "dash";
module.exports.binZsh = "zsh";

module.exports.shellsUnix = [
  module.exports.binBash,
  module.exports.binCsh,
  module.exports.binDash,
  module.exports.binZsh,
];

/* Windows related constants */
module.exports.binCmd = "cmd";
module.exports.binPowerShell = "powershell";

module.exports.shellsWindows = [
  module.exports.binCmd,
  module.exports.binPowerShell,
];
