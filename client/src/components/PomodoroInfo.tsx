

// A simple Icon component for list items, you can replace this with a library like react-icons
const CheckCircleIcon = () => (
	<svg
		className="w-5 h-5 mr-2 inline-block text-red-500 flex-shrink-0"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
		></path>
	</svg>
)

const PomodoroInfo = () => {
	return (
		<section className="bg-[#a5a5a515] h-fit w-fit shadow-md rounded-4xl max-w-4xl mx-auto p-6 sm:p-10 my-8 font-semibold text-xl">
			<div className="text-center mb-8">
				<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
					Master Your Time with the Pomodoro Technique
				</h2>
				<p className="text-lg text-gray-600">
					Discover the simple yet powerful method to boost your productivity and focus.
				</p>
			</div>

			<div className="space-y-8">
				{/* What is it? Section */}
				<div>
					<h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-red-500 pb-2">
						What is the Pomodoro Technique?
					</h3>
					<p className="text-gray-700 leading-relaxed mb-4">
						Invented in the early 1990s by Francesco Cirillo, the "Pomodoro" system gets its name from the
						Italian word for tomato, after the tomato-shaped kitchen timer he used as a student.
					</p>
					<p className="text-gray-700 leading-relaxed">
						The methodology is simple: break down your work into short, timed intervals (called "Pomodoros")
						that are separated by short breaks. This trains your brain to focus in short bursts and can
						significantly improve your attention span and concentration over time.
					</p>
				</div>

				{/* How it Works Section */}
				<div>
					<h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-red-500 pb-2">
						How Does it Work?
					</h3>
					<p className="text-gray-700 leading-relaxed mb-6">
						The Pomodoro Technique is a cyclical system. You work in short sprints, which ensures you're
						consistently productive, and take regular breaks, which keeps you motivated and creative. Here’s
						the simple 5-step process:
					</p>
					<ol className="list-decimal list-inside space-y-4 text-gray-700">
						<li>
							<strong className="font-semibold text-gray-800">Choose a task</strong> you want to work on.
						</li>
						<li>
							<strong className="font-semibold text-gray-800">Set the timer for 25 minutes</strong> (one
							Pomodoro).
						</li>
						<li>
							<strong className="font-semibold text-gray-800">Work on the task</strong> without any
							interruptions until the timer rings.
						</li>
						<li>
							<strong className="font-semibold text-gray-800">Take a short 5-minute break</strong> to
							stretch, grab water, or relax.
						</li>
						<li>
							<strong className="font-semibold text-gray-800">After four Pomodoros</strong>, take a longer
							break of 20-30 minutes.
						</li>
					</ol>
				</div>

				{/* Handling Interruptions Section */}
				<div>
					<h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-red-500 pb-2">
						What If I'm Interrupted?
					</h3>
					<p className="text-gray-700 leading-relaxed mb-4">
						A Pomodoro is an indivisible unit of work. If you are interrupted, Cirillo suggests the "inform,
						negotiate, and call back" strategy:
					</p>
					<div className="mt-4 p-4 border-l-4 border-orange-500 bg-white rounded-r-lg">
						<ul className="list-disc list-inside space-y-2">
							<li>
								<strong className="font-semibold">Inform</strong> the other party you're busy.
							</li>
							<li>
								<strong className="font-semibold">Negotiate</strong> a time to get back to them.
							</li>
							<li>
								<strong className="font-semibold">Schedule</strong> the follow-up immediately.
							</li>
							<li>
								<strong className="font-semibold">Call back</strong> once your Pomodoro is complete.
							</li>
						</ul>
					</div>
				</div>

				{/* Benefits Section */}
				<div>
					<h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-red-500 pb-2">
						Science-Backed Benefits
					</h3>
					<p className="text-gray-700 leading-relaxed mb-6">
						Research, including a study from the University of Illinois, shows that taking short, regular
						breaks can dramatically improve focus over long periods. Adopting this technique provides
						several key benefits:
					</p>
					<ul className="space-y-4">
						<li className="flex items-start">
							<CheckCircleIcon />
							<span>
								<strong className="font-semibold text-gray-800">Manage Distractions:</strong> By
								scheduling breaks, you create dedicated time for distractions, making it easier to stay
								focused during work sprints.
							</span>
						</li>
						<li className="flex items-start">
							<CheckCircleIcon />
							<span>
								<strong className="font-semibold text-gray-800">Reduce Burnout:</strong> Frequent breaks
								help you stay fresh and avoid the mental fatigue that comes from long, uninterrupted
								work sessions.
							</span>
						</li>
						<li className="flex items-start">
							<CheckCircleIcon />
							<span>
								<strong className="font-semibold text-gray-800">Gamify Your Work:</strong> The timer
								adds a fun challenge, turning your tasks into a game against the clock and boosting
								motivation.
							</span>
						</li>
						<li className="flex items-start">
							<CheckCircleIcon />
							<span>
								<strong className="font-semibold text-gray-800">Overcome Procrastination:</strong>{' '}
								Knowing you only need to focus for 25 minutes makes it much easier to start on tasks
								you've been avoiding.
							</span>
						</li>
					</ul>
				</div>
			</div>
		</section>
	)
}

export default PomodoroInfo
