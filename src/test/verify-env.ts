
/**
 * This script verifies that environment variables are properly loaded
 * and helps diagnose any issues with Vite's environment handling.
 */

export function verifyEnvironment() {
  // Log environment information for debugging
  console.log('Node environment:', process.env.NODE_ENV);
  
  // Verify critical environment variables exist
  const criticalEnvVars = [
    'VITE_OPENWEATHER_API_KEY', 
    'VITE_GOOGLE_API_KEY',
    'VITE_AQICN_TOKEN'
  ];
  
  criticalEnvVars.forEach(key => {
    try {
      // Use safer property access to avoid syntax errors with strange keys
      const value = process.env[key];
      if (!value) {
        console.warn(`Warning: Environment variable ${key} is not defined`);
      } else {
        console.log(`✅ Found environment variable: ${key}`);
      }
    } catch (error) {
      console.error(`Error accessing environment variable ${key}:`, error);
    }
  });
  
  return true;
}
