<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from '../../routes/$types';

	let { form }: { form: ActionData } = $props();
	let expiryOption = $state('');
</script>

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
