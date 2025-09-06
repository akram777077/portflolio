<script lang="ts">
	import { onMount } from 'svelte';

	let { text, speed = 100 } = $props<{ text: string; speed?: number }>();
	let element: HTMLElement;
	let currentIndex = 0;

	onMount(() => {
		type();
	});

	function type() {
		if (currentIndex < text.length) {
			element.textContent += text.charAt(currentIndex);
			currentIndex++;
			setTimeout(type, speed);
		}
	}
</script>

<span bind:this={element}></span>
