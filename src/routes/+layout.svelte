<script lang="ts">
	import '../app.css';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from "$lib/components/ui/form";
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	const form = superForm(data.form);
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
	<slot />
</div>
