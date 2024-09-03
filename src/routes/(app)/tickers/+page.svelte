<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import HoverCard from '$lib/components/features/tickers/hover-card.svelte'
	import Drawer from '$lib/components/features/tickers/drawer.svelte'

	let { data, form: actionForm } = $props();

</script>
<Card.Root class="mt-2">
	<Card.Header>
		<Card.Title>{`Tickers results for ${data.query?.toUpperCase()}`}</Card.Title>
		<Card.Description>We are showing you best matches. Use more precise search in case you cannot find your match.</Card.Description>
	</Card.Header>
	<Card.Content>
		{#if data.companies}
			<Table.Root>
				<Table.Caption>Select the ticker.</Table.Caption>
				<Table.Header>
					<Table.Row>
						<Table.Head>Name</Table.Head>
						<Table.Head>Symbol</Table.Head>
						<Table.Head>Currency</Table.Head>
						<Table.Head>Stock Exchange</Table.Head>
						<Table.Head>Price</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each data.companies as company, i (i)}
						<Table.Row>
							<Table.Cell class="font-medium">
								<HoverCard company={company} />
							</Table.Cell>
							<Table.Cell class="font-medium">{company.symbol}</Table.Cell>
							<Table.Cell class="font-medium">{company.currency}</Table.Cell>
							<Table.Cell class="font-medium">{company.exchangeShortName}</Table.Cell>
							<Table.Cell class="font-medium">{company.price}</Table.Cell>
							<Table.Cell class="font-medium">
								<Drawer data={data} actionForm={actionForm} company={company} />
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		{/if}
	</Card.Content>
</Card.Root>