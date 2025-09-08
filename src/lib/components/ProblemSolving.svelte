<script lang="ts">
	import { scrollAnimation } from '$lib/actions/scrollAnimation';
	import { onMount } from 'svelte';

	let { problemSolving } = $props<{ problemSolving: any }>();

	// Function to animate circular progress
	function animateCircularProgress(element: HTMLElement, percentage: number) {
		const circle = element.querySelector('.progress-circle') as SVGCircleElement;
		if (!circle) return;

		const radius = 45;
		const circumference = 2 * Math.PI * radius;
		const offset = circumference - (percentage / 100) * circumference;

		circle.style.strokeDasharray = `${circumference}`;
		circle.style.strokeDashoffset = `${circumference}`;

		// Animate the progress
		setTimeout(() => {
			circle.style.transition = 'stroke-dashoffset 2s ease-in-out';
			circle.style.strokeDashoffset = `${offset}`;
		}, 500);
	}

	onMount(() => {
		// Animate all circular progress bars when component mounts
		const progressElements = document.querySelectorAll('.circular-progress');
		progressElements.forEach((element, index) => {
			const percentage = parseFloat(element.getAttribute('data-percentage') || '0');
			setTimeout(() => {
				animateCircularProgress(element as HTMLElement, percentage);
			}, index * 200);
		});
	});
</script>

<section id="problem-solving" class="py-20 bg-gradient-to-br from-base-100 via-primary/5 to-secondary/5 relative overflow-hidden">
	<!-- Background Elements -->
	<div class="absolute inset-0 opacity-10">
		<div class="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
		<div class="absolute bottom-20 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-500 rounded-full blur-3xl opacity-30"></div>
	</div>

	<div class="container mx-auto px-6 relative z-10">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold mb-4 section-title">{problemSolving.title}</h2>
			<div class="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
			<p class="text-xl text-base-content/70 max-w-3xl mx-auto">{problemSolving.subtitle}</p>
		</div>

		<div class="max-w-4xl mx-auto mb-16">
			<div use:scrollAnimation class="animate-on-scroll text-center">
				<p class="text-lg leading-relaxed mb-8">{problemSolving.description}</p>
			</div>
		</div>

		<!-- Codeforces Section -->
		<div use:scrollAnimation class="animate-on-scroll mb-16">
			<div class="card bg-gradient-to-r from-blue-500/10 to-purple-500/10 shadow-2xl border border-blue-500/20">
				<div class="card-body p-8">
					<div class="flex flex-col lg:flex-row items-center gap-8">
						<!-- Codeforces Logo and Info -->
						<div class="text-center lg:text-left">
							<div class="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto lg:mx-0">
								<i class="fas fa-code text-white text-2xl"></i>
							</div>
							<h3 class="text-3xl font-bold mb-2 gradient-text">{problemSolving.codeforces.title}</h3>
							<a 
								href={problemSolving.codeforces.profileUrl} 
								target="_blank" 
								rel="noopener noreferrer"
								class="btn btn-primary btn-sm hover:scale-105 transition-transform duration-300"
							>
								<i class="fas fa-external-link-alt mr-2"></i>
								View Profile
							</a>
						</div>

						<!-- Codeforces Stats -->
						<div class="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
							<div class="text-center">
								<div class="text-3xl font-bold text-blue-500 mb-1">{problemSolving.codeforces.rating}</div>
								<div class="text-sm text-base-content/70">Current Rating</div>
								<div class="badge badge-primary badge-sm mt-1">{problemSolving.codeforces.rank}</div>
							</div>
							<div class="text-center">
								<div class="text-3xl font-bold text-purple-500 mb-1">{problemSolving.codeforces.maxRating}</div>
								<div class="text-sm text-base-content/70">Max Rating</div>
							</div>
							<div class="text-center">
								<div class="text-3xl font-bold text-green-500 mb-1">{problemSolving.codeforces.contestsParticipated}</div>
								<div class="text-sm text-base-content/70">Contests</div>
							</div>
							<div class="text-center">
								<div class="text-3xl font-bold text-orange-500 mb-1">{problemSolving.codeforces.problemsSolved}</div>
								<div class="text-sm text-base-content/70">Problems Solved</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- LeetCode Section -->
		<div use:scrollAnimation class="animate-on-scroll mb-16">
			<div class="card bg-gradient-to-r from-orange-500/10 to-yellow-500/10 shadow-2xl border border-orange-500/20">
				<div class="card-body p-8">
					<div class="text-center mb-8">
						<div class="w-20 h-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mb-4 mx-auto">
							<i class="fas fa-laptop-code text-white text-2xl"></i>
						</div>
						<h3 class="text-3xl font-bold mb-4 gradient-text">{problemSolving.leetcode.title}</h3>
						<a 
							href={problemSolving.leetcode.profileUrl} 
							target="_blank" 
							rel="noopener noreferrer"
							class="btn btn-secondary hover:scale-105 transition-transform duration-300"
						>
							<i class="fas fa-external-link-alt mr-2"></i>
							View LeetCode Profile
						</a>
					</div>

					<!-- LeetCode Progress Circles -->
					<div class="grid md:grid-cols-3 gap-8">
						{#each Object.entries(problemSolving.leetcode.problems) as [difficulty, data]}
							<div class="text-center">
								<div class="relative inline-block mb-4">
									<!-- Circular Progress SVG -->
									<div 
										class="circular-progress relative" 
										data-percentage={data.percentage}
									>
										<svg class="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
											<!-- Background Circle -->
											<circle
												cx="50"
												cy="50"
												r="45"
												stroke="currentColor"
												stroke-width="8"
												fill="none"
												class="text-base-300"
											/>
											<!-- Progress Circle -->
											<circle
												cx="50"
												cy="50"
												r="45"
												stroke={data.color}
												stroke-width="8"
												fill="none"
												stroke-linecap="round"
												class="progress-circle"
											/>
										</svg>
										<!-- Percentage Text -->
										<div class="absolute inset-0 flex items-center justify-center">
											<div class="text-center">
												<div class="text-2xl font-bold" style="color: {data.color}">
													{data.percentage.toFixed(1)}%
												</div>
												<div class="text-xs text-base-content/60 capitalize">
													{difficulty}
												</div>
											</div>
										</div>
									</div>
								</div>

								<!-- Problem Count -->
								<div class="mb-4">
									<div class="text-xl font-bold mb-1">
										{data.solved} / {data.total}
									</div>
									<div class="text-sm text-base-content/70 capitalize mb-3">
										{difficulty} Problems
									</div>
								</div>

								<!-- Practice Button -->
								<a 
									href={data.url} 
									target="_blank" 
									rel="noopener noreferrer"
									class="btn btn-outline btn-sm hover:scale-105 transition-all duration-300"
									style="border-color: {data.color}; color: {data.color};"
								>
									<i class="fas fa-play mr-2"></i>
									Practice {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
								</a>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<!-- Achievements Stats -->
		<div use:scrollAnimation class="animate-on-scroll">
			<div class="card bg-gradient-to-r from-primary/10 to-secondary/10 shadow-xl">
				<div class="card-body">
					<h3 class="text-2xl font-bold text-center mb-8">Competitive Programming Achievements</h3>
					<div class="grid md:grid-cols-3 gap-8">
						{#each problemSolving.achievements as achievement}
							<div class="text-center group">
								<div class="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
									<i class="{achievement.icon} text-white text-xl"></i>
								</div>
								<div class="text-4xl font-bold gradient-text mb-2">{achievement.metric}</div>
								<div class="text-lg font-semibold mb-1">{achievement.label}</div>
								<div class="text-sm text-base-content/70">{achievement.description}</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>