<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Url } from '$lib/server/db/schema';

	let { url } = $props<{ url: Url }>();
</script>

<tr>
	<td>{url.shortCode}</td>
	<td>
		<form method="POST" action="?/toggleActive" use:enhance>
			<input type="hidden" name="shortCode" value={url.shortCode} />
			<button class="cursor-pointer" type="submit">{url.isActive}</button>
		</form>
	</td>
	<td>{url.expiresAt ?? 'Never'}</td>
	<td>{url.originalUrl}</td>
	<td>{url.createdAt}</td>
	<td>{url.updatedAt}</td>
	<td>
		<form method="POST" action="?/delete" use:enhance>
			<input type="hidden" name="shortCode" value={url.shortCode} />
			<button class="cursor-pointer" type="submit">[x]</button>
		</form>
	</td>
</tr>
