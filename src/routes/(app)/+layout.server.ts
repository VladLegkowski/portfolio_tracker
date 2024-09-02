import { mockPositions } from '$lib/mock/mockData';
import * as db from '$lib/server/db';
import type { Position } from '$lib/types';
import type { LayoutServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { tickerSymbolSchema } from '$lib/schemas';
import { zod } from 'sveltekit-superforms/adapters';

export const load: LayoutServerLoad = async (event) => {
	const query = event.url.searchParams.get('q');
	const form = await superValidate(event, zod(tickerSymbolSchema));
	const positions: Position[] = event.locals.user?.id
		? await db.getPositions(event.locals.user?.id)
		: mockPositions;
	return { form, query, positions, user: event.locals.user };
};
