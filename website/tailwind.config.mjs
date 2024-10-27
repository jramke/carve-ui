import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';
import starlightPlugin from '@astrojs/starlight-tailwind';

// Generated color palettes
const accent = { 200: '#b5c8f6', 600: '#385cdf', 900: '#1b2d65', 950: '#152144' };
const gray = { 100: '#f6f6f7', 200: '#edeeef', 300: '#c1c2c3', 400: '#8a8b8e', 500: '#57585a', 700: '#37383a', 800: '#262729', 900: '#181819' };

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				accent: colors.zinc,
				gray: colors.zinc,
			},
			fontFamily: {
				sans: ['Inter Variable', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [starlightPlugin()],
};