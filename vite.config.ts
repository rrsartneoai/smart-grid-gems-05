
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { componentTagger } from "lovable-tagger"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8080,
    allowedHosts: [
      'localhost',
      '101af6f5-fd22-4986-b595-90ea8b606967.lovableproject.com',
      '.lovableproject.com'
    ],
    hmr: {
      clientPort: 443, // Use 443 for HTTPS connections
      overlay: false, // Disable the error overlay to prevent some issues
    }
  },
  define: {
    // Ensure environment variables are properly stringified to prevent syntax errors
    __WS_TOKEN__: JSON.stringify(process.env.VITE_WS_TOKEN || 'development'),
    'import.meta.env.VITE_OPENWEATHER_API_KEY': JSON.stringify(process.env.VITE_OPENWEATHER_API_KEY || '0716b08049f481eef218a1c51660a5e3'),
    'import.meta.env.VITE_GOOGLE_API_KEY': JSON.stringify(process.env.VITE_GOOGLE_API_KEY || 'AIzaSyBicTIEjL3cvBSFUhlRX3vmMQZlqLXc0AQ'),
  },
  // Add extra handling for environment variables
  envPrefix: ['VITE_'],
}))
