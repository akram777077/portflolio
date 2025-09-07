<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import projectsData from '$lib/data/projects.json' with { type: 'json' };
    import allProjectsData from '$lib/data/all_projects.json' with { type: 'json' };
    import ProjectDetailModal from '$lib/components/ProjectDetailModal.svelte';

    interface Project {
        title: string;
        slug: string;
        top?: number;
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

    // Filter out top projects for all-projects page (show only non-top projects)
    const nonTopProjects = allProjects.filter(project => !project.top);
    filteredProjects = nonTopProjects;

    let showModal = $state(false);
    let selectedProject: Project | null = $state(null);

    // Extract unique categories
    const allCategories = ['All', ...new Set(allProjects.flatMap(project => project.tags))];

    function filterProjects(category: string) {
        selectedCategory = category;
        const projectsToFilter = nonTopProjects; // Only filter non-top projects
        if (category === 'All') {
            filteredProjects = projectsToFilter;
        } else {
            filteredProjects = projectsToFilter.filter(project => project.tags.includes(category));
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
            localStorage.removeItem('lastSelectedProjectCategory');
        }
    });
</script>

<svelte:head>
    <title>All Projects - Portfolio</title>
    <meta name="description" content="Explore all my projects and technical achievements" />
</svelte:head>

<section class="min-h-screen bg-gradient-to-br from-base-100 via-primary/5 to-secondary/5 relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 opacity-5">
        <div class="absolute top-20 left-20 w-40 h-40 bg-primary rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-20 w-32 h-32 bg-secondary rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 left-1/4 w-24 h-24 bg-accent rounded-full blur-2xl"></div>
    </div>

    <div class="container mx-auto px-6 py-20 relative z-10">
        <!-- Header with Back Button -->
        <div class="flex items-center justify-between mb-12">
            <button 
                onclick={() => goto('/#projects')} 
                class="btn btn-ghost btn-circle btn-lg hover:btn-primary transition-all duration-300 hover:scale-110 shadow-lg" 
                aria-label="Go back to Home"
            >
                <i class="fas fa-arrow-left text-xl"></i>
            </button>
            <div class="text-center flex-1">
                <h1 class="text-4xl md:text-6xl font-bold mb-4 section-title">{allProjectsData.title}</h1>
                <div class="w-32 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto"></div>
            </div>
            <div class="w-16"></div> <!-- Spacer for centering -->
        </div>

        <!-- Enhanced Category Filter -->
        <div class="mb-16">
            <div class="card bg-base-100/80 backdrop-blur-sm shadow-xl border border-base-300/50">
                <div class="card-body p-8">
                    <h3 class="text-2xl font-bold text-center mb-6 gradient-text">Filter by Technology</h3>
                    <div class="flex flex-wrap justify-center gap-3">
                        {#each allCategories as category}
                            <button
                                class="btn {selectedCategory === category ? 'btn-primary shadow-lg scale-105' : 'btn-outline hover:btn-primary'} transition-all duration-300 hover:scale-105"
                                onclick={() => filterProjects(category)}
                            >
                                {category}
                                {#if category !== 'All'}
                                    <span class="badge badge-sm ml-2">
                                        {nonTopProjects.filter(p => p.tags.includes(category)).length}
                                    </span>
                                {/if}
                            </button>
                        {/each}
                    </div>
                </div>
            </div>
        </div>

        <!-- Projects Grid -->
        <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {#each filteredProjects as project, index}
                <div
                    class="card bg-base-100/80 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 border border-base-300/50 overflow-hidden group cursor-pointer"
                    role="button"
                    tabindex="0"
                    onclick={() => openProjectModal(project)}
                    onkeydown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            openProjectModal(project);
                        }
                    }}
                >
                    <!-- Project Image -->
                    <figure class="relative overflow-hidden h-56">
                        <img
                            src={project.imageUrl}
                            alt={project.title}
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <!-- Gradient Overlay -->
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <!-- Quick Actions -->
                        <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                            {#if project.liveUrl}
                                <a 
                                    href={project.liveUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    class="btn btn-primary btn-sm btn-circle shadow-lg hover:scale-110 transition-transform duration-300" 
                                    aria-label="Live Demo" 
                                    onclick={(e) => e.stopPropagation()}
                                >
                                    <i class="fas fa-external-link-alt text-sm"></i>
                                </a>
                            {/if}
                            {#if project.githubUrl}
                                <a 
                                    href={project.githubUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    class="btn btn-secondary btn-sm btn-circle shadow-lg hover:scale-110 transition-transform duration-300" 
                                    aria-label="GitHub" 
                                    onclick={(e) => e.stopPropagation()}
                                >
                                    <i class="fab fa-github text-sm"></i>
                                </a>
                            {/if}
                        </div>

                        <!-- Project Number -->
                        <div class="absolute top-4 left-4 w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                            {String(index + 1).padStart(2, '0')}
                        </div>

                        <!-- View Details Button -->
                        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                            <button class="btn btn-primary btn-sm shadow-lg">
                                <i class="fas fa-eye mr-2"></i>
                                View Details
                            </button>
                        </div>
                    </figure>

                    <!-- Project Content -->
                    <div class="card-body p-6">
                        <div class="flex items-start justify-between mb-3">
                            <h3 class="card-title text-xl gradient-text group-hover:scale-105 transition-transform duration-300">
                                {project.title}
                            </h3>
                            <div class="text-xs text-base-content/60">
                                {new Date(project.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                            </div>
                        </div>

                        <!-- Tech Stack -->
                        <div class="flex items-center gap-2 mb-3">
                            <i class="fas fa-code text-primary text-sm"></i>
                            <span class="text-sm text-base-content/70">{project.tech}</span>
                        </div>

                        <!-- Description -->
                        <p class="text-base-content/80 text-sm leading-relaxed mb-4 line-clamp-2">
                            {project.description}
                        </p>

                        <!-- Tags -->
                        <div class="flex flex-wrap gap-1 mb-4">
                            {#each project.tags.slice(0, 3) as tag}
                                <span class="badge badge-outline badge-xs hover:badge-primary transition-colors duration-300">
                                    {tag}
                                </span>
                            {/each}
                            {#if project.tags.length > 3}
                                <span class="badge badge-ghost badge-xs">
                                    +{project.tags.length - 3}
                                </span>
                            {/if}
                        </div>

                        <!-- Action Footer -->
                        <div class="flex items-center justify-between pt-2 border-t border-base-300/50">
                            <span class="text-xs text-base-content/60">Click to explore</span>
                            <i class="fas fa-arrow-right text-primary group-hover:translate-x-1 transition-transform duration-300"></i>
                        </div>
                    </div>
                </div>
            {/each}
        </div>

        <!-- Empty State -->
        {#if filteredProjects.length === 0}
            <div class="text-center py-20">
                <div class="card bg-base-100/80 backdrop-blur-sm shadow-xl border border-base-300/50 max-w-md mx-auto">
                    <div class="card-body p-12">
                        <i class="fas fa-search text-6xl text-base-content/30 mb-6"></i>
                        <h3 class="text-2xl font-bold mb-4">No Projects Found</h3>
                        <p class="text-base-content/70 mb-6">
                            No projects match the selected category. Try selecting a different filter.
                        </p>
                        <button 
                            onclick={() => filterProjects('All')} 
                            class="btn btn-primary"
                        >
                            Show All Projects
                        </button>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</section>

{#if showModal && selectedProject}
    <ProjectDetailModal project={selectedProject} on:close={closeProjectModal} />
{/if}