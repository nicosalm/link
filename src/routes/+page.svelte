<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import UrlForm from '$lib/components/UrlForm.svelte';
	import UrlTable from '$lib/components/UrlTable.svelte';
	import { enhance } from '$app/forms';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let naviMessage = $state('');
	const messages = ['Hey there', 'Hi'];

	function handleNaviClick() {
		naviMessage = messages[Math.floor(Math.random() * messages.length)];
		setTimeout(() => {
			naviMessage = '';
		}, 2000);
	}
</script>

<div class="mx-auto max-w-7xl space-y-8 py-8">
	<div class="flex min-h-[42px] items-center justify-between">
		<div class="flex items-center gap-2">
			<img src="/link.png" alt="link icon" class="h-8 w-8" />
			<h1 class="text-2xl">link, the URL shortener</h1>
		</div>
		{#if data.authenticated}
			<form method="POST" action="?/logout" use:enhance>
				<button type="submit" class="cursor-pointer">logout</button>
			</form>
		{:else}
			<form method="POST" action="?/login" class="flex items-center gap-2" use:enhance>
				<input type="password" name="password" placeholder="password" />
				<button type="submit" class="cursor-pointer bg-black px-4 py-[9px] text-white">
					login
				</button>
				{#if form?.error}
					<span class="text-red-500">{form.error}</span>
				{/if}
			</form>
		{/if}
	</div>

	{#if data.authenticated}
		<UrlForm {form} />

		<UrlTable urls={data.urls} />

		<footer class="flex items-center justify-between">
			<span
				>created by <a class="underline" href="https://salm.dev/" target="_blank">Nico</a> !</span
			>
			<div class="flex items-center gap-2">
				{#if naviMessage}
					<span class="text-sm">{naviMessage}</span>
				{/if}
				<button onclick={handleNaviClick} class="cursor-pointer">
					<img src="/navi.gif" alt="navi" class="h-8 w-8" />
				</button>
			</div>
		</footer>
	{/if}
</div>
