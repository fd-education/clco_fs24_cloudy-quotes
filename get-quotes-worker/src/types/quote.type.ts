import { Str } from "@cloudflare/itty-router-openapi";

export const Quote = {
	id: String,
	author: new Str({ example: 'John Doe' }),
	quote: new Str({ example: 'Lorem Ipsum dolor sit amet.' })
};

export type QuoteType =  typeof Quote;