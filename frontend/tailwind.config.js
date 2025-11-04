/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "#7cf1b4",
					foreground: "#0a0f0d",
				},
				background: "#0b0f12",
				surface: "#12171b",
			},
			boxShadow: {
				soft: "0 4px 24px rgba(0,0,0,0.35)",
			},
			borderRadius: {
				md: "12px",
				lg: "16px",
			},
		},
	},
	plugins: [],
};

