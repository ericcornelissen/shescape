export default {
  input: "index.js",
  output: {
    file: "index.cjs",
    format: "cjs",
  },
  external: ["os", "path", "path/win32"],
};
