<script lang="ts">
	import type { Url } from '$lib/server/db/schema';
	import UrlRow from './UrlRow.svelte';

	let { urls } = $props<{ urls: Url[] }>();
</script>

<table class="w-full">
	<thead>
		<tr class="underline">
			<th class="text-left">Short URL</th>
			<th class="text-left">Active?</th>
			<th class="text-left">Expires At</th>
			<th class="text-left">Long URL</th>
			<th class="text-left">Created At</th>
			<th class="text-left">Updated At</th>
			<th class="text-left">Delete?</th>
		</tr>
	</thead>
	<tbody>
		{#each urls as url}
			<UrlRow {url} />
		{/each}
	</tbody>
</table>
