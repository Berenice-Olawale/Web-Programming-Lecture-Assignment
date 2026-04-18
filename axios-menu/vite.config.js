import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Web-Programming-Lecture-Assignment/',
  plugins: [react()],
})