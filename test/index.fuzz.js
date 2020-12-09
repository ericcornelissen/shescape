const shescape = require("../index.js");

function fuzz(buf) {
  const arg = buf.toString();
  shescape.escape(arg);
  shescape.quote(arg);

  if (arg.length > 2) {
    const middle = Math.floor(arg.length / 2);
    const args = [arg.slice(0, middle), arg.slice(middle, arg.length)];
    shescape.quoteAll(args);
  }
}

module.exports = { fuzz };
