<script lang="ts">
	import { scrollAnimation } from '$lib/actions/scrollAnimation';

	let { education } = $props<{ education: any }>();
</script>

<section id="education" class="py-20 bg-base-200">
	<div class="container mx-auto px-6">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold mb-4 section-title">{education.title}</h2>
			<div class="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
		</div>
		<div class="max-w-4xl mx-auto">
			<div class="timeline timeline-vertical">
				{#each education.history as item}
					<div use:scrollAnimation class="timeline-item animate-on-scroll">
						<div class="timeline-marker {item.markerColor}"></div>
						<div class="timeline-content">
							<div class="card bg-base-100 shadow-xl hover-lift">
								<div class="card-body">
									<h3 class="card-title text-primary">{item.degree}</h3>
									<p class="text-secondary font-semibold">{item.university}</p>
									<p class="text-sm opacity-70">{item.period}</p>
									<p class="mt-2">{item.description}</p>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
