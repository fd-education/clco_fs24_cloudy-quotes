import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { QuoteFetch } from 'endpoints/quoteFetch';

const cors = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
}

export const router = OpenAPIRouter({
	docs_url: "/",
});

router.get("/api/rnd-quote", QuoteFetch);
router.options("/", (request: Request) => {
	if (request.headers.get("Origin") !== null &&
		request.headers.get("Access-Control-Request-Method") !== null &&
		request.headers.get("Access-Control-Request-Headers") !== null) {
		return new Response(null, {
			headers: {...cors}
		})
	} else {
		return new Response(null, {
			headers: {
				"Allow": "GET, OPTIONS",
			}
		})
	}
});

// 404 for everything else
router.all("*", () => {
	return Response.json(
		{
			success: false,
			error: "Route not found",
		},
		{
			status: 404,
			headers: { ...cors }
		}
	)
}
);

export default {
	fetch: router.handle,
};
