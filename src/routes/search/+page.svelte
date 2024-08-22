<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import PriceCell from "../../lib/components/features/price-cell/price-cell.svelte";
	import * as Card from "../../lib/components/ui/card";
	import * as Table from "../../lib/components/ui/table";
	import { Progress } from "../../lib/components/ui/progress";

	let { data } = $props();

</script>

<Card.Root class="mt-2">
	<Card.Header>
		<Card.Title>{`Tickers results for ${data.query?.toUpperCase()}`}</Card.Title>
		<Card.Description>We are showing you best matches. Use more precise search in case you cand find your match.</Card.Description>
	</Card.Header>
	<Card.Content>
		{#if data.bestMatches}
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
					{#each data.bestMatches as ticker, i (i)}
						<Table.Row>
							<Table.Cell class="font-medium"><Button variant="link">{ticker['2. name']}</Button></Table.Cell>
							<Table.Cell class="font-medium">{ticker['1. symbol']}</Table.Cell>
							<Table.Cell class="font-medium">{ticker['8. currency']}</Table.Cell>
							<PriceCell price={data.price} />
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		{/if}
	</Card.Content>
</Card.Root>



