import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './', // относительные пути: сайт работает в любой папке хостинга
  plugins: [react(), tailwindcss()],
})
