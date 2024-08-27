import { redirect } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { schema } from '../../lib/schemas';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import * as db from '../../lib/server/db';

export const load: PageServerLoad = async (event) => {
	const query = event.url.searchParams.get('q');
	const form = await superValidate(event, zod(schema));
	const positions = event.locals.user?.id
		? await db.getPositions(event.locals.user?.id)
		: undefined;
	return { form, query, positions };
};

export const actions = {
	tickers: async (event) => {
		const data = await event.request.formData();
		const form = await superValidate(data, zod(schema));
		if (!form.valid) return fail(400, { form });
		throw redirect(303, `/tickers?q=${encodeURIComponent(form.data.tickerSymbol)}`);
	}
};
