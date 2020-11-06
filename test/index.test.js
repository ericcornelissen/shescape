const assert = require("assert");

const shescape = require("../index.js");

it("should return the input if nothing has to be escaped", function () {
  const input = "Hello world!";
  const output = shescape(input);
  assert.strictEqual(output, input);
});

describe("escape single quotes", function () {
  it("one single quote", function () {
    const input = "' & ls -al";
    const output = shescape(input);
    assert.strictEqual(output, "'\\'' & ls -al");
  });

  it("two single quotes", function () {
    const input = "' & echo 'Hello world!'";
    const output = shescape(input);
    assert.strictEqual(output, "'\\'' & echo '\\''Hello world!'\\''");
  });
});
