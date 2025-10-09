import { sql } from 'drizzle-orm';
import { sqliteTable, integer, text, index } from 'drizzle-orm/sqlite-core';

export const urls = sqliteTable(
	'urls',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		shortCode: text('short_code').notNull().unique(),
		isVanity: integer('is_vanity', { mode: 'boolean' }).notNull().default(false),
		originalUrl: text('original_url').notNull(),
		title: text('title'),
		description: text('description'),
		userId: text('user_id'),
		createdAt: text('created_at')
			.notNull()
			.default(sql`(CURRENT_TIMESTAMP)`),
		updatedAt: text('updated_at')
			.notNull()
			.default(sql`(CURRENT_TIMESTAMP)`),
		expiresAt: text('expires_at'),
		isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
		clickCount: integer('click_count').notNull().default(0)
	},
	(table) => [index('short_code_idx').on(table.shortCode), index('user_id_idx').on(table.userId)]
);
