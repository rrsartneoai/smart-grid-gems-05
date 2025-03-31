
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        '**/index.{js,ts}',
      ],
    },
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    environmentOptions: {
      jsdom: {
        // Add jsdom options if needed
      }
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Define environment variables for development and testing with proper object structure
  define: {
    'process.env': {
      VITE_OPENWEATHER_API_KEY: JSON.stringify(process.env.VITE_OPENWEATHER_API_KEY || 'test-api-key'),
      VITE_GOOGLE_API_KEY: JSON.stringify(process.env.VITE_GOOGLE_API_KEY || 'test-api-key'),
      VITE_AQICN_TOKEN: JSON.stringify(process.env.VITE_AQICN_TOKEN || 'test-api-key'),
      VITE_ELEVENLABS_API_KEY: JSON.stringify(process.env.VITE_ELEVENLABS_API_KEY || ''),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'test'),
    }
  }
});
