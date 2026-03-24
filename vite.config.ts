import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuração simplificada para máxima compatibilidade
export default defineConfig({
  plugins: [
    react()
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    // Garante que o servidor suba na porta padrão sem erros de rede
    host: true,
    port: 5173,
  },
  // Removemos o bloco esbuild e o build manual para evitar o erro de "Invalid key jsx"
});
