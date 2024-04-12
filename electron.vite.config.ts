import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    plugins: [react()],
    resolve: {
      alias: {
        '@utils': resolve(__dirname, './src/renderer/utils'),
        '@assets': resolve(__dirname, './src/renderer/assets'),
        '@components': resolve(__dirname, './src/renderer/components'),
        '@store': resolve(__dirname, './src/renderer/store'),
        '@localTypes': resolve(__dirname, './src/renderer/types')
      }
    }
  }
})
