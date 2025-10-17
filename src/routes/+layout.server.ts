import { env } from '$env/dynamic/private';

export async function load() {
	return {
		commitHash: env.COMMIT_HASH || 'unknown'
	};
}
