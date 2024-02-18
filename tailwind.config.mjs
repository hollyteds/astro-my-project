/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					"Helvetica Neue",
					"Arial",
					"Noto Sans JP",
					"Hiragino Kaku Gothic ProN",
					"Hiragino Sans",
					"Meiryo",
					"sans-serif"
				],
				"righteous" :[
					'Righteous',
					"sans-serif"
				]
			},
			colors: {
				"blue": {
					"light": "#e9f0f9",
					"deep": "#3818d0",
					"DEFAULT": "#16a1f4"
				}
			}
		},
	},
	plugins: [
		plugin(function ({ addUtilities, addComponents, e, prefix, config }) {
			const newUtilities = {
				".horizontal-tb": {
					writingMode: "horizontal-tb",
				},
				".vertical-rl": {
					writingMode: "vertical-rl",
				},
				".vertical-lr": {
					writingMode: "vertical-lr",
				},
        ".text-shadow": {
          textShadow: "2px 2px black"
				},
				".wbr": {
					wordBreak: "keep-all",
					overflowWrap: "break-word"
				},
				".palt": {
					fontFeatureSettings: '"palt"',
				}
      };
			addUtilities(newUtilities);
		}),
	],
}
