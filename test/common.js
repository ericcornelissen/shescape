/* Generic constants */
export const nullChar = String.fromCharCode(0);

/* Unix related constants */
export const unixPlatform = "linux";

export const binBash = "/bin/bash";
export const binDash = "/bin/dash";
export const binZsh = "/bin/zsh";
export const unixShells = [undefined, binBash, binDash, binZsh];

export const unixEnv = {};

/* Windows related constants. */
export const winPlatform = "win32";

export const cmdExe = "C:\\Windows\\System32\\cmd.exe";
export const powershellExe = "C:\\Windows\\System32\\powershell.exe";
export const winShells = [undefined, cmdExe, powershellExe];

export const ComSpec = cmdExe;

export const winEnv = { ComSpec };

/* Generic functions */
export const isDefined = (x) => x !== undefined;
