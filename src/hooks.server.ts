import bcrypt from 'bcrypt';
import { env } from '$env/dynamic/private';
import type { Handle } from '@sveltejs/kit';

let PASSWORD_HASH: string;

const getPasswordHash = () => {
	if (!PASSWORD_HASH) {
		PASSWORD_HASH = bcrypt.hashSync(env.AUTH_PASSWORD, 10);
	}
	return PASSWORD_HASH;
};

const sessions = new Map<string, { createdAt: number }>();

export { getPasswordHash, sessions };

export const handle: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get('session');
	event.locals.authenticated = sessionToken ? sessions.has(sessionToken) : false;
	return resolve(event);
};
