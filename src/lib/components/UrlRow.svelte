<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Url } from '$lib/server/db/schema';
	import { createCopyState } from '$lib/utils/copy.svelte';

	let { url } = $props<{ url: Url }>();
	const shortCopy = createCopyState();
	const longCopy = createCopyState();
</script>

<tr>
	<td>
		<button onclick={() => shortCopy.copy(`${window.location.origin}/${url.shortCode}`)} class="cursor-pointer font-bold">
			{shortCopy.copied ? 'Copied!' : url.shortCode}
		</button>
	</td>
	<td>
		<form method="POST" action="?/toggleActive" use:enhance>
			<input type="hidden" name="shortCode" value={url.shortCode} />
			<button class="cursor-pointer" type="submit">{url.isActive}</button>
		</form>
	</td>
	<td>{url.expiresAt ?? 'Never'}</td>
	<td class="max-w-xs">
		<button onclick={() => longCopy.copy(url.originalUrl)} class="cursor-pointer truncate block max-w-full">
			{longCopy.copied ? 'Copied!' : url.originalUrl}
		</button>
	</td>
	<td>{url.createdAt}</td>
	<td>{url.updatedAt}</td>
	<td>
		<form method="POST" action="?/delete" use:enhance>
			<input type="hidden" name="shortCode" value={url.shortCode} />
			<button class="cursor-pointer" type="submit">[x]</button>
		</form>
	</td>
</tr>
