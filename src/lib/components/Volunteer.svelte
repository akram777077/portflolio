<script lang="ts">
	import { scrollAnimation } from '$lib/actions/scrollAnimation';

	let { volunteer } = $props<{ volunteer: any }>();
</script>

<section id="volunteer" class="py-20 bg-base-100">
	<div class="container mx-auto px-6">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold mb-4 section-title">{volunteer.title}</h2>
			<div class="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
		</div>
		<div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
			{#each volunteer.experiences as experience}
				<div use:scrollAnimation class="card bg-base-200 shadow-xl hover-lift animate-on-scroll">
					<div class="card-body">
						<div class="flex items-center mb-4">
							<i class={experience.icon}></i>
							<div>
								<h3 class="card-title">{experience.title}</h3>
								<p class="text-sm opacity-70">{experience.organization}</p>
							</div>
						</div>
						<p>{experience.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
