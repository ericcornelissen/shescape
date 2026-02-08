/**
 * @overview Provides values common to all tests.
 * @license MIT
 */

import os from "node:os";

export const echoScript = "test/_echo.js";

export const isMacOS = os.platform() === "darwin";
export const isWindows = os.platform() === "win32";

/* Illegal arguments */
export const illegalArguments = [
  { description: "null", value: null },
  { description: "undefined", value: undefined },
  { description: "toString is missing", value: { toString: null } },
  { description: "toString returns null", value: { toString: () => null } },
  { description: "toString returns a number", value: { toString: () => 42 } },
];
export const illegalArgumentLists = [
  { description: "not an array (null)", value: null },
  { description: "not an array (undefined)", value: undefined },
  { description: "not an array (number)", value: 42 },
  { description: "not an array (string)", value: "foobar" },
  { description: "not an array (object)", value: {} },
  { description: "object with map value", value: { map: "foobar" } },
  { description: "object with map function", value: { map: () => 42 } },
  { description: "typed array (uint8)", value: new Uint8Array() },
  { description: "typed array (uint16)", value: new Uint16Array() },
  { description: "typed array (uint32)", value: new Uint32Array() },
  { description: "typed array (int8)", value: new Int8Array() },
  { description: "typed array (int16)", value: new Int16Array() },
  { description: "typed array (int32)", value: new Int32Array() },
];

/* OS platforms (based on https://nodejs.org/api/os.html#osplatform) */
export const osAix = "aix";
export const osDarwin = "darwin";
export const osFreebsd = "freebsd";
export const osLinux = "linux";
export const osOpenbsd = "openbsd";
export const osSunos = "sunos";
export const osWin32 = "win32";

export const platforms = [
  osAix,
  osDarwin,
  osFreebsd,
  osLinux,
  osOpenbsd,
  osSunos,
  osWin32,
];

/* OS types */
export const ostypeCygwin = "cygwin";
export const ostypeMsys = "msys";

export const osTypes = [ostypeCygwin, ostypeMsys];

/* Unix related constants */
export const binBash = "bash";
export const binBusyBox = "busybox";
export const binCsh = "csh";
export const binDash = "dash";
export const binZsh = "zsh";

export const shellsUnix = [binBash, binBusyBox, binCsh, binDash, binZsh];

/* Windows related constants */
export const binCmd = "cmd.exe";
export const binCmdNoExt = "cmd";
export const binPowerShell = "powershell.exe";
export const binPowerShellNoExt = "powershell";

export const shellsWindows = [
  binCmd,
  binCmdNoExt,
  binPowerShell,
  binPowerShellNoExt,
];
