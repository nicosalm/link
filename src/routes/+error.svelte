<script>
	import { page } from '$app/state';
</script>

<div class="content">
	<h1>Error:</h1>
	<h2>{page.error?.message}</h2>
</div>
