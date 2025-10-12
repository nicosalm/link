<script lang="ts">
	import type { Url } from '$lib/server/db/schema';
	import UrlRow from './UrlRow.svelte';

	let { urls } = $props<{ urls: Url[] }>();
</script>

<table>
	<thead>
		<tr>
			<th>Short URL</th>
			<th>Active?</th>
			<th>Expires At</th>
			<th>Long URL</th>
			<th>Created At</th>
			<th>Updated At</th>
			<th>Delete?</th>
		</tr>
	</thead>
	<tbody>
		{#each urls as url}
			<UrlRow {url} />
		{/each}
	</tbody>
</table>
