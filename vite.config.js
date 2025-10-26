import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    fs: {
      allow: [
        // Allow serving files from the project root
        '.',
        // Allow serving files from the Downloads folder
        '/Users/Parag/Downloads'
      ]
    }
  }
})
