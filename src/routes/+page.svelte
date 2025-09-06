<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Education from '$lib/components/Education.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import ProblemSolving from '$lib/components/ProblemSolving.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Volunteer from '$lib/components/Volunteer.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';

	import profile from '$lib/data/profile.json' with { type: 'json' };
	import about from '$lib/data/about.json' with { type: 'json' };
	import education from '$lib/data/education.json' with { type: 'json' };
	import skills from '$lib/data/skills.json' with { type: 'json' };
	import problemSolving from '$lib/data/problem_solving.json' with { type: 'json' };
	import projects from '$lib/data/projects.json' with { type: 'json' };
	import volunteer from '$lib/data/volunteer.json' with { type: 'json' };
	import contact from '$lib/data/contact.json' with { type: 'json' };
	import projectsOverview from '$lib/data/projects_overview.json' with { type: 'json' };
	import navigation from '$lib/data/navigation.json' with { type: 'json' };

	onMount(() => {
		if (window.location.hash) {
			const targetId = window.location.hash;
			const targetElement = document.querySelector(targetId);
			if (targetElement) {
				const offsetTop = (targetElement as HTMLElement).offsetTop - 80; // Adjust for fixed navbar
				window.scrollTo({
					top: offsetTop,
					behavior: 'smooth'
				});
			}
		}
	});
</script>

<Navbar {navigation} {profile} />

<main>
	<Hero {profile} />
	<About {about} />
	<Education {education} />
	<Skills {skills} />
	<ProblemSolving {problemSolving} />
	<Projects {projects} {projectsOverview} />
	<Volunteer {volunteer} />
	<Contact {contact} />
</main>

<Footer {profile} {contact} />