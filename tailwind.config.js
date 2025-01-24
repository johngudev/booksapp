const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/components/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            white: colors.white,
            gray: colors.gray,
            stone: colors.stone,
            green: {
                DEFAULT: '#6A8D73',
                dark: '#54705B',
            },
            midnight: '#223843',
            sand: '#FAEDCD',
            yellow: { DEFAULT: '#FEFAE0', 500: '#FFD874' },
            slate: colors.slate,
            coffee: { light: '#D4A373', dark: '#7D6840' },
            red: { DEFAULT: '#EF2D56', dark: '#AB0D2F' },
        },
    },

    plugins: [require('@tailwindcss/forms')],
    darkMode: false,
};
