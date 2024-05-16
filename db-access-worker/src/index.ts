import { Env } from './types/env.type';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const {pathname} = new URL(request.url);

		const cors = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET',
			'Access-Control-Allow-Headers': 'Content-Type',
		}
		
		switch(pathname){
			case '/rnd-quote':
					const result = await env.DB.prepare(
						"SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1;"
					).first();

					return Response.json(result, {
						headers: {...cors}
					});
		}

		return new Response('Call /rnd-quote to get a random quote.');
	},
};
