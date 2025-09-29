import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/**/*.{html,js,ts,vue}"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    "Poppins",
                    "MiSans",
                    "Roboto",
                    "Open Sans",
                    "ui-sans-serif",
                    "system-ui",
                    "sans-serif"
                ]
            },
            colors: {
                "background-dark-90": "#111111",
                "background-dark-80": "#181a1b",
                "background-light-10": "#f8faff",
                "background-light-0": "#ffffff"
            },
            listStyleType: {
                alpha: "lower-alpha"
            }
        }
    },
    plugins: []
} satisfies Config;