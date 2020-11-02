const assert = require("assert");

const shescape = require("../index.js");

it("should return input if nothing has to be escaped", function() {
  const input = "Hello world!";
  const output = shescape(input);
  assert.strictEqual(output, input);
});
