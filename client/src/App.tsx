import Timer from './components/timer_components/TimerContainer'
import TasksContainer from './components/tasks_components/TasksContainer'


function App() {

	return (
        <main className='bg-[#272727] w-screen h-screen flex flex-col items-center gap-10'>
            <nav className="w-full flex justify-between items-center px-6 py-4 bg-[#272727]">
            <h1 className="text-white text-2xl font-bold">Pomodoro Tasks</h1>
            <button className="px-4 py-2 bg-white text-black font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                Login
            </button>
            </nav>

            <section className='w-full h-[80%] flex flex-row justify-center items-center gap-10'>
                <Timer />
                <TasksContainer />
            </section>
        </main>
	)
}

export default App