import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh with HMR optimizations
      fastRefresh: true,
      // Enable React 18+ features
      jsxRuntime: 'automatic'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@assets': resolve(__dirname, 'src/assets')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
        timeout: 60000,
        proxyTimeout: 60000,
      }
    }
  },
  build: {
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Aggressive code splitting for optimal caching
        manualChunks: (id) => {
          // Vendor chunks - avoid circular dependencies
          if (id.includes('node_modules')) {
            if (id.includes('react') && !id.includes('react-router')) {
              return 'react-vendor'
            }
            if (id.includes('react-router')) {
              return 'router-vendor'
            }
            if (id.includes('firebase')) {
              return 'firebase-vendor'
            }
            if (id.includes('framer-motion')) {
              return 'animation-vendor'
            }
            if (id.includes('recharts')) {
              return 'charts-vendor'
            }
            if (id.includes('leaflet')) {
              return 'maps-vendor'
            }
            if (id.includes('lucide')) {
              return 'icons-vendor'
            }
            return 'vendor'
          }
          
          // Feature-based chunks
          if (id.includes('components/Reports')) {
            return 'reports'
          }
          if (id.includes('components/Map')) {
            return 'maps'
          }
          if (id.includes('components/Insights')) {
            return 'insights'
          }
          if (id.includes('components/Inspection')) {
            return 'inspection'
          }
          if (id.includes('components/Resources')) {
            return 'resources'
          }
          if (id.includes('components/landing')) {
            return 'landing'
          }
        },
        format: 'es',
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      },
      // Optimize bundle size
      treeshake: true,
      chunkSizeWarningLimit: 250,
      // Enable compression
      reportCompressedSize: true,
      // Advanced performance optimizations
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.error', 'console.warn']
        }
      }
    },
    // Optimize assets
    assetsInlineLimit: 4096,
    // Enable module preloading
    modulePreload: {
      polyfill: true
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react'
    ],
    exclude: ['@types/*']
  },
  // Environment variables
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.VITE_APP_VERSION': JSON.stringify(process.env.npm_package_version || '1.0.0')
  },
  // CSS optimization
  css: {
    devSourcemap: false,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
  // Preview server optimization
  preview: {
    port: 3000,
    strictPort: true
  }
})
