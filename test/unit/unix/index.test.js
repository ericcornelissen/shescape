/**
 * @overview Contains unit tests for the general Unix-specific functionality.
 * @license MIT
 */

import path from "node:path";

import { testProp } from "@fast-check/ava";
import test from "ava";
import * as fc from "fast-check";
import sinon from "sinon";

import { arbitrary, constants } from "./_.js";

import * as bash from "../../../src/unix/bash.js";
import * as csh from "../../../src/unix/csh.js";
import * as dash from "../../../src/unix/dash.js";
import * as unix from "../../../src/unix/index.js";
import * as zsh from "../../../src/unix/zsh.js";

test("the default shell", (t) => {
  const result = unix.getDefaultShell();
  t.is(result, "/bin/sh");
});

test("escape function for bash", (t) => {
  let options = { interpolation: false };
  t.is(
    unix.getEscapeFunction(constants.binBash, options),
    bash.getEscapeFunction(options)
  );

  options = { interpolation: true };
  t.is(
    unix.getEscapeFunction(constants.binBash, options),
    bash.getEscapeFunction(options)
  );
});

test("escape function for csh", (t) => {
  let options = { interpolation: false };
  t.is(
    unix.getEscapeFunction(constants.binCsh, options),
    csh.getEscapeFunction(options)
  );

  options = { interpolation: true };
  t.is(
    unix.getEscapeFunction(constants.binCsh, options),
    csh.getEscapeFunction(options)
  );
});

test("escape function for dash", (t) => {
  let options = { interpolation: false };
  t.is(
    unix.getEscapeFunction(constants.binDash, options),
    dash.getEscapeFunction(options)
  );

  options = { interpolation: true };
  t.is(
    unix.getEscapeFunction(constants.binDash, options),
    dash.getEscapeFunction(options)
  );
});

test("escape function for zsh", (t) => {
  let options = { interpolation: false };
  t.is(
    unix.getEscapeFunction(constants.binZsh, options),
    zsh.getEscapeFunction(options)
  );

  options = { interpolation: true };
  t.is(
    unix.getEscapeFunction(constants.binZsh, options),
    zsh.getEscapeFunction(options)
  );
});

testProp(
  "escape function for unsupported shell",
  [arbitrary.unsupportedUnixShell(), fc.boolean()],
  (t, shellName, interpolation) => {
    const result = unix.getEscapeFunction(shellName, { interpolation });
    t.is(result, undefined);
  }
);

test("quote function for bash", (t) => {
  t.deepEqual(
    unix.getQuoteFunction(constants.binBash),
    bash.getQuoteFunction()
  );
});

test("quote function for csh", (t) => {
  t.deepEqual(unix.getQuoteFunction(constants.binCsh), csh.getQuoteFunction());
});

test("quote function for dash", (t) => {
  t.deepEqual(
    unix.getQuoteFunction(constants.binDash),
    dash.getQuoteFunction()
  );
});

test("quote function for zsh", (t) => {
  t.deepEqual(unix.getQuoteFunction(constants.binZsh), zsh.getQuoteFunction());
});

testProp(
  "quote function for unsupported shell",
  [arbitrary.unsupportedUnixShell()],
  (t, shellName) => {
    const result = unix.getQuoteFunction(shellName);
    t.is(result, undefined);
  }
);

testProp(
  "get shell name for supported shell",
  [arbitrary.env(), arbitrary.unixPath(), arbitrary.unixShell()],
  (t, env, basePath, shell) => {
    const resolveExecutable = sinon.stub();
    resolveExecutable.returns(path.join(basePath, shell));

    const result = unix.getShellName({ env, shell }, { resolveExecutable });
    t.is(result, shell);
  }
);

testProp(
  "get shell name for unsupported shell",
  [arbitrary.env(), arbitrary.unixPath(), arbitrary.unsupportedUnixShell()],
  (t, env, basePath, shell) => {
    const resolveExecutable = sinon.stub();
    resolveExecutable.returns(path.join(basePath, shell));

    const result = unix.getShellName({ env, shell }, { resolveExecutable });
    t.is(result, constants.binBash);
  }
);

testProp(
  "resolving the shell",
  [arbitrary.env(), fc.string()],
  (t, env, shell) => {
    const resolveExecutable = sinon.stub();
    resolveExecutable.returns("foobar");

    unix.getShellName({ env, shell }, { resolveExecutable });
    t.true(
      resolveExecutable.calledWithExactly(
        { executable: shell },
        {
          exists: sinon.match.func,
          readlink: sinon.match.func,
          which: sinon.match.func,
        }
      )
    );
  }
);

test("strip flag prefix function for bash", (t) => {
  t.deepEqual(
    unix.getFlagProtectionFunction(constants.binBash),
    bash.getFlagProtectionFunction()
  );
});

test("strip flag prefix function for csh", (t) => {
  t.deepEqual(
    unix.getFlagProtectionFunction(constants.binCsh),
    csh.getFlagProtectionFunction()
  );
});

test("strip flag prefix function for dash", (t) => {
  t.deepEqual(
    unix.getFlagProtectionFunction(constants.binDash),
    dash.getFlagProtectionFunction()
  );
});

test("strip flag prefix function for zsh", (t) => {
  t.deepEqual(
    unix.getFlagProtectionFunction(constants.binZsh),
    zsh.getFlagProtectionFunction()
  );
});

testProp(
  "flag protection for unsupported shell",
  [arbitrary.unsupportedUnixShell()],
  (t, shellName) => {
    const result = unix.getFlagProtectionFunction(shellName);
    t.is(result, undefined);
  }
);
