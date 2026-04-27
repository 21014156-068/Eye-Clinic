import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("framer-motion")) {
            return "motion-core";
          }

          if (id.includes("react-router")) {
            return "router-core";
          }

          if (id.includes("node_modules/three")) {
            return "three-core";
          }

          if (id.includes("@react-three/fiber")) {
            return "fiber-core";
          }

          return undefined;
        },
      },
    },
  },
});
