<script lang="ts">
    import { onMount } from 'svelte';

	let theme = $state('light');

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
		const newTheme = theme === 'light' ? 'dark' : 'light';
		theme = newTheme;

		// Apply staggered transitions
		document.body.classList.add('theme-changing'); // Add a class to body to temporarily disable other transitions if needed

		// Background transition (immediate)
		document.documentElement.setAttribute('data-theme', newTheme);

		// Navbar transition (delay 0.1s)
		setTimeout(() => {
			const navbar = document.querySelector('nav');
			if (navbar) {
				navbar.classList.add('transition-nav');
			}
		}, 100);

		// Card transition (delay 0.2s)
		setTimeout(() => {
			document.querySelectorAll('.card').forEach(card => {
				card.classList.add('transition-card');
			});
		}, 200);

		// Text transition (delay 0.3s)
		setTimeout(() => {
			document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, li').forEach(textElement => {
				textElement.classList.add('transition-text');
			});
		}, 300);

		// Remove transition classes after animation completes
		setTimeout(() => {
			document.body.classList.remove('theme-changing');
			const navbar = document.querySelector('nav');
			if (navbar) {
				navbar.classList.remove('transition-nav');
			}
			document.querySelectorAll('.card').forEach(card => {
				card.classList.remove('transition-card');
			});
			document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, li').forEach(textElement => {
				textElement.classList.remove('transition-text');
			});
		}, 800); // Total transition duration + some buffer
	}
</script>

<button onclick={toggleTheme} class="btn btn-ghost btn-circle">
    {#if theme === 'light'}
        <i class="fas fa-moon text-lg theme-icon-dark"></i>
    {:else}
        <i class="fas fa-sun text-lg theme-icon-light"></i>
    {/if}
</button>
