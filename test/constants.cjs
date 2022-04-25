/**
 * @overview Provides values common to all tests.
 * @license Unlicense
 */

/* Platforms (https://nodejs.org/api/os.html#osplatform) */
module.exports.osAix = "aix";
module.exports.osDarwin = "darwin";
module.exports.osFreebsd = "freebsd";
module.exports.osLinux = "linux";
module.exports.osOpenbsd = "openbsd";
module.exports.osSunos = "sunos";
module.exports.osWin32 = "win32";

/* OS types */
module.exports.ostypeCygwin = "cygwin";
module.exports.ostypeMsys = "msys";

/* Unix related constants */
module.exports.binBash = "bash";
module.exports.binDash = "dash";
module.exports.binZsh = "zsh";

module.exports.shellsUnix = [
  module.exports.binBash,
  module.exports.binDash,
  module.exports.binZsh,
];

/* Windows related constants */
module.exports.binCmd = "cmd.exe";
module.exports.binPowerShell = "powershell.exe";

module.exports.shellsWindows = [
  module.exports.binCmd,
  module.exports.binPowerShell,
];
