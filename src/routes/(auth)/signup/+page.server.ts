import { redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from '../../../../.svelte-kit/types/src/routes/(app)/$types';
import { loginSchema } from '../../../lib/schemas';
import { lucia } from '../../../lib/server/auth';
import * as db from '../../../lib/server/db';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(loginSchema))
	};
};

export const actions = {
	signup: async (event) => {
		const form = await superValidate(event, zod(loginSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const username = form.data.email.toLocaleLowerCase();
		const password = form.data.password;

		const hasher = new Argon2id();
		const passwordHash = await hasher.hash(password);
		const userId = generateId(15);

		try {
			await db.signup(userId, username, passwordHash);
			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '/',
				...sessionCookie.attributes
			});
		} catch (e: any) {
			console.error(e);
			if (e.message === 'AUTH_DUPLICATE_KEY_ID') {
				return fail(400, {
					message: 'Username already taken'
				});
			}
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
		return redirect(302, '/');
	}
};
