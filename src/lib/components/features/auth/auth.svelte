<script lang="ts">
	import { goto } from '$app/navigation';
	import { Toaster } from '$lib/components/ui/sonner';
	import { Button } from '$lib/components/ui/button';
	import type { User } from 'lucia';
	import { toast } from 'svelte-sonner';

	type Props = {
		user: User | null | undefined;
	}

	let { user }: Props = $props();

	$effect(() => {
		if (!user) {
			toast.info('This is a demo view', {
				description: 'You need to be logged in to use the app',
				action: {
					label: 'Login',
					onClick: () => goto('/login')
				}
			})
		}
	})

</script>

<nav class="flex justify-end p-8">
	{#if !user}
		<Toaster />
		<Button href="/login">Login</Button>
		<Button href="/signup" variant="link">Signup</Button>
	{:else}
		<Button href="logout" variant="ghost">Logout</Button>
	{/if}
</nav>
