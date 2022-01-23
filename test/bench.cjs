const shellQuote = require("shell-quote");
const shescape = require("../index.cjs");

const args = ["foo", "bar"];

bench("shescape", () => {
  shescape.quoteAll(args);
});

bench("shell-quote", () => {
  shellQuote.quote(args);
});
