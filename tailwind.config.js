/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "custom-dark": "#050517",
                "custom-dark-two": "#333333",
                "custom-grey": "#747572",
                "custom-light": "#EDF2F4",
                "custom-off-white": '#FAF9F6',
                "custom-off-white-two": '#FAF8F5',
            },
        },
    },
    plugins: [],
};
