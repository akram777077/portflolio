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

	function handleQuickAction(action: string) {
		switch (action) {
			case 'schedule':
				// Open calendar booking (placeholder)
				window.open('#', '_blank');
				break;
			case 'resume':
				// Download CV
				const link = document.createElement('a');
				link.href = '/cv.pdf';
				link.download = 'Akram_Dris_CV.pdf';
				link.click();
				break;
			case 'chat':
				// Scroll to form
				document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
				break;
		}
	}
</script>

<section id="contact" class="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 relative overflow-hidden">
	<!-- Background Pattern -->
	<div class="absolute inset-0 opacity-5">
		<div class="absolute top-10 left-10 w-20 h-20 border-2 border-primary rounded-full"></div>
		<div class="absolute top-40 right-20 w-16 h-16 border-2 border-secondary rounded-full"></div>
		<div class="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-accent rounded-full"></div>
		<div class="absolute bottom-40 right-1/3 w-24 h-24 border-2 border-warning rounded-full"></div>
	</div>

	<div class="container mx-auto px-6 relative z-10">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-6xl font-bold mb-6 section-title">{contact.title}</h2>
			<div class="w-32 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mb-8"></div>
			<p class="text-xl md:text-2xl text-base-content/70 max-w-4xl mx-auto leading-relaxed">
				{contact.subtitle}
			</p>
		</div>

		<!-- Quick Actions -->
		<div use:scrollAnimation class="animate-on-scroll mb-16">
			<div class="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
				{#each contact.quickActions as action}
					<button 
						onclick={() => handleQuickAction(action.action)}
						class="card bg-base-100 shadow-xl hover-lift cursor-pointer group transition-all duration-300 hover:shadow-2xl"
					>
						<div class="card-body text-center p-8">
							<div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
								<i class="{action.icon} text-2xl text-primary"></i>
							</div>
							<h3 class="text-xl font-bold mb-2">{action.title}</h3>
							<p class="text-base-content/70">{action.description}</p>
						</div>
					</button>
				{/each}
			</div>
		</div>

		<!-- Main Content -->
		<div class="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
			<!-- Contact Info -->
			<div use:scrollAnimation class="animate-on-scroll space-y-8">
				<div class="card bg-base-100/80 backdrop-blur-sm shadow-2xl">
					<div class="card-body p-8">
						<h3 class="text-3xl font-bold mb-8 gradient-text">{contact.letsConnectTitle}</h3>
						<div class="space-y-6">
							{#each contact.connections as connection}
								<a 
									href={connection.link} 
									class="flex items-center gap-6 p-4 rounded-xl hover:bg-base-200 transition-all duration-300 group hover-lift"
								>
									<div class="w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
										<i class={connection.icon}></i>
									</div>
									<div>
										<h4 class="font-bold text-lg">{connection.name}</h4>
										<p class="text-base-content/70">{connection.value}</p>
									</div>
								</a>
							{/each}
						</div>

						<!-- Social Media -->
						<div class="mt-12 pt-8 border-t border-base-300">
							<h4 class="text-2xl font-bold mb-6 gradient-text">{contact.followMeTitle}</h4>
							<div class="flex gap-4">
								{#each contact.socials as social}
									<a 
										href={social.url} 
										class="btn btn-circle btn-lg bg-gradient-to-r from-primary to-secondary text-white hover:scale-110 transition-all duration-300 social-link shadow-lg" 
										aria-label={social.name}
									>
										<i class="{social.icon} text-xl"></i>
									</a>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Contact Form -->
			<div use:scrollAnimation class="animate-on-scroll">
				<div id="contact-form" class="card bg-base-100/80 backdrop-blur-sm shadow-2xl">
					<div class="card-body p-8">
						<h3 class="text-3xl font-bold mb-8 gradient-text">Send Me a Message</h3>
						
						{#if successMessage}
							<div class="alert alert-success mb-6 animate-in shadow-lg">
								<i class="fas fa-check-circle text-xl"></i>
								<span class="text-lg">{successMessage}</span>
							</div>
						{/if}
						{#if errorMessage}
							<div class="alert alert-error mb-6 animate-in shadow-lg">
								<i class="fas fa-exclamation-circle text-xl"></i>
								<span class="text-lg">{errorMessage}</span>
							</div>
						{/if}

						<form onsubmit={handleSubmit} class="space-y-6">
							<!-- Name Fields Row -->
							<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div class="form-control w-full">
									<label for="firstName" class="label">
										<span class="label-text font-semibold text-lg">{contact.form.firstName.label}</span>
									</label>
									<input
										type="text"
										id="firstName"
										name="firstName"
										placeholder={contact.form.firstName.placeholder}
										class="input input-bordered input-lg w-full focus:input-primary focus:border-primary transition-all duration-300 hover:border-primary/50"
										required
									/>
								</div>
								<div class="form-control w-full">
									<label for="lastName" class="label">
										<span class="label-text font-semibold text-lg">{contact.form.lastName.label}</span>
									</label>
									<input
										type="text"
										id="lastName"
										name="lastName"
										placeholder={contact.form.lastName.placeholder}
										class="input input-bordered input-lg w-full focus:input-primary focus:border-primary transition-all duration-300 hover:border-primary/50"
										required
									/>
								</div>
							</div>

							<!-- Email Field -->
							<div class="form-control w-full">
								<label for="email" class="label">
									<span class="label-text font-semibold text-lg">{contact.form.email.label}</span>
								</label>
								<input
									type="email"
									id="email"
									name="email"
									placeholder={contact.form.email.placeholder}
									class="input input-bordered input-lg w-full focus:input-primary focus:border-primary transition-all duration-300 hover:border-primary/50"
									required
								/>
							</div>

							<!-- Subject Field -->
							<div class="form-control w-full">
								<label for="subject" class="label">
									<span class="label-text font-semibold text-lg">{contact.form.subject.label}</span>
								</label>
								<input
									type="text"
									id="subject"
									name="subject"
									placeholder={contact.form.subject.placeholder}
									class="input input-bordered input-lg w-full focus:input-primary focus:border-primary transition-all duration-300 hover:border-primary/50"
									required
								/>
							</div>

							<!-- Message Field -->
							<div class="form-control w-full">
								<label for="message" class="label">
									<span class="label-text font-semibold text-lg">{contact.form.message.label}</span>
								</label>
								<textarea
									id="message"
									name="message"
									class="textarea textarea-bordered textarea-lg w-full focus:textarea-primary focus:border-primary h-40 transition-all duration-300 hover:border-primary/50 resize-none"
									placeholder={contact.form.message.placeholder}
									required
								></textarea>
							</div>

							<!-- Submit Button -->
							<button 
								type="submit" 
								class="btn btn-primary btn-lg w-full hover-lift text-lg shadow-lg bg-gradient-to-r from-primary to-secondary border-none transition-all duration-300 hover:shadow-xl hover:scale-[1.02]" 
								disabled={loading}
							>
								{#if loading}
									<span class="loading loading-spinner loading-md"></span>
									{contact.form.button.sending}
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

		<!-- Bottom CTA -->
		<div use:scrollAnimation class="animate-on-scroll text-center mt-16">
			<div class="card bg-gradient-to-r from-primary/10 to-secondary/10 shadow-xl">
				<div class="card-body p-12">
					<h3 class="text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
					<p class="text-xl text-base-content/70 mb-8">Let's discuss how we can bring your vision to life</p>
					<a href="#contact-form" class="btn btn-primary btn-lg hover-lift">
						<i class="fas fa-rocket mr-2"></i>
						{contact.cta}
					</a>
				</div>
			</div>
		</div>
	</div>
</section>