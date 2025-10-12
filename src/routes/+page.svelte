<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();
	let expiryOption = $state('');
</script>

<h1>link, the URL shortener</h1>

<form method="POST" action="?/create" use:enhance>
	<label>
		Long URL:
		<input name="originalUrl" type="text" required />
	</label>
	<label>
		Vanity URL (optional):
		<input name="vanityUrl" type="text" />
	</label>
	<label>
		Expiration (optional):
		<select name="expiryOption" bind:value={expiryOption}>
			<option value="">Never expires</option>
			<option value="1">1 day</option>
			<option value="7">1 week</option>
			<option value="30">1 month</option>
			<option value="90">3 months</option>
			<option value="365">1 year</option>
			<option value="custom">Custom date...</option>
		</select>
	</label>
	{#if expiryOption === 'custom'}
		<label>
			Custom expiration date:
			<input name="customExpiry" type="datetime-local" required />
		</label>
	{/if}
	<button style="cursor: pointer">Generate Short URL</button>
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
			<th>Active?</th>
			<th>Expires At</th>
			<th>Long URL</th>
			<th>Created At</th>
			<th>Updated At</th>
			<th>Delete?</th>
		</tr>
	</thead>
	<tbody>
		{#each data.urls as url}
			<tr>
				<td>{url.shortCode}</td>
				<td>
					<form method="POST" action="?/toggleActive" use:enhance>
						<input type="hidden" name="shortCode" value={url.shortCode} />
						<button style="cursor: pointer" type="submit">{url.isActive}</button>
					</form>
				</td>
				<td>{url.expiresAt}</td>
				<td>{url.originalUrl}</td>
				<td>{url.createdAt}</td>
				<td>{url.updatedAt}</td>
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
