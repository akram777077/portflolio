<script lang="ts">
	import { onMount } from 'svelte';

	let container: HTMLElement;
	let timeouts: number[] = [];
	let mounted = true;

	onMount(() => {
		for (let i = 0; i < 50; i++) {
			createParticle();
		}

		return () => {
			mounted = false;
			timeouts.forEach(timeout => clearTimeout(timeout));
			timeouts = [];
		};
	});

	function createParticle() {
		if (!mounted || !container) return;

		const particle = document.createElement('div');
		particle.className = 'particle';
		particle.style.left = Math.random() * 100 + '%';
		particle.style.animationDelay = Math.random() * 6 + 's';
		particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
		container.appendChild(particle);

		const timeoutId = setTimeout(() => {
			if (!mounted || !container) return;
			if (particle.parentNode) {
				particle.parentNode.removeChild(particle);
			}
			createParticle(); // Create new particle
		}, 6000) as unknown as number;

		timeouts.push(timeoutId);
	}
</script>

<div bind:this={container} class="particles"></div>
