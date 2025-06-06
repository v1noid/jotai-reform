import { defineConfig } from "tsup";
import fs, { chmod } from "fs-extra";
import { exec } from "child_process";
process.on("beforeExit", async () => {
  await fs.remove("./test/dist");
  await fs.copy("./dist", "./test/dist");

  process.exit(0);
});

export default defineConfig({
  format: ["cjs", "esm"],
  entry: ["./src/index.ts"],
  dts: true,
  clean: true,
  external: ["react", "jotai"],
  outDir: "./dist",
  treeshake: true,
  skipNodeModulesBundle: true,
  minify: true,
  minifySyntax: true,
  minifyWhitespace: true,

  // watch: true,
});
