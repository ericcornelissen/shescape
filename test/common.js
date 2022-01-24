/* Generic constants */
export const nullChar = String.fromCharCode(0);

/* Unix related constants */
export const unixPlatform = "linux";

export const binSh = "/bin/sh";
export const binBash = "/bin/bash";
export const unixShells = [undefined, binSh, binBash];

export const unixEnv = {};

/* Windows related constants. */
export const winPlatform = "win32";

export const cmdExe = "cmd.exe";
export const powershellExe = "powershell.exe";
export const winShells = [undefined, cmdExe, powershellExe];

export const ComSpec = "C:\\Windows\\System32\\cmd.exe";

export const winEnv = { ComSpec };

/* Generic functions */
export const isDefined = (x) => x !== undefined;
