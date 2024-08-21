<!-- src/lib/components/features/price-cell/price-cell.svelte -->
<script lang="ts">
	import * as Table from "$lib/components/ui/table/index.js";

	let { price } = $props();
</script>

<Table.Cell class="font-medium">{price}</Table.Cell>