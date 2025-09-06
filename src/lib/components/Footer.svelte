<script lang="ts">
	import { scrollAnimation } from '$lib/actions/scrollAnimation';

	let { profile, contact } = $props<{ profile: any; contact: any }>();
</script>

<footer class="footer footer-center p-10 bg-base-300 text-base-content">
	<div use:scrollAnimation class="animate-on-scroll">
		<div class="mb-4">
			<h3 class="text-2xl font-bold gradient-text">{profile.name}</h3>
			<p class="mt-2">{profile.short_bio}</p>
		</div>
		<div class="grid grid-flow-col gap-4">
			{#each contact.socials as social}
				<a href={social.url} class="btn btn-ghost btn-circle hover-lift" aria-label={social.name}>
					<i class="{social.icon} text-xl"></i>
				</a>
			{/each}
		</div>
		<div class="text-sm opacity-70 mt-4">
			<p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
			<p class="mt-1">{contact.built_with}</p>
		</div>
	</div>
</footer>
