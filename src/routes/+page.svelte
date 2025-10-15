<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import UrlForm from '$lib/components/UrlForm.svelte';
	import UrlTable from '$lib/components/UrlTable.svelte';

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

<div class="mx-auto max-w-6xl space-y-8 py-8">
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-2">
			<img src="/link.png" alt="link icon" class="h-8 w-8" />
			<h1 class="text-2xl">link, the URL shortener</h1>
		</div>
		<button class="cursor-pointer">login</button>
	</div>

	<UrlForm {form} />

	<UrlTable urls={data.urls} />

	<footer class="flex items-center justify-between">
		<span>created by <a class="underline" href="https://salm.dev/" target="_blank">Nico</a> !</span>
		<div class="flex items-center gap-2">
			{#if naviMessage}
				<span class="text-sm">{naviMessage}</span>
			{/if}
			<button onclick={handleNaviClick} class="cursor-pointer">
				<img src="/navi.gif" alt="navi" class="h-8 w-8" />
			</button>
		</div>
	</footer>
</div>
