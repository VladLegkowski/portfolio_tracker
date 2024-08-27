<script lang="ts">
	import '../../../app.css';
	import { Button } from '../../../lib/components/ui/button';
	import * as Card from "../../../lib/components/ui/card";
	import * as Form from "../../../lib/components/ui/form";
	import { Input } from "../../../lib/components/ui/input";
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();
	const form = superForm(data.form);
	const { form: formData, enhance } = form;
</script>

<Card.Root class="m-10 max-w-xl">
	<Card.Header>
		<Card.Title>
			Signup form
		</Card.Title>
		<Card.Description>
			No email will be sent, remember your logins!
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance action="?/signup">
			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label>Email address</Form.Label>
					<Input {...attrs} bind:value={$formData.email} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="password">
				<Form.Control let:attrs>
					<Form.Label>Password</Form.Label>
					<Input {...attrs} type="password" bind:value={$formData.password} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button>Submit</Form.Button>
		</form>
		<Button variant="link" href="/login" class="pl-0">Already have an account?</Button>
	</Card.Content>
</Card.Root>