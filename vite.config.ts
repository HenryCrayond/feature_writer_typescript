import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
  },
});
