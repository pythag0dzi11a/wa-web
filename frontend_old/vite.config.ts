import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "node:path";
import UnpluginTypia from "@ryoppippi/unplugin-typia/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
    plugins: [
        vue(),
        UnpluginTypia({}),
        Components({
            resolvers: [IconsResolver()]
        }),
        Icons()
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules/vue") || id.includes("node_modules/@vue")) {
                        return "vue";
                    }
                    if (id.includes("src/languages")) {
                        return "lang";
                    }
                }
            }
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    },
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true
            },
            "/notice": {
                target: "http://localhost:3000",
                changeOrigin: true
            }
        }
    }
});
