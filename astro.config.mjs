// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://astro.build/config
export default defineConfig({
  site: 'https://e-commerce-astro-five.vercel.app',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@components': path.resolve('./src/components'),
        '@services': path.resolve('./src/services'),
        '@stores': path.resolve('./src/stores'),
        '@layouts': path.resolve('./src/layouts'),
        '@styles': path.resolve('./src/styles'),
      },
    },
  },
});
