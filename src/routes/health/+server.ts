import { json } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import { sql } from 'drizzle-orm';

export async function GET() {
	try {
		const db = getDb();
		db.run(sql`SELECT 1`);
		return json({ status: 'ok' });
	} catch {
		return json({ status: 'error' }, { status: 503 });
	}
}
