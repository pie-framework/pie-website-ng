// tailwind.config.js
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'Fira Code', 'monospace']
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('daisyui')
	],
	daisyui: {
		themes: [
			{
				light: {
					...require("daisyui/src/theming/themes")["light"],
					primary: "#ee4923", // Orange from logo
					"primary-content": "#ffffff",
				},
			},
			{
				dark: {
					...require("daisyui/src/theming/themes")["dark"],
					primary: "#ff5733", // Slightly brighter orange for dark mode
					"primary-content": "#ffffff",
				},
			},
		],
		darkTheme: "dark",
		logs: false,
	}
};
