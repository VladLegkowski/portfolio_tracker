import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import * as db from '$lib/server/db';
import { plCalculationSchema } from '$lib/schemas';
import type { Company } from '../../../lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch, locals }) => {
	const form = await superValidate(zod(plCalculationSchema));
	const query = url.searchParams.get('q');

	try {
		if (!query) {
			throw new Error('No query parameter provided.');
		}

		const response = await fetch(
			`https://financialmodelingprep.com/api/v3/search?query=${query}&limit=1&apikey=iaOInAu5KJYQmmxp5RvXGn3wyJp92yMz`
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch company data: ${response.statusText}`);
		}

		const companies: Array<{
			symbol: string;
			name: string;
			currency: string;
			stockExchange: string;
			exchangeShortName: string;
		}> = (await response.json()) ?? [];

		const companiesWithPrices: Company[] = await Promise.all(
			companies.map(async (company) => {
				try {
					const priceResponse = await fetch(
						`https://financialmodelingprep.com/api/v3/quote-short/${company.symbol}?apikey=iaOInAu5KJYQmmxp5RvXGn3wyJp92yMz`
					);

					if (!priceResponse.ok) {
						throw new Error(
							`Failed to fetch price data for ${company.symbol}: ${priceResponse.statusText}`
						);
					}

					const priceData = await priceResponse.json();
					return {
						...company,
						price: priceData[0]?.price ?? 'N/A'
					};
				} catch (priceError) {
					console.error(priceError);
					return { ...company, price: 'N/A' };
				}
			})
		);
		return { companies: companiesWithPrices, query, form, user: locals.user };
	} catch (error) {
		console.error(error);
	}
};

export const actions = {
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
