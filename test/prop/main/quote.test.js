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

testProp("the return value", [fc.string()], (t, escapedArg) => {
  t.context.deps.quoteFunction.returns(escapedArg);

  const result = quoteShellArg(t.context.args, t.context.deps);
  t.is(result, escapedArg);
});

testProp("getting the escape function", [fc.string()], (t, shellName) => {
  t.context.deps.getEscapeFunction.resetHistory();

  t.context.deps.getShellName.returns(shellName);

  quoteShellArg(t.context.args, t.context.deps);

  t.is(t.context.deps.getEscapeFunction.callCount, 1);
  t.true(t.context.deps.getEscapeFunction.alwaysCalledWithExactly(shellName));
});

testProp("getting the quote function", [fc.string()], (t, shellName) => {
  t.context.deps.getQuoteFunction.resetHistory();

  t.context.deps.getShellName.returns(shellName);

  quoteShellArg(t.context.args, t.context.deps);

  t.is(t.context.deps.getQuoteFunction.callCount, 1);
  t.true(t.context.deps.getQuoteFunction.alwaysCalledWithExactly(shellName));
});

testProp("quoting", [fc.string()], (t, escapedArg) => {
  t.context.deps.escapeFunction.returns(escapedArg);

  quoteShellArg(t.context.args, t.context.deps);

  t.true(t.context.deps.quoteFunction.calledWithExactly(escapedArg));
});

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
