<script lang="ts">
	import ScrollProgress from '$lib/components/ScrollProgress.svelte';
	import { scrollAnimation } from '$lib/actions/scrollAnimation';

	let { skills } = $props<{ skills: any }>();
</script>

<section id="skills" class="py-20 bg-base-100">
	<div class="container mx-auto px-6">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold mb-4 section-title">{skills.title}</h2>
			<div class="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
		</div>
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each skills.categories as category}
				<div use:scrollAnimation class="card bg-base-200 shadow-xl hover-lift animate-on-scroll">
					<div class="card-body text-center">
						<i class={category.icon}></i>
						<h3 class="card-title justify-center">{category.name}</h3>
						<div class="flex flex-wrap gap-2 justify-center mt-4">
							{#each category.skills as skill}
								<div class="badge {category.badgeColor}">{skill}</div>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>

		<div class="mt-16 max-w-3xl mx-auto">
			<h3 class="text-2xl font-semibold mb-8 text-center">Proficiency Levels</h3>
			<div class="space-y-6">
				{#each skills.proficiencies as proficiency}
					<div use:scrollAnimation class="animate-on-scroll">
						<div class="flex justify-between mb-2">
							<span class="font-medium">{proficiency.name}</span>
							<span class="text-sm opacity-70">{proficiency.level}%</span>
						</div>
						<ScrollProgress level={proficiency.level} progressColor={proficiency.progressColor} />
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
