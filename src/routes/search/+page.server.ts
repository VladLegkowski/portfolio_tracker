import { redirect } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { schema } from '../../lib/schemas';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const query = url.searchParams.get('q');
	const t = await fetch(
		`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=demo`
	);
	const p = await fetch(
		`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo`
	);
	const { bestMatches } = await t.json();
	const prices = await p.json();
	const price = prices['Global Quote']['05. price'];
	return { bestMatches, query, price };
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const form = await superValidate(data, zod(schema));
		if (!form.valid) return fail(400, { form });
		throw redirect(303, `/search?q=${encodeURIComponent(form.data.tickerSymbol)}`);
	}
};
