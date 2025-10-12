<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import UrlForm from '$lib/components/UrlForm.svelte';
	import UrlTable from '$lib/components/UrlTable.svelte';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<h1>link, the URL shortener</h1>

<UrlForm {form} />

<UrlTable urls={data.urls} />

<footer>created by <a href="https://salm.dev/" target="_blank">nico</a></footer>
