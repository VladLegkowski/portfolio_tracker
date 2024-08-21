import type { LayoutServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { schema } from '../lib/schemas';
import { zod } from 'sveltekit-superforms/adapters';

export const load: LayoutServerLoad = async (event) => {
	const query = event.url.searchParams.get('q');
	const form = await superValidate(event, zod(schema));
	return { form, query };
};
