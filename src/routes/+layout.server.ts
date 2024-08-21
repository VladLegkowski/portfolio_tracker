import type { LayoutServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { schema } from './layout.scheme';
import { zod } from 'sveltekit-superforms/adapters';

export const load: LayoutServerLoad = async (event) => {
	const form = await superValidate(event, zod(schema));
	return { form };
};
