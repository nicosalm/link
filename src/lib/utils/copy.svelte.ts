export async function copyToClipboard(text: string): Promise<void> {
	await navigator.clipboard.writeText(text);
}

export function createCopyState() {
	let copied = $state(false);

	async function copy(text: string, duration: number = 1000) {
		await copyToClipboard(text);
		copied = true;
		setTimeout(() => (copied = false), duration);
	}

	return {
		get copied() {
			return copied;
		},
		copy
	};
}
