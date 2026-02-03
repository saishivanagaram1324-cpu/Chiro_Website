/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-primary': '#2F3A36', // Deep Slate (Headlines, Nav, Footer)
                'brand-accent': '#9CAF88',  // Sage Green (Primary buttons, Highlights)
                'brand-slate': '#2F3A36',
                'brand-sage': '#9CAF88',
                'brand-offwhite': '#F6F8F5',
                'brand-sand': '#E3E0DA',
                'brand-forest': '#6E7F6A',
                'brand-steel': '#AEBEC0',
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
