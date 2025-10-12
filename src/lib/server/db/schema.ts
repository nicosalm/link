import { sql } from 'drizzle-orm';
import { sqliteTable, integer, text, index } from 'drizzle-orm/sqlite-core';

export const urls = sqliteTable(
	'urls',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		originalUrl: text('original_url').notNull(),
		shortCode: text('short_code').notNull().unique(),
		isVanity: integer('is_vanity', { mode: 'boolean' }).notNull().default(false),
		isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
		createdAt: text('created_at')
			.notNull()
			.default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
		updatedAt: text('updated_at')
			.notNull()
			.default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
		expiresAt: text('expires_at')
	},
	(table) => [index('short_code_idx').on(table.shortCode)]
);
