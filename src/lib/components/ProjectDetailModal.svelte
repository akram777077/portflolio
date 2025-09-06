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
    let carouselElement: HTMLDivElement|null = $state(null);

    const dispatch = createEventDispatcher();

    function closeModal() {
        dispatch('close');
    }

    function nextImage() {
        if (project.images && project.images.length > 0) {
            currentImageIndex = (currentImageIndex + 1) % project.images.length;
            carouselElement?.scrollBy({ left: carouselElement?.clientWidth, behavior: 'smooth' });
        }
    }

    function prevImage() {
        if (project.images && project.images.length > 0) {
            currentImageIndex = (currentImageIndex - 1 + project.images.length) % project.images.length;
            carouselElement?.scrollBy({ left: -carouselElement.clientWidth, behavior: 'smooth' });
        }
    }

    onMount(() => {
        let timeout: ReturnType<typeof setTimeout>;

        const handleScroll = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                const scrollLeft = Number(carouselElement?.scrollLeft)
                const clientWidth = Number(carouselElement?.clientWidth);
                currentImageIndex = Math.round(scrollLeft / clientWidth);
            }, 100); // Debounce for 100ms
        };

        carouselElement?.addEventListener('scroll', handleScroll);

        return () => {
            carouselElement?.removeEventListener('scroll', handleScroll);
        };
    });
</script>

<div class="modal modal-open">
    <div class="modal-box w-11/12 max-w-5xl relative">
        <button onclick={closeModal} class="btn btn-sm btn-circle btn-ghost absolute top-4 right-4">
            ✕
        </button>
        <h3 class="font-bold text-3xl mb-4">{project.title}</h3>
        <p class="text-sm opacity-70 mb-4">{project.date}</p>

        <!-- Image Carousel -->
        {#if project.images && project.images.length > 0}
            <div class="carousel w-full rounded-box mb-6 relative" bind:this={carouselElement}>
                {#each project.images as image, i}
                    <div id="modal-slide{i + 1}" class="carousel-item w-full">
                        <img src={image} class="w-full object-cover h-80" alt={project.title} />
                    </div>
                {/each}
                <!-- Navigation Buttons (outside each loop) -->
                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <button onclick={prevImage} class="btn btn-circle">❮</button>
                    <button onclick={nextImage} class="btn btn-circle">❯</button>
                </div>
            </div>
            <!-- Pagination Bubbles -->
            <div class="flex justify-center w-full py-2 gap-2">
                {#each project.images as _, i}
                    <button onclick={() => { currentImageIndex = i; carouselElement?.scrollTo({ left: i * carouselElement.clientWidth, behavior: 'smooth' }); }} class="btn btn-xs btn-circle {currentImageIndex === i ? 'btn-primary' : ''}">
                        {i + 1}
                    </button>
                {/each}
            </div>
        {/if}

        <p class="py-4 text-lg">{project.description}</p>

        <div class="mb-4">
            <h4 class="font-semibold text-xl mb-2">{project.details.technologies_title}</h4>
            <div class="flex flex-wrap gap-2">
                {#each project.tags || [] as tag}
                    <span class="badge badge-primary">{tag}</span>
                {/each}
            </div>
        </div>

        <!-- Placeholder for Performance and Statistics -->
        <div class="mb-4">
            <h4 class="font-semibold text-xl mb-2">{project.details.performance_title}</h4>
            <p class="opacity-70">{project.details.performance_description}</p>
            <ul class="list-disc list-inside opacity-70 mt-2">
                {#each project.details.statistics as statistic}
                    <li>{statistic}</li>
                {/each}
            </ul>
        </div>

        <div class="modal-action">
            {#if project.liveUrl}
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" class="btn btn-primary">{project.details.live_demo_button}</a>
            {/if}
            {#if project.githubUrl}
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" class="btn btn-secondary">{project.details.github_repo_button}</a>
            {/if}

        </div>
    </div>
</div>
