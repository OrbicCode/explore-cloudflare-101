import Openai from 'openai';

const corsHeaders = {
	'Access-Control-Allow-Origin': 'http://localhost:5173',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
	async fetch(request, env, ctx) {
		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders });
		}

		const openai = new Openai({
			apiKey: env.OPENAI_API_KEY,
		});

		try {
			const messages = await request.json();
			const chatCompletions = await openai.chat.completions.create({
				model: 'gpt-5-nano',
				messages,
			});

			const response = chatCompletions.choices[0].message;

			return new Response(JSON.stringify(response), { headers: corsHeaders });
		} catch (error) {
			return new Response(error, { headers: corsHeaders });
		}
	},
};
