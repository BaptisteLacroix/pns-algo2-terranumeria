import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    base: './',
    server: {
      host: '127.0.0.1', // Force l'utilisation de l'IPv4
      proxy: {
        '/api': 'http://127.0.0.1:5000',
      },
    },
})
