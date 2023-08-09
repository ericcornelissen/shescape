/**
 * @overview Contains integration tests for the `Shescape` constructor.
 * @license MIT
 */

import test from "ava";

import { Shescape } from "shescape";

test("shell is unsupported", (t) => {
  const shell = "not-actually-a-shell-that-exists";

  t.throws(() => new Shescape({ shell }), {
    instanceOf: Error,
    message: `Shescape does not support the shell ${shell}`,
  });
});
