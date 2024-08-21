import { fail, superValidate } from 'sveltekit-superforms';
import { schema } from './layout.scheme';
import { zod } from 'sveltekit-superforms/adapters';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const form = await superValidate(data, zod(schema));
		if (!form.valid) return fail(400, { form });
		return { form };
	}
};
