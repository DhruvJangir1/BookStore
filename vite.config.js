import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// --HOW THIS FILE ACTUALLY WORKS--
// Vite.config.ts is a configuration file that tells Vite how to run your project.
// It defines which plugins to use (like React for JSX support and Tailwind for CSS),and
// lets you customize the dev server — things like which port to run on, which files to
// watch for hot reload, and which to ignore. Without it Vite runs with defaults, which
// is fine until you need something specific like stopping it from watching your books.json and triggering full page reloads.

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      ignored: ['**/backend/data/**'] // this is the line that stops the full-page reloading from whatever that happens in the backend/data folder
    }
  }
})