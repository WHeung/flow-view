import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const tailwindCssPlugin = tailwindcss({
  content: [`./src/**/*.{vue,js,ts,jsx,tsx}`],
  theme: {},
});

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.tsx',
      name: 'MyComponent',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'antd'],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
      },
    },
  },
  css: {
    postcss: {
      plugins: [tailwindCssPlugin, autoprefixer()],
    },
  },
});
