import bcrypt from 'bcrypt';
import { AUTH_PASSWORD } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';

const PASSWORD_HASH = bcrypt.hashSync(AUTH_PASSWORD, 10);
const sessions = new Map<string, { createdAt: number }>();

export { PASSWORD_HASH, sessions };

export const handle: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get('session');
	event.locals.authenticated = sessionToken ? sessions.has(sessionToken) : false;
	return resolve(event);
};
