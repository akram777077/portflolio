<script lang="ts">
    import { onMount } from 'svelte';

	let theme = $state('light');
	let isTransitioning = $state(false);

    onMount(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            theme = savedTheme;
        }
    });

	$effect(() => {
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	});

	function toggleTheme() {
		if (isTransitioning) return; // Prevent multiple rapid toggles
		
		isTransitioning = true;
		const newTheme = theme === 'light' ? 'dark' : 'light';

		// Add smooth transition class to body
		document.body.classList.add('theme-transitioning');
		
		// Create a smooth fade effect
		document.documentElement.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

		// Apply the theme change
		theme = newTheme;
		document.documentElement.setAttribute('data-theme', newTheme);

		// Staggered element transitions for a wave effect
		setTimeout(() => {
			// Navbar elements
			document.querySelectorAll('nav, .navbar').forEach((el, index) => {
				(el as HTMLElement).style.transition = `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`;
			});
		}, 50);

		setTimeout(() => {
			// Cards and major sections
			document.querySelectorAll('.card, section').forEach((el, index) => {
				(el as HTMLElement).style.transition = `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.03}s`;
			});
		}, 100);

		setTimeout(() => {
			// Text elements
			document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, li, button').forEach((el, index) => {
				(el as HTMLElement).style.transition = `color 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.01}s`;
			});
		}, 150);

		// Clean up transitions after animation completes
		setTimeout(() => {
			document.body.classList.remove('theme-transitioning');
			document.documentElement.style.transition = '';
			
			// Reset individual element transitions
			document.querySelectorAll('*').forEach(el => {
				(el as HTMLElement).style.transition = '';
			});
			
			isTransitioning = false;
		}, 1000);
	}
</script>

<button 
	onclick={toggleTheme} 
	class="btn btn-ghost btn-circle transition-all duration-300 hover:scale-110 hover:bg-base-200 {isTransitioning ? 'animate-pulse' : ''}"
	disabled={isTransitioning}
>
    {#if theme === 'light'}
        <i class="fas fa-moon text-lg transition-all duration-300 hover:text-primary"></i>
    {:else}
        <i class="fas fa-sun text-lg transition-all duration-300 hover:text-warning"></i>
    {/if}
</button>
