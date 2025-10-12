import { db } from '$lib/server/db';
import { urls } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const { shortCode } = params;

	const [url] = await db.select().from(urls).where(eq(urls.shortCode, shortCode)).limit(1);

	if (!url || !url.isActive) {
		return new Response('Short URL not found', { status: 404 });
	}

	throw redirect(301, url.originalUrl);
};
