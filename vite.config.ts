import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
  },

  build: {
    minify: true,
    lib: {
      entry: resolve(__dirname, "src/components"),
      // entry: "src/components",
      fileName: "index",
      formats: ["es"],
    },
  },
  plugins: [react(), dts({ include: ["src/components"] })],
});
