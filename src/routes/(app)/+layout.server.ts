import { mockPositions } from '$lib/mock/mockData';
import * as db from '$lib/server/db';
import type { Company, Position } from '$lib/types';
import type { LayoutServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { tickerSymbolSchema } from '$lib/schemas';
import { zod } from 'sveltekit-superforms/adapters';

export const load: LayoutServerLoad = async (event) => {
	let form;
	let positions: Position[];

	try {
		const query = event.url.searchParams.get('q');
		form = await superValidate(event, zod(tickerSymbolSchema));

		if (event.locals.user?.id) {
			try {
				const positionsWithoutPrice = (await db.getPositions(
					event.locals.user.id
				)) as never as Position[];
				positions = await Promise.all(
					positionsWithoutPrice.map(async (position) => {
						try {
							const priceResponse = await fetch(
								`https://financialmodelingprep.com/api/v3/quote-short/${position.symbol}?apikey=6iKfC9b2HsSekHxvoKB6yfYmwU8k5bEt`
							);

							if (!priceResponse.ok) {
								throw new Error(
									`Failed to fetch price data for ${position.symbol}: ${priceResponse.statusText}`
								);
							}

							const priceData = await priceResponse.json();
							return {
								...position,
								price: priceData[0]?.price ?? 'N/A'
							};
						} catch (priceError) {
							console.error(priceError);
							return { ...position, price: 'N/A' };
						}
					})
				);
			} catch (error) {
				console.error('Error fetching positions:', error);
				positions = mockPositions;
			}
		} else {
			positions = mockPositions;
		}

		return { form, query, positions, user: event.locals.user };
	} catch (error) {
		console.error('Error in load function:', error);
		return { error: 'An error occurred while loading the page' };
	}
};
