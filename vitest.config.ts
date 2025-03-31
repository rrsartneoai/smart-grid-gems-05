
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
    // Handle environment variables properly for tests
    env: {
      ...process.env,
      // Add any test-specific environment variables here
      VITE_TEST_MODE: 'true',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Define environment variables for development and testing
  define: {
    // Use process.env instead of import.meta.env to avoid client-side issues
    'process.env.VITE_OPENWEATHER_API_KEY': JSON.stringify(process.env.VITE_OPENWEATHER_API_KEY || 'test-api-key'),
    'process.env.VITE_GOOGLE_API_KEY': JSON.stringify(process.env.VITE_GOOGLE_API_KEY || 'test-api-key'),
    'process.env.VITE_AQICN_TOKEN': JSON.stringify(process.env.VITE_AQICN_TOKEN || 'test-api-key'),
  }
});
