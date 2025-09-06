<script lang="ts">
	import { scrollAnimation } from '$lib/actions/scrollAnimation';

	let { about } = $props<{ about: any }>();
</script>

<section id="about" class="py-20 bg-base-100">
	<div class="container mx-auto px-6">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold mb-4 section-title">{about.title}</h2>
			<div class="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
		</div>
		<div class="grid lg:grid-cols-2 gap-12 items-center">
			<div use:scrollAnimation class="animate-on-scroll">
				<img
					src={about.imageUrl}
					alt="About me"
					class="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
				/>
			</div>
			<div use:scrollAnimation class="animate-on-scroll">
				<h3 class="text-2xl font-semibold mb-6">{about.greeting}</h3>
				<p class="text-lg mb-6 leading-relaxed">
					{about.description1}
				</p>
				<p class="text-lg mb-8 leading-relaxed">
					{about.description2}
				</p>
				<div class="flex flex-wrap gap-4">
					{#each about.stats as stat}
						<div class="stat bg-base-200 rounded-xl p-4 flex-1 min-w-32">
							<div class="stat-value text-primary">{stat.value}</div>
							<div class="stat-title">{stat.title}</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
