
import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { verifyEnvironment } from './verify-env';

// Automatically run cleanup after each test
afterEach(() => {
  cleanup();
});

// Verify environment setup
verifyEnvironment();
