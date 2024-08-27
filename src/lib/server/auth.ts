import { Lucia } from 'lucia';
import { PostgresJsAdapter } from '@lucia-auth/adapter-postgresql';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import postgres from 'postgres';
import type { DatabaseUser } from './db';

const sql = postgres(env.DATABASE_URL);

const adapter = new PostgresJsAdapter(sql, {
	user: 'auth_user',
	session: 'user_session'
});

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: Omit<DatabaseUser, 'id'>;
	}
}
