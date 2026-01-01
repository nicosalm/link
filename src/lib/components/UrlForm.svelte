<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from '../../routes/$types';
	import { createCopyState } from '$lib/utils/copy.svelte';

	let { form }: { form: ActionData } = $props();
	let expiryOption = $state('');
	const copyState = createCopyState();
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
		Expiration:
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
	<button type="submit" class="cursor-pointer bg-black px-4 py-[9px] text-white">Shorten</button>
</form>

{#if form?.fullUrl}
	<p>
		Take this! -
		<button onclick={() => copyState.copy(form.fullUrl)} class="cursor-pointer font-bold">
			{copyState.copied ? 'Copied!' : form.fullUrl}
		</button>
	</p>
{:else if form?.error}
	<p>{form.error}</p>
{/if}
