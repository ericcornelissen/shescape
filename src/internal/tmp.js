export function chain({ escape, flagProtect, quote }) {
  return quote(flagProtect(escape(arg)));
}

export function id(arg) {
  return arg;
}
