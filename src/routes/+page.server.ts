import { db } from '$lib/server/db';
import { urls } from '$lib/server/db/schema';
import type { Actions } from './$types';
import { eq } from 'drizzle-orm';

export const load = async () => {
	const allUrls = await db.select().from(urls);
	return {
		urls: allUrls
	};
};

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const originalUrl = data.get('originalUrl')?.toString();
		const vanityUrl = data.get('vanityUrl')?.toString();
		const expiryOption = data.get('expiryOption')?.toString();
		const customExpiry = data.get('customExpiry')?.toString();
		let expiresAt = null;

		if (!originalUrl || originalUrl.trim() === '') {
			return { success: false, error: 'Original URL is required' };
		}

		if (expiryOption === 'custom' && customExpiry) {
			expiresAt = new Date(customExpiry).toISOString();
		} else if (expiryOption && expiryOption !== '') {
			const expiry = new Date();
			expiry.setDate(expiry.getDate() + parseInt(expiryOption));
			expiresAt = expiry.toISOString();
		}

		let normalizedUrl = originalUrl.trim();
		if (!normalizedUrl.match(/^https?:\/\//i)) {
			normalizedUrl = `https://${normalizedUrl}`;
		}

		try {
			const urlObj = new URL(normalizedUrl);
			normalizedUrl = urlObj.href;
		} catch {
			return { success: false, error: 'Invalid URL format' };
		}

		const customShortCode = vanityUrl && vanityUrl.trim() !== '' ? vanityUrl.trim() : null;
		const shortCode = customShortCode || crypto.randomUUID().slice(0, 8);
		const isVanity = customShortCode !== null;

		try {
			if (isVanity) {
				const [existingVanity] = await db
					.select()
					.from(urls)
					.where(eq(urls.shortCode, shortCode))
					.limit(1);

				if (existingVanity) {
					return { success: false, error: 'Vanity URL already taken!' };
				}
			} else {
				const [existingUrl] = await db
					.select()
					.from(urls)
					.where(eq(urls.originalUrl, normalizedUrl))
					.limit(1);

				if (existingUrl) {
					if (existingUrl.expiresAt && new Date(existingUrl.expiresAt) > new Date()) {
						await db.delete(urls).where(eq(urls.shortCode, existingUrl.shortCode));
					} else {
						return {
							success: true,
							shortUrl: existingUrl.shortCode,
							fullUrl: `${new URL(request.url).origin}/${existingUrl.shortCode}`
						};
					}
				}
			}

			const [newUrl] = await db
				.insert(urls)
				.values({
					originalUrl: normalizedUrl,
					shortCode,
					isVanity,
					expiresAt
				})
				.returning();

			return {
				success: true,
				shortUrl: newUrl.shortCode,
				fullUrl: `${new URL(request.url).origin}/${newUrl.shortCode}`
			};
		} catch (error) {
			console.error('Database error:', error);
			return { success: false, error: 'Failed to create the short URL' };
		}
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const shortCode = data.get('shortCode')?.toString();

		if (!shortCode) {
			return { success: false, error: 'Short code is required' };
		}

		try {
			await db.delete(urls).where(eq(urls.shortCode, shortCode));
			return { success: true };
		} catch (error) {
			console.error('DB error:', error);
			return { success: false, error: 'Failed to delete the URL' };
		}
	},
	toggleActive: async ({ request }) => {
		const data = await request.formData();
		const shortCode = data.get('shortCode')?.toString();

		if (!shortCode) {
			return { success: false, error: 'Short code is required' };
		}

		try {
			const [url] = await db.select().from(urls).where(eq(urls.shortCode, shortCode)).limit(1);

			if (!url) {
				return { success: false, error: 'URL not found' };
			}

			await db
				.update(urls)
				.set({ isActive: !url.isActive, updatedAt: new Date().toISOString() })
				.where(eq(urls.shortCode, shortCode));
			return { success: true, isActive: !url.isActive };
		} catch (error) {
			console.error('DB error: ', error);
			return { success: false, error: 'Failed to toggle active status' };
		}
	}
} satisfies Actions;
