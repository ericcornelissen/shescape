// Check out rollup.js at: https://rollupjs.org/guide/en/

export default [
  {
    input: "index.js",
    output: {
      file: "index.cjs",
      format: "cjs",
    },
    external: ["fs", "os", "path", "path/win32", "process", "util", "which"],
  },
  {
    input: "src/testing.js",
    output: {
      file: "testing.cjs",
      format: "cjs",
    },
    external: ["fs", "os", "path", "path/win32", "process", "util", "which"],
  },
];
