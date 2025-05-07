import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

import react from "@astrojs/react";
import { genBuildinfo } from './src/astroHooks/genBuildInfo';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [genBuildinfo(), mdx(), sitemap(), tailwind(), react()],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false
      },
    }
  },
  vite: {
    server: {
      proxy: {
        '/visuals': {
          target: process.env.BACKEND,
          changeOrigin: true,
          secure: false,
        },
        '/pkgs': {
          target: process.env.BACKEND,
          changeOrigin: true,
          secure: false,
        },
        '/api': {
          target: process.env.BACKEND,
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api/, ''),
        }
      }
    }
  },
  
});