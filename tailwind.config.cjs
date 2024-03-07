/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Space Grotesk', 'sans-serif'],
				serif: ['Noto Serif', 'serif']
			},
			colors: {
				'primary': '#FFD700',
				'white': '#FFFDED',
				'black': '#010206',
			}
		}
	},

	plugins: []
};

module.exports = config;
