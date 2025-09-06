<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { afterNavigate } from '\$app/navigation'; // Import afterNavigate
	import konami from '$lib/data/konami.json' with { type: 'json' };
	import navigation from '$lib/data/navigation.json' with { type: 'json' };

	let { children } = $props();

	// afterNavigate handler for hash scrolling
	afterNavigate(({ to }) => {
		if (to && to.url && to.url.hash) {
			const el = document.querySelector(to.url.hash);
			if (el) {
				const offsetTop = (el as HTMLElement).offsetTop - 80; // Adjust for fixed navbar
				window.scrollTo({
					top: offsetTop,
					behavior: 'smooth'
				});
			}
		}
	});

	onMount(() => {
		// Konami Code
		let konamiCode: string[] = [];
		const konamiSequence = konami.sequence;
		window.addEventListener('keydown', (e) => {
			konamiCode.push(e.code);
			if (konamiCode.length > konamiSequence.length) {
				konamiCode.shift();
			}
			if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
				document.body.style.animation = 'spin 2s ease-in-out';
				setTimeout(() => {
					document.body.style.animation = '';
					alert(konami.alertMessage);
				}, 2000);
				konamiCode = [];
			}
		});

		// Mobile Touch Gestures
		let touchStartY = 0;
		let touchEndY = 0;

		window.addEventListener('touchstart', (e) => {
			touchStartY = e.changedTouches[0].screenY;
		});

		window.addEventListener('touchend', (e) => {
			touchEndY = e.changedTouches[0].screenY;
			handleGesture();
		});

		function handleGesture() {
			const threshold = 100;
			const diff = touchStartY - touchEndY;

			if (Math.abs(diff) > threshold) {
				if (diff > 0) {
					// Swipe up - scroll to next section
					scrollToNextSection();
				} else {
					// Swipe down - scroll to previous section
					scrollToPreviousSection();
				}
			}
		}

		function scrollToNextSection() {
			const sections = navigation.sections;
			const currentSection = getCurrentSection();
			const currentIndex = sections.indexOf(currentSection);

			if (currentIndex < sections.length - 1) {
				const nextSection = document.getElementById(sections[currentIndex + 1]);
				if (nextSection) {
					nextSection.scrollIntoView({ behavior: 'smooth' });
				}
			}
		}

		function scrollToPreviousSection() {
			const sections = navigation.sections;
			const currentSection = getCurrentSection();
			const currentIndex = sections.indexOf(currentSection);

			if (currentIndex > 0) {
				const prevSection = document.getElementById(sections[currentIndex - 1]);
				if (prevSection) {
					prevSection.scrollIntoView({ behavior: 'smooth' });
				}
			}
		}

		function getCurrentSection() {
			const sections = document.querySelectorAll('section[id]');
			let currentSection = 'hero';

			sections.forEach((section) => {
				const sectionTop = (section as HTMLElement).offsetTop - 100;
				if (window.pageYOffset >= sectionTop) {
					currentSection = section.getAttribute('id') || 'hero';
				}
			});

			return currentSection;
		}
	});
</script>

<svelte:head>
	<link rel="icon"/>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
	/>
</svelte:head>

{@render children?.()}