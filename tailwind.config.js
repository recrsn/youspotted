/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        "./index.html",
        "./{pages,renderer}/**/*.{js,ts,jsx,tsx}",
        "./{pages,renderer}/**/*.page.server.{js,ts,jsx,tsx}",
        "./{pages,renderer}/**/*.page.client.{js,ts,jsx,tsx}",
        "./{pages,renderer}/**/*.page.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: colors.indigo,
            },
        },
    },
    plugins: [],
}
