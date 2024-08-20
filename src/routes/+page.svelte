<script lang="ts">
	import PriceCell from "$lib/components/features/price-cell/price-cell.svelte";
	import * as Form from "$lib/components/ui/form";
	import * as Card from "$lib/components/ui/card/index.js";
	import * as Table from "$lib/components/ui/table/index.js";
	import { Input } from "$lib/components/ui/input";
	import { Progress } from "$lib/components/ui/progress";
	import { fade } from 'svelte/transition';
	import {
		superForm,
	} from "sveltekit-superforms";

	type LoadingState = 'loading' | 'success' | undefined;

	let { data } = $props();
	let tickers: Array<{
		'1. symbol': string;
		'2. name': string;
		'8. currency': string;
	}> | undefined = $state(undefined);
	let loadingState: LoadingState = $state(undefined)

	async function search(tickerSymbol: string) {
		tickers = undefined
		loadingState = 'loading'
		const response = await fetch('/', {
			method: 'POST',
			body: JSON.stringify({ tickerSymbol }),
			headers: {
				'content-type': 'application/json',
			},
		});
		tickers = await response.json();
		loadingState = 'success'
	}

	async function price(tickerSymbol: string) {
		const response = await fetch(`/?symbol=${encodeURIComponent(tickerSymbol)}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
			},
		});
		loadingState = undefined
		return await response.json();
	}

	const form = superForm(data.form, {
		onResult: async ({ result }) => {
			if (result.type === 'success') {
				await search(result?.data?.form?.data?.tickerSymbol);
			}
		},
	});
	const { form: formData, enhance } = form;

	function loading () {
		if (loadingState === 'loading') {
			return 50;
		}
		if (loadingState === 'success') {
			return 100;
		}
		return 0;
	}
</script>
<form method="POST" use:enhance>
	<Form.Field {form} name="tickerSymbol">
		<Form.Control let:attrs>
			<Form.Label>Ticker name / symbol</Form.Label>
			<Input {...attrs} bind:value={$formData.tickerSymbol} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Search</Form.Button>
</form>

<Card.Root class="mt-2">
	<Card.Header>
		<Card.Title>Tickers results</Card.Title>
		<Card.Description>We are showing you best matches. Use more precise search in case you cand find your match.</Card.Description>
	</Card.Header>
	<Card.Content>
		{#if loadingState}
			<div transition:fade>
				<Progress value={loading()} />
			</div>
		{/if}
		{#if tickers}
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
					{#each tickers as ticker, i (i)}
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



