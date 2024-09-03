<script lang="ts">
	import * as Card from '../../ui/card';
	import * as Table from '../../ui/table';
	import type { Position } from '../../../types';

	type Positions = Position[]

	type Props = {
		positions: Positions
	}

	const { positions }: Props = $props();
</script>

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
				{#each positions as position, i (i)}
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