import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { terser } from 'rollup-plugin-terser';
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),dts()],
  server: {
    port: 3000,
  },
  preview: {
    port: 4000,
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
      output:{
        globals:{
          react:"react",
          'react-dom':'ReactDom'
        }
      }
    },
    sourcemap:true,
    emptyOutDir:true
  },
});
