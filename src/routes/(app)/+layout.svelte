<script lang="ts">
	import '../../app.css';
	import * as Table from "../../lib/components/ui/table";
	import * as Card from "../../lib/components/ui/card";
	import Auth from '$lib/components/features/auth/auth.svelte'
	import TickersForm from '$lib/components/features/tickers/form.svelte'

	let { data, children } = $props();
</script>

<style></style>

<Auth user={data?.user} />
<div class="p-12 pt-0">
	<TickersForm form={data.form} id={data?.user?.id ?? ''} query={data.query ?? ''} />
	{@render children()}
	{#if data.positions}
		<Card.Root class="mt-2">
			<Card.Header>
				<Card.Title>Your current positions</Card.Title>
				<Card.Description>Some random text.</Card.Description>
			</Card.Header>
			<Card.Content>
				<Table.Root>
					<Table.Caption>List of your positions.</Table.Caption>
					<Table.Header>
						<Table.Row>
							<Table.Head>Symbol</Table.Head>
							<Table.Head>Quantity</Table.Head>
							<Table.Head>B/E price</Table.Head>
							<Table.Head>Realised P/L:</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each data.positions as position, i (i)}
							<Table.Row>
								<Table.Cell class="font-medium">{position.symbol}</Table.Cell>
								<Table.Cell class="font-medium">{position.quantity}</Table.Cell>
								<Table.Cell class="font-medium">{position.break_even_price}</Table.Cell>
								<Table.Cell class="font-medium">{position.realised_pl}</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</Card.Content>
		</Card.Root>
	{/if}

</div>
