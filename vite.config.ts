
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
    __WS_TOKEN__: JSON.stringify(process.env.VITE_WS_TOKEN || 'development'),
  }
}))
