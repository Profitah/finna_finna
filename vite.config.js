import react from "@vitejs/plugin-react";
import css from 'rollup-plugin-css-only';

export default {
    plugins: [
        react(),
        css(),
    ],
    server: {
        fs: {
            allow: ["src", "public"],
        },
    },
    build: {
        rollupOptions: {
            external: ["@react-google-maps/api", "@material-ui/core"],
        },
    },
    scripts: {
        "clean-release": "clean"
    },
    define: {
        'process.env': {},
        global: {},
    }
};