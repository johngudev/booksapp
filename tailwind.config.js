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
            stone: colors.stone,
            green: {
                DEFAULT: '#6A8D73',
                dark: '#54705B',
            },
            midnight: '#223843',
            sand: '#faedcd',
            'light-brown': '#d4a373',
            'pale-yellow': '#fefae0',
            slate: colors.slate,
            // 'bubble-gum': '#ff77e9',
            // bermuda: '#78dcca',
        },
    },

    plugins: [require('@tailwindcss/forms')],
    darkMode: false,
};
