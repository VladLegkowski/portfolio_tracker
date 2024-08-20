import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, fetch }) => {
	const data = await request.json();
	const tickerSymbol = data.tickerSymbol;

	if (!tickerSymbol) {
		return json({ error: 'Ticker symbol is required' }, { status: 400 });
	}
	const response = await fetch(
		'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo'
	);
	const { bestMatches } = await response.json();
	return json(bestMatches);
};

export const GET: RequestHandler = async ({ url, fetch }) => {
	const symbol = url.searchParams.get('symbol');

	if (!symbol) {
		return json({ error: 'Symbol is required' }, { status: 400 });
	}
	const response = await fetch(
		`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo`
	);
	const d = await response.json();
	const price = d['Global Quote']?.['05. price'] || 'N/A';
	return json({ price });
};
