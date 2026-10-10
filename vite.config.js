import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const isGitHubPages = process.env.GITHUB_PAGES === 'true'

  return {
    base: isGitHubPages ? '/oshn-blr-realtor/' : '/',
    plugins: [
      react(),
      tailwindcss(),
    ],
  }
})