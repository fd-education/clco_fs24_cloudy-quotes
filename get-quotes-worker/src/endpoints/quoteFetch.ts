import {
	Bool,
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Path,
} from "@cloudflare/itty-router-openapi";
import { Quote, QuoteType } from "../types/quote.type";
import { Env } from 'types/env.type';

export class QuoteFetch extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["Quotes"],
		summary: "Get random quote with its author.",
		responses: {
			"200": {
				description: "Returns a random quote with its author.",
				schema: {
					success: Boolean,
					result: {
						quote: Quote,
					},
				},
			},
			"404": {
				description: "No quote found. No quotes in database.",
				schema: {
					success: new Bool({ example: false }),
					error: String,
				},
			},
		},
	};

	async handle(
		request: Request,
		env: Env,
		context: any
	) {
		const { origin } = new URL(request.url);
		const quoteResponse = await env.dbworker.fetch(new URL('/rnd-quote', origin));

		console.log(quoteResponse);

		const cors = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET',
			'Access-Control-Allow-Headers': 'Content-Type',
		}

		if (!quoteResponse.ok) {
			const { status, statusText } = quoteResponse;

			console.error(`ERROR - ${status}: ${statusText}`);

			return Response.json({
				success: false,
				error: `${status}: ${statusText}`
			},
				{
					status,
					headers: {...cors}
				}
			)
		}

		const data = await quoteResponse.json() as QuoteType;
		// @ts-ignore: check if the object exists
		if (!data.quote || data.quote.length === 0) {
			return Response.json(
				{
					success: false,
					error: "Object not found",
				},
				{
					status: 404,
					headers: {...cors}
				}
			);
		}


		return Response.json({
			success: true,
			quote: {
				author: data.author,
				quote: data.quote
			},
		}, {
			headers: {...cors},
		});
	}
}
