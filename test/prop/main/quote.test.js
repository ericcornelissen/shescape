/**
 * @overview Contains property tests the quoting logic of `./src/main.js`.
 * @license Unlicense
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";
import sinon from "sinon";

import { arbitrary, setups } from "./_.js";

import { quoteShellArg } from "../../../src/main.js";

testProp.before(setups.mainQuoteShellArg);

testProp(
  "a shell is specified",
  [fc.string(), arbitrary.shescapeOptions()],
  (t, shell, options = {}) => {
    t.context.deps.getDefaultShell.resetHistory();

    t.context.args.options = { ...options, shell };

    quoteShellArg(t.context.args, t.context.deps);

    t.true(t.context.deps.getDefaultShell.notCalled);
    t.true(
      t.context.deps.getShellName.calledWithExactly(
        sinon.match({ shell }),
        sinon.match.any
      )
    );
  }
);

testProp(
  "the used interpolation and quoted value",
  [arbitrary.shescapeOptions()],
  (t, options = {}) => {
    t.context.args.options = options;

    quoteShellArg(t.context.args, t.context.deps);
    t.true(
      t.context.deps.escapeFunction.calledWithExactly(
        t.context.args.arg,
        false,
        true
      )
    );
  }
);

testProp(
  "the escaping of the argument",
  [
    fc.oneof(fc.string(), arbitrary.number(), fc.boolean()),
    arbitrary.shescapeOptions(),
  ],
  (t, arg, options = {}) => {
    t.context.args.options = { ...options, arg };

    t.notThrows(() => {
      quoteShellArg(t.context.args, t.context.deps);
    });
  }
);
