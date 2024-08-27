import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { lucia } from '../../../lib/server/auth';

export const load: PageServerLoad = async (event) => {
	await lucia.invalidateSession(event.locals.session?.id ?? '');
	const sessionCookie = lucia.createBlankSessionCookie();
	event.cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});
	return redirect(302, '/login');
};
