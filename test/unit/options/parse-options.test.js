/**
 * @overview Contains unit tests for the functionality to parse options.
 * @license MIT
 */

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";
import * as sinon from "sinon";

import { resolveExecutable } from "../../../src/internal/executables.js";
import { noShell, parseOptions } from "../../../src/internal/options.js";

import { arbitrary } from "./_.js";

const arbitraryInput = () =>
  fc
    .tuple(arbitrary.shescapeOptions(), arbitrary.env())
    .map(([options, env]) => {
      options ||= {};
      return { env, options };
    });

test.beforeEach((t) => {
  const getDefaultShell = sinon.stub();
  const getShellName = sinon.stub();
  const isShellSupported = sinon.stub();

  isShellSupported.returns(true);

  t.context.deps = { getDefaultShell, getShellName, isShellSupported };
});

testProp("flag protection not specified", [arbitraryInput()], (t, args) => {
  delete args.options.flagProtection;

  const result = parseOptions(args, t.context.deps);
  t.is(result.flagProtection, true);
});

testProp("flag protection set to true", [arbitraryInput()], (t, args) => {
  args.options.flagProtection = true;

  const result = parseOptions(args, t.context.deps);
  t.is(result.flagProtection, true);
});

testProp("flag protection set to false", [arbitraryInput()], (t, args) => {
  args.options.flagProtection = false;

  const result = parseOptions(args, t.context.deps);
  t.is(result.flagProtection, false);
});

testProp(
  "shell is false",
  [arbitraryInput(), fc.constantFrom(false)],
  (t, args, providedShell) => {
    args.options.shell = providedShell;

    const result = parseOptions(args, t.context.deps);
    t.is(t.context.deps.getDefaultShell.callCount, 0);
    t.is(t.context.deps.getShellName.callCount, 0);
    t.is(result.shellName, noShell);
  },
);

testProp(
  "shell is omitted",
  [arbitraryInput(), fc.string(), fc.string()],
  (t, args, defaultShell, shellName) => {
    t.context.deps.getDefaultShell.resetHistory();
    t.context.deps.getDefaultShell.returns(defaultShell);
    t.context.deps.getShellName.resetHistory();
    t.context.deps.getShellName.returns(shellName);

    const env = args.env;
    delete args.options.shell;

    const result = parseOptions(args, t.context.deps);
    t.is(t.context.deps.getDefaultShell.callCount, 1);
    t.true(t.context.deps.getDefaultShell.calledWithExactly({ env }));
    t.is(t.context.deps.getShellName.callCount, 1);
    t.true(
      t.context.deps.getShellName.calledWithExactly(
        { env, shell: defaultShell },
        { resolveExecutable },
      ),
    );
    t.is(result.shellName, shellName);
  },
);

testProp(
  "shell is nil",
  [
    arbitraryInput(),
    fc.constantFrom(null, undefined),
    fc.string(),
    fc.string(),
  ],
  (t, args, providedShell, defaultShell, shellName) => {
    t.context.deps.getDefaultShell.resetHistory();
    t.context.deps.getDefaultShell.returns(defaultShell);
    t.context.deps.getShellName.resetHistory();
    t.context.deps.getShellName.returns(shellName);

    const env = args.env;
    args.options.shell = providedShell;

    const result = parseOptions(args, t.context.deps);
    t.is(t.context.deps.getDefaultShell.callCount, 1);
    t.true(t.context.deps.getDefaultShell.calledWithExactly({ env }));
    t.is(t.context.deps.getShellName.callCount, 1);
    t.true(
      t.context.deps.getShellName.calledWithExactly(
        { env, shell: defaultShell },
        { resolveExecutable },
      ),
    );
    t.is(result.shellName, shellName);
  },
);

testProp(
  "shell is truthy",
  [arbitraryInput(), fc.constantFrom(true), fc.string(), fc.string()],
  (t, args, providedShell, defaultShell, shellName) => {
    t.context.deps.getDefaultShell.resetHistory();
    t.context.deps.getDefaultShell.returns(defaultShell);
    t.context.deps.getShellName.resetHistory();
    t.context.deps.getShellName.returns(shellName);

    const env = args.env;
    args.options.shell = providedShell;

    const result = parseOptions(args, t.context.deps);
    t.is(t.context.deps.getDefaultShell.callCount, 1);
    t.true(t.context.deps.getDefaultShell.calledWithExactly({ env }));
    t.is(t.context.deps.getShellName.callCount, 1);
    t.true(
      t.context.deps.getShellName.calledWithExactly(
        { env, shell: defaultShell },
        { resolveExecutable },
      ),
    );
    t.is(result.shellName, shellName);
  },
);

testProp(
  "shell is specified",
  [arbitraryInput(), fc.string(), fc.string()],
  (t, args, providedShell, shellName) => {
    t.context.deps.getShellName.resetHistory();
    t.context.deps.getShellName.returns(shellName);

    const env = args.env;
    args.options.shell = providedShell;

    const result = parseOptions(args, t.context.deps);
    t.is(t.context.deps.getDefaultShell.callCount, 0);
    t.is(t.context.deps.getShellName.callCount, 1);
    t.true(
      t.context.deps.getShellName.calledWithExactly(
        { env, shell: providedShell },
        { resolveExecutable },
      ),
    );
    t.is(result.shellName, shellName);
  },
);

testProp("shell is supported", [arbitraryInput()], (t, args) => {
  t.context.deps.isShellSupported.resetHistory();
  t.context.deps.isShellSupported.returns(true);

  t.notThrows(() => parseOptions(args, t.context.deps));
  t.is(t.context.deps.isShellSupported.callCount, 1);
});

testProp(
  "shell is unsupported",
  [
    arbitraryInput(),
    fc.oneof(fc.string(), fc.constantFrom(true, null, undefined)),
    fc.string(),
  ],
  (t, args, providedShell, shellName) => {
    t.context.deps.isShellSupported.resetHistory();
    t.context.deps.isShellSupported.returns(false);
    t.context.deps.getShellName.returns(shellName);

    args.options.shell = providedShell;

    t.throws(() => parseOptions(args, t.context.deps), {
      instanceOf: Error,
      message: `Shescape does not support the shell ${shellName}`,
    });
    t.is(t.context.deps.isShellSupported.callCount, 1);
  },
);
