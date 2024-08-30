<script lang="ts">
	import '../../app.css';
	import { Button } from '../../lib/components/ui/button';
	import { Input } from '../../lib/components/ui/input';
	import * as Form from "../../lib/components/ui/form";
	import * as Table from "../../lib/components/ui/table";
	import * as Card from "../../lib/components/ui/card";
	import * as Tooltip from "../../lib/components/ui/tooltip";
	import { superForm } from 'sveltekit-superforms';

	let { data, children } = $props();
	const form = superForm(data.form);
	const { form: formData } = form;
</script>

<style></style>

<nav class="flex justify-end p-8">
	{#if !data?.user}
		<Button href="/login">Login</Button>
		<Button href="/signup" variant="link">Signup</Button>
	{:else if data?.user}
		<Button href="logout" variant="ghost">Logout</Button>
	{/if}
</nav>
<div class="p-12 pt-0">
	<form method="POST" action="?/tickers">
		<Form.Field {form} name="tickerSymbol">
			<Form.Control let:attrs>
				{#if data.user?.id}
				<Form.Label>Hi, {data.user?.id}, here you can search by ticker name / symbol</Form.Label>
				{/if}
				{#if !data.user?.id}
					<Form.Label>Login use search to find by ticker name / symbol</Form.Label>
				{/if}
					<Input {...attrs} bind:value={$formData.tickerSymbol} placeholder={`e.g. ${data.query || 'tesco'}`} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

			{#if !data.user?.id}
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
