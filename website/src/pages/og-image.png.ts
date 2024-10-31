import fs from 'fs/promises';
import satori from 'satori';
import { html as toReactNode } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';
import type { APIRoute } from 'astro';
import Config from 'astro.config.mjs';

const width = 1200;
const height = 630;

export const GET: APIRoute = async function get() {
	const Inter = await fs.readFile(
		'./public/Inter-SemiBold.ttf'
	);

    const markup = toReactNode`
        <div style="
            position: relative;
            font-family: 'Inter'; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            gap: 30px; 
            flex-direction: column; 
            height: 100%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-image: url('${Config.site}/mountains-small.jpg'); 
        ">
            <div style="
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1;
                display: flex; 
                background-color: #fff;  
                opacity: 0.5;
                height: 100%;
                width: 100%;       
            "></div>
            <div style="
                display: flex; 
                align-items: center; 
                justify-content: center;
                justify-content: center; 
                gap: 30px; 
                flex-direction: column;
                padding: 30px 150px;
            ">
                <img src="${Config.site}/favicon.svg" alt="" style="width: 100px; height: 100px;"/>
                <div style="font-size: 100px; letter-spacing: -0.025em; color: #0c0a09;">Carve UI</div>
                <div style="color: #0c0a09; font-size: 36px; text-align: center;">A collection of rugged and accessible headless component primitives for Alpine.js.</div>
            </div>
        </div>
    `;

	const svg = await satori(
		markup,
		{
			width: width,
			height: height,
			fonts: [
				{
					name: 'Inter',
					data: Inter,
					style: 'normal',
                    weight: 600
				},
			],
		}
	);

    const resvg = new Resvg(svg, {
        fitTo: {
            mode: 'width',
            value: width
        }
    });

    const image = resvg.render();

	return new Response(image.asPng(), {
        headers: {
            'content-type': 'image/png'
        }
    });
};