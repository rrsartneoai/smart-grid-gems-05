
import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { verifyEnvironment } from './verify-env';

// Automatically run cleanup after each test
afterEach(() => {
  cleanup();
});

// Setup mock environment variables for tests explicitly
process.env.VITE_OPENWEATHER_API_KEY = process.env.VITE_OPENWEATHER_API_KEY || 'test-api-key';
process.env.VITE_GOOGLE_API_KEY = process.env.VITE_GOOGLE_API_KEY || 'test-api-key';
process.env.VITE_AQICN_TOKEN = process.env.VITE_AQICN_TOKEN || 'test-api-key';
process.env.VITE_ELEVENLABS_API_KEY = process.env.VITE_ELEVENLABS_API_KEY || '';

// Run environment verification in non-production environments only
if (process.env.NODE_ENV !== 'production') {
  verifyEnvironment();
}
