import { defineConfig } from 'vite';
import postcss from './postcss.config.js';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  css: {
    postcss
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: val => {
          return val.replace(/^~/, '');
        }
      }
    ]
  },
  build: { commonjsOptions: { transformMixedEsModules: true, exclude: ['node_modules/lodash-es/**', 'node_modules/@types/lodash-es/**'] } },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080'
      }
    }
  }
});
