<script lang="ts">
	import { scrollAnimation } from '$lib/actions/scrollAnimation';
	import { goto } from '\$app/navigation';

	interface Project {
		title: string;
		slug: string;
		imageUrl: string;
		tech: string;
		description: string;
		liveUrl: string;
		githubUrl: string;
		tags: string[];
		date: string;
		images: string[];
	}

	let { projects, projectsOverview } = $props<{
		projects: { projects: Project[] };
		projectsOverview: any;
	}>();
</script>

<section id="projects" class="py-20 bg-base-200">
	<div class="container mx-auto px-6">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold mb-4 section-title">{projectsOverview.title}</h2>
			<div class="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
		</div>
		<div class="grid lg:grid-cols-2 gap-12 items-center">
			<div use:scrollAnimation class="animate-on-scroll">
				<img
					src={projectsOverview.imageUrl}
					alt="Projects Overview"
					class="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
				/>
			</div>
			<div use:scrollAnimation class="animate-on-scroll">
				<h3 class="text-2xl font-semibold mb-6">{projectsOverview.title}</h3>
				<p class="text-lg mb-6 leading-relaxed">
					{projectsOverview.description1}
				</p>
				<p class="text-lg mb-8 leading-relaxed">
					{projectsOverview.description2.replace('{projectsCount}', projects.projects.length)}
				</p>
				<a href="/all-projects" class="btn btn-primary btn-lg">See All Projects</a>
			</div>
		</div>
	</div>
</section>
