import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				"accent-1": "var(--accent-1)",
				"accent-2": "var(--accent-2)",
				"accent-3": "var(--accent-3)",
				"accent-4": "var(--accent-4)",
				"accent-5": "var(--accent-5)",
				"accent-6": "var(--accent-6)",
				"accent-7": "var(--accent-7)",
				"accent-8": "var(--accent-8)",
				"accent-9": "var(--accent-9)",
				"accent-10": "var(--accent-10)",
				"accent-11": "var(--accent-11)",
				"accent-12": "var(--accent-12)",
				"accent-a1": "var(--accent-a1)",
				"accent-a2": "var(--accent-a2)",
				"accent-a3": "var(--accent-a3)",
				"accent-a4": "var(--accent-a4)",
				"accent-a5": "var(--accent-a5)",
				"accent-a6": "var(--accent-a6)",
				"accent-a7": "var(--accent-a7)",
				"accent-a8": "var(--accent-a8)",
				"accent-a9": "var(--accent-a9)",
				"accent-a10": "var(--accent-a10)",
				"accent-a11": "var(--accent-a11)",
				"accent-a12": "var(--accent-a12)",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
export default config;

