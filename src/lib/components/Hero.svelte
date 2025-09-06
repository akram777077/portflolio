<script lang="ts">
	import ParticleSystem from '$lib/components/ParticleSystem.svelte';
	import TypingAnimation from '$lib/components/TypingAnimation.svelte';

	let { profile } = $props<{ profile: any }>();
</script>

<section id="hero" class="hero min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 pt-24">
	<div class="hero-content text-center">
		<div class="max-w-4xl">
			<div class="avatar mb-8">
				<div class="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 animate-float">
					<img src={profile.imageUrl} alt="Profile" />
				</div>
			</div>
			<h1 class="text-5xl md:text-7xl font-bold mb-6 fade-in">
				<span class="gradient-text">{profile.title1}</span><br />
				<span class="typing-text"><TypingAnimation text={profile.title2} /></span>
			</h1>
			<p class="text-lg md:text-xl mb-8 max-w-2xl mx-auto fade-in-delayed">
				{profile.bio}
			</p>
			<div class="flex flex-wrap gap-4 justify-center fade-in-delayed-2">
				<a href="#projects" class="btn btn-primary btn-lg hover-lift">View My Work</a>
				<a href="#contact" class="btn btn-outline btn-lg hover-lift">Get In Touch</a>
			</div>
		</div>
	</div>
	<div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
		<i class="fas fa-chevron-down text-2xl opacity-60"></i>
	</div>
	<ParticleSystem />
</section>
