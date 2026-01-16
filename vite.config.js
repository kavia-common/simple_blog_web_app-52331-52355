import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// PUBLIC_INTERFACE
export default defineConfig({
  /** Vite config for a simple React SPA. */
  plugins: [react()],
  server: {
    // Let the container preview system access the dev server.
    host: true,
    port: Number(process.env.REACT_APP_PORT || 5173),
    strictPort: false,
  },
  preview: {
    host: true,
    port: Number(process.env.REACT_APP_PORT || 5173),
    strictPort: false,
  },
});
