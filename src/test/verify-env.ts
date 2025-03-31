
/**
 * This script verifies that environment variables are properly loaded
 * and helps diagnose any issues with Vite's environment handling.
 */

export function verifyEnvironment() {
  // Log environment information for debugging
  console.log('Node environment:', process.env.NODE_ENV);
  console.log('Vite environment variables loaded:', !!import.meta.env);
  
  // Verify critical environment variables exist
  const criticalEnvVars = [
    'VITE_OPENWEATHER_API_KEY', 
    'VITE_GOOGLE_API_KEY'
  ];
  
  criticalEnvVars.forEach(key => {
    if (!import.meta.env[key]) {
      console.warn(`Warning: Environment variable ${key} is not defined`);
    } else {
      console.log(`✅ Found environment variable: ${key}`);
    }
  });
  
  return true;
}
