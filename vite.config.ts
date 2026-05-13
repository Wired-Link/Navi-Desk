import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Vite config provided for local Tauri builds.
// The Emergent preview uses Create React App (craco). When you compile
// the desktop app locally with Tauri, run `vite dev` / `vite build` instead.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "frontend/src"),
    },
  },
  root: "frontend",
  publicDir: "public",
  build: {
    outDir: "build",
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  clearScreen: false,
  envPrefix: ["VITE_", "REACT_APP_"],
});
