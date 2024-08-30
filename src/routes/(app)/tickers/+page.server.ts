import { redirect } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import * as db from '../../../lib/server/db';
import { schema, plCalculationSchema } from '../../../lib/schemas';
import type { Company } from '../../../lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch, locals }) => {
	const form = await superValidate(zod(plCalculationSchema));
	const query = url.searchParams.get('q');
	const response = await fetch(
		`https://financialmodelingprep.com/api/v3/search?query=${query}&limit=1&apikey=iaOInAu5KJYQmmxp5RvXGn3wyJp92yMz`
	);
	const companies = [
		{
			symbol: 'PRAA',
			name: 'PRA Group, Inc.',
			currency: 'USD',
			stockExchange: 'NasdaqGS',
			exchangeShortName: 'NASDAQ'
		},
		{
			symbol: 'PAAS',
			name: 'Pan American Silver Corp.',
			currency: 'USD',
			stockExchange: 'NasdaqGS',
			exchangeShortName: 'NASDAQ'
		}
	];

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

	return { companies: companiesWithPrices, query, form, user: locals.user };
};

export const actions = {
	tickers: async ({ request }) => {
		const data = await request.formData();
		const form = await superValidate(data, zod(schema));
		if (!form.valid) return fail(400, { form });
		throw redirect(303, `/tickers?q=${encodeURIComponent(form.data.tickerSymbol)}`);
	},
	plCalculation: async ({ request, locals }) => {
		const form = await superValidate(request, zod(plCalculationSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		const { symbol, quantity, breakEvenPrice, realisedPL } = form.data;
		await db.createPosition({
			symbol,
			quantity,
			breakEvenPrice,
			realisedPL,
			userId: locals.user?.id ?? ''
		});
		return { form, success: true };
	}
};
