<script lang="ts">
	import { scrollAnimation } from '$lib/actions/scrollAnimation';

	let { problemSolving } = $props<{ problemSolving: any }>();
</script>

<section id="problem-solving" class="py-20 bg-gradient-to-br from-base-100 to-base-200">
	<div class="container mx-auto px-6">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold mb-4 section-title">{problemSolving.title}</h2>
			<div class="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
			<p class="text-xl text-base-content/70 max-w-3xl mx-auto">{problemSolving.subtitle}</p>
		</div>

		<div class="max-w-4xl mx-auto mb-16">
			<div use:scrollAnimation class="animate-on-scroll text-center">
				<p class="text-lg leading-relaxed mb-8">{problemSolving.description}</p>
			</div>
		</div>

		<!-- Problem Solving Areas -->
		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
			{#each problemSolving.areas as area}
				<div use:scrollAnimation class="card bg-base-100 shadow-xl hover-lift animate-on-scroll group">
					<div class="card-body text-center p-8">
						<div class="transition-transform duration-300 group-hover:scale-110">
							<i class={area.icon}></i>
						</div>
						<h3 class="card-title justify-center text-xl mb-4">{area.title}</h3>
						<p class="text-base-content/70 mb-6">{area.description}</p>
						<div class="space-y-2">
							{#each area.examples as example}
								<div class="badge badge-outline badge-sm">{example}</div>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Achievements Stats -->
		<div use:scrollAnimation class="animate-on-scroll">
			<div class="card bg-gradient-to-r from-primary/10 to-secondary/10 shadow-xl">
				<div class="card-body">
					<h3 class="text-2xl font-bold text-center mb-8">Key Achievements</h3>
					<div class="grid md:grid-cols-3 gap-8">
						{#each problemSolving.achievements as achievement}
							<div class="text-center">
								<div class="text-4xl font-bold gradient-text mb-2">{achievement.metric}</div>
								<div class="text-lg font-semibold mb-1">{achievement.label}</div>
								<div class="text-sm text-base-content/70">{achievement.description}</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>