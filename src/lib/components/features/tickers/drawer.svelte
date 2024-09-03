<script lang="ts">
import { CircleCheck } from 'lucide-svelte';
import { Button } from '$lib/components/ui/button';
import { Input } from '$lib/components/ui/input';

import * as Drawer from '$lib/components/ui/drawer';
import * as Form from '$lib/components/ui/form';
import * as Tooltip from '$lib/components/ui/tooltip';
import { superForm } from 'sveltekit-superforms';
import type { Company, Data } from '$lib/types';
import type { ActionData } from '../../../../../.svelte-kit/types/src/routes/(app)/tickers/$types';

type Props = {
	data: Data;
	actionForm: ActionData;
	company: Company;
}

let { data, company, actionForm }: Props = $props();

const form = superForm(data.form)
const { form: formData, enhance, reset } = form;

let submitted = $state(actionForm?.success)

$effect(() => {
	submitted = actionForm?.success;
})

</script>

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