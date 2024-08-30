import { mockPositions } from '../../lib/mock/mockData';
import * as db from '../../lib/server/db';
import type { LayoutServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { tickerSymbolSchema } from '../../lib/schemas';
import { zod } from 'sveltekit-superforms/adapters';

export const load: LayoutServerLoad = async (event) => {
	const query = event.url.searchParams.get('q');
	const form = await superValidate(event, zod(tickerSymbolSchema));
	const positions = event.locals.user?.id
		? await db.getPositions(event.locals.user?.id)
		: mockPositions;
	console.log(positions);
	return { form, query, positions, user: event.locals.user };
};
