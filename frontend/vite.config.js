import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Output to "build" (CRA-style) to match the existing deployment flow:
    // the build folder is uploaded to the server's html directory.
    outDir: 'build',
  },
  server: {
    // Proxy API calls to the Express backend during development.
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
})
