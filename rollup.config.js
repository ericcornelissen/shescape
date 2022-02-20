export default {
  input: "index.js",
  output: {
    file: "index.cjs",
    format: "cjs",
  },
  external: ["fs", "os", "path", "process", "path/win32", "which"],
};
