import sql from '../lib/db';
import type { LayoutServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { schema } from '../lib/schemas';
import { zod } from 'sveltekit-superforms/adapters';

export const load: LayoutServerLoad = async (event) => {
	const query = event.url.searchParams.get('q');
	const form = await superValidate(event, zod(schema));
	try {
		const positions = await sql`
      SELECT * FROM positions
      ORDER BY created_at DESC
    `;
		return { form, query, positions };
	} catch (error) {
		console.error('Error loading positions:', error);
		return {
			positions: [],
			form: await superValidate(zod(schema)),
			error: 'Failed to load positions'
		};
	}
};
