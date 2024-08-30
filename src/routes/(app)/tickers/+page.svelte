<script lang="ts">
	import { Button } from '../../../lib/components/ui/button';
	import { superForm } from 'sveltekit-superforms';
	import * as Card from "../../../lib/components/ui/card";
	import { Input } from '../../../lib/components/ui/input';
	import * as Tooltip from '../../../lib/components/ui/tooltip';
	import * as Table from "../../../lib/components/ui/table";
	import * as HoverCard from "../../../lib/components/ui/hover-card";
	import * as Drawer from "../../../lib/components/ui/drawer";
	import * as Form from "../../../lib/components/ui/form";
	import { CircleCheck } from 'lucide-svelte';

	let { data, form: actionForm } = $props();
	let submitted = $state(actionForm?.success)
	const form = superForm(data.form)
	const { form: formData, enhance, reset } = form;

	$effect(() => {
		submitted = actionForm?.success;
	})

</script>
<Card.Root class="mt-2">
	<Card.Header>
		<Card.Title>{`Tickers results for ${data.query?.toUpperCase()}`}</Card.Title>
		<Card.Description>We are showing you best matches. Use more precise search in case you cannot find your match.</Card.Description>
	</Card.Header>
	<Card.Content>
		{#if data.companies}
			<Table.Root>
				<Table.Caption>Select the ticker.</Table.Caption>
				<Table.Header>
					<Table.Row>
						<Table.Head>Name</Table.Head>
						<Table.Head>Symbol</Table.Head>
						<Table.Head>Currency</Table.Head>
						<Table.Head>Stock Exchange</Table.Head>
						<Table.Head>Price</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each data.companies as company, i (i)}
						<Table.Row>
							<Table.Cell class="font-medium"><HoverCard.Root>
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
							</HoverCard.Root></Table.Cell>
							<Table.Cell class="font-medium">{company.symbol}</Table.Cell>
							<Table.Cell class="font-medium">{company.currency}</Table.Cell>
							<Table.Cell class="font-medium">{company.exchangeShortName}</Table.Cell>
							<Table.Cell class="font-medium">{company.price}</Table.Cell>
							<Table.Cell class="font-medium">
								<Drawer.Root onClose={() => {
									reset()
									submitted = false;
								}}>
										{#if !data.user?.id}
											<Tooltip.Root openDelay={100}>
												<Tooltip.Trigger asChild let:builder>
													<Button variant="link" href="/login" builders={[builder]}>+ Add</Button>
												</Tooltip.Trigger>
											<Tooltip.Content>
												<p>You will need to login first</p>
											</Tooltip.Content>
											</Tooltip.Root>
											{:else}
									<Drawer.Trigger>+ Add</Drawer.Trigger>
										{/if}
									<Drawer.Content class="w-1/4 left-2/3">
										{#if !submitted}
										<Drawer.Header>
											<Drawer.Title>Add your position for {company.symbol}</Drawer.Title>
											<Drawer.Description>This position will be added in {company.currency} @{company.price}.</Drawer.Description>
										</Drawer.Header>
											<form method="POST" use:enhance id="plCalculation" action="?/plCalculation" class="p-4">
												<Form.Field {form} name="quantity">
													<Form.Control let:attrs>
														<Form.Label>How Many Shares you have</Form.Label>
														<Input {...attrs} type="number" bind:value={$formData.quantity} />
													</Form.Control>
													<Form.FieldErrors />
												</Form.Field>
												<Form.Field {form} name="breakEvenPrice">
													<Form.Control let:attrs>
														<Form.Label>What is your break even price</Form.Label>
														<Input {...attrs} type="number" step="0.00000001" bind:value={$formData.breakEvenPrice} />
													</Form.Control>
													<Form.FieldErrors />
												</Form.Field>
												<Form.Field {form} name="symbol">
													<Form.Control let:attrs>
														<Input {...attrs} type="hidden" value={company.symbol} />
													</Form.Control>
												</Form.Field>
											</form>
										<Drawer.Footer>
											<Button type="submit" form="plCalculation">Submit</Button>
											<Drawer.Close>Cancel (esc)</Drawer.Close>
										</Drawer.Footer>
											{:else}
											<Drawer.Header>
												<Drawer.Title>Your position for {company.symbol} has been added</Drawer.Title>
												<Drawer.Description>You added {actionForm?.form.data.quantity} shared @{actionForm?.form.data.breakEvenPrice} B/E price.</Drawer.Description>
											</Drawer.Header>
											<div class="min-h-[15.10rem] p-4 flex flex-col gap-16">
												<p>Your position been added.</p>
												<CircleCheck size="100" class="self-center" />
												<Input autofocus class="opacity-0" />
											</div>
											<Drawer.Footer>
												<Drawer.Close>Cancel (esc)</Drawer.Close>
											</Drawer.Footer>
										{/if}
									</Drawer.Content>
							</Drawer.Root>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		{/if}
	</Card.Content>
</Card.Root>