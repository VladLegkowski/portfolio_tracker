<script lang="ts">
	import '../app.css';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from "$lib/components/ui/form";
	import { superForm } from 'sveltekit-superforms';
	import { loadingStateFn, tickersFn } from '../lib/state.svelte.js';

	let { data } = $props();

	let l = loadingStateFn();
	let t = tickersFn();

	async function search(tickerSymbol: string) {
		t.setTickers(undefined)
		l.setLoadingState('loading')
		const response = await fetch('/', {
			method: 'POST',
			body: JSON.stringify({ tickerSymbol }),
			headers: {
				'content-type': 'application/json',
			},
		});
		const data = await response.json()
		t.setTickers(data);
		l.setLoadingState('loading')
	}

	const form = superForm(data.form, {
		onResult: async ({ result }) => {
			if (result.type === 'success') {
				await search(result?.data?.form?.data?.tickerSymbol);
			}
		},
	});
	const { form: formData, enhance } = form;
</script>

<style>
    .slot-wrapper {
        padding: 5rem 20rem;
    }
</style>

<div class="slot-wrapper">
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
	<slot></slot>
</div>
