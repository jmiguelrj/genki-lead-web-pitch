// @genki-alias: [GENKI-SITE-ASTRO-CONFIG]
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  integrations: [react()],
  vite: {
    ssr: {
      noExternal: ['@genki-pitch/ui'],
    },
  },
});
