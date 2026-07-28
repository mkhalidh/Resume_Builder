import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import pkg from './package.json'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Single source of truth for the version shown in the app (homepage badge
  // + What's New modal) is package.json — this just exposes it at build
  // time instead of hand-duplicating the string in the frontend.
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  server: {
    // Vite's dev server doesn't run the /api serverless function itself —
    // forward those requests to `vercel dev` (run separately, e.g. `vercel
    // dev --listen 3004`) which does. Production is unaffected: this only
    // applies to `vite dev`, not the built output.
    proxy: {
      "/api": "http://localhost:3004",
    },
  },
})
