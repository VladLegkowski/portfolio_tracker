<script lang="ts">
	import PriceCell from "$lib/components/features/price-cell/price-cell.svelte";
	import * as Card from "$lib/components/ui/card/index.js";
	import * as Table from "$lib/components/ui/table/index.js";
	import { Input } from "$lib/components/ui/input";
	import { Progress } from "$lib/components/ui/progress";
	import { fade } from 'svelte/transition';
	import { progressBarState } from '../lib/utils';
	import { loadingStateFn, tickersFn } from '../lib/state.svelte.js';

	let l = loadingStateFn();
	let t = tickersFn();

	async function price(tickerSymbol: string) {
		const response = await fetch(`/?symbol=${encodeURIComponent(tickerSymbol)}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
			},
		});
		l.setLoadingState(undefined)
		return await response.json();
	}

</script>

<Card.Root class="mt-2">
	<Card.Header>
		<Card.Title>Tickers results</Card.Title>
		<Card.Description>We are showing you best matches. Use more precise search in case you cand find your match.</Card.Description>
	</Card.Header>
	<Card.Content>
		{#if l.loadingState}
			<div transition:fade>
				<Progress value={progressBarState(l.loadingState)} />
			</div>
		{/if}
		{#if t.tickers}
			<Table.Root>
				<Table.Caption>Select the ticker.</Table.Caption>
				<Table.Header>
					<Table.Row>
						<Table.Head class="w-[120px]">Name</Table.Head>
						<Table.Head class="w-[100px]">Symbol</Table.Head>
						<Table.Head class="w-[50px]">Currency</Table.Head>
						<Table.Head class="w-[50px]">Price</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each t.tickers as ticker, i (i)}
						<Table.Row>
							<Table.Cell class="font-medium">{ticker['2. name']}</Table.Cell>
							<Table.Cell class="font-medium">{ticker['1. symbol']}</Table.Cell>
							<Table.Cell class="font-medium">{ticker['8. currency']}</Table.Cell>
							<PriceCell price={() => price(ticker['1. symbol'])} />
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		{/if}
	</Card.Content>
</Card.Root>



