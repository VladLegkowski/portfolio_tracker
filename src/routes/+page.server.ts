import type { PageServerLoad } from './$types.js';
import { fail, superValidate } from 'sveltekit-superforms';
import { schema } from './layout.scheme';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async (event) => {
	const form = await superValidate(event, zod(schema));
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(schema));
		if (!form.valid) return fail(400, { form });
		return { form };
	}
};
