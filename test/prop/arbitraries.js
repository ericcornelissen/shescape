/**
 * @overview Provides custom fast-check arbitraries for property tests.
 * @license Unlicense
 * @author Eric Cornelissen <ericornelissen@gmail.com>
 */

import * as fc from "fast-check";

import {
  osAix,
  osDarwin,
  osFreebsd,
  osLinux,
  osOpenbsd,
  osSunos,
  osWin32,
} from "../common.cjs";

/**
 * The env arbitrary generates objects modelled after `process.env`.
 *
 * For a description of `process.env`, see:
 * https://nodejs.org/api/process.html#processenv
 */
export const env = () =>
  fc.object({
    key: fc.oneof(fc.constant("ComSpec"), fc.string()),
    values: [fc.string()],
    maxDepth: 0,
  });

/**
 * The platform arbitrary generates known platforms. See:
 * https://nodejs.org/api/os.html#osplatform
 */
export const platform = () =>
  fc.constantFrom(
    osAix,
    osDarwin,
    osFreebsd,
    osLinux,
    osOpenbsd,
    osSunos,
    osWin32
  );

/**
 * The process arbitrary generates objects modelled after `process`. The
 * generated object may not represent `process` fully.
 *
 * For a description of `process`, see:
 * https://nodejs.org/api/process.html
 */
export const process = () =>
  fc
    .record({
      abort: fc.func(fc.constant(undefined)),
      allowedNodeEnvironmentFlags: fc.array(fc.string()).map((v) => new Set(v)),
      arch: fc.constantFrom(
        "arm",
        "arm64",
        "ia32",
        "mips",
        "mispel",
        "ppc",
        "ppc64",
        "s390",
        "s390x",
        "x64"
      ),
      argv: fc.array(fc.string()),
      chdir: fc.func(fc.constant(undefined)),
      config: fc.object(),
      connected: fc.boolean(),
      cpuUsage: fc.func(fc.record({ user: fc.nat(), system: fc.nat() })),
      cwd: fc.func(fc.string()),
      debugPort: fc.nat(),
      disconnect: fc.func(fc.constant(undefined)),
      dlopen: fc.func(fc.constant(undefined)),
      emitWarning: fc.func(fc.constant(undefined)),
      env: env(),
      execArgv: fc.array(fc.string()),
      execPath: fc.string(),
      exit: fc.func(fc.nat()),
      exitCode: fc.nat(),
      getActiveResourcesInfo: fc.array(fc.string()),
      getegid: fc.oneof(fc.constant(undefined), fc.func(fc.nat())),
      geteuid: fc.oneof(fc.constant(undefined), fc.func(fc.nat())),
      getgid: fc.oneof(fc.constant(undefined), fc.func(fc.nat())),
      getgroups: fc.oneof(fc.constant(undefined), fc.func(fc.nat())),
      getuid: fc.oneof(fc.constant(undefined), fc.func(fc.nat())),
      hasUncaughtExceptionCaptureCallback: fc.func(fc.boolean()),
      initgroups: fc.oneof(
        fc.constant(undefined),
        fc.func(fc.constant(undefined))
      ),
      kill: fc.func(fc.constant(undefined)),
      memoryUsage: fc.func(
        fc.record({
          rss: fc.nat(),
          heapTotal: fc.nat(),
          heapUsed: fc.nat(),
          external: fc.nat(),
          arrayBuffers: fc.nat(),
        })
      ),
      nextTick: fc.func(fc.constant(undefined)),
      noDeprecation: fc.boolean(),
      pid: fc.nat(),
      platform: fc.func(platform()),
      ppid: fc.nat(),
      release: fc.record({
        name: fc.constant("node"),
        sourceUrl: fc.webUrl(),
        headersUrl: fc.webUrl(),
        libUrl: fc.webUrl(),
        lts: fc.constantFrom(undefined, "Dubnium", "Erbium"),
      }),
      report: fc.record({
        compact: fc.boolean(),
        directory: fc.string(),
        filename: fc.string(),
        getReport: fc.func(fc.object()),
        reportOnFatalError: fc.boolean(),
        reportOnSignal: fc.boolean(),
        reportOnUncaughtException: fc.boolean(),
        signal: fc.string(),
        writeReport: fc.func(fc.string()),
      }),
      resourceUsage: fc.func(
        fc.record({
          userCPUTime: fc.nat(),
          systemCPUTime: fc.nat(),
          maxRSS: fc.nat(),
          sharedMemorySize: fc.nat(),
          unsharedDataSize: fc.nat(),
          unsharedStackSize: fc.nat(),
          minorPageFault: fc.nat(),
          majorPageFault: fc.nat(),
          swappedOut: fc.nat(),
          fsRead: fc.nat(),
          fsWrite: fc.nat(),
          ipcSent: fc.nat(),
          ipcReceived: fc.nat(),
          signalsCount: fc.nat(),
          voluntaryContextSwitches: fc.nat(),
          involuntaryContextSwitches: fc.nat(),
        })
      ),
      send: fc.func(fc.boolean()),
      setegid: fc.oneof(fc.constant(undefined), fc.func(fc.nat())),
      seteuid: fc.oneof(fc.constant(undefined), fc.func(fc.nat())),
      setgid: fc.oneof(fc.constant(undefined), fc.func(fc.nat())),
      setgroups: fc.oneof(fc.constant(undefined), fc.func(fc.nat())),
      setuid: fc.oneof(fc.constant(undefined), fc.func(fc.nat())),
      setSourceMapsEnabled: fc.oneof(
        fc.constant(undefined),
        fc.func(fc.constant(undefined))
      ),
      setUncaughtExceptionCaptureCallback: fc.func(fc.constant(undefined)),
      throwDeprecation: fc.boolean(),
      title: fc.string(),
      traceDeprecation: fc.boolean(),
      version: fc.string(),
      versions: fc.record({
        node: fc.string(),
        v8: fc.string(),
        uv: fc.string(),
        zlib: fc.string(),
        brotli: fc.string(),
        ares: fc.string(),
        modules: fc.string(),
        nghttp2: fc.string(),
        napi: fc.string(),
        llhttp: fc.string(),
        openssl: fc.string(),
        cldr: fc.string(),
        icu: fc.string(),
        tz: fc.string(),
        unicode: fc.string(),
      }),
    })
    .map((process) => {
      process.argv0 = process.argv[0];
      return process;
    });
