<script lang="ts">
	import { page } from '$app/state';
</script>

<h1>Ingen adgang</h1>
<p>
	Du er logget ind hos DTU som <code>{page.url.searchParams.get('u')}</code>, men det brugernavn
	er ikke på listen over undervisere (<code>SUPERUSERS</code>).
</p>
<p><a href="/">Til forsiden</a></p>
