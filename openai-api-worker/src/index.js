import Openai from 'openai';

const corsHeaders = {
	'Access-Control-Allow-Origin': 'explore-cloudflare-101.pages.dev',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
	async fetch(request, env, ctx) {
		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders });
		}

		if (request.method !== 'POST') {
			return new Response(JSON.stringify({ error: `${request.method} method not allowed` }), { status: 405, headers: corsHeaders });
		}

		const openai = new Openai({
			apiKey: env.OPENAI_API_KEY,
			baseURL: 'https://gateway.ai.cloudflare.com/v1/3dfb1a331dc3ffca1719d331edbbb8eb/explore-cloudflare/openai',
		});

		try {
			const messages = await request.json();
			const chatCompletions = await openai.chat.completions.create({
				model: 'gpt-5-nano',
				messages: messages,
			});

			const response = chatCompletions.choices[0].message;

			return new Response(JSON.stringify(response), { headers: corsHeaders });
		} catch (error) {
			return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
		}
	},
};
