import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    theme: {
        // ----------------------------------------------------------------------------------
        //                                  TYPOGRAPHY
        // ----------------------------------------------------------------------------------
        fontSize: {
            xs: [
                "12px",
                {
                    lineHeight: "18px",
                },
            ],
            sm: [
                "14px",
                {
                    lineHeight: "20px",
                },
            ],
            md: [
                "16px",
                {
                    lineHeight: "24px",
                },
            ],
            lg: [
                "20px",
                {
                    lineHeight: "28px",
                },
            ],
        },
        extend: {
            fontFamily: {
                sans: ['Roboto', ...defaultTheme.fontFamily.sans],
            },
            // ----------------------------------------------------------------------------------
            //                                  COLORS
            // ----------------------------------------------------------------------------------
            colors: {
                gray: {
                    '1': "#F2F4F7",
                    '2': "#EAECF0",
                    '3': "#98A2B3",
                    '4': "#667085",
                    '5': "#475467",
                    '6': "#344054",
                    '7': "#182230",
                    '8': "#0C111D",
                },
                blue: {
                    '1': "#155EEF",
                    '2': "#004EEB",
                },
                red: {
                    '1': "#D92D20",
                    '2': "#B42318",
                },
                green: {
                    '1': "#17B26A",
                },
            },
        },
    },

    plugins: [forms],
    
    darkMode: 'class'
};
