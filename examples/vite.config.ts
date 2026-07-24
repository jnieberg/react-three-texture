import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Points directly to the root source file during dev
      "react-three-texture": path.resolve(__dirname, "../src/index.ts"),
    },
  },
  server: {
    port: 3000, // Matches the old Create React App default port
    open: true, // Automatically opens the app in your browser on startup
  },
});
