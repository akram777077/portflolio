<script lang="ts">
    import { goto } from '\$app/navigation';
    import { onMount } from 'svelte';
    import projectsData from '\$lib/data/projects.json' with { type: 'json' };
    import allProjectsData from '\$lib/data/all_projects.json' with { type: 'json' };
    import ProjectDetailModal from '\$lib/components/ProjectDetailModal.svelte';

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
        details: any;
    }

    let allProjects: Project[] = projectsData.projects;
    let filteredProjects: Project[] = $state(allProjects);
    let selectedCategory = $state('All');

    let showModal = $state(false);
    let selectedProject: Project | null = $state(null);

    // Extract unique categories
    const allCategories = ['All', ...new Set(allProjects.flatMap(project => project.tags))];

    function filterProjects(category: string) {
        selectedCategory = category;
        if (category === 'All') {
            filteredProjects = allProjects;
        } else {
            filteredProjects = allProjects.filter(project => project.tags.includes(category));
        }
    }

    function openProjectModal(project: Project) {
        selectedProject = project;
        showModal = true;
    }

    function closeProjectModal() {
        showModal = false;
        selectedProject = null;
    }

    onMount(() => {
        const savedCategory = localStorage.getItem('lastSelectedProjectCategory');
        if (savedCategory) {
            filterProjects(savedCategory);
            localStorage.removeItem('lastSelectedProjectCategory'); // Clear after use
        }
    });
</script>

<section class="py-20 bg-base-200 min-h-screen">
    <div class="container mx-auto px-6 relative">
        <button onclick={() => goto('/#projects')} class="btn btn-ghost btn-circle absolute top-4 left-4 z-10" aria-label="Go back to Home">
            <i class="fas fa-arrow-left text-xl"></i>
        </button>
        <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold mb-4 section-title">{allProjectsData.title}</h2>
            <div class="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>

        <!-- Category Filter Buttons -->
        <div class="flex flex-wrap justify-center gap-4 mb-10">
            {#each allCategories as category}
                <button
                    class="btn {selectedCategory === category ? 'btn-primary' : 'btn-outline'}"
                    onclick={() => filterProjects(category)}
                >
                    {category}
                </button>
            {/each}
        </div>

        <!-- Project Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each filteredProjects as project}
                <div
                    class="card bg-base-100 shadow-xl hover-lift project-card cursor-pointer"
                    role="button"
                    tabindex="0"
                    onclick={() => openProjectModal(project)}
                    onkeydown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            openProjectModal(project);
                        }
                    }}
                >
                    <figure class="relative overflow-hidden">
                        <img
                            src={project.imageUrl}
                            alt={project.title}
                            class="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end"
                        >
                            <div class="p-4 text-white">
                                <div class="flex gap-2">
                                    {#if project.liveUrl}
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-circle btn-primary" aria-label="Live Demo" onclick={(e) => e.stopPropagation()}>
                                        <i class="fas fa-external-link-alt"></i>
                                    </a>
                                    {/if}
                                    {#if project.githubUrl}
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-circle btn-secondary" aria-label="GitHub" onclick={(e) => e.stopPropagation()}>
                                        <i class="fab fa-github"></i>
                                    </a>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    </figure>
                    <div class="card-body">
                        <h3 class="card-title text-primary">{project.title}</h3>
                        <p class="text-sm opacity-70 mb-3">{project.tech}</p>
                        <p>{project.description}</p>
                        <div class="card-actions justify-end mt-4">
                            {#each project.tags as tag}
                                <div class="badge badge-outline">{tag}</div>
                            {/each}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

{#if showModal && selectedProject}
    <ProjectDetailModal project={selectedProject} on:close={closeProjectModal} />
{/if}
