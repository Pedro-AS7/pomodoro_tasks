import TasksContainer from './components/tasks_components/TasksContainer'
import TimerContainerGem from './components/timer_components/Timer'

function App() {
	return (
		<main className="bg-[#ffffff] w-full h-screen flex flex-col items-center gap-6 lg:gap-10 border-t-4 border-orange-500 p-4 sm:p-6 lg:p-6">
			<nav className="w-full flex items-center">
                <img src="../public/favicon.png" alt="" width={50}/>
				<h1 className="text-gray-700 text-xl sm:text-2xl font-bold">Pomodoro Tasks</h1>
			</nav>

			<section className="w-full lg:h-full flex flex-col lg:flex-row justify-center items-center lg:items-center gap-8 lg:gap-12">
				<div className="w-full h-full lg:w-[40%] flex justify-center">
					<TimerContainerGem />
				</div>
				<div className="w-full h-full lg:w-[40%] flex justify-center">
					<TasksContainer />
				</div>
			</section>
		</main>
	)
}

export default App
