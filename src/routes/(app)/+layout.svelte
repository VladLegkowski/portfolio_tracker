<script lang="ts">
	import '../../app.css';
	import * as Table from '$lib//components/ui/table';
	import * as Card from '$lib/components/ui/card';
	import Auth from '$lib/components/features/auth/auth.svelte'
	import TickersSearchForm from '../../lib/components/features/root/tickers-form-search.svelte'
	import CurrentPositions from '../../lib/components/features/root/current-positions.svelte'


	let { data, children } = $props();
</script>

<style></style>

<Auth user={data.user} />
<div class="p-12 pt-0">
	<TickersSearchForm form={data.form} id={data?.user?.id ?? ''} query={data.query} />
	{@render children()}
	{#if data.positions}
		<CurrentPositions positions={data.positions} />
	{/if}

</div>
