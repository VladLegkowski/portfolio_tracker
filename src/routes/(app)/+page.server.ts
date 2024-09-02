import { redirect } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { tickerSymbolSchema } from '$lib/schemas';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import * as db from '$lib/server/db';

export const load: PageServerLoad = async (event) => {
	const query = event.url.searchParams.get('q');
	const form = await superValidate(event, zod(tickerSymbolSchema));
	const positions = event.locals.user?.id
		? await db.getPositions(event.locals.user?.id)
		: undefined;
	return { form, query, positions };
};

export const actions = {
	tickers: async (event) => {
		if (!event.locals.user) {
			return redirect(302, '/login');
		}
		const data = await event.request.formData();
		const form = await superValidate(data, zod(tickerSymbolSchema));
		if (!form.valid) return fail(400, { form });
		throw redirect(303, `/tickers?q=${encodeURIComponent(form.data.tickerSymbol)}`);
	}
};
