function escapeShellArg(arg) {
  return arg.replace(/'/g, `'\\''`);
}

module.exports.escapeShellArg = escapeShellArg;
