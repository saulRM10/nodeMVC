import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 80,
    proxy: {
      "/api": {
        target: "http://server:3000", // Traefik's route for the backend
        changeOrigin: true,
      },
    },
  },

  plugins: [tsconfigPaths(), react()],
});
