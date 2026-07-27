import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

// https://vite.dev
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react-three-texture": fileURLToPath(new URL("../src/index.ts", import.meta.url)),
    },
  },
  server: {
    port: 3000, // Matches the old Create React App default port
    open: true, // Automatically opens the app in your browser on startup
  },
});
