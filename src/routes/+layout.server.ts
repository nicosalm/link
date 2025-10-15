import { COMMIT_HASH } from '$env/static/private';

export async function load() {
	return {
		commitHash: COMMIT_HASH
	};
}
