<script lang="ts">
	import * as HoverCard from '$lib/components/ui/hover-card';
	type Props = {
		company: {
			price: number;
			symbol: string;
			name: string;
			currency: string;
			stockExchange: string;
			exchangeShortName: string;
		}
	}
	const { company}: Props = $props();
</script>

<HoverCard.Root>
	<HoverCard.Trigger
		class="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black"
	>
		{company.name}
	</HoverCard.Trigger>
	<HoverCard.Content class="w-100 p-4 bg-white shadow-md">
		<div><span class="text-sm font-semibold text-gray-500">Symbol:</span> {company.symbol}</div>
		<div><span class="text-sm font-semibold text-gray-500">Name:</span> {company.name}</div>
		<div><span class="text-sm font-semibold text-gray-500">Currency:</span> {company.currency}</div>
		<div><span class="text-sm font-semibold text-gray-500">Stock Exchange:</span> {company.stockExchange}</div>
		<div><span class="text-sm font-semibold text-gray-500">Exchange Short Name:</span> {company.exchangeShortName}</div>
	</HoverCard.Content>
</HoverCard.Root>