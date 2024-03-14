/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['IngramMono-Regular', 'sans-serif'],
				serif: ['Noto Serif', 'serif']
			},
			colors: {
				'primary': '#ED575C',
				'secondary': '#EEB481',
				'tertiary': '#6D597A',
				'quaternary': '#355070',
				'white': '#FEFCFA',
				'black': '#1A314C',
			}
		}
	},

	plugins: []
};

module.exports = config;
