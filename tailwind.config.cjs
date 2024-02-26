/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Space Grotesk', 'sans-serif']
			},
			colors: {
				'primary': '#F88D75',
				'white': '#FFFDED',
				'black': '#010206',
			}
		}
	},

	plugins: []
};

module.exports = config;
