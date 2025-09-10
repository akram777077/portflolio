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
		<div class="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
		<div class="absolute bottom-20 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
		<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent rounded-full blur-3xl opacity-30"></div>
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

		<!-- Main Stats -->
		<div use:scrollAnimation class="animate-on-scroll mb-16">
			<div class="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
				<!-- Total Problems -->
				<div class="card bg-gradient-to-r from-primary/10 to-secondary/10 shadow-xl border border-primary/20">
					<div class="card-body text-center p-6">
						<div class="text-4xl font-bold gradient-text mb-2">{problemSolving.totalSolved}</div>
						<div class="text-sm text-base-content/70">Problems Solved</div>
					</div>
				</div>

				<!-- Current Rating -->
				<div class="card bg-gradient-to-r from-secondary/10 to-accent/10 shadow-xl border border-secondary/20">
					<div class="card-body text-center p-6">
						<div class="text-4xl font-bold gradient-text mb-2">{problemSolving.currentRating}</div>
						<div class="text-sm text-base-content/70">Current Rating</div>
					</div>
				</div>

				<!-- Max Rating -->
				<div class="card bg-gradient-to-r from-accent/10 to-warning/10 shadow-xl border border-accent/20">
					<div class="card-body text-center p-6">
						<div class="text-4xl font-bold gradient-text mb-2">{problemSolving.maxRating}</div>
						<div class="text-sm text-base-content/70">Max Rating</div>
					</div>
				</div>

				<!-- Contests -->
				<div class="card bg-gradient-to-r from-warning/10 to-primary/10 shadow-xl border border-warning/20">
					<div class="card-body text-center p-6">
						<div class="text-4xl font-bold gradient-text mb-2">{problemSolving.contestsParticipated}</div>
						<div class="text-sm text-base-content/70">Contests</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Problem Difficulty Breakdown -->
		<div use:scrollAnimation class="animate-on-scroll">
			<div class="card bg-base-100/80 backdrop-blur-sm shadow-2xl border border-base-300/50">
				<div class="card-body p-8">
					<h3 class="text-3xl font-bold text-center mb-8 gradient-text">Problem Difficulty Breakdown</h3>
					
					<!-- Circular Progress Indicators -->
					<div class="grid md:grid-cols-3 gap-8">
						{#each Object.entries(problemSolving.problems) as [difficulty, data]}
							<div class="text-center">
								<div class="relative inline-block mb-6">
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
												<div class="text-xl font-bold" style="color: {data.color}">
													{data.solved}
												</div>
												<div class="text-xs text-base-content/60 capitalize font-semibold">
													{difficulty}
												</div>
											</div>
										</div>
									</div>
								</div>

								<!-- Problem Count and Stats -->
								<div class="space-y-2">
									<div class="text-2xl font-bold mb-2" style="color: {data.color}">
										{data.solved}
									</div>
									<div class="text-base text-base-content/70 capitalize font-semibold mb-4">
										{difficulty} Problems
									</div>
									
									<!-- Progress Bar -->
									<div class="w-full bg-base-300 rounded-full h-3 mb-4">
										<div 
											class="h-3 rounded-full transition-all duration-2000 ease-out"
											style="background-color: {data.color}; width: {data.percentage}%"
										></div>
									</div>
									
									<!-- Statistics -->
									<div class="text-sm text-base-content/60 space-y-1">
										<div>Solved: <span class="font-semibold">{data.solved} / {problemSolving.totalSolved}</span></div>
										<div>Percentage: <span class="font-semibold">{data.percentage}%</span></div>
									</div>
								</div>
							</div>
						{/each}
					</div>

					<!-- Distribution Summary -->
					<div class="mt-12 pt-8 border-t border-base-300">
						<div class="text-center">
							<h4 class="text-xl font-bold mb-4">Problem Distribution</h4>
							<div class="text-lg text-base-content/70">
								Out of <span class="font-bold gradient-text">{problemSolving.totalSolved}</span> problems solved:
								<span class="font-semibold" style="color: {problemSolving.problems.easy.color}">{problemSolving.problems.easy.solved} Easy</span>, 
								<span class="font-semibold" style="color: {problemSolving.problems.medium.color}">{problemSolving.problems.medium.solved} Medium</span>, 
								<span class="font-semibold" style="color: {problemSolving.problems.hard.color}">{problemSolving.problems.hard.solved} Hard</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>