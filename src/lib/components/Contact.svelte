<script lang="ts">
	import { scrollAnimation } from '$lib/actions/scrollAnimation';

	let { contact } = $props<{ contact: any }>();

	let loading = $state(false);
	let successMessage = $state('');
	let errorMessage = $state('');

	async function handleSubmit(event: Event) {
        event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		loading = true;
		successMessage = '';
		errorMessage = '';

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 2000));
			successMessage = contact.successMessage;
			form.reset();
		} catch (error) {
			errorMessage = contact.errorMessage;
		} finally {
			loading = false;
		}
	}
</script>

<section id="contact" class="py-20 bg-base-200">
	<div class="container mx-auto px-6">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold mb-4 section-title">{contact.title}</h2>
			<div class="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
			<p class="text-lg mt-6 max-w-2xl mx-auto">
				{contact.subtitle}
			</p>
		</div>
		<div class="card bg-base-100 shadow-xl p-8 md:p-12 max-w-6xl mx-auto">
		<div class="grid lg:grid-cols-2 gap-12">
			<!-- Contact Info -->
			<div use:scrollAnimation class="animate-on-scroll">
				<h3 class="text-2xl font-semibold mb-8">{contact.letsConnectTitle}</h3>
				<div class="space-y-6">
					{#each contact.connections as connection}
						<div class="flex items-center gap-4 hover-lift">
							<div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
								<i class={connection.icon}></i>
							</div>
							<div>
								<h4 class="font-semibold">{connection.name}</h4>
								<p class="opacity-70">{connection.value}</p>
							</div>
						</div>
					{/each}
				</div>

				<!-- Social Media -->
				<div class="mt-12">
					<h4 class="text-xl font-semibold mb-6">{contact.followMeTitle}</h4>
					<div class="flex gap-4">
						{#each contact.socials as social}
							<a href={social.url} class="btn btn-circle btn-primary hover-lift social-link" aria-label={social.name}>
								<i class={social.icon}></i>
							</a>
						{/each}
					</div>
				</div>
			</div>

			<!-- Contact Form -->
			<div use:scrollAnimation class="animate-on-scroll card bg-base-200 shadow-xl p-8">
				{#if successMessage}
					<div class="alert alert-success mb-6 animate-in">
						<i class="fas fa-check-circle"></i>
						<span>{successMessage}</span>
					</div>
				{/if}
				{#if errorMessage}
					<div class="alert alert-error mb-6 animate-in">
						<i class="fas fa-exclamation-circle"></i>
						<span>{errorMessage}</span>
					</div>
				{/if}
				<form onsubmit={handleSubmit} class="space-y-6">
					<div class="grid md:grid-cols-2 gap-6">
						<div class="form-control">
							<label for="firstName" class="label">
								<span class="label-text font-medium">{contact.form.firstName.label}</span>
							</label>
							<input
								type="text"
								id="firstName"
								name="firstName"
								placeholder={contact.form.firstName.placeholder}
								class="input input-bordered focus:input-primary"
								required
							/>
						</div>
						<div class="form-control">
							<label for="lastName" class="label">
								<span class="label-text font-medium">{contact.form.lastName.label}</span>
							</label>
							<input
								type="text"
								id="lastName"
								name="lastName"
								placeholder={contact.form.lastName.placeholder}
								class="input input-bordered focus:input-primary"
								required
							/>
						</div>
					</div>
					<div class="form-control">
						<label for="email" class="label">
							<span class="label-text font-medium">{contact.form.email.label}</span>
						</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder={contact.form.email.placeholder}
							class="input input-bordered focus:input-primary"
							required
						/>
					</div>
					<div class="form-control">
						<label for="subject" class="label">
							<span class="label-text font-medium">{contact.form.subject.label}</span>
						</label>
						<input
							type="text"
							id="subject"
							name="subject"
							placeholder={contact.form.subject.placeholder}
							class="input input-bordered focus:input-primary"
							required
						/>
					</div>
					<div class="form-control">
						<label for="message" class="label">
							<span class="label-text font-medium">{contact.form.message.label}</span>
						</label>
						<textarea
							id="message"
							name="message"
							class="textarea textarea-bordered focus:textarea-primary h-32"
							placeholder={contact.form.message.placeholder}
							required
						></textarea>
					</div>
					<button type="submit" class="btn btn-primary btn-block hover-lift" disabled={loading}>
						{#if loading}
							<i class="fas fa-spinner fa-spin mr-2"></i>{contact.form.button.sending}
						{:else}
							<i class="fas fa-paper-plane mr-2"></i>
							{contact.form.button.send}
						{/if}
					</button>
				</form>
			</div>
		</div>
	</div>
</div>
</section>
