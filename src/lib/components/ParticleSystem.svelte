<script lang="ts">
	import { onMount } from 'svelte';

	let container: HTMLElement;

	onMount(() => {
		for (let i = 0; i < 50; i++) {
			createParticle();
		}
	});

	function createParticle() {
		const particle = document.createElement('div');
		particle.className = 'particle';
		particle.style.left = Math.random() * 100 + '%';
		particle.style.animationDelay = Math.random() * 6 + 's';
		particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
		container.appendChild(particle);

		setTimeout(() => {
			if (particle.parentNode) {
				particle.parentNode.removeChild(particle);
			}
			createParticle(); // Create new particle
		}, 6000);
	}
</script>

<div bind:this={container} class="particles"></div>
