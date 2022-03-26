import * as fc from "fast-check";

export function configureFastCheck() {
  fc.configureGlobal({
    numRuns: 10 ** 5,
    interruptAfterTimeLimit: 2000,
    markInterruptAsFailure: false,
  });
}

export * from "../common.cjs";
