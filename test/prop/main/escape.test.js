/**
 * @overview Contains property tests the escaping logic of `./src/main.js`.
 * @license Unlicense
 */

import { testProp } from "@fast-check/ava";
import * as fc from "fast-check";
import sinon from "sinon";

import { arbitrary, setups } from "./_.js";

import { escapeShellArg } from "../../../src/main.js";

testProp.before(setups.mainEscapeShellArg);

testProp("the return value", [fc.string()], (t, escapedArg) => {
  t.context.deps.escapeFunction.returns(escapedArg);

  const result = escapeShellArg(t.context.args, t.context.deps);
  t.is(result, escapedArg);
});

testProp("getting the escape function", [fc.string()], (t, shellName) => {
  t.context.deps.getEscapeFunction.resetHistory();

  t.context.deps.getShellName.returns(shellName);

  escapeShellArg(t.context.args, t.context.deps);

  t.is(t.context.deps.getEscapeFunction.callCount, 1);
  t.true(t.context.deps.getEscapeFunction.alwaysCalledWithExactly(shellName));
});

testProp(
  "a shell is specified",
  [fc.string(), arbitrary.shescapeOptions()],
  (t, shell, options = {}) => {
    t.context.deps.getDefaultShell.resetHistory();

    t.context.args.options = { ...options, shell };

    escapeShellArg(t.context.args, t.context.deps);

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
  "the used interpolation value",
  [arbitrary.shescapeOptions()],
  (t, options = {}) => {
    t.context.args.options = options;

    escapeShellArg(t.context.args, t.context.deps);
    t.true(
      t.context.deps.escapeFunction.calledWithExactly(
        sinon.match.any,
        options.interpolation ? true : false,
        sinon.match.any
      )
    );
  }
);

testProp(
  "the used quoted value",
  [arbitrary.shescapeOptions()],
  (t, options = {}) => {
    t.context.args.options = options;

    escapeShellArg(t.context.args, t.context.deps);
    t.true(
      t.context.deps.escapeFunction.calledWithExactly(
        sinon.match.any,
        sinon.match.any,
        false
      )
    );
  }
);

testProp(
  "the escaping of the argument",
  [arbitrary.shescapeArg(), arbitrary.shescapeOptions()],
  (t, arg, options = {}) => {
    t.context.args.options = { ...options, arg };

    t.notThrows(() => {
      escapeShellArg(t.context.args, t.context.deps);
    });
  }
);
