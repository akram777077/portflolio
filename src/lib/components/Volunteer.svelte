<script lang="ts">
	import { scrollAnimation } from '$lib/actions/scrollAnimation';

	let { volunteer } = $props<{ volunteer: any }>();
</script>

<section id="volunteer" class="py-20 bg-base-100">
	<div class="container mx-auto px-6">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold mb-4 section-title">{volunteer.title}</h2>
			<div class="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
			<p class="text-xl text-base-content/70 max-w-3xl mx-auto">{volunteer.subtitle}</p>
		</div>

		<div class="space-y-12 max-w-6xl mx-auto">
			{#each volunteer.experiences as experience, index}
				<div use:scrollAnimation class="animate-on-scroll">
					<div class="card bg-gradient-to-r from-base-200 to-base-300 shadow-xl hover-lift">
						<div class="card-body p-8">
							<div class="flex flex-col lg:flex-row gap-8">
								<!-- Icon and Title Section -->
								<div class="flex-shrink-0 text-center lg:text-left">
									<div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-base-100 shadow-lg mb-4">
										<i class={experience.icon}></i>
									</div>
									<div class="lg:w-48">
										<h3 class="text-xl font-bold mb-2">{experience.title}</h3>
										<p class="text-sm font-semibold text-primary mb-1">{experience.organization}</p>
										<p class="text-xs text-base-content/60">{experience.period}</p>
									</div>
								</div>

								<!-- Content Section -->
								<div class="flex-1">
									<p class="text-lg mb-6 leading-relaxed">{experience.description}</p>
									
									<!-- Achievements -->
									<div class="mb-6">
										<h4 class="font-semibold mb-3 text-primary">Key Achievements:</h4>
										<div class="grid md:grid-cols-3 gap-4">
											{#each experience.achievements as achievement}
												<div class="flex items-center gap-2">
													<i class="fas fa-check-circle text-success text-sm"></i>
													<span class="text-sm">{achievement}</span>
												</div>
											{/each}
										</div>
									</div>

									<!-- Technologies -->
									<div>
										<h4 class="font-semibold mb-3 text-secondary">Technologies & Skills:</h4>
										<div class="flex flex-wrap gap-2">
											{#each experience.technologies as tech}
												<span class="badge badge-outline badge-sm">{tech}</span>
											{/each}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>