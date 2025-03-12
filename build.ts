Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "./out",
  external: ["jotai"],
  minify: true,
  target: "browser",
  format: "cjs",
  plugins: [],
});
