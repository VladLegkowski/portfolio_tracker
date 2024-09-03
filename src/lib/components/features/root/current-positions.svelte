<script lang="ts">
	import * as Card from '../../ui/card';
	import * as Table from '../../ui/table';
	import type { Position } from '../../../types';

	function formatTotalPL(quantity: number, currentPrice: number, bep: number) {
		const totalPL = calculateTotalPL(quantity, currentPrice, bep);
		const isPositive = totalPL >= 0;
		return {
			value: totalPL,
			colorClass: isPositive ? 'text-green-500' : 'text-red-500',
			sign: isPositive ? '+' : '-',
			absValue: Math.abs(totalPL)
		};
	}

	function calculateTotalPL(quantity: number, currentPrice: number, bep: number) {
		quantity = Number(quantity);
		currentPrice = Number(currentPrice);
		bep = Number(bep);
		const totalCost = quantity * bep;
		const currentValue = quantity * currentPrice;
		const totalPL = currentValue - totalCost;
		return Number(totalPL.toFixed(2));
	}

	type Props = {
		positions: Position[]
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
					<Table.Head>Price</Table.Head>
					<Table.Head>Currency</Table.Head>
					<Table.Head>B/E price</Table.Head>
					<Table.Head>Realised P/L:</Table.Head>
					<Table.Head>Unreleased P/L:</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each positions as position, i (i)}
					<Table.Row>
						<Table.Cell class="font-medium">{position.symbol}</Table.Cell>
						<Table.Cell class="font-medium">{position.quantity}</Table.Cell>
						<Table.Cell class="font-medium">{position.price}</Table.Cell>
						<Table.Cell class="font-medium">{position.currency}</Table.Cell>
						<Table.Cell class="font-medium">{position.break_even_price}</Table.Cell>
						<Table.Cell class="font-medium">{position.realised_pl}</Table.Cell>
						<Table.Cell class="font-medium">
							{@const pl = formatTotalPL(position.quantity, position.price, position.break_even_price)}
							<p class={pl.colorClass}>{pl.sign}{pl.absValue.toFixed(2)}</p>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Card.Content>
</Card.Root>