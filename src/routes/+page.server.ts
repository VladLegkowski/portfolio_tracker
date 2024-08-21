import { redirect } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { schema } from '../lib/schemas';
import { zod } from 'sveltekit-superforms/adapters';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const form = await superValidate(data, zod(schema));
		if (!form.valid) return fail(400, { form });
		throw redirect(303, `/search?q=${encodeURIComponent(form.data.tickerSymbol)}`);
	}
};
