import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

let _db: ReturnType<typeof drizzle>;
let _client: Database.Database;

function initDb() {
	if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
	_client = new Database(env.DATABASE_URL);

	_client.exec(`
		CREATE TABLE IF NOT EXISTS urls (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			original_url TEXT NOT NULL,
			short_code TEXT NOT NULL UNIQUE,
			is_vanity INTEGER NOT NULL DEFAULT 0,
			is_active INTEGER NOT NULL DEFAULT 1,
			created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
			updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
			expires_at TEXT
		);
		CREATE INDEX IF NOT EXISTS short_code_idx ON urls(short_code);
	`);

	_db = drizzle(_client, { schema });
}

export function getDb() {
	if (!_db) initDb();
	return _db;
}
