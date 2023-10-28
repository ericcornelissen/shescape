// Check out rollup.js at: https://rollupjs.org/guide/en/

const external = [
  "node:fs",
  "node:os",
  "node:path",
  "node:process",
  "node:util",
  "which",
];

export default [
  {
    input: "index.js",
    output: {
      file: "index.cjs",
      format: "cjs",
    },
    external,
  },
  {
    input: "oneshot.js",
    output: {
      file: "oneshot.cjs",
      format: "cjs",
    },
    external,
  },
  {
    input: "testing.js",
    output: {
      file: "testing.cjs",
      format: "cjs",
    },
    external,
  },
];
