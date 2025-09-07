<script lang="ts">
	import { scrollAnimation } from '$lib/actions/scrollAnimation';

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

<section id="projects" class="py-20 bg-gradient-to-br from-base-100 via-primary/5 to-secondary/5 relative overflow-hidden">
	<!-- Background Elements -->
	<div class="absolute inset-0 opacity-10">
		<div class="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
		<div class="absolute bottom-20 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent rounded-full blur-3xl opacity-30"></div>
	</div>

	<div class="container mx-auto px-6 relative z-10">
		<div class="text-center mb-20">
			<h2 class="text-4xl md:text-6xl font-bold mb-6 section-title">{projectsOverview.title}</h2>
			<div class="w-32 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mb-8"></div>
			<p class="text-xl md:text-2xl text-base-content/70 max-w-4xl mx-auto leading-relaxed">
				Discover the innovative solutions I've crafted with cutting-edge technologies
			</p>
		</div>

		<!-- Featured Projects Grid -->
		<div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
			{#each projects.projects as project, index}
				<div use:scrollAnimation class="animate-on-scroll group">
					<div class="card bg-base-100/80 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-base-300/50 overflow-hidden">
						<!-- Project Image with Overlay -->
						<figure class="relative overflow-hidden h-64">
							<img
								src={project.imageUrl}
								alt={project.title}
								class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
							/>
							<!-- Gradient Overlay -->
							<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							
							<!-- Action Buttons -->
							<div class="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
								{#if project.liveUrl}
									<a 
										href={project.liveUrl} 
										target="_blank" 
										rel="noopener noreferrer" 
										class="btn btn-primary btn-circle btn-lg shadow-xl hover:scale-110 transition-transform duration-300"
										aria-label="Live Demo"
									>
										<i class="fas fa-external-link-alt text-lg"></i>
									</a>
								{/if}
								{#if project.githubUrl}
									<a 
										href={project.githubUrl} 
										target="_blank" 
										rel="noopener noreferrer" 
										class="btn btn-secondary btn-circle btn-lg shadow-xl hover:scale-110 transition-transform duration-300"
										aria-label="GitHub Repository"
									>
										<i class="fab fa-github text-lg"></i>
									</a>
								{/if}
							</div>

							<!-- Project Number Badge -->
							<div class="absolute top-4 left-4 w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
								{String(index + 1).padStart(2, '0')}
							</div>
						</figure>

						<!-- Project Content -->
						<div class="card-body p-8">
							<!-- Project Title -->
							<h3 class="card-title text-2xl mb-3 gradient-text group-hover:scale-105 transition-transform duration-300">
								{project.title}
							</h3>

							<!-- Tech Stack -->
							<div class="flex items-center gap-2 mb-4">
								<i class="fas fa-code text-primary"></i>
								<span class="text-sm font-medium text-base-content/70">{project.tech}</span>
							</div>

							<!-- Description -->
							<p class="text-base-content/80 leading-relaxed mb-6 line-clamp-3">
								{project.description}
							</p>

							<!-- Tags -->
							<div class="flex flex-wrap gap-2 mb-6">
								{#each project.tags.slice(0, 3) as tag}
									<span class="badge badge-outline badge-sm hover:badge-primary transition-colors duration-300">
										{tag}
									</span>
								{/each}
								{#if project.tags.length > 3}
									<span class="badge badge-ghost badge-sm">
										+{project.tags.length - 3} more
									</span>
								{/if}
							</div>

							<!-- Project Date -->
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-2 text-sm text-base-content/60">
									<i class="fas fa-calendar-alt"></i>
									<span>{new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
								</div>
								<button class="btn btn-ghost btn-sm group-hover:btn-primary transition-colors duration-300">
									Learn More
									<i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
								</button>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Call to Action -->
		<div use:scrollAnimation class="animate-on-scroll text-center">
			<div class="card bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 shadow-2xl border border-primary/20">
				<div class="card-body p-12">
					<div class="max-w-3xl mx-auto">
						<h3 class="text-3xl md:text-4xl font-bold mb-6 gradient-text">
							Ready to See More?
						</h3>
						<p class="text-xl text-base-content/70 mb-8 leading-relaxed">
							Explore my complete portfolio with detailed case studies, technical deep-dives, and behind-the-scenes insights into each project.
						</p>
						<div class="flex flex-col sm:flex-row gap-4 justify-center">
							<a 
								href="/all-projects" 
								class="btn btn-primary btn-lg hover-lift shadow-xl bg-gradient-to-r from-primary to-secondary border-none"
							>
								<i class="fas fa-rocket mr-2"></i>
								View All Projects
							</a>
							<a 
								href="#contact" 
								class="btn btn-outline btn-lg hover-lift"
							>
								<i class="fas fa-comments mr-2"></i>
								Let's Collaborate
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>