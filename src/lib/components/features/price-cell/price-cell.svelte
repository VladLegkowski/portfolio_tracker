<!-- src/lib/components/features/price-cell/price-cell.svelte -->
<script lang="ts">
	import * as Table from "$lib/components/ui/table/index.js";

	let { price } = $props<{
		price: () => Promise<{ price: string }>
	}>();

	let priceValue = $state('Loading...');

	$effect(() => {
		fetchPrice();
	});

	async function fetchPrice() {
		const result = await price();
		priceValue = result.price;
	}
</script>

<Table.Cell class="font-medium">{priceValue}</Table.Cell>