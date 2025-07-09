import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js'  // Solo questi due - custom.js è importato da app.js
            ],
            refresh: true,
        }),
    ],
    build: {
        outDir: 'public/build',
        emptyOutDir: false,
        manifest: true,
        rollupOptions: {
            output: {
                manualChunks: undefined,
            }
        }
    }
});
