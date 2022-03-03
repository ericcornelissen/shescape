/**
 * @overview Contains unit tests for `./src/constants.js`.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import assert from "assert";

import { typeError } from "../src/constants.js";

describe("constants.js", function () {
  describe("::typeError", function () {
    it("contains a reference to Shescape", function () {
      const result = typeError.includes("Shescape");
      assert.ok(result);
    });

    it("contains a reference to `toString`", function () {
      const result = typeError.includes("toString");
      assert.ok(result);
    });
  });
});
