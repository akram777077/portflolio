<script lang="ts">
	import { onMount } from 'svelte';

	let { level, progressColor } = $props<{ level: number; progressColor: string }>();
	let progressFill: HTMLElement;
    let element: HTMLElement;

	onMount(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressFill.style.width = level + '%';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        observer.observe(element);
	});
</script>

<div bind:this={element}>
    <div class="progress {progressColor} w-full">
        <div bind:this={progressFill} class="progress-fill" data-width={level}></div>
    </div>
</div>
