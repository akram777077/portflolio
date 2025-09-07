<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';

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

    let { project } = $props<{ project: Project }>();
    let currentImageIndex = $state(0);
    let carouselElement: HTMLDivElement | null = $state(null);

    const dispatch = createEventDispatcher();

    function closeModal() {
        dispatch('close');
    }

    function nextImage() {
        if (project.images && project.images.length > 0) {
            currentImageIndex = (currentImageIndex + 1) % project.images.length;
            updateCarouselPosition();
        }
    }

    function prevImage() {
        if (project.images && project.images.length > 0) {
            currentImageIndex = (currentImageIndex - 1 + project.images.length) % project.images.length;
            updateCarouselPosition();
        }
    }

    function goToImage(index: number) {
        currentImageIndex = index;
        updateCarouselPosition();
    }

    function updateCarouselPosition() {
        if (carouselElement) {
            carouselElement.scrollTo({
                left: currentImageIndex * carouselElement.clientWidth,
                behavior: 'smooth'
            });
        }
    }

    onMount(() => {
        let timeout: ReturnType<typeof setTimeout>;

        const handleScroll = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (carouselElement) {
                    const scrollLeft = carouselElement.scrollLeft;
                    const clientWidth = carouselElement.clientWidth;
                    currentImageIndex = Math.round(scrollLeft / clientWidth);
                }
            }, 100);
        };

        carouselElement?.addEventListener('scroll', handleScroll);

        // Handle keyboard navigation
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        };

        document.addEventListener('keydown', handleKeydown);

        return () => {
            carouselElement?.removeEventListener('scroll', handleScroll);
            document.removeEventListener('keydown', handleKeydown);
        };
    });
</script>

<div class="modal modal-open backdrop-blur-sm">
    <div class="modal-box w-11/12 max-w-6xl max-h-[90vh] bg-base-100/95 backdrop-blur-md border border-base-300/50 shadow-3xl relative overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-5">
            <div class="absolute top-10 right-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
            <div class="absolute bottom-10 left-10 w-24 h-24 bg-secondary rounded-full blur-2xl"></div>
        </div>

        <!-- Close Button -->
        <button 
            onclick={closeModal} 
            class="btn btn-circle btn-ghost absolute top-4 right-4 z-20 hover:btn-error transition-colors duration-300 shadow-lg"
            aria-label="Close modal"
        >
            <i class="fas fa-times text-xl"></i>
        </button>

        <div class="relative z-10 overflow-y-auto max-h-[85vh] custom-scrollbar">
            <!-- Project Header -->
            <div class="mb-8">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                        <h3 class="text-3xl md:text-4xl font-bold gradient-text mb-2">{project.title}</h3>
                        <div class="flex items-center gap-4 text-base-content/70">
                            <div class="flex items-center gap-2">
                                <i class="fas fa-calendar-alt text-primary"></i>
                                <span>{new Date(project.date).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <i class="fas fa-code text-secondary"></i>
                                <span>{project.tech}</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="flex gap-3">
                        {#if project.liveUrl}
                            <a 
                                href={project.liveUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                class="btn btn-primary shadow-lg hover:scale-105 transition-transform duration-300"
                            >
                                <i class="fas fa-external-link-alt mr-2"></i>
                                {project.details.live_demo_button}
                            </a>
                        {/if}
                        {#if project.githubUrl}
                            <a 
                                href={project.githubUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                class="btn btn-secondary shadow-lg hover:scale-105 transition-transform duration-300"
                            >
                                <i class="fab fa-github mr-2"></i>
                                {project.details.github_repo_button}
                            </a>
                        {/if}
                    </div>
                </div>

                <!-- Divider -->
                <div class="w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>

            <!-- Image Carousel -->
            {#if project.images && project.images.length > 0}
                <div class="mb-8">
                    <div class="card bg-base-200/50 shadow-xl overflow-hidden">
                        <div class="relative">
                            <div class="carousel w-full rounded-lg" bind:this={carouselElement}>
                                {#each project.images as image, i}
                                    <div class="carousel-item w-full">
                                        <img 
                                            src={image} 
                                            class="w-full h-80 md:h-96 object-cover" 
                                            alt="{project.title} - Image {i + 1}" 
                                        />
                                    </div>
                                {/each}
                            </div>
                            
                            <!-- Navigation Arrows -->
                            {#if project.images.length > 1}
                                <div class="absolute inset-y-0 left-0 flex items-center">
                                    <button 
                                        onclick={prevImage} 
                                        class="btn btn-circle btn-primary ml-4 shadow-lg hover:scale-110 transition-transform duration-300"
                                        aria-label="Previous image"
                                    >
                                        <i class="fas fa-chevron-left"></i>
                                    </button>
                                </div>
                                <div class="absolute inset-y-0 right-0 flex items-center">
                                    <button 
                                        onclick={nextImage} 
                                        class="btn btn-circle btn-primary mr-4 shadow-lg hover:scale-110 transition-transform duration-300"
                                        aria-label="Next image"
                                    >
                                        <i class="fas fa-chevron-right"></i>
                                    </button>
                                </div>
                            {/if}

                            <!-- Image Counter -->
                            <div class="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                                {currentImageIndex + 1} / {project.images.length}
                            </div>
                        </div>

                        <!-- Thumbnail Navigation -->
                        {#if project.images.length > 1}
                            <div class="p-4">
                                <div class="flex justify-center gap-2 overflow-x-auto pb-2">
                                    {#each project.images as image, i}
                                        <button 
                                            onclick={() => goToImage(i)} 
                                            class="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 {currentImageIndex === i ? 'border-primary shadow-lg scale-110' : 'border-transparent hover:border-primary/50'}"
                                        >
                                            <img 
                                                src={image} 
                                                alt="Thumbnail {i + 1}" 
                                                class="w-full h-full object-cover"
                                            />
                                        </button>
                                    {/each}
                                </div>
                            </div>
                        {/if}
                    </div>
                </div>
            {/if}

            <!-- Project Content Grid -->
            <div class="grid lg:grid-cols-2 gap-8">
                <!-- Description & Details -->
                <div class="space-y-6">
                    <!-- Description -->
                    <div class="card bg-base-200/50 shadow-lg">
                        <div class="card-body">
                            <h4 class="text-2xl font-bold mb-4 flex items-center gap-2">
                                <i class="fas fa-info-circle text-primary"></i>
                                Project Overview
                            </h4>
                            <p class="text-lg leading-relaxed text-base-content/80">
                                {project.description}
                            </p>
                        </div>
                    </div>

                    <!-- Technologies -->
                    <div class="card bg-base-200/50 shadow-lg">
                        <div class="card-body">
                            <h4 class="text-2xl font-bold mb-4 flex items-center gap-2">
                                <i class="fas fa-cogs text-secondary"></i>
                                {project.details.technologies_title}
                            </h4>
                            <div class="flex flex-wrap gap-2">
                                {#each project.tags as tag}
                                    <span class="badge badge-primary badge-lg shadow-sm hover:scale-105 transition-transform duration-300">
                                        {tag}
                                    </span>
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Performance & Statistics -->
                <div class="space-y-6">
                    <div class="card bg-gradient-to-br from-primary/10 to-secondary/10 shadow-lg border border-primary/20">
                        <div class="card-body">
                            <h4 class="text-2xl font-bold mb-4 flex items-center gap-2">
                                <i class="fas fa-chart-line text-accent"></i>
                                {project.details.performance_title}
                            </h4>
                            <p class="text-base-content/70 mb-6 leading-relaxed">
                                {project.details.performance_description}
                            </p>
                            
                            <!-- Statistics Cards -->
                            <div class="space-y-3">
                                {#each project.details.statistics as statistic}
                                    <div class="flex items-center gap-3 p-3 bg-base-100/50 rounded-lg">
                                        <div class="w-2 h-2 bg-primary rounded-full"></div>
                                        <span class="text-base-content/80">{statistic}</span>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>

                    <!-- Quick Actions -->
                    <div class="card bg-base-200/50 shadow-lg">
                        <div class="card-body">
                            <h4 class="text-xl font-bold mb-4">Quick Actions</h4>
                            <div class="space-y-3">
                                {#if project.liveUrl}
                                    <a 
                                        href={project.liveUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        class="btn btn-primary w-full justify-start shadow-sm hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <i class="fas fa-external-link-alt mr-3"></i>
                                        Visit Live Demo
                                    </a>
                                {/if}
                                {#if project.githubUrl}
                                    <a 
                                        href={project.githubUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        class="btn btn-secondary w-full justify-start shadow-sm hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <i class="fab fa-github mr-3"></i>
                                        View Source Code
                                    </a>
                                {/if}
                                <button 
                                    onclick={closeModal}
                                    class="btn btn-outline w-full justify-start"
                                >
                                    <i class="fas fa-arrow-left mr-3"></i>
                                    Back to Projects
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 3px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, hsl(var(--p)), hsl(var(--s)));
        border-radius: 3px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, hsl(var(--pf)), hsl(var(--sf)));
    }

    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>