import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Reemplaza "spa_202602" por el nombre EXACTO de tu repositorio en GitHub
  // para que los assets carguen bien en GitHub Pages (repo.github.io/<repo>/).
  base: '/poke2.0/',
  plugins: [tailwindcss(), react()],
})
