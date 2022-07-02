/**
 * @overview Contains property tests the escaping logic of `./src/main.js`.
 * @license Unlicense
 */

import { testProp } from "ava-fast-check";
import * as fc from "fast-check";
import sinon from "sinon";

import { arbitrary } from "./_.js";

import { escapeShellArg } from "../../../src/main.js";

testProp.before((t) => {
  t.context.args = {
    arg: "a",
    options: {
      shell: "b",
    },
    process: {
      env: {},
    },
  };
});

testProp.before((t) => {
  const getDefaultShell = sinon.stub();
  const getEscapeFunction = sinon.stub();
  const getShellName = sinon.stub();

  const escapeFunction = sinon.stub();

  getEscapeFunction.returns(escapeFunction);

  t.context.deps = {
    getDefaultShell,
    getEscapeFunction,
    getShellName,

    escapeFunction,
  };
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
  "the used interpolation and quoted value",
  [arbitrary.shescapeOptions()],
  (t, options = {}) => {
    t.context.args.options = options;

    escapeShellArg(t.context.args, t.context.deps);
    t.true(
      t.context.deps.escapeFunction.calledWithExactly(
        t.context.args.arg,
        options.interpolation || false,
        sinon.match.falsy
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
      escapeShellArg(t.context.args, t.context.deps);
    });
  }
);
