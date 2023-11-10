import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { terser } from 'rollup-plugin-terser';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  preview: {
    port: 4000,
  },
  resolve: {
    alias: [
      {
        find: "@components",
        replacement: path.join(__dirname, "./src/components"),
      },

      {
        find: "@lib",
        replacement: path.join(__dirname, "./src/lib"),
      },
      {
        find: "@utils",
        replacement: path.join(__dirname, "./src/utils"),
      },
      {
        find: "@store",
        replacement: path.join(__dirname, "./src/store"),
      },
      {
        find: "@atoms",
        replacement: path.join(__dirname, "./src/atoms"),
      },
    ],
  },
  build: {
    minify: true,
    lib: {
      entry: "src/components",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      plugins: [terser()],
      external: ["react", "react-dom"],
    },
  },
});
