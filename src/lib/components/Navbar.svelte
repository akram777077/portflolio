<script lang="ts">
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { onMount } from 'svelte';

	let { navigation, profile } = $props<{ navigation: any; profile: any }>();

	let activeSection = $state('');

	onMount(() => {
		const sections = document.querySelectorAll('section[id]');

		window.addEventListener('scroll', () => {
			let current = '';
			sections.forEach((section) => {
				const sectionTop = (section as HTMLElement).offsetTop - 150;
				if (window.pageYOffset >= sectionTop) {
					current = section.getAttribute('id') || '';
				}
			});
			activeSection = current;
		});
	});

	function handleNavClick(event: MouseEvent) {
		event.preventDefault();
		const targetId = (event.currentTarget as HTMLAnchorElement).getAttribute('href');
		if (targetId) {
			const targetElement = document.querySelector(targetId);
			if (targetElement) {
				const offsetTop = (targetElement as HTMLElement).offsetTop - 80;
				window.scrollTo({
					top: offsetTop,
					behavior: 'smooth'
				});
			}
		}
	}
</script>

<nav class='flex justify-center'>
	<div
		class="fixed top-8 z-50 mx-auto navbar w-2/3 rounded-full bg-base-100 shadow-lg transition-all duration-300"
	>
		<div class="navbar-start">
			<div class="dropdown">
				<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h8m-8 6h16"
						></path>
					</svg>
				</div>
				<ul
					class="dropdown-content menu z-[1] mt-3 w-52 menu-sm rounded-box bg-base-100 p-2 shadow"
				>
					{#each navigation.navLinks as link}
						<li>
							<a
								href={link.href}
								class="nav-link"
								class:active={activeSection === link.href.substring(1)}
								onclick={handleNavClick}>{link.text}</a
							>
						</li>
					{/each}
				</ul>
			</div>
			<a href="/" class="gradient-text btn text-xl font-bold btn-ghost">{profile.name}</a>
		</div>
		<div class="navbar-center hidden lg:flex">
			<ul class="menu menu-horizontal px-1">
				{#each navigation.navLinks as link}
					<li>
						<a
							href={link.href}
							class="nav-link"
							class:active={activeSection === link.href.substring(1)}
							onclick={handleNavClick}>{link.text}</a
						>
					</li>
				{/each}
			</ul>
		</div>
		<div class="navbar-end">
			<ThemeToggle />
		</div>
	</div>
</nav>
