<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<h1>link, the URL shortener</h1>

<form method="POST" action="?/create" use:enhance>
	<label>
		Long URL:
		<input name="originalUrl" type="text" required />
	</label>
	<label>
		Vanity URL? (optional)
		<input name="vanityUrl" type="text" />
	</label>
	<button>Get Short URL</button>
</form>

{#if form?.fullUrl}
	<p>Short URL created!</p>
	<strong>{form.fullUrl}</strong>
{:else if form?.error}
	<p>{form.error}</p>
{/if}

<table>
	<thead>
		<tr>
			<th>Short URL</th>
			<th>Long URL</th>
			<th>Delete?</th>
		</tr>
	</thead>
	<tbody>
		{#each data.urls as url}
			<tr>
				<td>{url.shortCode}</td>
				<td>{url.originalUrl}</td>
				<td>
					<form method="POST" action="?/delete" use:enhance>
						<input type="hidden" name="shortCode" value={url.shortCode} />
						<button style="cursor: pointer" type="submit">[x]</button>
					</form>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<footer>created by <a href="https://salm.dev/" target="_blank">nico</a></footer>
