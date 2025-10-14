import { db } from '$lib/server/db';
import { urls } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { shortCode } = params;

	const [url] = await db.select().from(urls).where(eq(urls.shortCode, shortCode)).limit(1);

	if (!url || !url.isActive) {
		error(404, 'Short URL not found');
	}

	redirect(301, url.originalUrl);
};
