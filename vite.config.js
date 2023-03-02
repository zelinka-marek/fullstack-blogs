import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  test: {
    environment: "jsdom",
    setupFiles: "./setup-tests.js",
    css: false,
  },
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});
