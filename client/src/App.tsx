import TasksContainer from './components/tasks_components/TasksContainer'
import TimerContainerGem from './components/timer_components/TimerContainerGem'


function App() {

	return (
        <main className='bg-[#ffffff] w-screen h-screen flex flex-col items-center gap-10 border-t-4 border-orange-500'>
            <nav className="w-full flex justify-between items-center px-6 py-4 bg-white">
            <h1 className="text-gray-700 text-2xl font-bold">Pomodoro Tasks</h1>
            </nav>

            <section className='w-full h-[80%] flex flex-col lg:flex-row justify-center items-center gap-10'>
                <TimerContainerGem />
                <TasksContainer />
            </section>
        </main>
	)
}

export default App