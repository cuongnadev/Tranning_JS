import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        target: 'esnext',
    },
    resolve: {
        alias: {
            '~': '/src',
        },
    },

    server: {
        proxy: {
            '/api': {
                target: 'https://akademi-js.onrender.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
