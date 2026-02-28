import packageJson from "eslint-plugin-package-json";
import { defineConfig } from "eslint/config";

export default defineConfig([packageJson.configs["recommended-publishable"]]);
