<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import * as Form from '../../ui/form';
	import { Button } from '../../ui/button';
	import { Input } from '../../ui/input';
	import * as Tooltip from '../../ui/tooltip';

	type Props =  {
		id: string;
		query: string;
		form: SuperValidated<{ tickerSymbol: string }, never, { tickerSymbol: string }>;
	};

	let { id, query, form: dataForm }: Props = $props()
	const form = superForm(dataForm);
	const { form: formData } = form;
</script>

<form method="POST" action="/?/tickers">
	<Form.Field {form} name="tickerSymbol">
		<Form.Control let:attrs>
			{#if id}
				<Form.Label>Hi, {id}, here you can search by ticker name / symbol</Form.Label>
			{/if}
			{#if !id}
				<Form.Label>Login use search to find by ticker name / symbol</Form.Label>
			{/if}
			<Input {...attrs} bind:value={$formData.tickerSymbol} placeholder={`e.g. ${query || 'aapl'}`} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	{#if !id}
		<Tooltip.Root openDelay={100}>
			<Tooltip.Trigger asChild let:builder>
				<Button href="/login" builders={[builder]}>Search</Button>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>You will need to login first</p>
			</Tooltip.Content>
		</Tooltip.Root>
	{:else}
		<Form.Button>Search</Form.Button>
	{/if}

</form>