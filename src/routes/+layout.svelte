<script lang="ts">
	import '../app.css';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from "$lib/components/ui/form";
	import * as Table from "$lib/components/ui/table";
	import * as Card from "$lib/components/ui/card";
	import { superForm } from 'sveltekit-superforms';

	let { data, children } = $props();
	const form = superForm(data.form);
	const { form: formData } = form;
</script>

<style>
    .slot-wrapper {
        padding: 8rem;
    }
</style>

<div class="slot-wrapper">
	<form method="POST" action="?/tickers">
		<Form.Field {form} name="tickerSymbol">
			<Form.Control let:attrs>
				<Form.Label>Ticker name / symbol</Form.Label>
				<Input {...attrs} bind:value={$formData.tickerSymbol} placeholder={`e.g. ${data.query || 'tesco'}`} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Button>Search</Form.Button>
	</form>
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
