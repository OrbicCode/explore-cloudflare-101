import Openai from 'openai';

export default {
	async fetch(request, env, ctx) {
		const openai = new Openai({
			apiKey: env.OPENAI_API_KEY,
		});

		const messages = [
			{
				role: 'user',
				content: 'Which way to Mordor?',
			},
		];
		try {
			const chatCompletions = await openai.chat.completions.create({
				model: 'gpt-5-nano',
				messages: messages,
			});

			const response = chatCompletions.choices[0].message;

			return new Response(JSON.stringify(response));
		} catch (error) {
			return new Response(error);
		}
	},
};
