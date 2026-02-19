import { defineConfig } from "tsdown";

export default defineConfig({
  entry: "./src/spread.ts",
  attw: true,
  exports: true,
  publint: true,
  format: {
    esm: {
      target: ["es2025"],
    },
    cjs: {
      target: ["node24"],
    },
  },
});
