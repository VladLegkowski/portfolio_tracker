import { redirect } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from '../../../../.svelte-kit/types/src/routes/(app)/$types';
import { loginSchema } from '$lib/schemas';
import { lucia } from '$lib/server/auth';
import * as db from '$lib/server/db';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(loginSchema))
	};
};

export const actions = {
	login: async (event) => {
		const form = await superValidate(event, zod(loginSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const username = form.data.email.toLocaleLowerCase();
		const password = form.data.password;

		const hasher = new Argon2id();
		const user = await db.getUser(username);
		const vUser = user[0];
		const vPassword = await hasher.verify(vUser.password_hash, password);
		if (!vUser || !vPassword) {
			return fail(400, {
				message: 'Incorrect username or password'
			});
		}
		const session = await lucia.createSession(vUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		return redirect(302, '/');
	}
};
