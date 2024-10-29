// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import alpinejs from '@astrojs/alpinejs';

// https://astro.build/config
export default defineConfig({
	site: 'https://carve.joostramke.com',
	redirects: {
		'/components': '/components/accordion',
	},
    integrations: [
		starlight({
			title: 'Carve UI',
			titleDelimiter: '—',
			logo: {
				src: './src/assets/logo.svg',
			},
			favicon: './src/assets/logo.svg',
			social: {
				github: 'https://github.com/jramke/carve-ui',
			},
			customCss: [
				'@fontsource-variable/inter',
				'./src/styles/index.css',
			],
			head: [
				{
					tag: 'script',
					attrs: {
						src: 'https://umami.joostramke.com/script.js',
						'data-website-id': 'ef37ffea-2507-4d72-bcc5-4cc089b49863',
						defer: true,
					}
				}
			],
			sidebar: [
				{
					label: 'Overview',
					items: [
						{ label: 'Introduction', slug: 'introduction' },
						{ label: 'Getting started', slug: 'getting-started' },
						{ label: 'Styling', slug: 'styling' },
					],
				},
				{
					label: 'Components',
					autogenerate: { directory: 'components' },
				},
			],
			components: {
				ThemeProvider: './src/components/theme-provider.astro',
				Header: './src/components/header.astro',
				SocialIcons: './src/components/social-icons.astro',
				Pagination: './src/components/pagination.astro',
			}
		}), 
		tailwind({ applyBaseStyles: false }),
		alpinejs({ entrypoint: '/src/entrypoint' })
	],
});