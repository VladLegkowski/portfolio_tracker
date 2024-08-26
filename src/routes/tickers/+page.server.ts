import { redirect } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import sql from '../../lib/db';
import { plCalculationSchema, schema } from '../../lib/schemas';
import type { Company } from '../../lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const form = await superValidate(zod(plCalculationSchema));
	const query = url.searchParams.get('q');
	const response = await fetch(
		`https://financialmodelingprep.com/api/v3/search?query=${query}&limit=3&apikey=iaOInAu5KJYQmmxp5RvXGn3wyJp92yMz`
	);
	const companies = (await response.json()) ?? [];

	const companiesWithPrices = await Promise.all(
		companies.map(async (company: Company) => {
			const priceResponse = await fetch(
				`https://financialmodelingprep.com/api/v3/quote-short/${company.symbol}?apikey=iaOInAu5KJYQmmxp5RvXGn3wyJp92yMz`
			);
			const priceData = await priceResponse.json();
			return {
				...company,
				price: priceData[0]?.price ?? 'N/A'
			};
		})
	);

	return { companies: companiesWithPrices, query, form };
};

export const actions = {
	tickers: async ({ request }) => {
		const data = await request.formData();
		const form = await superValidate(data, zod(schema));
		if (!form.valid) return fail(400, { form });
		throw redirect(303, `/tickers?q=${encodeURIComponent(form.data.tickerSymbol)}`);
	},
	plCalculation: async ({ request }) => {
		const form = await superValidate(request, zod(plCalculationSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const { symbol, quantity, breakEvenPrice, realisedPL } = form.data;

			const [newPosition] = await sql`
        INSERT INTO positions (symbol, quantity, break_even_price, realised_pl)
        VALUES (${symbol}, ${quantity}, ${breakEvenPrice}, ${realisedPL})
    	  RETURNING id, symbol, quantity, break_even_price, realised_pl
			`;

			return {
				form,
				newPosition
			};
		} catch (error) {
			console.error('Database error:', error);
			return fail(500, {
				form,
				error: 'Failed to save data to database'
			});
		}
	}
};
