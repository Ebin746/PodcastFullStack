import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import macrosPlugin from "vite-plugin-babel-macros";
// https://vitejs.dev/config/
export default defineConfig({
  server:{
proxy:{
  '/api':'https://podcastbackend-y85g.onrender.com/',
},
  },
  plugins: [react(),macrosPlugin()],
})
