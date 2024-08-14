import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const base = mode === 'production' ? '/TripPlanner-Web/' : '/';

  return {
    plugins: [react()],
    base,
  };
});
