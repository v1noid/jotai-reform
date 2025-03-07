import { defineConfig } from "tsup";

export default defineConfig({
  format: ["cjs", "esm"],
  entry: ["./index.ts"],
  dts: true,
  clean: true,
  external: ["react", "jotai"],
  outDir: "./dist",
  skipNodeModulesBundle: true,
  treeshake: true,
  minify: true,
  minifySyntax: true,
  minifyWhitespace: true,
});
