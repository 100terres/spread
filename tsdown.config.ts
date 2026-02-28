import { defineConfig, type UserConfig } from "tsdown";

const config: UserConfig = defineConfig({
  entry: "./src/spread.ts",
  exports: true,
  minify: true,
  publint: true,
  tsconfig: "tsconfig.build.json",
  attw: {
    profile: "esm-only",
    level: "error",
  },
  dts: {
    enabled: true,
    tsgo: true,
  },
  format: {
    esm: {
      target: ["es2025"],
    },
  },
});

export default config;
