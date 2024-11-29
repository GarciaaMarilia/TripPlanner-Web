import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
 plugins: [react()],
 base: "./",
 server: {
  port: 3000, // Define a porta local para o frontend
 },
 build: {
  outDir: "dist", // Diretório de saída para produção
  assetsDir: "assets",
 },
});
