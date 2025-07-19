import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true,
      },
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'My React App',
        short_name: 'ReactApp',
        description: 'My awesome React PWA!',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        screenshots: [
          {
            src: 'screenshot.jpg',
            sizes: '1200x800',
            type: 'image/jpg',
            form_factor: 'wide',
          },
          {
            src: 'screenshot.jpg',
            sizes: '1200x800',
            type: 'image/jpg',
            form_factor: 'narrow',
          },
        ],
      },
    }),
  ],
});
