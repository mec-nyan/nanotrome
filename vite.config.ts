import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  base: '/nanotrome/',
  build: {
    copyPublicDir: true,
		rollupOptions: {
			output: {
				entryFileNames: `assets/index.js`,
				chunkFileNames: `assets/[name].js`,
				assetFileNames: (info) => {
					if (info.names.includes("styles.css")) {
						return "index.css";
					}
					return 'assets/[name][extname]';
				},
			},
		},
  },
})
