/**
 * @overview Provides custom fast-check arbitraries for property tests.
 * @license Unlicense
 */

import * as fc from "fast-check";

import * as constants from "../_constants.cjs";

/**
 * The env arbitrary generates objects modelled after `process.env`.
 *
 * For a description of `process.env`, see:
 * https://nodejs.org/api/process.html#processenv.
 *
 * @param {object} [args] Configuration for the arbitrary.
 * @param {string[]} [args.keys] Keys that should appear in the environment.
 * @returns {object} Arbitrary `process.env`s.
 */
export const env = ({ keys } = { keys: [] }) =>
  fc.dictionary(fc.oneof(fc.string(), ...keys.map(fc.constant)), fc.string());

/**
 * The osType arbitrary generates known OS types.
 *
 * @param {string?} choice A platform category ("win" or `undefined`).
 * @returns {string | undefined} Arbitrary OS types.
 */
export const osType = (choice) => {
  switch (choice) {
    case "win":
      return fc.constantFrom(constants.ostypeCygwin, constants.ostypeMsys);
    default:
      return fc.constantFrom(undefined, ...constants.osTypes);
  }
};

/**
 * The platform arbitrary generates known platforms.
 *
 * For a list of platforms, see: https://nodejs.org/api/os.html#osplatform.
 *
 * @param {string?} choice A platform category ("unix", "win", or `undefined`).
 * @returns {string} Arbitrary OS platforms.
 */
export const platform = (choice) => {
  switch (choice) {
    case "unix":
      return fc.constantFrom(
        constants.osAix,
        constants.osDarwin,
        constants.osFreebsd,
        constants.osLinux,
        constants.osOpenbsd,
        constants.osSunos
      );
    case "win":
      return fc.constantFrom(constants.osWin32);
    default:
      return fc.constantFrom(...constants.platforms);
  }
};

/**
 * The process arbitrary generates objects modelled after `process`. The
 * generated object may not represent `process` fully.
 *
 * For a description of `process`, see: https://nodejs.org/api/process.html.
 *
 * @returns {object} Arbitrary `process` objects.
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
      getegid: fc.option(fc.func(fc.nat())),
      geteuid: fc.option(fc.func(fc.nat())),
      getgid: fc.option(fc.func(fc.nat())),
      getgroups: fc.option(fc.func(fc.nat())),
      getuid: fc.option(fc.func(fc.nat())),
      hasUncaughtExceptionCaptureCallback: fc.func(fc.boolean()),
      initgroups: fc.option(fc.func(fc.constant(undefined))),
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
      setegid: fc.option(fc.func(fc.nat())),
      seteuid: fc.option(fc.func(fc.nat())),
      setgid: fc.option(fc.func(fc.nat())),
      setgroups: fc.option(fc.func(fc.nat())),
      setuid: fc.option(fc.func(fc.nat())),
      setSourceMapsEnabled: fc.option(fc.func(fc.constant(undefined))),
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

/**
 * The shescapeArg arbitrary generates strings that could be inputs to the
 * Shescape API for escaping.
 *
 * @returns {string | number | boolean} Arbitrary valid Shescape arguments.
 */
export const shescapeArg = () =>
  fc.oneof(fc.string(), fc.integer(), fc.float(), fc.double(), fc.boolean());

/**
 * The shescapeOptions arbitrary generates valid `options` arguments for the
 * Shescape API.
 *
 * @returns {object | undefined} Arbitrary valid Shescape options.
 */
export const shescapeOptions = () =>
  fc.option(
    fc.object({
      key: fc.oneof(
        fc.string(),
        fc.constantFrom("interpolation", "quoted", "shell", "shellName")
      ),
    }),
    { nil: undefined }
  );

/**
 * The unixPath arbitrary generates absolute Unix file/folder paths.
 *
 * @returns {string} Arbitrary Unix file/folder paths.
 */
export const unixPath = () => fc.string().map((path) => `/${path}`);

/**
 * The unixShells arbitrary generates Unix shells supported by Shescape.
 *
 * @returns {string} Arbitrary Unix shells supported by Shescape.
 */
export const unixShell = () => fc.constantFrom(...constants.shellsUnix);

/**
 * The unsupportedUnixShell arbitrary generates strings that are not Unix shells
 * supported by Shescape.
 *
 * @returns {string} Arbitrary non-Unix shell strings.
 */
export const unsupportedUnixShell = () =>
  fc.string().filter((v) => !constants.shellsUnix.includes(v));

/**
 * The unsupportedWindowsShell arbitrary generates strings that are not Windows
 * shells supported by Shescape.
 *
 * @returns {string} Arbitrary non-Windows shell strings.
 */
export const unsupportedWindowsShell = () =>
  fc.string().filter((v) => !constants.shellsWindows.includes(v));

/**
 * The windowsPath arbitrary generates absolute Windows file/folder paths.
 *
 * @returns {string} Arbitrary Windows file/folder paths.
 */
export const windowsPath = () =>
  fc
    .tuple(
      fc.char().filter((v) => /[A-Z]/u.test(v)),
      fc.string()
    )
    .map(([driveLetter, path]) => `${driveLetter}:\\${path}`);

/**
 * The windowsShell arbitrary generates Windows shells supported by Shescape.
 *
 * @returns {string} Arbitrary Windows shells supported by Shescape.
 */
export const windowsShell = () => fc.constantFrom(...constants.shellsWindows);
