/** @type {import('tailwindcss').Config} */
// tailwind.config.cjs
module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,ts,svelte}'
    ],
    theme: {
        extend: {},
        colors: {
            black: '#222',
            light: '#F7F8F9',
            grey: '#A3A5AB',
            accent: '#FF3E00',
            primary: '#3498DB',
            success: '#27AE60',
        }
    },
    plugins: [],
}